package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/processor"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/searchc"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/storagec"
	"github.com/crowdstrike/gofalcon/falcon"
	"github.com/crowdstrike/gofalcon/falcon/client"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

const (
	falconDebug = true
)

func main() {
	fdk.Run(context.Background(), handler)
}

func handler(_ context.Context, logger *slog.Logger, _ fdk.SkipCfg) fdk.Handler {
	mux := fdk.NewMux()
	mux.Get("/run-history", fdk.HandlerFn(runHistoryHandler(logger)))
	mux.Put("/upsert", fdk.HandlerFn(upsertHandler(logger)))
	return mux
}

func runHistoryHandler(logger *slog.Logger) func(ctx context.Context, req fdk.Request) fdk.Response {
	return func(ctx context.Context, req fdk.Request) fdk.Response {
		p, err := newExecutionsProcessor(ctx, logger, req.AccessToken)
		if err != nil {
			msg := fmt.Sprintf("failed to initialize job history processor: %s", err)
			return fdk.ErrResp(fdk.APIError{Code: 500, Message: msg})
		}
		resp := p.Process(ctx, req)

		out := fdk.Response{Code: resp.Code, Errors: resp.Errs}
		if len(resp.Errs) == 0 {
			resp.Body = json.RawMessage(resp.Body)
		}
		return out
	}
}

func upsertHandler(logger *slog.Logger) func(ctx context.Context, req fdk.Request) fdk.Response {
	return func(ctx context.Context, req fdk.Request) fdk.Response {
		p, err := newUpsertProcessor(ctx, logger, req.AccessToken)
		if err != nil {
			msg := fmt.Sprintf("failed to initialize job upsert processor: %s", err)
			return fdk.ErrResp(fdk.APIError{Code: 500, Message: msg})
		}

		resp := p.Process(ctx, req)

		out := fdk.Response{Code: resp.Code, Errors: resp.Errs}
		if len(resp.Errs) == 0 {
			out.Body = json.RawMessage(resp.Body)
		}
		return out
	}
}

func newFalconClient(ctx context.Context, token string) (*client.CrowdStrikeAPISpecification, error) {
	opts := fdk.FalconClientOpts()
	fc, err := falcon.NewClient(&falcon.ApiConfig{
		AccessToken: token,
		Cloud:       falcon.Cloud(opts.Cloud),
		Context:     ctx,
		Debug:       falconDebug,
	})
	if err != nil {
		err0 := fmt.Errorf("failed to create falcon client with error: %s", err)
		return nil, err0
	}
	return fc, nil
}

func newSearchClient(logger *slog.Logger, fc *client.CrowdStrikeAPISpecification) searchc.SearchC {
	return searchc.NewClient(fc.SavedSearches, falconHost(), logger)
}

func newStorageClient(logger *slog.Logger, fc *client.CrowdStrikeAPISpecification, token string) storagec.StorageC {
	hc := http.DefaultClient
	hc.Timeout = 10 * time.Second
	return storagec.NewClient(fc.CustomStorage, hc, token, falconHost(), logger)
}

func newExecutionsProcessor(ctx context.Context, logger *slog.Logger, token string) (*processor.ExecutionsProcessor, error) {
	fc, err := newFalconClient(ctx, token)
	if err != nil {
		return nil, err
	}
	strg := newStorageClient(logger, fc, token)
	return processor.NewExecutionsProcessor(strg, logger), nil
}

func newUpsertProcessor(ctx context.Context, logger *slog.Logger, token string) (*processor.UpsertProcessor, error) {
	fc, err := newFalconClient(ctx, token)
	if err != nil {
		return nil, err
	}
	srchc := newSearchClient(logger, fc)
	strgc := newStorageClient(logger, fc, token)
	return processor.NewUpsertProcessor(falconHost(), srchc, strgc, logger), nil
}

func falconHost() string {
	opts := fdk.FalconClientOpts()
	switch opts.Cloud {
	case "us-1":
		return "falcon.crowdstrike.com"
	case "us-2":
		return "falcon.us-2.crowdstrike.com"
	case "eu-1":
		return "falcon.eu-1.crowdstrike.com"
	default:
		return ""
	}
}
