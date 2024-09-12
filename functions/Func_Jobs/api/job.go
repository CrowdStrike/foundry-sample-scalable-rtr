package api

import (
	"context"
	"fmt"
	"net/http"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api/models"
	"github.com/crowdstrike/gofalcon/falcon/client"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

const queryIDParam = "id"

func getJobHandler(conf *models.Config) func(ctx context.Context, request fdk.Request) fdk.Response {
	return func(ctx context.Context, request fdk.Request) fdk.Response {
		if request.Params.Query == nil {
			return fdk.ErrResp(fdk.APIError{Code: http.StatusBadRequest, Message: "Request does not have query params"})
		}

		queryParams := request.Params.Query[queryIDParam]
		if len(queryParams) != 1 {
			return fdk.ErrResp(fdk.APIError{Code: http.StatusBadRequest, Message: fmt.Sprintf("query params %s length: %d is incorrect", queryIDParam, len(queryIDParam))})
		}

		client, err := models.FalconClient(ctx, conf, request.AccessToken)
		if err != nil {
			return fdk.ErrResp(fdk.APIError{Code: http.StatusBadRequest, Message: "fail to initialize client"})
		}

		job, errs := getJob(ctx, conf, queryParams[0], client)
		if len(errs) != 0 {
			return fdk.ErrResp(errs...)
		}

		return fdk.Response{
			Code: http.StatusOK,
			Body: fdk.JSON(job),
		}
	}
}

// job saves a job to custom storage and may attempt to run or schedule the job if requested.
func getJob(ctx context.Context, conf *models.Config, id string, client *client.CrowdStrikeAPISpecification) (*models.JobResponse, []fdk.APIError) {
	job, errs := jobInfo(ctx, id, conf, client)
	if len(errs) != 0 {
		return nil, errs
	}
	result := models.JobResponse{
		Resource: *job,
	}
	return &result, nil
}
