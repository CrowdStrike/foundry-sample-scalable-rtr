import { z } from "zod";

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

export const RTRJob = z.object({
  user_id: z.string(),
  user_name: z.string(),
  version: z.number(),

  id: z.string(),
  name: z.string(),
  description: z.string(),
  notification_emails: z.union([z.null(), z.array(z.string())]).optional(),
  notifications: z.union([z.null(), z.array(z.string())]),
  draft: z.boolean(),
  tags: z.union([z.null(), z.array(z.string())]),
  host_count: z.number(),
  run_count: z.number(),
  total_recurrences: z.number(),

  action: z.union([queryFileSchema, queryRegistryKeySchema]),

  schedule: z.union([
    z.object({
      time_cycle: z.string(),
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
  next_run: z.string(),
  last_run: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string(),
});

export const RTRCreateJobPayload = z.object({
  user_id: z.string(),
  user_name: z.string(),
  version: z.number(),

  name: z.string(),
  description: z.string(),
  notifications: z.union([z.null(), z.array(z.string())]),
  tags: z.union([z.null(), z.array(z.string())]),

  action: z.union([queryFileSchema, queryRegistryKeySchema]),

  run_now: z.boolean(),
  schedule: z.union([
    z.object({
      time_cycle: z.string(),
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
});

export type RTRCreatePayloadType = z.infer<typeof RTRCreateJobPayload>;
export type RTRJobType = z.infer<typeof RTRJob>;
