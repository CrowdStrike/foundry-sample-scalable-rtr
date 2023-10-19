import { useFormContext, useWatch } from "react-hook-form";

import FileQuery from "@/components/create-job/BuildQuery/FileQuery";
import RegistryKeyQuery from "@/components/create-job/BuildQuery/RegistryKeyQuery";

import { AllSteps } from "@/lib/validations/form-validation";

function BuildQuery() {
  const { register, control } = useFormContext<AllSteps>();
  const queryType = useWatch({ name: "queryType", control });

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-medium text-csbodyandlabels">Build query</h2>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            id="file"
            {...register("queryType")}
            type="radio"
            value="file"
            checked={queryType === "file"}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 accent-csaqua"
          />
          <label className="cursor-pointer" htmlFor="file">
            File
          </label>
        </div>
        <div className="flex gap-3">
          <input
            id="registry"
            {...register("queryType")}
            type="radio"
            value="registry"
            checked={queryType === "registry"}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 accent-csaqua"
          />
          <label className="cursor-pointer" htmlFor="registry">
            Registry key
          </label>
        </div>
      </div>
      {queryType === "file" && <FileQuery />}
      {queryType === "registry" && <RegistryKeyQuery />}
    </div>
  );
}

export default BuildQuery;
