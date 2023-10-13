export interface ScheduleJSON {
  interval: string;
  startTime: string;
  frequency?: number;
  daysInWeek?: number[];
  daysInMonth?: number[];
}

export const INTERVALS = {
  H: "hourly",
  D: "daily",
  W: "weekly",
  M: "monthly",
};

export const DELIMITERS = {
  time: ":",
  cron: "*",
  frequency: "/",
  multiple: ",",
  cronSeparator: " ",
};

/**
 * convert cron string to JSON data
 * use cases defined in README file
 *
 * @param   {string}        cronExp
 *
 * @return  {ScheduleJSON | undefined}
 */
export function cronParser(cronExp: string): ScheduleJSON | undefined {
  if (!cronExp?.split) return;

  const [minute, hour, daysInMonth, month, daysInWeek] = cronExp.split(
    DELIMITERS.cronSeparator,
  );

  // weekly
  if (daysInWeek !== DELIMITERS.cron) {
    return {
      interval: INTERVALS.W,
      startTime: generateStartTime(hour, minute),
      frequency: 1, // only usecase supported for weekly as of now (1 week)
      daysInWeek: daysInWeek.split(DELIMITERS.multiple).map(Number),
    };
  }

  // monthly - ensure days in month doesnt include freq
  if (
    daysInMonth !== DELIMITERS.cron &&
    !daysInMonth.includes(DELIMITERS.frequency)
  ) {
    return {
      interval: INTERVALS.M,
      startTime: generateStartTime(hour, minute),
      frequency: getFrequency(month),
      daysInMonth: daysInMonth.split(DELIMITERS.multiple).map(Number),
    };
  }

  // daily - if daysInMonth includes freq then it will be daily interval
  if (
    daysInMonth !== DELIMITERS.cron &&
    daysInMonth.includes(DELIMITERS.frequency)
  ) {
    return {
      interval: INTERVALS.D,
      startTime: generateStartTime(hour, minute),
      frequency: getFrequency(daysInMonth),
    };
  }

  // hourly
  if (hour.includes(DELIMITERS.frequency)) {
    return {
      interval: INTERVALS.H,
      startTime: generateStartTime(hour.split(DELIMITERS.frequency)[0], minute),
      frequency: getFrequency(hour),
    };
  }

  // daily
  if (daysInMonth === DELIMITERS.cron) {
    return {
      interval: INTERVALS.D,
      startTime: generateStartTime(hour, minute),
      frequency: 1,
    };
  }
}

/**
 * gets the freq number from cron
 * *\/1 >> 1
 *
 * @param   {string}  val
 *
 * @return  {number}
 */
export function getFrequency(val: string): number {
  const freq = val.split(DELIMITERS.frequency)[1];

  return Number(freq);
}

/**
 * get hour and min from time
 * 01:30 >> [1, 30]
 *
 * @param   {string}  startTime
 *
 * @return  {number[]}
 */
export function getHrAndMin(startTime: string): number[] {
  const [hr, min] = startTime.split(DELIMITERS.time);

  const hour = Number(hr);
  const minute = Number(min);

  return [hour, minute];
}

/**
 * generate time from individual hr and mins
 * 1, 30 >> 01:30
 * 01, 08 >> 01:08
 * @param   {string}  hr
 * @param   {string}  min
 *
 * @return  {string}
 */
export function generateStartTime(hr: string, min: string): string {
  const hour = Number(hr) >= 10 ? hr : `0${Number(hr)}`; // prefix with 0 if <10
  const minute = Number(min) >= 10 ? min : `0${Number(min)}`; // prefix with 0 if <10

  return `${hour}${DELIMITERS.time}${minute}`;
}

/**
 * convert JSON to CRON
 * Refer to README use cases for more information
 *
 * @param   {ScheduleJSON}  scheduleObj
 *
 * @return  {String}
 */
export function convertJSONToCron(scheduleObj: ScheduleJSON) {
  const {
    interval,
    startTime,
    frequency = 1,
    daysInWeek = [],
    daysInMonth = [],
  } = scheduleObj;
  const [hour, minute] = getHrAndMin(startTime);
  const combinedDaysInWeek: string = daysInWeek?.join(",");
  const combinedDaysInMonth: string = daysInMonth?.join(",");
  let cronExp = "";

  switch (interval) {
    case INTERVALS.H:
      cronExp = `${minute} ${hour}${DELIMITERS.frequency}${frequency} ${DELIMITERS.cron} ${DELIMITERS.cron} ${DELIMITERS.cron}`;

      break;

    case INTERVALS.D:
      cronExp = `${minute} ${hour} ${DELIMITERS.cron}${DELIMITERS.frequency}${frequency} ${DELIMITERS.cron} ${DELIMITERS.cron}`;

      break;

    case INTERVALS.W:
      cronExp = `${minute} ${hour} ${DELIMITERS.cron} ${DELIMITERS.cron} ${combinedDaysInWeek}`;

      break;

    case INTERVALS.M:
      cronExp = `${minute} ${hour} ${combinedDaysInMonth} ${DELIMITERS.cron}${DELIMITERS.frequency}${frequency} ${DELIMITERS.cron}`;

      break;

    default:
      break;
  }

  return cronExp;
}
