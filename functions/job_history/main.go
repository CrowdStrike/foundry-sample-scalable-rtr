package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	fdk "github.com/CrowdStrike/foundry-fn-go"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/processor"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/searchc"
	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/job_history/storagec"
	"github.com/crowdstrike/gofalcon/falcon"
	"github.com/crowdstrike/gofalcon/falcon/client"
	"github.com/sirupsen/logrus"
)

const (
	falconDebug = true
)

var (
	apiHost     string
	host        string
	logger      logrus.FieldLogger
	falconCloud falcon.CloudType
)

func main() {
	cloud := os.Getenv("CS_CLOUD")
	doInit(cloud)
	logger.Print("running")
	fdk.Run(context.Background(), handler)
}

func doInit(cloud string) {
	switch cloud {
	case "us-1":
		host = "falcon.crowdstrike.com"
	case "us-2":
		host = "falcon.us-2.crowdstrike.com"
	case "eu-1":
		host = "falcon.eu-1.crowdstrike.com"
	}

	l := logrus.New()
	l.SetFormatter(&logrus.JSONFormatter{})
	logger = l

	falconCloud = falcon.Cloud(cloud)
}

func handler(context.Context, *slog.Logger, fdk.SkipCfg) fdk.Handler {
	mux := fdk.NewMux()
	mux.Get("/run-history", fdk.HandlerFn(runHistoryHandler))
	mux.Put("/upsert", fdk.HandlerFn(upsertHandler))
	return mux
}

func runHistoryHandler(ctx context.Context, req fdk.Request) (fResp fdk.Response) {
	defer func() {
		if fr := ensurePanicLogged(); fr != nil {
			fResp = *fr
		}
	}()

	p, err := newExecutionsProcessor(ctx, req.AccessToken)
	if err != nil {
		msg := fmt.Sprintf("failed to initialize job history processor: %s", err)
		logger.Error(msg)
		return fdk.Response{
			Errors: []fdk.APIError{{Code: 500, Message: msg}},
		}
	}
	resp := p.Process(ctx, req)
	if len(resp.Errs) > 0 {
		fResp = fdk.Response{
			Code:   resp.Code,
			Errors: resp.Errs,
		}
	} else {
		fResp = fdk.Response{
			Body: json.RawMessage(resp.Body),
			Code: resp.Code,
		}
	}
	return
}

func upsertHandler(ctx context.Context, req fdk.Request) (fResp fdk.Response) {
	defer func() {
		if fr := ensurePanicLogged(); fr != nil {
			fResp = *fr
		}
	}()

	p, err := newUpsertProcessor(ctx, req.AccessToken)
	if err != nil {
		msg := fmt.Sprintf("failed to initialize job upsert processor: %s", err)
		logger.Error(msg)
		return fdk.Response{
			Errors: []fdk.APIError{{Code: 500, Message: msg}},
		}
	}

	resp := p.Process(ctx, req)
	if len(resp.Errs) > 0 {
		fResp = fdk.Response{
			Code:   resp.Code,
			Errors: resp.Errs,
		}
	} else {
		fResp = fdk.Response{
			Body: json.RawMessage(resp.Body),
			Code: resp.Code,
		}
	}
	return
}

func ensurePanicLogged() *fdk.Response {
	p := recover()
	if p == nil {
		return nil
	}

	msg := ""
	if s, ok := p.(fmt.Stringer); ok {
		msg = fmt.Sprintf("fatal error: %s", s)
	} else if e, ok := p.(error); ok {
		msg = fmt.Sprintf("fatal error: %s", e.Error())
	} else {
		msg = fmt.Sprintf("fatal error: %v", p)
	}
	logger.Error(msg)
	return &fdk.Response{
		Code: 500,
		Errors: []fdk.APIError{
			{Code: 500, Message: msg},
		},
	}
}

func newFalconClient(ctx context.Context, token string) (*client.CrowdStrikeAPISpecification, error) {
	config := &falcon.ApiConfig{
		AccessToken: token,
		Cloud:       falconCloud,
		Context:     ctx,
		Debug:       falconDebug,
	}
	if apiHost != "" {
		config.HostOverride = apiHost
	}
	fc, err := falcon.NewClient(config)
	if err != nil {
		err0 := fmt.Errorf("failed to create falcon client with error: %s", err)
		logger.Error(err0)
		return nil, err0
	}
	return fc, nil
}

func newSearchClient(fc *client.CrowdStrikeAPISpecification) searchc.SearchC {
	return searchc.NewClient(fc.FoundryLogscale, host, logger)
}

func newStorageClient(fc *client.CrowdStrikeAPISpecification, token string) storagec.StorageC {
	hc := http.DefaultClient
	hc.Timeout = 10 * time.Second
	return storagec.NewClient(fc.CustomStorage, hc, token, falconCloud.Host(), logger)
}

func newExecutionsProcessor(ctx context.Context, token string) (*processor.ExecutionsProcessor, error) {
	fc, err := newFalconClient(ctx, token)
	if err != nil {
		return nil, err
	}
	strg := newStorageClient(fc, token)
	return processor.NewExecutionsProcessor(strg, logger), nil
}

func newUpsertProcessor(ctx context.Context, token string) (*processor.UpsertProcessor, error) {
	fc, err := newFalconClient(ctx, token)
	if err != nil {
		return nil, err
	}
	srchc := newSearchClient(fc)
	strgc := newStorageClient(fc, token)
	return processor.NewUpsertProcessor(host, srchc, strgc, logger), nil
}
