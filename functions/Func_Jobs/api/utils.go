package api

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"strings"
	"time"

	fdk "github.com/CrowdStrike/foundry-fn-go"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api/models"
	"github.com/crowdstrike/gofalcon/falcon/client"
	"github.com/crowdstrike/gofalcon/falcon/client/custom_storage"
	"github.com/crowdstrike/gofalcon/falcon/client/hosts"
	"github.com/crowdstrike/gofalcon/falcon/client/workflows"
	model "github.com/crowdstrike/gofalcon/falcon/models"
	"github.com/go-openapi/runtime"
)

const (
	JobCreated       ActionTaken = "Created"
	JobEdited        ActionTaken = "Updated"
	deviceHostGroups             = "groups"
	staticMaxLimit               = 1000

	secInDay = 86400
)

const (
	// ISOTimeFormat is the standard ISO-8601 time format for date and time in UTC to the second precision.
	ISOTimeFormat = "2006-01-02T15:04:05Z"
	// ISOTimeFormatOffset is the standard ISO-8601 time format for date and time in UTC to the second precision,
	// where the offset is presented as +/-hh:mm.
	ISOTimeFormatOffset = "2006-01-02T15:04:05-07:00"
)

// ActionTaken enumerates the list of action taken on job
type ActionTaken string

func auditLogProducer(ctx context.Context, event ActionTaken, req *models.Job, conf *models.Config, client *client.CrowdStrikeAPISpecification) []fdk.APIError {
	var errs []fdk.APIError
	logId := fmt.Sprintf("%d%s", time.Now().UnixNano(), req.ID)
	customJobRequest := custom_storage.NewPutObjectParamsWithContext(ctx)
	customJobRequest.SetObjectKey(logId)
	customJobRequest.SetCollectionName(conf.AuditLogsCollection)

	auditLogsBody := models.Audit{
		JobName:    req.Name,
		ModifiedAt: req.UpdatedAt,
		Version:    req.Version,
		ModifiedBy: req.UserName,
		Action:     string(event),
		JobID:      req.ID,
		ID:         logId,
	}

	rawObject, err := json.Marshal(auditLogsBody)
	if err != nil {
		return []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}
	obj := io.NopCloser(bytes.NewReader(rawObject))
	customJobRequest.SetBody(obj)

	_, err = client.CustomStorage.PutObject(customJobRequest)
	if err != nil {
		return []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	return errs
}

func putJob(ctx context.Context, req *models.Job, conf *models.Config, client *client.CrowdStrikeAPISpecification) (string, []fdk.APIError) {
	var errs []fdk.APIError
	rawObject, err := json.Marshal(req)
	if err != nil {
		return "", []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	customJobRequest := custom_storage.NewPutObjectParamsWithContext(ctx)
	customJobRequest.SetObjectKey(req.ID)
	customJobRequest.SetCollectionName(conf.JobsCollection)

	obj := io.NopCloser(bytes.NewReader(rawObject))
	customJobRequest.SetBody(obj)

	response, err := client.CustomStorage.PutObject(customJobRequest)
	if err != nil {
		return "", []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if len(response.GetPayload().Errors) > 0 {
		errs = convertMsaErrorsToAPIErrors(response.GetPayload().Errors)
		return "", errs
	}

	if response.GetPayload().Resources[0].ObjectKey == nil {
		return "", []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: "failed to upsert the job. key is empty in the response",
		}}
	}

	return *response.GetPayload().Resources[0].ObjectKey, errs
}

func jobInfo(ctx context.Context, id string, conf *models.Config, client *client.CrowdStrikeAPISpecification) (*models.Job, []fdk.APIError) {
	var errs []fdk.APIError

	customJobRequest := custom_storage.NewGetObjectParamsWithContext(ctx)
	customJobRequest.SetObjectKey(id)
	customJobRequest.SetCollectionName(conf.JobsCollection)

	buf := new(bytes.Buffer)
	_, err := client.CustomStorage.GetObject(customJobRequest, buf)
	if err != nil {
		runtimeErr := err.(*runtime.APIError)
		return nil, []fdk.APIError{{
			Code:    runtimeErr.Code,
			Message: err.Error(),
		}}
	}
	rawResponse, err := io.ReadAll(buf)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	var result models.Job
	err = json.Unmarshal(rawResponse, &result)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if result.OutputFormat == nil {
		result.OutputFormat = append(result.OutputFormat, "logscale", "csv")
	}
	result = adjustRecurrence(result)

	return &result, errs
}

func adjustRecurrence(j models.Job) models.Job {
	if j.Draft {
		return j
	}
	if j.RunNowSchedule != nil {
		if j.TotalRecurrences > 0 && j.RunCount == j.TotalRecurrences {
			j.NextRun = nil
		}
		if j.Schedule == nil {
			return j
		}
	}
	if j.Schedule == nil || j.Schedule.TimeCycle == "" || j.Schedule.End == "" || j.Schedule.Start == "" {
		return j
	}

	// If end-start == 1 day AND time cycle is one day, then there is no recurrence.
	start, _ := strToTime(j.Schedule.Start)
	end, _ := strToTime(j.Schedule.End)
	if math.Abs(end.Sub(start).Seconds()-secInDay) > 0.1 {
		// start and end are one day apart
		return j
	}
	nextRun, _ := models.NextRun(j.Schedule, start)
	if math.Abs(nextRun.Sub(end).Seconds()) <= 0.1 {
		// cron expression is one day
		j.Schedule.TimeCycle = ""
	}

	if j.TotalRecurrences > 0 && j.RunCount == j.TotalRecurrences {
		j.NextRun = nil
	}

	return j
}

func strToTime(s string) (time.Time, error) {
	t, err := time.Parse(ISOTimeFormatOffset, s)
	if err != nil {
		t, err = time.Parse(ISOTimeFormat, s)
		if err != nil {
			return t, fmt.Errorf("failed to parse time: %s", err)
		}
	}
	return t, nil
}

func search(ctx context.Context, req models.SearchObjectsRequest, client *client.CrowdStrikeAPISpecification) (models.SearchObjectsResponse, []fdk.APIError) {
	limit := 100
	if req.Limit > 0 {
		limit = req.Limit
	}
	var sort *string
	if req.Sort != "" {
		sort = &req.Sort
	}
	offset := 0
	if req.Offset > 0 {
		offset = req.Offset
	}
	params := custom_storage.SearchObjectsParams{
		CollectionName: req.Collection,
		Context:        ctx,
		Filter:         req.Filter,
		Limit:          int64(limit),
		Offset:         int64(offset),
		Sort:           sort,
	}
	resp, err := client.CustomStorage.SearchObjects(&params)
	if err != nil {
		return models.SearchObjectsResponse{}, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	payload := resp.GetPayload()
	if len(payload.Errors) > 0 {
		errs := convertMsaErrorsToAPIErrors(resp.GetPayload().Errors)
		return models.SearchObjectsResponse{}, errs
	}

	sor := models.SearchObjectsResponse{}
	if pagination := payload.Meta.Pagination; pagination != nil {
		sor.Total = int(pagination.Total)
		sor.Offset = int(pagination.Offset)
	}
	res := payload.Resources
	if len(res) == 0 {
		return sor, nil
	}
	sor.ObjectKeys = make([]string, len(res))
	for i, r := range res {
		sor.ObjectKeys[i] = asString(r.ObjectKey)
	}
	return sor, nil
}

func auditInfo(ctx context.Context, id string, conf *models.Config, client *client.CrowdStrikeAPISpecification) (*models.Audit, []fdk.APIError) {
	var errs []fdk.APIError

	customJobRequest := custom_storage.NewGetObjectParamsWithContext(ctx)
	customJobRequest.SetObjectKey(id)
	customJobRequest.SetCollectionName(conf.AuditLogsCollection)

	buf := new(bytes.Buffer)
	_, err := client.CustomStorage.GetObject(customJobRequest, buf)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	rawResponse, err := io.ReadAll(buf)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	var result models.Audit
	err = json.Unmarshal(rawResponse, &result)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	return &result, errs
}

func jobInfoList(ctx context.Context, conf *models.Config, offset string, preDir bool, client *client.CrowdStrikeAPISpecification) ([]string, []fdk.APIError) {
	var errs []fdk.APIError

	customJobRequest := custom_storage.NewListObjectsParamsWithContext(ctx)
	customJobRequest.SetCollectionName(conf.JobsCollection)
	customJobRequest.SetLimit(staticMaxLimit)
	/*	// Do not set the limit to get total for the first time
		if offset == "" {
			customJobRequest.SetLimit(int64(limit + 1))
		}*/
	if offset != "" {
		if preDir {
			customJobRequest.SetEnd(offset)
		} else {
			customJobRequest.SetStart(offset)
		}
	}

	response, err := client.CustomStorage.ListObjects(customJobRequest)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if len(response.GetPayload().Errors) > 0 {
		errs = convertMsaErrorsToAPIErrors(response.GetPayload().Errors)
		return nil, errs
	}

	return response.GetPayload().Resources, errs
}

func auditListWithFilter(ctx context.Context, conf *models.Config, offset string, preDir bool, filter string, client *client.CrowdStrikeAPISpecification) ([]string, []fdk.APIError) {
	result, errs := auditList(ctx, conf, offset, preDir, client)
	if len(errs) == 0 && filter != "" {
		var fResult []string
		for _, id := range result {
			if strings.HasSuffix(id, filter) {
				fResult = append(fResult, id)
			}
		}
		return fResult, errs
	}
	return result, errs
}

func auditList(ctx context.Context, conf *models.Config, offset string, preDir bool, client *client.CrowdStrikeAPISpecification) ([]string, []fdk.APIError) {
	var errs []fdk.APIError

	customJobRequest := custom_storage.NewListObjectsParamsWithContext(ctx)
	customJobRequest.SetCollectionName(conf.AuditLogsCollection)
	customJobRequest.SetLimit(staticMaxLimit)
	if offset != "" {
		if preDir {
			customJobRequest.SetEnd(offset)
		} else {
			customJobRequest.SetStart(offset)
		}
	}

	response, err := client.CustomStorage.ListObjects(customJobRequest)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if len(response.GetPayload().Errors) > 0 {
		errs = convertMsaErrorsToAPIErrors(response.GetPayload().Errors)
		return nil, errs
	}

	return response.GetPayload().Resources, errs
}

func provisionWorkflowForExec(ctx context.Context, req *models.Job, conf *models.Config, workflowIDs []string, client *client.CrowdStrikeAPISpecification) (string, []fdk.APIError) {
	var errs []fdk.APIError
	conditionNodeID := "definitionID_is_equal_to_parameterized_79b66807"
	op := "IN"
	propName := "Trigger.Category.WorkflowExecution.DefinitionID"

	reqBody := &model.ClientSystemDefinitionProvisionRequest{}
	reqBody.Name = &req.Name
	reqBody.TemplateName = &conf.ExecutionNotifierWorkflow
	reqBody.Parameters = &model.ParameterTemplateProvisionParameters{}

	reqBody.Parameters.Conditions = []*model.ParameterConditionProvisionParameter{
		{
			NodeID: &conditionNodeID,
			Fields: []*model.ParameterConditionFieldProvisionParameter{
				{
					Name:     &propName,
					Operator: &op,
					Value:    workflowIDs,
				},
			},
		},
	}

	emailNodeID := "send_email_1fddc95a"
	emailNotification := model.ParameterActivityConfigProvisionParameter{
		NodeID: &emailNodeID,
		Properties: map[string]interface{}{
			"to": req.Notifications,
		},
	}
	reqBody.Parameters.Activities = &model.ParameterActivityProvisionParameters{}
	reqBody.Parameters.Activities.Configuration = append(reqBody.Parameters.Activities.Configuration, &emailNotification)

	provisionReq := workflows.NewProvisionParams()
	provisionReq.SetBody(reqBody)
	provisionReq.Context = ctx

	resp, err := client.Workflows.Provision(provisionReq)
	if err != nil {
		return "", []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if len(resp.GetPayload().Errors) != 0 {
		errs = convertMsaErrorsToAPIErrors(resp.GetPayload().Errors)
		return "", errs
	}

	return resp.GetPayload().Resources[0], errs
}

func provisionWorkflowWithAct(ctx context.Context, req *models.Job, conf *models.Config, client *client.CrowdStrikeAPISpecification) ([]string, []fdk.APIError) {
	var errs []fdk.APIError
	var workflowIDs []string

	triggerNodeID := "trigger"
	reqBody := &model.ClientSystemDefinitionProvisionRequest{}
	reqBody.Parameters = &model.ParameterTemplateProvisionParameters{}
	reqBody.Parameters.Trigger = &model.ParameterTriggerProvisionParameter{}
	reqBody.Parameters.Activities = &model.ParameterActivityProvisionParameters{}
	conditionForHostAndGroupsName := model.ParameterConditionProvisionParameter{
		Fields: []*model.ParameterConditionFieldProvisionParameter{},
	}

	switch req.Action.Type {
	case models.BuildQuery:
		buildQueryNodeID := "check_file_or_registry_exist_abb289a5"
		buildQuery := model.ParameterActivityConfigProvisionParameter{
			NodeID: &buildQueryNodeID,
		}
		conditionForHostAndGroupsName.NodeID = &conf.FileExistConditionNodeID
		templateName := &conf.BuildQFileExistTemplateName
		if req.Action.BuildQueryAction.QueryType == models.RegistryKey {
			conditionForHostAndGroupsName.NodeID = &conf.RegistryKeyValueConditionNodeID
			buildQueryNodeID = "check_registry_exist_3e0e47d3"
			templateName = &conf.BuildQRegistryKeyValueExistTemplateName
			var keys, values []string
			for _, registryKeyVal := range req.Action.BuildQueryAction.RegistryKeys {
				keys = append(keys, registryKeyVal.Key)
				values = append(values, registryKeyVal.Value)
			}

			buildQuery.Properties = map[string][]string{
				"keys":   keys,
				"values": values,
			}
		} else {
			buildQuery.Properties = map[string]interface{}{
				"keys": req.Action.BuildQueryAction.QueryFilePaths,
			}
		}

		reqBody.Parameters.Activities.Configuration = append(reqBody.Parameters.Activities.Configuration, &buildQuery)
		reqBody.TemplateName = templateName
	default:
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: fmt.Sprintf("Handle type is incorrect %s", req.Action.Type.String()),
		}}
	}

	op := "IN"
	opNotIN := "NOT_IN"
	hostNameField := "device_query_78798221.Device.query.devices.#"
	groupNameField := "get_device_details_d2e382bd.Device.GetDetails.Groups"
	hostNameCondition := &model.ParameterConditionFieldProvisionParameter{
		Name:  &hostNameField,
		Value: req.Target.Hosts,
	}
	groupNameCondition := &model.ParameterConditionFieldProvisionParameter{
		Name:  &groupNameField,
		Value: req.Target.HostGroups,
	}

	if len(req.Target.Hosts) != 0 {
		hostNameCondition.Operator = &op
		groupNameCondition.Operator = &opNotIN
		groupNameCondition.Value = []string{"undefined"}
	} else {
		hostNameCondition.Operator = &opNotIN
		groupNameCondition.Operator = &op
		hostNameCondition.Value = []string{"undefined"}
	}

	conditionForHostAndGroupsName.Fields = append(conditionForHostAndGroupsName.Fields, groupNameCondition, hostNameCondition)
	reqBody.Parameters.Conditions = append(reqBody.Parameters.Conditions, &conditionForHostAndGroupsName)

	if req.RunNowSchedule != nil {
		schedule := map[string]interface{}{
			"time_cycle":      req.RunNowSchedule.TimeCycle,
			"tz":              req.RunNowSchedule.Timezone,
			"skip_concurrent": false,
		}
		if len(req.RunNowSchedule.Start) > 0 {
			schedule["start_date"] = req.RunNowSchedule.Start
		}
		if len(req.RunNowSchedule.End) > 0 {
			schedule["end_date"] = req.RunNowSchedule.End
		}
		scheduleParams := model.ParameterTriggerFieldParameter{
			Properties: schedule,
		}

		reqBody.Parameters.Trigger.NodeID = &triggerNodeID
		reqBody.Parameters.Trigger.Fields = make(map[string]model.ParameterTriggerFieldParameter)
		reqBody.Parameters.Trigger.Fields["timer_event_definition"] = scheduleParams
		name := req.Name + " RunNow"
		reqBody.Name = &name

		provisionReq := workflows.NewProvisionParams()
		provisionReq.SetBody(reqBody)
		provisionReq.SetContext(ctx)
		resp, err := client.Workflows.Provision(provisionReq)
		if err != nil {
			return nil, []fdk.APIError{{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			}}
		}
		if len(resp.GetPayload().Errors) != 0 {
			errs = convertMsaErrorsToAPIErrors(resp.GetPayload().Errors)
			return nil, errs
		}
		if len(resp.GetPayload().Resources) == 0 {
			return nil, []fdk.APIError{
				{
					Code:    2001,
					Message: fmt.Sprintf("resources from workflow is 0 response:%v", resp),
				},
			}
		}
		workflowIDs = append(workflowIDs, resp.GetPayload().Resources[0])
	}

	if req.WSchedule != nil {
		schedule := map[string]interface{}{
			"time_cycle":      req.WSchedule.TimeCycle,
			"tz":              req.WSchedule.Timezone,
			"skip_concurrent": false,
		}
		if len(req.WSchedule.Start) > 0 {
			schedule["start_date"] = req.WSchedule.Start
		}
		if len(req.WSchedule.End) > 0 {
			schedule["end_date"] = req.WSchedule.End
		}
		scheduleParams := model.ParameterTriggerFieldParameter{
			Properties: schedule,
		}

		reqBody.Parameters.Trigger.NodeID = &triggerNodeID
		reqBody.Parameters.Trigger.Fields = make(map[string]model.ParameterTriggerFieldParameter)
		reqBody.Parameters.Trigger.Fields["timer_event_definition"] = scheduleParams

		name := req.Name + " Schedule"
		reqBody.Name = &name
		provisionReq := workflows.NewProvisionParams()
		provisionReq.SetBody(reqBody)
		provisionReq.SetContext(ctx)
		resp, err := client.Workflows.Provision(provisionReq)
		if err != nil {
			return nil, []fdk.APIError{{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			}}
		}
		if len(resp.GetPayload().Errors) != 0 {
			errs = convertMsaErrorsToAPIErrors(resp.GetPayload().Errors)
			return nil, errs
		}
		if len(resp.GetPayload().Resources) == 0 {
			return nil, []fdk.APIError{
				{
					Code:    2001,
					Message: fmt.Sprintf("resources from workflow is 0 response:%v", resp),
				},
			}
		}
		workflowIDs = append(workflowIDs, resp.GetPayload().Resources[0])
	}

	return workflowIDs, errs
}

func getDeviceCountForHostGroup(ctx context.Context, hostgroups []string, client *client.CrowdStrikeAPISpecification) (int, []fdk.APIError) {
	var fqlStrings []string
	for _, grp := range hostgroups {
		fqlStrings = append(fqlStrings, fmt.Sprintf("%s:'%s'", deviceHostGroups, grp))
	}

	fqlAnd := ","
	fql := strings.Join(fqlStrings, fqlAnd)

	reqBody := hosts.NewQueryDevicesByFilterParamsWithContext(ctx)
	reqBody.SetFilter(&fql)
	resp, err := client.Hosts.QueryDevicesByFilter(reqBody)
	if err != nil {
		return 0, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}}
	}

	if len(resp.GetPayload().Errors) != 0 {
		errs := convertMsaErrorsToAPIErrors(resp.GetPayload().Errors)
		return 0, errs
	}

	return len(resp.GetPayload().Resources), nil
}

func convertMsaErrorsToAPIErrors(msaAPIErrors []*model.MsaAPIError) []fdk.APIError {
	var errs []fdk.APIError
	for _, e := range msaAPIErrors {
		code := http.StatusInternalServerError
		message := ""
		if e.Code != nil {
			code = int(*e.Code)
		}

		if e.Message != nil {
			message = *e.Message
		}
		errs = append(errs, fdk.APIError{
			Code:    code,
			Message: message,
		})
	}
	return errs
}

func updateSchedule(req *models.Job) (*models.Schedule, *models.Schedule) {
	var runNow, schedule *models.Schedule
	loc, _ := time.LoadLocation("UTC")
	if req.Schedule != nil && req.Schedule.Timezone != "" {
		loc, _ = time.LoadLocation(req.Schedule.Timezone)
	}

	if req.RunNow {
		startTime := time.Now().In(loc)
		currTime := startTime.Add(2 * time.Minute)
		endTime := currTime.AddDate(0, 0, 1)

		runNow = &models.Schedule{}
		runNow.Start = fmt.Sprintf(models.DateFormat, startTime.Month(), startTime.Day(), startTime.Year())
		runNow.End = fmt.Sprintf(models.DateFormat, endTime.Month(), endTime.Day(), endTime.Year())
		runNow.Timezone = loc.String()
		runNow.TimeCycle = fmt.Sprintf(models.RunNowTimeCyclesFormat, currTime.Minute(), currTime.Hour())
		runNow.SkipConcurrent = false
	}

	if req.Schedule == nil {
		return runNow, schedule
	}

	schedule = &models.Schedule{}
	if req.Schedule.TimeCycle == "" {
		startTime, _ := time.Parse(time.RFC3339, req.Schedule.Start)
		if req.Schedule.End == "" {
			req.Schedule.End = startTime.AddDate(0, 0, 1).Format(time.RFC3339)
		}
		req.Schedule.TimeCycle = fmt.Sprintf(models.RunNowTimeCyclesFormat, startTime.Minute(), startTime.Hour())
	}
	req.Schedule.Timezone = loc.String()

	if len(req.Schedule.Start) > 0 {
		strttime, _ := time.Parse(time.RFC3339, req.Schedule.Start)
		schedule.Start = fmt.Sprintf(models.DateFormat, strttime.Month(), strttime.Day(), strttime.Year())
	}

	if len(req.Schedule.End) > 0 {
		endTime, _ := time.Parse(time.RFC3339, req.Schedule.End)
		schedule.End = fmt.Sprintf(models.DateFormat, endTime.Month(), endTime.Day(), endTime.Year())
	}

	schedule.TimeCycle = req.Schedule.TimeCycle
	schedule.Timezone = req.Schedule.Timezone
	schedule.SkipConcurrent = false

	return runNow, schedule
}

func asString(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}
