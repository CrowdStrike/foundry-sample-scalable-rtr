import {
  MockDbSchema,
  auditLog01,
  auditLog02,
  historyLog01,
  historyLog02,
  jobRTR01,
  jobRTR02,
  jobRTR03,
  jobRTR04,
  jobRTR05,
  jobRTR06,
} from "@/mock/data/fixtures";

export const db: MockDbSchema = {
  jobs: [jobRTR01, jobRTR02, jobRTR03, jobRTR04, jobRTR05, jobRTR06],
  history: [historyLog01, historyLog02],
  logs: [auditLog01, auditLog02],
};
