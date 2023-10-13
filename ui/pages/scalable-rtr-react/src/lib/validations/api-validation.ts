import { z } from "zod";

export const postAggregatesDevicesGetV1Schema = z.object({
  errors: z.array(z.object({}).passthrough()),
  resources: z.array(
    z.object({
      name: z.string(),
      buckets: z.array(
        z.object({
          label: z.string(),
          count: z.number(),
        }),
      ),
    }),
  ),
});

export type PostAggregatesDevicesGetV1SchemaType = z.infer<
  typeof postAggregatesDevicesGetV1Schema
>;

export const getEntitiesGroupsV1Schema = z.object({
  errors: z.array(z.object({}).passthrough()),
  resources: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type GetEntitiesGroupsV1SchemaType = z.infer<
  typeof getEntitiesGroupsV1Schema
>;

export const getQueriesDevicesV2Schema = z.object({
  resources: z.array(z.string()),
});

export const postEntitiesDevicesV2Schema = z.object({
  errors: z.array(z.object({}).passthrough()).nullable().default([]),
  resources: z.array(
    z.object({
      device_id: z.string(),
      hostname: z.string().optional().default("unknown-hostname"), // In the data we got back, we sometimes endup with hostname that are undefined
    }),
  ),
});

export type PostEntitiesDevicesV2SchemaType = z.infer<
  typeof postEntitiesDevicesV2Schema
>;

export const jobDetailsDataSchema = z.object({
  user: z.object({
    uuid: z.string(),
    username: z.string(),
  }),
  users: z.array(z.string()),
});

export const getQueriesUsersV1Schema = z.object({
  resources: z.array(z.string()),
});

export const postEntitiesUsersGetV1Schema = z.object({
  errors: z.array(z.object({}).passthrough()).nullable().default([]),
  resources: z.array(
    z.object({
      uuid: z.string(),
      cid: z.string(),
      uid: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      created_at: z.string(),
    }),
  ),
});

/**
 * Host Schemas
 * ------------------
 */
const hostsEntitiesSchema = z.array(
  z.object({
    device_id: z.string(),
    hostname: z.string().optional().default("unknown-hostname"), // In the data we got back, we sometimes endup with hostname that are undefined
  }),
);

export type HostsEntitiesSchema = z.infer<typeof hostsEntitiesSchema>;

const hostGroupsEntitiesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export type HostGroupEntitiesSchema = z.infer<typeof hostGroupsEntitiesSchema>;

const hostGroupsAggregatesSchema = z.array(
  z.object({
    name: z.string(),
    buckets: z.array(
      z.object({
        label: z.string(),
        count: z.number(),
      }),
    ),
  }),
);

export type HostGroupAggregatesSchema = z.infer<
  typeof hostGroupsAggregatesSchema
>;

export const hostsDataSchema = z.object({
  hostsEntities: hostsEntitiesSchema,
  hostGroupsEntities: hostGroupsEntitiesSchema,
  hostGroupsAggregates: hostGroupsAggregatesSchema,
});

export type HostsDataSchema = z.infer<typeof hostsDataSchema>;

/**
 * User schemas
 * ------------------
 */
export const userSchema = z.object({
  user: z.object({
    uuid: z.string(),
    username: z.string(),
  }),
  users: z.array(z.string()),
});

export const simpleUserSchema = z.object({
  uuid: z.string(),
  username: z.string(),
});

export type UserData = z.infer<typeof userSchema>;

/**
 * Job Data
 * ------------------
 */
const queryFileSchema = z.object({
  type: z.literal("buildQuery"),
  query_type: z.literal("file"),
  query_file_paths: z.array(z.string()),
});

const queryRegistryKeySchema = z.object({
  type: z.literal("buildQuery"),
  query_type: z.literal("registryKey"),

  registry_keys: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
});

export const JobSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  version: z.number(),
  name: z.string(),
  description: z.string().optional().default(""),
  notification_emails: z.union([z.null(), z.array(z.string())]).optional(),
  notifications: z.union([z.null(), z.array(z.string())]),
  draft: z.boolean(),
  tags: z.union([z.null(), z.array(z.string())]),
  host_count: z.number(),

  action: z.union([queryFileSchema, queryRegistryKeySchema]),

  output_format: z.array(z.string()),
  total_recurrences: z.number(),

  schedule: z.union([
    z.object({
      time_cycle: z.string().nullable().optional().default(null),
      start_date: z.string(),
      end_date: z.string().nullable().optional().default(null),
    }),
    z.null(),
  ]),

  target: z.object({
    host_groups: z.union([z.null(), z.array(z.string())]),
    hosts: z.union([z.null(), z.array(z.string())]),
    offline_queueing: z.boolean(),
  }),

  run_now: z.boolean(),
  next_run: z.string().default(""),
  last_run: z.string().default(""),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().default(""),
});

export type Job = z.infer<typeof JobSchema>;

export const MetaSchema = z.object({
  total: z.number().default(0),
  limit: z.number().default(0),
  count: z.number().default(0),
  next: z.string().default(""),
  prev: z.string().default(""),
  offset: z.string().default(""),
  page: z.number().default(1),
});

export const allJobsDataSchema = z.object({
  body: z.object({
    resources: z
      .array(JobSchema)
      .nullable()
      .transform((val) => val ?? []),
    meta: MetaSchema,
  }),
});

export const jobDataSchema = z.object({
  body: z.object({
    resource: JobSchema,
  }),
});

export const RunHistorySchema = z.object({
  id: z.string(),
  job_id: z.string(),
  name: z.string(),
  duration: z.string(),
  output_1: z.string().optional(),
  output_2: z.string().optional(),
  hosts: z.array(z.string()),
  numHosts: z.number(),
  receivedFiles: z.number(),
  run_date: z.string(),
  endDate: z.string(),
  status: z.string(),
});

export type RunHistory = z.infer<typeof RunHistorySchema>;

export const runHistoryDataSchema = z.object({
  body: z.object({
    resources: z
      .array(RunHistorySchema)
      .nullable()
      .transform((val) => val ?? []),
    meta: MetaSchema,
  }),
});

export const AuditLogSchema = z.object({
  action: z.string(),
  id: z.string(),
  job_id: z.string(),
  job_name: z.string(),
  modified_at: z.string(),
  modified_by: z.string(),
  version: z.number(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

export const auditLogDataSchema = z.object({
  body: z.object({
    resources: z
      .array(AuditLogSchema)
      .nullable()
      .transform((val) => val ?? []),
    meta: MetaSchema,
  }),
});

export const historyJobsAuditLogSchema = z.object({
  job: jobDataSchema,
  history: runHistoryDataSchema,
  auditLogs: auditLogDataSchema,
});

export type HistoryJobsAuditLogSchema = z.infer<
  typeof historyJobsAuditLogSchema
>;

export const editJobSchema = z.object({
  job: jobDataSchema,
});

/**
 * Response we get back when interacting with the createJob
 * FaaS function
 */
export const createJobErrorResponseSchema = z.object({
  field: z.string().nullable().default(null),
  code: z.number(),
  message: z.string(),
});

export type CreateJobError = z.infer<typeof createJobErrorResponseSchema>;

/**
 * Many properties are present here but we just need errors handling ones.
 */
export const createJobResponseSchema = z.object({
  errors: z.array(createJobErrorResponseSchema),
  status_code: z.number(),
});

export type CreateJobResponse = z.infer<typeof createJobResponseSchema>;

export type EditJobSchema = z.infer<typeof editJobSchema>;
export type JobDataSchema = z.infer<typeof jobDataSchema>;
export type AllJobsDataSchema = z.infer<typeof allJobsDataSchema>;
export type JobDetailsDataSchema = z.infer<typeof jobDetailsDataSchema>;
export type AuditLogDataSchema = z.infer<typeof auditLogDataSchema>;
export type RunHistoryDataSchema = z.infer<typeof runHistoryDataSchema>;
export type AllSchemas =
  | JobDataSchema
  | AllJobsDataSchema
  | JobDetailsDataSchema
  | AuditLogDataSchema
  | RunHistoryDataSchema
  | HistoryJobsAuditLogSchema
  | EditJobSchema;
