import { useFormContext, useWatch } from "react-hook-form";

import SlSelect from "@shoelace-style/shoelace/dist/react/select/index.js";
import SlOption from "@shoelace-style/shoelace/dist/react/option/index.js";

import { ErrorInput } from "@/components/ErrorInput";

import {
  AllSteps,
  DayOfTheWeek,
  FrequencyType,
} from "@/lib/validations/form-validation";

const daysOfTheWeekConst = [
  {
    label: "M",
    key: "monday",
  },
  {
    label: "T",
    key: "tuesday",
  },
  {
    label: "W",
    key: "wednesday",
  },
  {
    label: "T",
    key: "thursday",
  },
  {
    label: "F",
    key: "friday",
  },
  {
    label: "S",
    key: "saturday",
  },
  {
    label: "S",
    key: "sunday",
  },
] as const;

const frequencyTypeConst = [
  { label: "Hour(s)", value: "hourly" },
  { label: "Day(s)", value: "daily" },
  { label: "Week(s)", value: "weekly" },
  { label: "Month(s)", value: "monthly" },
] as const;

function Recurrence() {
  const {
    setValue,
    register,
    clearErrors,
    formState: { errors },
    control,
  } = useFormContext<AllSteps>();
  const startDate = useWatch({ name: "startDate", control });
  const frequencyType = useWatch({ name: "frequencyType", control });
  const daysOfWeek = useWatch({
    name: "daysOfWeek",
    control,
  });
  const daysOfMonth = useWatch({ name: "daysOfMonth", control });
  const endsType = useWatch({ name: "endsType", control });

  const onSlSelectChangeFrequency = (e: Event) => {
    if (errors.daysOfWeek !== undefined || errors.daysOfMonth !== undefined) {
      clearErrors("daysOfMonth");
      clearErrors("daysOfWeek");
    }

    if (!e.target) {
      return;
    }

    const target = e.target as HTMLSelectElement;
    const value = target.value as FrequencyType;
    setValue("frequencyType", value);
  };

  const handleDaysOfWeekSelection = (dayOfTheWeek: DayOfTheWeek) => () => {
    if (errors.daysOfWeek !== undefined) {
      clearErrors("daysOfWeek");
    }

    if (Array.isArray(daysOfWeek)) {
      if (daysOfWeek.includes(dayOfTheWeek)) {
        setValue(
          "daysOfWeek",
          daysOfWeek.filter((day) => day !== dayOfTheWeek),
        );
      } else {
        setValue("daysOfWeek", [...daysOfWeek, dayOfTheWeek]);
      }
    }
  };

  const onSlSelectChangeMonthFrequency = (e: Event) => {
    if (errors.daysOfMonth !== undefined) {
      clearErrors("daysOfMonth");
    }

    const target = e.target as HTMLSelectElement;
    const daysOfTheMonthSelected = target.value as unknown as string[];

    setValue("daysOfMonth", daysOfTheMonthSelected);
  };

  return (
    <div className="m-auto flex w-11/12 flex-col gap-5">
      <div className="flex w-full items-center gap-2">
        <label htmlFor="frequencyType" className="w-3/12">
          Repeat every
        </label>
        <SlSelect
          id="frequencyType"
          onSlChange={onSlSelectChangeFrequency}
          value={frequencyType}
          className="w-full"
        >
          {frequencyTypeConst.map((type) => (
            <SlOption key={type.value} className="csOption" value={type.value}>
              {type.label}
            </SlOption>
          ))}
        </SlSelect>
      </div>
      {frequencyType === "daily" || frequencyType === "hourly" ? null : (
        <div className="flex flex-col gap-2">
          <label>On these days</label>
          <div className="flex w-full gap-2">
            {frequencyType === "weekly" ? (
              <>
                {daysOfTheWeekConst.map((day) => (
                  <button
                    key={day.key}
                    onClick={handleDaysOfWeekSelection(day.key)}
                    type="button"
                    className={`flex h-6 w-6 items-center justify-center rounded-full border p-2 ${
                      daysOfWeek?.includes(day.key)
                        ? "bg-cyan-300 text-black"
                        : "bg-variantDark"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </>
            ) : frequencyType === "monthly" ? (
              <SlSelect
                id="hosts"
                name="hosts"
                onSlChange={onSlSelectChangeMonthFrequency}
                placeholder="Select one or more"
                value={daysOfMonth}
                multiple
                className={`h-8 w-full border border-solid ${
                  errors.daysOfMonth?.message
                    ? "border-cscritical"
                    : "border-csinputbordercolor"
                } relative w-full rounded-sm outline-none`}
              >
                {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(
                  (dayOfTheMonth) => {
                    return (
                      <SlOption
                        className="csOption"
                        value={dayOfTheMonth}
                        key={dayOfTheMonth}
                      >
                        {dayOfTheMonth}
                      </SlOption>
                    );
                  },
                )}
              </SlSelect>
            ) : null}
          </div>
          {typeof errors.daysOfWeek?.message === "string" ? (
            <ErrorInput errorMessage={errors.daysOfWeek?.message} />
          ) : null}
          {typeof errors.daysOfMonth?.message === "string" ? (
            <ErrorInput errorMessage={errors.daysOfMonth?.message} />
          ) : null}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label>Ends</label>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              id="never"
              {...register("endsType")}
              type="radio"
              value="never"
              checked={endsType === "never"}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 accent-csaqua"
            />
            <label className="cursor-pointer" htmlFor="never">
              Never
            </label>
          </div>
          <div className="flex gap-3">
            <input
              id="onDate"
              {...register("endsType")}
              type="radio"
              value="onDate"
              checked={endsType === "onDate"}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 accent-csaqua"
            />
            <label className="cursor-pointer" htmlFor="onDate">
              On date
            </label>
          </div>
        </div>
      </div>
      {endsType === "onDate" && (
        <div className="m-auto flex w-11/12 flex-col gap-1.5">
          <label htmlFor="filePath">End date</label>
          <input
            id="endDate"
            type="date"
            min={startDate}
            className={`${
              errors.endDate?.message
                ? "border-cscritical"
                : "border-csinputbordercolor"
            } relative h-8 w-full rounded-sm border border-solid	bg-csinputcolorbg p-1 outline-none focus:border-2 focus:border-cspurple`}
            {...register("endDate")}
          />
          {typeof errors.endDate?.message === "string" ? (
            <ErrorInput errorMessage={errors.endDate?.message} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Recurrence;
