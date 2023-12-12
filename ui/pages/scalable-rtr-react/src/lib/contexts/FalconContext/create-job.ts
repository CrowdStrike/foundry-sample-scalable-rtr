import { SafeParseReturnType } from "zod";
import FalconApi, { LocalData } from "@crowdstrike/foundry-js";

import { FAAS } from "@/lib/constants";
import { getUserData } from "@/lib/hooks/use-user-data";
import {
  CreateJobResponse,
  createJobResponseSchema,
} from "@/lib/validations/api-validation";
import {
  AllSteps,
  BuildQuerySchema,
  ChooseHostSchema,
  JobDetailsSchema,
  ScheduleSchema,
} from "@/lib/validations/form-validation";
import { asPlainTime, asRFC3339, fromParts } from "@/lib/utils/datetime";
import { convertJSONToCron } from "@/lib/utils/cron-parser";

interface ParsedZodData {
  parsedJobDetailsData: SafeParseReturnType<AllSteps, JobDetailsSchema>;
  parsedBuildQueryData: SafeParseReturnType<AllSteps, BuildQuerySchema>;
  parsedHostSchemaData: SafeParseReturnType<AllSteps, ChooseHostSchema>;
  parsedScheduleData: SafeParseReturnType<AllSteps, ScheduleSchema>;
}

export interface CreateJobArgs {
  data: ParsedZodData;
  version?: number;
  id?: string;
}

function createJob(falcon: FalconApi<LocalData>) {
  return async ({
    data: {
      parsedJobDetailsData,
      parsedBuildQueryData,
      parsedHostSchemaData,
      parsedScheduleData,
    },
    id,
    version: jobVersion = 0,
  }: CreateJobArgs): Promise<CreateJobResponse> => {
    try {
      if (
        parsedJobDetailsData.success &&
        parsedBuildQueryData.success &&
        parsedHostSchemaData.success &&
        parsedScheduleData.success
      ) {
        const data = {
          ...parsedJobDetailsData.data,
          ...parsedBuildQueryData.data,
          ...parsedHostSchemaData.data,
          ...parsedScheduleData.data,
        };

        const { user } = getUserData({ falcon });
        const { name, version, path } = FAAS.createJob;
        const createJob = falcon.cloudFunction({ name, version });
        const { jobName, jobDescription, ...rest } = data;

        const action = {
          type: "buildQuery",
          query_type: data.queryType === "file" ? "file" : "registryKey",
          query_file_paths: data.filePaths?.map((path) => path.path) ?? [],
          registry_keys:
            data.queryType === "file" ? [] : data.registryKeyPairs ?? [],
        };

        let schedule = null;
        if (rest.scheduleStrategy === "scheduleForLater") {
          const {
            timezone,
            startDate,
            startTime,
            endDate,
            frequencyType,
            daysOfWeek,
            daysOfMonth,
          } = rest;

          // The date and time as entered by the user are considered
          // to be using that user's preferred timezone.
          const zonedStart = fromParts({
            date: startDate,
            time: startTime,
            timezone,
          });

          // We convert the start date/time from the user's timezone
          // into UTC. This is the value that we send to the API.
          const utcStart = zonedStart.withTimeZone("UTC");
          const utcStartDateTime = asRFC3339(utcStart);

          let utcEndDateTime: string | null = null;
          if (endDate) {
            const zonedEndDate = fromParts({
              date: endDate,
              time: "23:59",
              timezone,
            });

            const utcEnd = zonedEndDate.withTimeZone("UTC");
            utcEndDateTime = asRFC3339(utcEnd);
          }

          /** Map Human readable Day of the week to a number position */
          const mapHRDayToNumber = {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
          } as const;

          const time_cycle =
            rest.recurrencyStrategy === "recurrent"
              ? convertJSONToCron({
                  frequency: 1,
                  interval: frequencyType ?? "hourly",
                  startTime: asPlainTime(utcStart),
                  daysInWeek:
                    daysOfWeek?.map(
                      (dayOfWeek) => mapHRDayToNumber[dayOfWeek],
                    ) ?? [],
                  daysInMonth: daysOfMonth?.map((day) => parseInt(day)) ?? [],
                })
              : null;

          schedule = {
            time_cycle,
            start_date: utcStartDateTime,
            end_date: utcEndDateTime,
          };
        }

        const body = {
          id,
          version: jobVersion,
          user_id: user.uuid,
          user_name: user.username,
          name: jobName,
          description: jobDescription ?? "",
          notifications: rest.peopleToNotify.map((option) => option.value),
          tags: null,
          action,
          run_now: rest.shouldRunNow,
          schedule,
          target: {
            host_groups: rest.hostType === "hosts" ? null : rest.hostGroups,
            hosts: rest.hostType === "hosts" ? rest.hosts : null,
            offline_queueing: rest.isOfflineQueueing,
          },
        };

        const result = await createJob.put({
          path,
          params: {
            query: {
              draft: [
                schedule !== null || rest.shouldRunNow ? "false" : "true",
              ],
            },
          },
          body,
        });

        const safeResult = createJobResponseSchema.parse(result);

        return safeResult;
      } else {
        return {
          errors: [
            {
              field: null,
              code: 100,
              message: "One or more of the payload properties is invalid.",
            },
          ],
          status_code: 500,
        };
      }
    } catch (err: unknown) {
      return {
        errors: [
          {
            field: null,
            code: 100,
            message:
              err instanceof Error
                ? err.message
                : "An unknown error has happened. Try again.",
          },
        ],
        status_code: 500,
      };
    }
  };
}

export default createJob;
