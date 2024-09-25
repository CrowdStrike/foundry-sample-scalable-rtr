package api

import (
	"context"
	"fmt"
	"math"
	"net/http"
	"time"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api/models"
	"github.com/crowdstrike/gofalcon/falcon/client"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

const queryIsDraft = "draft"

func upsertJobHandler(conf *models.Config) func(ctx context.Context, of fdk.RequestOf[models.UpsertJobRequest]) fdk.Response {
	return func(ctx context.Context, request fdk.RequestOf[models.UpsertJobRequest]) fdk.Response {
		isDraft := request.Params.Query.Get(queryIsDraft) == "true"

		client, err := models.FalconClient(ctx, conf, request.AccessToken)
		if err != nil {
			return fdk.ErrResp(fdk.APIError{Code: http.StatusBadRequest, Message: "fail to initialize client"})
		}

		result, errs := upsertJob(ctx, conf, isDraft, &request.Body, client)
		if len(errs) != 0 {
			return fdk.ErrResp(errs...)
		}

		return fdk.Response{
			Code: http.StatusOK,
			Body: fdk.JSON(result),
		}
	}
}

// upsertJob saves a job to custom storage and may attempt to run or schedule the job if requested.
func upsertJob(ctx context.Context, conf *models.Config, isDraft bool, req *models.UpsertJobRequest, client *client.CrowdStrikeAPISpecification) (*models.UpsertJobResponse, []fdk.APIError) {
	var errs []fdk.APIError
	var err error

	validationErr := req.Validate()
	if len(validationErr) != 0 {
		return nil, validationErr
	}

	id := req.ID
	if id == "" {
		id, err = models.GenerateID(req.Name)
		if err != nil {
			validationErr = append(validationErr, models.NewAPIError(http.StatusInternalServerError, fmt.Sprintf("failed to generate id for job: %s with err: %v", req.Name, err)))
			return nil, validationErr
		}
		prevJob, errs := jobInfo(ctx, id, conf, client)
		if len(errs) != 0 {
			if errs[0].Code != http.StatusNotFound {
				validationErr = append(validationErr, errs...)
				return nil, errs
			}
		}
		if prevJob != nil {
			validationErr = append(validationErr, fdk.APIError{
				Code:    http.StatusBadRequest,
				Message: fmt.Sprintf("job with name:%s already exist", req.Name),
			})
			return nil, validationErr
		}
	}

	decorateErr := decorateRequestUpsertReq(ctx, conf, isDraft, id, &req.Job, client)
	if len(decorateErr) != 0 {
		validationErr = append(validationErr, decorateErr...)
		return nil, validationErr
	}

	// create the object in the custom_storage.
	jobID, errs := putJob(ctx, &req.Job, conf, client)
	if len(errs) != 0 {
		validationErr = append(validationErr, errs...)
		//validationErr = append(validationErr, models.NewAPIError(http.StatusInternalServerError, multierror.Append(fmt.Errorf("failed to create job: %s id: %s, with ", req.Name, id), errs...).Error()))
		return nil, validationErr
	}

	action := JobEdited
	if req.Version == 1 {
		action = JobCreated
	}

	errs = auditLogProducer(ctx, action, &req.Job, conf, client)
	if len(errs) != 0 {
		// we do not rollback transaction if auditlogger fails
		validationErr = append(validationErr, errs...)
		return nil, validationErr
		//return nil, []fdk.APIError{models.NewAPIError(http.StatusInternalServerError, multierror.Append(fmt.Errorf("failed to create audit log job: %s id: %s, with ", req.Name, id), errs...).Error())}
	}

	return &models.UpsertJobResponse{Resource: jobID}, nil
}

func decorateRequestUpsertReq(ctx context.Context, conf *models.Config, isDraft bool, id string, req *models.Job, client *client.CrowdStrikeAPISpecification) []fdk.APIError {
	if !isDraft {
		req.RunNowSchedule, req.WSchedule = updateSchedule(req)
		var nextRun time.Time
		var errNxt error

		recurrences := 0

		if req.RunNow {
			recurrences = 1
			nextRun, errNxt = models.NextRun(req.RunNowSchedule, time.Now().UTC())
			if errNxt != nil {
				err := models.NewAPIError(http.StatusInternalServerError, fmt.Sprintf("failed to get the next run time err: %v", errNxt))
				return []fdk.APIError{err}
			}
		}

		// only if it has a schedule
		if req.WSchedule != nil {
			nextRun, errNxt = models.NextRun(req.Schedule, time.Now().UTC())
			if errNxt != nil {
				err := models.NewAPIError(http.StatusInternalServerError, fmt.Sprintf("failed to get the next run time err: %v", errNxt))
				return []fdk.APIError{err}
			}

			if req.Schedule.End == "" {
				recurrences = math.MaxInt
			}

			for {
				if recurrences == math.MaxInt || !isNextRunValid(nextRun, req.Schedule.Start, req.Schedule.End) {
					break
				}
				recurrences++
				nextRun, errNxt = models.NextRun(req.Schedule, nextRun)
			}
		}

		req.TotalRecurrences = recurrences

		workflowIDs, errs := provisionWorkflowWithAct(ctx, req, conf, client)
		if len(errs) != 0 {
			return errs
		}

		executionWorkflowID, errs := provisionWorkflowForExec(ctx, req, conf, workflowIDs, client)
		if len(errs) != 0 {
			return errs
		}

		req.Workflows = &models.WorkflowsInfo{ScheduleWorkflow: workflowIDs, NotifierWorkflow: executionWorkflowID}
		req.NextRun = &nextRun
	}

	currTime := time.Now()
	version := req.Version + 1
	if version == 1 {
		req.CreatedAt = &currTime
	}
	req.ID = id
	req.Version = version
	req.UpdatedAt = &currTime
	req.Draft = isDraft

	var errs []fdk.APIError
	req.HostCount = len(req.Target.Hosts)
	if len(req.Target.HostGroups) != 0 {
		req.HostCount, errs = getDeviceCountForHostGroup(ctx, req.Target.HostGroups, client)
		if len(errs) != 0 {
			return errs
		}
	}

	return errs
}

// isNextRunValid check to see if next run is valid.. it has be previousRun< Nextrun also start_time<nextrun<endtime, if so insert the next run
func isNextRunValid(nextTime time.Time, startTime, endTime string) bool {
	start, _ := time.Parse(time.RFC3339, startTime)
	end, _ := time.Parse(time.RFC3339, endTime)

	check := false
	if nextTime.After(start) || nextTime.Equal(end) {
		check = true
	}

	if !end.IsZero() {
		if nextTime.After(end) {
			check = false
		}
	}

	return check
}
