import { cronParser } from "@/lib/utils/cron-parser";
import { Host, HostGroup } from "@/lib/types";
import { Job } from "@/lib/validations/api-validation";
import { mapHostsIdToName } from "@/lib/mappers/mapHostNames";

interface DisplayStruct {
  value: string;
  label: string;
  name: string;
  type?: "datetime";
}

export function mapSearchCriteriaPropsToDisplay(
  job: Job,
  hosts: Host[],
  hostGroups: HostGroup[],
): DisplayStruct[] {
  const { action, target } = job;
  const mappedHosts = mapHostsIdToName(job, hosts, hostGroups);

  const registryKeys =
    action.query_type === "registryKey"
      ? action.registry_keys
          .filter((pair) => pair.key !== "" && pair.value !== "")
          .map((pair, index) => ({
            value: `${pair.key}:${pair.value}`,
            label:
              action.registry_keys.length > 1
                ? `Registry Key ${index + 1}`
                : "Registry Key",
            name: "registryKeyPairs",
          }))
      : [];

  const filePaths =
    action.query_type === "file"
      ? action.query_file_paths
          .filter((path) => path !== "")
          .map((path, index) => ({
            value: path,
            label:
              action.query_file_paths.length > 1
                ? `File path ${index + 1}`
                : "File path",
            name: "filePaths",
          }))
      : [];

  let hostsDisplay: DisplayStruct[] = [];
  if (Array.isArray(target.hosts) && target.hosts.length > 0) {
    hostsDisplay = [
      {
        value: mappedHosts.join(", "),
        label: "Host(s)",
        name: "hosts",
      },
    ];
  } else if (
    Array.isArray(target.host_groups) &&
    target.host_groups.length > 0
  ) {
    hostsDisplay = [
      {
        value: mappedHosts.join(", "),
        label: "Host group(s)",
        name: "hostGroups",
      },
    ];
  }

  const runOn = [
    {
      value: target.offline_queueing
        ? "online and queue for offline hosts"
        : "online hosts only",
      label: "Run on",
      name: "isOfflineQueueing",
    },
  ];

  return [
    ...registryKeys,
    ...filePaths,
    ...hostsDisplay,
    ...runOn,
  ];
}

export function mapSchedulePropsToDisplay(job: Job): DisplayStruct[] {
  const { schedule } = job;

  if (schedule === null) {
    return [];
  }

  const toDisplay: DisplayStruct[] = [];

  if (schedule.start_date) {
    toDisplay.push({
      label: "Start",
      value: schedule.start_date,
      name: "startDate",
      type: "datetime",
    });
  }

  if (schedule.end_date) {
    toDisplay.push({
      label: "End",
      value: schedule.end_date,
      name: "endDate",
      type: "datetime",
    });
  }

  if (!schedule.time_cycle) {
    return toDisplay;
  }

  const parsedCron = cronParser(schedule.time_cycle);
  if (parsedCron === undefined) {
    return toDisplay;
  }

  toDisplay.push({
    label: "Recurrence",
    value: parsedCron.interval,
    name: "frequencyType",
  });

  if (parsedCron.daysInWeek) {
    const mapDayInWeekToNumber = {
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
      0: "sunday",
    } as const;
    toDisplay.push({
      label: "On these days",
      value: parsedCron.daysInWeek
        .map((day) => mapDayInWeekToNumber[day as 0 | 1 | 2 | 3 | 4 | 5 | 6])
        .join(", "),
      name: "daysOfWeek",
    });
  }

  if (job.next_run) {
    toDisplay.push({
      label: "Next scheduled execution",
      value: job.next_run,
      name: "next_run_date",
      type: "datetime",
    });
  }

  return toDisplay;
}

export function mapPeoplePropsToDisplay(job: Job): DisplayStruct[] {
  const people: DisplayStruct[] = [];

  people.push({ label: "Creator", value: job.user_name, name: "creator" });

  const watchers =
    job.notifications?.map((watcher) => ({
      label: "Watcher",
      value: watcher,
      name: "creator",
    })) ?? [];
  people.push(...watchers);

  return people;
}
