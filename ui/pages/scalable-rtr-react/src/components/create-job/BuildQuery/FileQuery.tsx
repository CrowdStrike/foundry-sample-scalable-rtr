import { useFieldArray, useFormContext } from "react-hook-form";

import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js";

import { AllSteps } from "@/lib/validations/form-validation";
import { ErrorInput } from "@/components/ErrorInput";
import ActionBar from "@/components/create-job/ActionBar";

function FileQuery() {
  const {
    control,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<AllSteps>();
  const {
    fields: filePaths,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "filePaths",
  });

  const handleAdditionalCriteria = () => {
    append({ path: "" });
  };

  const handleDeletePath = (idx: number) => () => {
    remove(idx);
  };

  const onChangeField = (idx: number) => () => {
    clearErrors(`filePaths-${idx}-path` as keyof AllSteps);
  };

  return (
    <>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-col gap-3">
          {filePaths.map((filePath, index) => (
            <div key={filePath.id} className="flex flex-col gap-1.5">
              <label className="text-csbodyandlabels" htmlFor={filePath.id}>
                File path
              </label>
              <div className="flex gap-3">
                <input
                  id={filePath.id}
                  {...register(`filePaths.${index}.path`, {
                    onChange: onChangeField(index),
                  })}
                  type="text"
                  className={`border ${
                    (errors as Record<string, { message: string }>)?.[
                      `filePaths-${index}-path`
                    ]?.message
                      ? "border-cscritical"
                      : "border-csinputbordercolor"
                  } border-solid bg-cstransparencyoverlaydarker focus:border-2 focus:border-cspurple outline-none relative w-full p-1 h-8 rounded-sm`}
                />
                {filePaths.length > 1 && (
                  <button
                    onClick={handleDeletePath(index)}
                    type="button"
                    className="bg-csbuttoncolorbackgroundsecondary color-csforegroundtext w-8 h-8 rounded-sm"
                  >
                    <SlIcon
                      className="align-middle mb-0.5"
                      name="trash"
                    ></SlIcon>
                  </button>
                )}
              </div>
              {`filePaths-${index}-path` in errors && (
                <ErrorInput
                  errorMessage={
                    (errors as Record<string, { message: string }>)[
                      `filePaths-${index}-path`
                    ].message
                  }
                />
              )}
            </div>
          ))}
        </div>
        {filePaths.length < 4 && (
          <div>
            <button
              onClick={handleAdditionalCriteria}
              type="button"
              className="text-csaqua cursor-pointer relative"
            >
              + Add additional criteria
            </button>
          </div>
        )}
      </div>
      <ActionBar />
    </>
  );
}

export default FileQuery;
