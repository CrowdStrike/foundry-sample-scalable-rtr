import {
  asPlainDate,
  asPlainDateTime,
  asPlainTime,
  getLocalDateAndTime,
  plainDateFromParts,
} from "@/lib/utils/datetime";
import { cronParser } from "@/lib/utils/cron-parser";

type RawSchedule = {
  time_cycle: string | null;
  start_date: string;
  end_date: string | null;
};

type ScheduleInfo = {
  strategy: "scheduleForLater" | "never";
  recurrencyStrategy: "recurrent" | "never";
  repeatEvery?: string;
  frequencyType?: string;
  daysOfMonth?: string[];
  daysOfWeek?: (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  )[];
  startDate?: string;
  startTime?: string;
  endsType?: "onDate" | "never";
  endDate?: string;
};

export function parseSchedule(
  schedule: RawSchedule | null,
  timezone: string,
): ScheduleInfo {
  let strategy: ScheduleInfo["strategy"] = "never";
  let recurrencyStrategy: ScheduleInfo["recurrencyStrategy"] = "never";
  if (!schedule) {
    return {
      strategy,
      recurrencyStrategy,
      repeatEvery: "1",
      frequencyType: "hourly",
      endsType: "never",
    };
  }

  strategy = "scheduleForLater";

  const startDateTimeLocal = getLocalDateAndTime({
    timestamp: schedule.start_date,
    timezone,
  });

  const startDate = startDateTimeLocal.date;
  let startTime = startDateTimeLocal.time;
  let repeatEvery = "";
  let frequencyType = "hourly";
  let daysOfWeek: ScheduleInfo["daysOfWeek"] = [];
  let daysOfMonth: ScheduleInfo["daysOfMonth"] = [];

  if (schedule.time_cycle) {
    const result = cronParser(schedule.time_cycle);
    if (result) {
      const {
        frequency,
        daysInMonth,
        daysInWeek,
        interval,
        startTime: cronStartTime,
      } = result;
      const cronStartDateTimeUTC = plainDateFromParts({
        date: asPlainDate(schedule.start_date),
        time: asPlainTime(cronStartTime),
      });
      const cronStartDateTimeLocal = getLocalDateAndTime({
        timestamp: asPlainDateTime(cronStartDateTimeUTC),
        timezone,
      });
      startTime = cronStartDateTimeLocal.time;

      recurrencyStrategy =
        frequency || daysInMonth || daysInWeek ? "recurrent" : "never";
      repeatEvery = String(frequency) ?? "";
      frequencyType = interval ?? "hourly";
      daysOfMonth = (daysInMonth || []).map((day) => String(day));
      daysOfWeek = (daysInWeek || []).map((day) => {
        const dict = {
          1: "monday",
          2: "tuesday",
          3: "wednesday",
          4: "thursday",
          5: "friday",
          6: "saturday",
          0: "sunday",
        } as const;
        return dict[day as 0 | 1 | 2 | 3 | 4 | 5 | 6];
      });
    }
  }

  const endDateTimeLocal = getLocalDateAndTime({
    timestamp: schedule.end_date,
    timezone,
  });
  const endDate = endDateTimeLocal.date;
  const endsType = endDate ? "onDate" : "never";

  return {
    strategy,
    recurrencyStrategy,
    frequencyType,
    repeatEvery,
    daysOfWeek,
    daysOfMonth,
    startDate,
    startTime,
    endDate,
    endsType,
  };
}
