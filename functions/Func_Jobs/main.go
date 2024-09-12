package main

import (
	"context"

	"github.com/Crowdstrike/foundry-sample-scalable-rtr/functions/Func_Jobs/api"

	fdk "github.com/CrowdStrike/foundry-fn-go"
)

func main() {
	fdk.Run(context.Background(), api.NewHandler)
}
