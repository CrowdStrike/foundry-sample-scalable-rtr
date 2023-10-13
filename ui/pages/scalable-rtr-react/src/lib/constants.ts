const isStandalone = import.meta.env.MODE === "development";

const MOCK_BRIDGE_REQUESTED = import.meta.env["VITE_MOCK_BRIDGE_ENABLED"] as
  | "true"
  | "false";

export const ENABLE_MOCK_BRIDGE =
  isStandalone || MOCK_BRIDGE_REQUESTED === "true";

/**
 * Feature Flags to control the UI depending of various situations.
 */
export const UI_FLAGS = {
  enable_run_history_filtering: ENABLE_MOCK_BRIDGE,
  enable_sorting_tables: ENABLE_MOCK_BRIDGE,
};

export const DEFAULT_ITEMS_LIMIT = 10;

const scalableRtrVersion = 1;

export const scalableRtrFunctions = {
  createJob: {
    version: scalableRtrVersion,
    path: "/upsert-job",
    id: "unknown",
    name: "Func_Jobs",
  },
  getJobs: {
    version: scalableRtrVersion,
    path: "/jobs",
    id: "unknown",
    name: "Func_Jobs",
  },
  getJobDetails: {
    version: scalableRtrVersion,
    path: "/job",
    id: "unknown",
    name: "Func_Jobs",
  },
  getAuditLog: {
    version: scalableRtrVersion,
    path: "/audits",
    id: "unknown",
    name: "Func_Jobs",
  },
  getRunHistory: {
    version: scalableRtrVersion,
    path: "/run-history",
    id: "unknown",
    name: "job_history",
  },
};

// Mapping for function as a service (FaaS) functions
// To give them human-readable names.
export const FAAS = {
  createJob: scalableRtrFunctions.createJob,
  getJobs: scalableRtrFunctions.getJobs,
  getJobDetails: scalableRtrFunctions.getJobDetails,
  getAuditLog: scalableRtrFunctions.getAuditLog,
  getRunHistory: scalableRtrFunctions.getRunHistory,
};
