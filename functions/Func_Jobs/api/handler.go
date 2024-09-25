package api

import (
	"context"
	"log/slog"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api/models"
	"github.com/crowdstrike/gofalcon/falcon"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

// NewHandler creates a fdk.Handler to handle all
func NewHandler(context.Context, *slog.Logger, fdk.SkipCfg) fdk.Handler {
	conf := models.Config{
		Cloud:                                   falcon.Cloud(fdk.FalconClientOpts().Cloud),
		JobsCollection:                          "Jobs_Info_Scalable_RTR",
		AuditLogsCollection:                     "Jobs_Audit_Logger_Scalable_RTR",
		ExecutionNotifierWorkflow:               "Notify status",
		BuildQFileExistTemplateName:             "Check if files or registry key exist",
		BuildQRegistryKeyValueExistTemplateName: "Check_If_Registry_key_Value_Exist",
		RegistryKeyValueConditionNodeID:         "platform_is_equal_to_windows_host_groups_includes_to_parameterized_hostname_includes_to_parameterize_02ba0c09",
		FileExistConditionNodeID:                "platform_is_equal_to_windows_host_groups_includes_to_parameterized_hostname_includes_to_parameterize_02ba0c09",
	}

	mux := fdk.NewMux()
	mux.Get("/job", fdk.HandlerFn(getJobHandler(&conf)))
	mux.Get("/audits", fdk.HandlerFn(getAudit(&conf)))
	mux.Get("/jobs", fdk.HandlerFn(getJobsHandler(&conf)))
	mux.Put("/upsert-job", fdk.HandleFnOf(upsertJobHandler(&conf)))
	return mux
}
