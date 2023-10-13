import { useFormContext } from "react-hook-form";

import { ErrorInput } from "@/components/ErrorInput";
import ActionBar from "@/components/create-job/ActionBar";

import { AllSteps } from "@/lib/validations/form-validation";

function ChooseFormat() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AllSteps>();

  return (
    <div className=" flex flex-col gap-5">
      <h2 className="text-xl font-medium text-csbodyandlabels">
        Choose output
      </h2>
      <div className="flex flex-col gap-3">
        <span className="text-csbodyandlabels">Output format</span>
        <div>
          <input
            id="outputFormatCsv"
            {...register("outputFormat")}
            value="csv"
            type="checkbox"
            className="accent-csaqua"
          />
          <label htmlFor="outputFormatCsv" className="ml-3 cursor-pointer">
            .csv
          </label>
        </div>
        <div>
          <input
            id="outputFormatLogScale"
            {...register("outputFormat")}
            value="logscale"
            type="checkbox"
            className="accent-csaqua"
          />
          <label htmlFor="outputFormatLogScale" className="ml-3 cursor-pointer">
            Logscale
          </label>
        </div>
        {typeof errors.outputFormat?.message === "string" ? (
          <ErrorInput errorMessage={errors.outputFormat.message} />
        ) : null}
      </div>
      <ActionBar />
    </div>
  );
}

export default ChooseFormat;
