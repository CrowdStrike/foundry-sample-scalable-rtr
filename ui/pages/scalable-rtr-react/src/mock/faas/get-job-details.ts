import { FaasGatewayApiRequestMessage } from "@crowdstrike/foundry-js";
import { getJobDetailFunctionBody } from "@/mock/schemas/schemas";
import { MockFaasHandler } from "@/mock/faas/base";
import { scalableRtrFunctions } from "@/lib/constants";
import { ConstructorArgs } from "@/mock/sdk/bridge";

export class GetJobDetailsHandler extends MockFaasHandler {
  constructor(args: ConstructorArgs) {
    super(args);

    this.functionId = scalableRtrFunctions.getJobDetails.id;
    this.functionName = scalableRtrFunctions.getJobDetails.name;
    this.requestPath = scalableRtrFunctions.getJobDetails.path;
  }
  prepareResponse(message: FaasGatewayApiRequestMessage) {
    const { jobs } = this.db;
    const parsedMessage = getJobDetailFunctionBody.parse(message);
    const query_params = parsedMessage.payload.body.payload.params.query ?? {};

    const match = jobs.find((job) => {
      return query_params.id.includes(job.id);
    });

    return {
      errors: [],
      resources: [
        {
          function_id: this.functionId,
          function_version: 1,
          payload: { body: { resource: match } },
        },
      ],
    };
  }
}
