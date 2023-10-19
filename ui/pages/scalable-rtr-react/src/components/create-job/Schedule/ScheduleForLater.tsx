import { useFormContext, useWatch } from "react-hook-form";

import { ErrorInput } from "@/components/ErrorInput";

import Recurrence from "@/components/create-job/Schedule/Recurrence";

import { useResetFields } from "@/lib/hooks/use-reset-fields";
import { AllSteps } from "@/lib/validations/form-validation";
import { getCurrentDate } from "@/lib/utils/datetime";

function ScheduleForLater() {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
    control,
  } = useFormContext<AllSteps>();
  useResetFields({
    clearErrors,
    deps: [],
    fieldsToReset: ["startDate", "startTime", "endDate"],
  });
  const recurrencyStrategy = useWatch({ name: "recurrencyStrategy", control });

  const onChangeRecurrency = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      "recurrencyStrategy",
      evt.currentTarget.checked ? "recurrent" : "never",
    );
  };

  return (
    <div className="m-auto flex w-11/12 flex-col gap-5">
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="filePath">Start date</label>
          <input
            id="startDate"
            type="date"
            min={getCurrentDate()}
            className={`${
              errors.startDate?.message
                ? "border-cscritical"
                : "border-csinputbordercolor"
            } relative h-8 w-full rounded-sm border border-solid	bg-csinputcolorbg p-1 outline-none focus:border-2 focus:border-cspurple`}
            {...register("startDate")}
          />
          {typeof errors.startDate?.message === "string" ? (
            <ErrorInput errorMessage={errors.startDate?.message} />
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="filePath">Start time</label>
          <input
            id="startTime"
            type="time"
            className={`${
              errors.startTime?.message
                ? "border-cscritical"
                : "border-csinputbordercolor"
            } relative h-8 w-full rounded-sm border border-solid	bg-csinputcolorbg p-1 outline-none focus:border-2 focus:border-cspurple`}
            {...register("startTime")}
          />
          {typeof errors.startTime?.message === "string" ? (
            <ErrorInput errorMessage={errors.startTime.message} />
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          id="isRecurrent"
          type="checkbox"
          className="accent-csaqua"
          onChange={onChangeRecurrency}
          checked={recurrencyStrategy === "recurrent"}
        />
        <label htmlFor="isRecurrent" className="cursor-pointer">
          Recurrence
        </label>
      </div>
      {recurrencyStrategy === "recurrent" && <Recurrence />}
    </div>
  );
}

export default ScheduleForLater;
