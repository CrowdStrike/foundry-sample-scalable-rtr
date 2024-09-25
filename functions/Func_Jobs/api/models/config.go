package models

import (
	"context"
	"strings"

	"github.com/crowdstrike/gofalcon/falcon"
	"github.com/crowdstrike/gofalcon/falcon/client"
)

type Config struct {
	Cloud                                   falcon.CloudType
	CID                                     string
	JobsCollection                          string
	AuditLogsCollection                     string
	BuildQFileExistTemplateName             string
	BuildQRegistryKeyValueExistTemplateName string
	ExecutionNotifierWorkflow               string
	ExecutionNotifierWorkflowVersion        string
	RegistryKeyValueConditionNodeID         string
	FileExistConditionNodeID                string
}

// FalconClient returns a new instance of the GoFalcon client.
// If the client cannot be created or if there is no access token in the request,
// an error is returned.
func FalconClient(ctx context.Context, conf *Config, accessToken string) (*client.CrowdStrikeAPISpecification, error) {
	token := strings.TrimSpace(accessToken)
	if token == "" {
		return falcon.NewClient(&falcon.ApiConfig{
			AccessToken: token,
			Cloud:       conf.Cloud,
			Context:     context.Background(),
			Debug:       true,
		})
	}
	return falcon.NewClient(&falcon.ApiConfig{
		AccessToken: token,
		Cloud:       conf.Cloud,
		Context:     ctx,
	})
}
