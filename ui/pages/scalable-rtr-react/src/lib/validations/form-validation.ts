import { z } from "zod";

/** File Path that handle multiple FilePaths */
const filePathsSchema = z.array(
  z.object({
    path: z.string().min(1, "Enter a valid file path"),
  }),
);

export type FilePaths = z.infer<typeof filePathsSchema>;

/** Key - Pair data that handle multiple Pairs */
const registryKeyPairsSchema = z.array(
  z.object({
    key: z.string().min(1, "Enter registry key"),
    value: z.string().min(1, "Enter registry key value"),
  }),
);

export type RegistryKeyPairs = z.infer<typeof registryKeyPairsSchema>;

/**
 * Build Query Step schemas
 */
const buildFileQuerySchema = z.object({
  queryType: z.literal("file"),
  filePaths: filePathsSchema.nonempty({
    message: "Enter at least one file path",
  }),
  registryKeyPairs: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .optional(),
});

const buildRegistryQuerySchema = z.object({
  queryType: z.literal("registry"),
  filePaths: z.array(z.object({ path: z.string() })).optional(),
  registryKeyPairs: registryKeyPairsSchema.nonempty({
    message: "Enter at least one registry key pair",
  }),
});

export const buildQuerySchema = z.union([
  buildFileQuerySchema,
  buildRegistryQuerySchema,
]);

/**
 * Choose targets hosts Step schemas
 */
const individualHostsSchema = z.object({
  hostType: z.literal("hosts"),
  hostGroups: z.array(z.string()),
  hosts: z
    .array(z.string())
    .nonempty({ message: "Select one or more host(s)" }),
  isOfflineQueueing: z.boolean(),
});

const hostGroupsSchema = z.object({
  hostType: z.literal("hostGroups"),
  hosts: z.array(z.string()),
  hostGroups: z
    .array(z.string())
    .nonempty({ message: "Select one or more host group(s)" }),
  isOfflineQueueing: z.boolean(),
});

export const chooseHostSchema = z.union([
  individualHostsSchema,
  hostGroupsSchema,
]);

/**
 * Job Details Step schemas
 */
export const jobDetailsSchema = z.object({
  jobName: z.string().min(1, "Enter a job name"),
  jobDescription: z.string().optional(),
  peopleToNotify: z.array(z.object({ value: z.string(), label: z.string() })),
});

/**
 * Date Schema -> YYYY-MM-DD
 */
const dateSchema = (errorMessage: string) => {
  return z.string().regex(/^\d{4}-\d{2}-\d{2}$/, errorMessage);
};

/**
 * Time Schema -> HH:MM
 */
const timeSchema = (errorMessage: string) => {
  return z.string().regex(/^\d{2}:\d{2}$/, errorMessage);
};

/**
 * Frequency Type schema
 */
const frequencyTypeSchema = z.union([
  z.literal("hourly"),
  z.literal("daily"),
  z.literal("weekly"),
  z.literal("monthly"),
]);
export type FrequencyType = z.infer<typeof frequencyTypeSchema>;

/**
 * Day present in a month Schema
 */
const dayOfMonthSchema = z.string();
const daysOfMonthSchema = z.array(dayOfMonthSchema);

/**
 * Day of the Week schema
 * From Monday to Sunday
 */
const dayOfTheWeekSchema = z.union([
  z.literal("monday"),
  z.literal("tuesday"),
  z.literal("wednesday"),
  z.literal("thursday"),
  z.literal("friday"),
  z.literal("saturday"),
  z.literal("sunday"),
]);

const daysOfWeekSchema = z.array(dayOfTheWeekSchema);
export type DayOfTheWeek = z.infer<typeof dayOfTheWeekSchema>;

/**
 * Schedule Step schema
 */
export const noScheduleSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("never"),

  startDate: z.string().optional(),
  startTime: z.string().optional(),
  recurrencyStrategy: z.union([z.literal("recurrent"), z.literal("never")]),
  frequencyType: z.string().optional(),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.optional(),
  endsType: z.union([z.literal("onDate"), z.literal("never")]),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
});

export const scheduledWithNoRecurrenceSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("never"),

  frequencyType: z.string().optional(),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.optional(),

  endsType: z.literal("never").optional(),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
});

const scheduledRecurrenceHourAndDayTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.union([z.literal("hourly"), z.literal("daily")]),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.optional(),

  endsType: z.literal("never"),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
});

const scheduledRecurrenceWeekTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.literal("weekly"),
  daysOfWeek: daysOfWeekSchema.nonempty("Select one or more"),
  daysOfMonth: daysOfMonthSchema.optional(),

  endsType: z.literal("never"),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
});

const scheduledRecurrenceMonthTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.literal("monthly"),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.nonempty("Select one or more"),

  endsType: z.literal("never"),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
});

export const scheduledRecurrenceSchema = z.union([
  scheduledRecurrenceHourAndDayTypeSchema,
  scheduledRecurrenceWeekTypeSchema,
  scheduledRecurrenceMonthTypeSchema,
]);

const onEndRecurrenceHourAndDayTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.union([z.literal("hourly"), z.literal("daily")]),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.optional(),

  endsType: z.literal("onDate"),
  endDate: dateSchema("Select an end time"),
  timezone: z.string().default("UTC"),
});

const onEndRecurrenceWeekTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.literal("weekly"),
  daysOfWeek: daysOfWeekSchema.nonempty("Select one or more"),
  daysOfMonth: daysOfMonthSchema.optional(),

  endsType: z.literal("onDate"),
  endDate: dateSchema("Select an end time"),
  timezone: z.string().default("UTC"),
});

const onEndRecurrenceMonthTypeSchema = z.object({
  shouldRunNow: z.coerce.boolean(),
  scheduleStrategy: z.literal("scheduleForLater"),
  startDate: dateSchema("Select a start date"),
  startTime: timeSchema("Select a start time"),
  recurrencyStrategy: z.literal("recurrent"),

  frequencyType: z.literal("monthly"),
  daysOfWeek: daysOfWeekSchema.optional(),
  daysOfMonth: daysOfMonthSchema.nonempty("Select one or more"),

  endsType: z.literal("onDate"),
  endDate: dateSchema("Select an end time"),
  timezone: z.string().default("UTC"),
});

export const onEndRecurrenceSchema = z.union([
  onEndRecurrenceHourAndDayTypeSchema,
  onEndRecurrenceWeekTypeSchema,
  onEndRecurrenceMonthTypeSchema,
]);

export const scheduledSchema = z.union([
  scheduledWithNoRecurrenceSchema,
  scheduledRecurrenceSchema,
  onEndRecurrenceSchema,
]);

export const scheduleSchema = z.union([noScheduleSchema, scheduledSchema]);

/**
 * Types for Schemas step
 */
export type BuildQuerySchema = z.infer<typeof buildQuerySchema>;
export type ChooseHostSchema = z.infer<typeof chooseHostSchema>;
export type JobDetailsSchema = z.infer<typeof jobDetailsSchema>;
export type ScheduleSchema = z.infer<typeof scheduleSchema>;
export type AllSteps = BuildQuerySchema &
  ChooseHostSchema &
  JobDetailsSchema &
  ScheduleSchema;
