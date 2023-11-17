package processor

import (
	"errors"
	"strings"
	"time"

	fdk "github.com/CrowdStrike/foundry-fn-go"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/pkg"
)

const (
	csvCollection          = "Job_Executions_CSV_Scalable_RTR"
	jobCollection          = "Jobs_Info_Scalable_RTR"
	jobExecutionCollection = "Job_Executions_Scalable_RTR"
)

const (
	nextPage = 1
	prevPage = -1
)

// Response is the response from the call.
type Response struct {
	// Body is the payload of the response.
	Body []byte
	// Code is the HTTP status code to be returned.
	Code int
	// Errs are any errors to return.
	Errs []fdk.APIError
}

type paging struct {
	Count int    `json:"count"`
	Limit int    `json:"limit"`
	Next  string `json:"next"`
	Prev  string `json:"prev"`
	Total int    `json:"total"`
}

type jobExecutionResponse struct {
	Errs      []fdk.APIError     `json:"errors,omitempty"`
	Meta      paging             `json:"meta"`
	Resources []pkg.JobExecution `json:"resources"`
}

type generateOutputResponseResource struct {
	Name   string `json:"name"`
	Status string `json:"status"`
}

type generateOutputResponse struct {
	Errs      []fdk.APIError                   `json:"errors,omitempty"`
	Resources []generateOutputResponseResource `json:"resources"`
}

type filterJobExecsRequest struct {
	JobID           string
	JobName         string
	Limit           int
	EarliestRunDate string
	Offset          offsetMeta
}

type logscaleRecord struct {
	Success  string
	HostName string
}

type offsetMeta struct {
	Direction int
	Offset    int
	Page      int
}

type workflowMeta struct {
	ExecutionID        string `json:"execution_id,omitempty"`
	ExecutionTimestamp string `json:"execution_timestamp,omitempty"`
	DefinitionName     string `json:"definition_name,omitempty"`
	Status             string `json:"status,omitempty"`
}

func (w workflowMeta) jobName() (string, error) {
	dn := w.DefinitionName
	idx := strings.Index(dn, "- ")
	// len(dn)-3 means that the string has at least one character following "- "
	if idx <= 0 || len(dn)-3 <= idx {
		return "", errors.New("no job name present: missing dash")
	}
	// +2 advances index to first character following "- "
	dn = dn[idx+2:]

	suffix := ""
	switch {
	case strings.HasSuffix(dn, " RunNow"):
		suffix = " RunNow"
	case strings.HasSuffix(dn, " Schedule"):
		suffix = " Schedule"
	}
	if suffix == "" {
		return dn, nil
	}

	// drop the suffix
	dn = dn[:len(dn)-len(suffix)]
	if dn == "" {
		return "", errors.New("no job name present")
	}
	return dn, nil
}

type job struct {
	LastRun          time.Time    `json:"last_run"`
	NextRun          time.Time    `json:"next_run"`
	OutputFormats    []string     `json:"output_format,omitempty"`
	RunCount         uint64       `json:"run_count"`
	RunNow           bool         `json:"run_now"`
	Schedule         *jobSchedule `json:"schedule,omitempty"`
	TotalRecurrences uint64       `json:"total_recurrences"`
}

type jobSchedule struct {
	End            string `json:"end_date,omitempty"`
	SkipConcurrent bool   `json:"skip_concurrent,omitempty"`
	Start          string `json:"start_date,omitempty"`
	TimeCycle      string `json:"time_cycle,omitempty"`
}
