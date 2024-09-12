package api

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api/models"
	"github.com/crowdstrike/gofalcon/falcon/client"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

func getAudit(conf *models.Config) func(ctx context.Context, request fdk.Request) fdk.Response {
	return func(ctx context.Context, request fdk.Request) fdk.Response {
		client, err := models.FalconClient(ctx, conf, request.AccessToken)
		if err != nil {
			return fdk.ErrResp(fdk.APIError{Code: http.StatusBadRequest, Message: "fail to initialize client"})
		}

		audits, errs := getAuditDetails(ctx, conf, &request, client)
		if len(errs) != 0 {
			return fdk.ErrResp(errs...)
		}

		return fdk.Response{
			Code: http.StatusOK,
			Body: fdk.JSON(audits),
		}
	}
}

// jobInfo gets all the jobs for the app.
func getAuditDetails(ctx context.Context, conf *models.Config, request *fdk.Request, client *client.CrowdStrikeAPISpecification) (*models.AuditResponse, []fdk.APIError) {
	// Default limit set to 10
	limit := 10
	var response models.AuditResponse
	var errs []fdk.APIError
	var err error

	response.Resources = make([]models.Audit, 0)
	response.Meta = &models.Paging{
		Limit: limit,
	}

	limitParam := request.Params.Query.Get(queryLimit)
	if limitParam != "" {
		limit, err = strconv.Atoi(limitParam)
		if err != nil {
			return &response, []fdk.APIError{{
				Code:    http.StatusBadRequest,
				Message: fmt.Sprintf("limit is not an integer: %v", err),
			}}

		}
	}

	nOffset := request.Params.Query.Get(queryPrevOffset)
	qOffset := request.Params.Query.Get(queryNextOffset)
	filter := request.Params.Query.Get(queryParamFilter)

	if filter != "" {
		pair := strings.Split(filter, ":")
		key := pair[0]
		if key != "job_id" {
			return &response, []fdk.APIError{{
				Code:    http.StatusBadRequest,
				Message: fmt.Sprintf("filter is incorrect: %s. it needs job_id", filter),
			}}
		}
		filter = pair[1]
	}

	if qOffset != "" && nOffset != "" {
		return &response, []fdk.APIError{{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("previous and next both offset cannot be provided."),
		}}
	}

	navDir := nextPage
	if nOffset != "" {
		navDir = prevPage
		qOffset = nOffset
	}

	offset, page := getOffsetMeta(qOffset)

	var filters []models.Filter
	if filter != "" {
		filters = append(filters, models.Filter{
			Field: "job_id",
			Op:    models.EQ,
			Value: filter,
		})
	}

	filters = append(filters, models.Filter{
		Field: "modified_at",
		Value: "0",
		Op:    models.GTE,
	})

	fqlFilter, err := models.NewFQLQuery(filters)
	if err != nil {
		return &response, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: fmt.Errorf("error constructing FQL query: %s", err.Error()).Error(),
		}}
	}
	fqlSort, err := models.NewFQLSort("modified_at", models.Desc)
	if err != nil {
		return nil, []fdk.APIError{{
			Code:    http.StatusInternalServerError,
			Message: fmt.Errorf("error constructing FQL sort: %s", err.Error()).Error(),
		}}
	}
	searchReq := models.SearchObjectsRequest{
		Collection: conf.AuditLogsCollection,
		Limit:      limit,
		Offset:     offset,
		Sort:       fqlSort,
		Filter:     fqlFilter,
	}

	searchResponse, auditListErrors := search(ctx, searchReq, client)
	if len(auditListErrors) != 0 {
		return nil, auditListErrors
	}

	// no jobs or end of jobs case when the offset == elem
	auditsList := searchResponse.ObjectKeys
	totalRemain := len(auditsList)
	response.Meta = &models.Paging{
		Limit: limit,
		Total: searchResponse.Total,
		Count: totalRemain,
	}
	if totalRemain == 0 {
		return &response, errs
	}

	errChan := make(chan error, limit)
	auditDetail := make([]*models.Audit, limit)
	var wg sync.WaitGroup

	for idx := 0; idx < totalRemain; idx++ {

		id := auditsList[idx]
		wg.Add(1)
		go func(id string, count int) {
			defer wg.Done()

			audit, errs := auditInfo(ctx, id, conf, client)
			if len(errs) != 0 {
				var jobGetErr error
				jobGetErr = fmt.Errorf("failed to get job: %s id: err: %v", id, errs)
				errChan <- jobGetErr
				return
			}
			auditDetail[count] = audit
		}(id, idx)
	}

	wg.Wait()
	close(errChan)

	for err := range errChan {
		errs = append(errs, models.NewAPIError(http.StatusInternalServerError, err.Error()))
	}

	for _, audit := range auditDetail {
		if audit == nil {
			break
		}
		response.Resources = append(response.Resources, *audit)
	}

	response.Meta.Prev, response.Meta.Next = pagination(navDir, page, offset, limit, searchResponse.Offset, searchResponse.Total)

	return &response, errs
}
