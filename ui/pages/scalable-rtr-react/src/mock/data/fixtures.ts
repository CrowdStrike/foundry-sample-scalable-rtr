import { AuditLogType } from "@/mock/schemas/audit-log-schemas";
import { RTRJobType } from "@/mock/schemas/rtr-schemas";
import { RunHistoryType } from "@/mock/schemas/run-history-schemas";
import { Job } from "@/mock/schemas/schemas";

export const hostGroupsEntities = [
  {
    id: "abc123",
    name: "Mitre hosts",
  },
  {
    id: "def456",
    name: "RTR hosts",
  },
  {
    id: "ghi789",
    name: "Response hosts",
  },
];

export const hostGroupsAggregates = [
  {
    name: "groups",
    buckets: [
      {
        label: "abc123",
        count: 42,
      },
      {
        label: "def456",
        count: 23,
      },
    ],
  },
];

export const hostsEntities = [
  {
    device_id: "xyz987",
    hostname: "Odysseus",
  },
  {
    device_id: "mno654",
    hostname: "Agamemnon",
  },
  {
    device_id: "pqr321",
    hostname: "Achilles",
  },
];

export const usersEntities = [
  {
    uuid: "uuid1",
    cid: "cid",
    uid: "f.bird@crowdstrike.com",
    first_name: "Falcon",
    last_name: "Bird",
    created_at: "2023-09-12T14:35:46Z",
  },
  {
    uuid: "uuid2",
    cid: "cid",
    uid: "p.bird@crowdstrike.com",
    first_name: "Peregrine",
    last_name: "Bird",
    created_at: "2023-09-12T14:35:46Z",
  },
  {
    uuid: "uuid3",
    cid: "cid",
    uid: "r.dino@crowdstrike.com",
    first_name: "Raptor",
    last_name: "Dino",
    created_at: "2023-09-12T14:35:46Z",
  },
];

export const jobRTR01: RTRJobType = {
  id: "1",
  draft: true,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "First Job RTR",
  description: "First Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostGroupsEntities.length,
  run_count: 0,
  total_recurrences: 0,
  action: {
    type: "buildQuery",
    query_type: "file",
    query_file_paths: ["azerty", "qwerty"],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: hostGroupsEntities.map((host) => host.id),
    hosts: null,
    offline_queueing: true,
  },
  output_format: ["csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export const jobRTR02: RTRJobType = {
  id: "2",
  draft: false,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "Second Job RTR",
  description: "Second Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostsEntities.length,
  run_count: 0,
  total_recurrences: 3,
  action: {
    type: "buildQuery",
    query_type: "registryKey",
    registry_keys: [{ key: "hello", value: "world" }],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: null,
    hosts: hostsEntities.map((host) => host.device_id),
    offline_queueing: true,
  },
  output_format: ["logscale", "csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export const jobRTR03: RTRJobType = {
  id: "3",
  draft: false,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "Third Job RTR",
  description: "Third Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostsEntities.length,
  run_count: 0,
  total_recurrences: 90,
  action: {
    type: "buildQuery",
    query_type: "registryKey",
    registry_keys: [{ key: "hello", value: "world" }],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: null,
    hosts: hostsEntities.map((host) => host.device_id),
    offline_queueing: true,
  },
  output_format: ["logscale", "csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export const jobRTR04: RTRJobType = {
  id: "4",
  draft: false,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "Fourth Job RTR",
  description: "Fourth Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostsEntities.length,
  run_count: 0,
  total_recurrences: 0,
  action: {
    type: "buildQuery",
    query_type: "registryKey",
    registry_keys: [{ key: "hello", value: "world" }],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: null,
    hosts: hostsEntities.map((host) => host.device_id),
    offline_queueing: true,
  },
  output_format: ["logscale", "csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export const jobRTR05: RTRJobType = {
  id: "5",
  draft: false,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "Fifth Job RTR",
  description: "Fifth Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostsEntities.length,
  run_count: 0,
  total_recurrences: 0,
  action: {
    type: "buildQuery",
    query_type: "registryKey",
    registry_keys: [{ key: "hello", value: "world" }],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: null,
    hosts: hostsEntities.map((host) => host.device_id),
    offline_queueing: true,
  },
  output_format: ["logscale", "csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export const jobRTR06: RTRJobType = {
  id: "6",
  draft: false,
  version: 0,
  user_id: "dummy",
  user_name: "dummy",
  name: "Sixth Job RTR",
  description: "Sixth Job RTR",
  notification_emails: null,
  notifications: null,
  tags: null,
  host_count: hostsEntities.length,
  run_count: 0,
  total_recurrences: 0,
  action: {
    type: "buildQuery",
    query_type: "registryKey",
    registry_keys: [{ key: "hello", value: "world" }],
  },
  schedule: {
    time_cycle: "5 4 * * *",
    start_date: "2023-08-31T04:05",
    end_date: "2023-09-02T23:59",
  },
  target: {
    host_groups: null,
    hosts: hostsEntities.map((host) => host.device_id),
    offline_queueing: true,
  },
  output_format: ["logscale", "csv"],
  run_now: false,
  next_run: "2023-08-31T08:25:17.179Z",
  last_run: "2023-08-31T08:25:17.179Z",
  created_at: "2023-08-31T08:25:17.179Z",
  updated_at: "2023-08-31T08:25:17.179Z",
  deleted_at: "2023-08-31T08:25:17.179Z",
};

export type MockDbSchema = {
  jobs: Job[];
  history: RunHistoryType[];
  logs: AuditLogType[];
};

export const historyLog01: RunHistoryType = {
  id: "1",
  job_id: "1",
  name: "First Job RR",
  run_date: "2023-08-11 09:35:29",
  duration: "00:12:21",
  status: "completed",
  hosts: ["host1"],
  output_1: "fileUrl",
  output_2: "logScaleUrl",
  numHosts: 1,
  receivedFiles: 2,
  endDate: "2023-08-09 13:42:34",
};

export const historyLog02: RunHistoryType = {
  id: "2",
  job_id: "2",
  name: "CVE-2023-123457",
  run_date: "2023-08-08 13:42:34",
  duration: "00:02:47",
  status: "completed",
  hosts: ["host1", "host2"],
  output_1: "fileUrl",
  output_2: "logScaleUrl",
  numHosts: 2,
  receivedFiles: 2,
  endDate: "2023-08-09 13:42:34",
};

export const auditLog01: AuditLogType = {
  id: "1",
  job_id: "1",
  job_name: "CVE-2023-123456",
  modified_at: "2023-08-11 09:35:29",
  version: 1,
  modified_by: "g.thegrey@crowdstrike.com",
  action: "Created JobRTR",
};

export const auditLog02: AuditLogType = {
  id: "2",
  job_id: "2",
  job_name: "CVE-2023-123457",
  modified_at: "2023-08-11 09:35:29",
  version: 1,
  modified_by: "a.elessar@crowdstrike.com",
  action: "Created JobRTR",
};
