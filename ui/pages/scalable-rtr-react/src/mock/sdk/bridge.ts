import {
  Bridge,
  RemoteResponseApiRequestMessage,
  RequestMessage,
} from "@crowdstrike/foundry-js";
import { MockDbSchema } from "@/mock/data/fixtures";
import { DevicesApiMock } from "@/mock/api/devices";
import { UsersApiMock } from "@/mock/api/users";
import { MockFaasHandler } from "@/mock/faas/base";
import { CreateJobHandler } from "@/mock/faas/create-job";
import { GetAuditLogHandler } from "@/mock/faas/get-audit-logs";
import { GetJobDetailsHandler } from "@/mock/faas/get-job-details";
import { GetJobsHandler } from "@/mock/faas/get-jobs";
import { GetRunHistoryHandler } from "@/mock/faas/get-run-history";
import { isConnectMessage } from "@/mock/sdk/predicates";
import { db as emptyScenario } from "@/mock/data/empty";
import { db as populatedScenario } from "@/mock/data/populated";

// `vite` runs a server for rapid development
// `vite build` compiles the app and writes it to the dist/ directory
const isStandalone = import.meta.env.MODE === "development";

export { emptyScenario, populatedScenario };

export type ConstructorArgs = {
  db: MockDbSchema;
  appName: "rapid-response" | "scalable-rtr";
};

export class MockBridge extends Bridge {
  createJob: MockFaasHandler;
  getJobs: MockFaasHandler;
  getJobDetails: MockFaasHandler;
  getAuditLog: MockFaasHandler;
  getRunHistory: MockFaasHandler;
  devices: DevicesApiMock;
  userManagement: UsersApiMock;
  db: MockDbSchema;

  constructor(
    { db, appName }: ConstructorArgs = {
      db: emptyScenario,
      appName: "rapid-response",
    },
  ) {
    super();
    this.db = db;
    this.createJob = new CreateJobHandler({ db: this.db, appName });
    this.getJobs = new GetJobsHandler({ db: this.db, appName });
    this.getJobDetails = new GetJobDetailsHandler({ db: this.db, appName });
    this.getAuditLog = new GetAuditLogHandler({ db: this.db, appName });
    this.getRunHistory = new GetRunHistoryHandler({ db: this.db, appName });
    this.devices = new DevicesApiMock();
    this.userManagement = new UsersApiMock();
  }

  async postMessage<
    REQ extends RequestMessage | RemoteResponseApiRequestMessage,
    ResolvedValue = void,
  >(message: REQ): Promise<ResolvedValue> {
    let value: unknown;

    if (isStandalone && isConnectMessage(message)) {
      const { origin } = window.location;
      value = {
        origin,
        data: {
          theme: "theme-dark",
          locale: "en-us",
          dateFormat: null,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };
    } else if (this.devices.isMatch(message)) {
      value = await this.devices.responder(message);
    } else if (this.userManagement.isMatch(message)) {
      value = await this.userManagement.responder(message);
    } else if (this.getJobs.isMatch(message)) {
      value = await this.getJobs.responder(message);
    } else if (this.createJob.isMatch(message)) {
      value = await this.createJob.responder(message);
    } else if (this.getJobDetails.isMatch(message)) {
      value = await this.getJobDetails.responder(message);
    } else if (this.getAuditLog.isMatch(message)) {
      value = await this.getAuditLog.responder(message);
    } else if (this.getRunHistory.isMatch(message)) {
      value = await this.getRunHistory.responder(message);
    } else if (isStandalone) {
      console.log("No handler for message:", { message });
      value = await Promise.resolve({});
    } else {
      value = await super.postMessage(message);
    }
    if (!value) {
      throw new Error("Woops!");
    }
    console.log("MockBridge#postMessage: ", { message, value });
    return value as ResolvedValue;
  }
}
