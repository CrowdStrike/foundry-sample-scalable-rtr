import { useFieldArray, useFormContext } from "react-hook-form";

import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js";

import ActionBar from "@/components/create-job/ActionBar";
import { ErrorInput } from "@/components/ErrorInput";

import { AllSteps } from "@/lib/validations/form-validation";

function RegistryKeyQuery() {
  const {
    clearErrors,
    control,
    register,
    formState: { errors },
  } = useFormContext<AllSteps>();
  const {
    fields: registryKeyPairs,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "registryKeyPairs",
  });

  const handleAdditionalCriteria = () => {
    append({ key: "", value: "" });
  };

  const handleDeleteRegistryKeyPair = (index: number) => () => {
    remove(index);
  };

  const onChangeFieldType = (type: "key" | "value", idx: number) => () => {
    clearErrors(`registryKeyPairs-${idx}-${type}` as keyof AllSteps);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {registryKeyPairs.map((keyPair, index) => (
          <div key={keyPair.id} className="flex gap-3">
            <div className="flex w-full flex-col gap-1.5">
              <label className="text-csbodyandlabels" htmlFor={keyPair.id}>
                Registry Key
              </label>
              <input
                id={keyPair.id}
                type="text"
                {...register(`registryKeyPairs.${index}.key`, {
                  onChange: onChangeFieldType("key", index),
                })}
                className={`${
                  (errors as Record<string, { message: string }>)?.[
                    `registryKeyPairs-${index}-key`
                  ]?.message
                    ? "border-cscritical"
                    : "border-csinputbordercolor"
                } bg-csinputcolorbg border border-solid focus:border-2 focus:border-cspurple outline-none relative w-full p-1 h-8 rounded-sm`}
              />
              {`registryKeyPairs-${index}-key` in errors && (
                <ErrorInput
                  errorMessage={
                    (errors as Record<string, { message: string }>)?.[
                      `registryKeyPairs-${index}-key`
                    ]?.message
                  }
                />
              )}
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <label
                className="text-csbodyandlabels"
                htmlFor="registryKeyValue"
              >
                Registry Key value
              </label>
              <input
                id={`registryKeyPairs-${index}-value`}
                type="text"
                {...register(`registryKeyPairs.${index}.value`, {
                  onChange: onChangeFieldType("value", index),
                })}
                className={`border-${
                  (errors as Record<string, { message: string }>)?.[
                    `registryKeyPairs-${index}-value`
                  ]?.message
                    ? "cscritical"
                    : "csinputbordercolor"
                } bg-csinputcolorbg border border-solid focus:border-2 focus:border-cspurple outline-none relative w-full p-1 h-8 rounded-sm`}
              />
              {`registryKeyPairs-${index}-value` in errors && (
                <ErrorInput
                  errorMessage={
                    (errors as Record<string, { message: string }>)?.[
                      `registryKeyPairs-${index}-value`
                    ]?.message
                  }
                />
              )}
            </div>
            <div
              className={`flex ${
                (errors as Record<string, { message: string }>)?.[
                  `registryKeyPairs-${index}-value`
                ]?.message
                  ? "items-center"
                  : "items-end"
              }`}
            >
              {registryKeyPairs.length > 1 && (
                <button
                  onClick={handleDeleteRegistryKeyPair(index)}
                  type="button"
                  className="bg-csbuttoncolorbackgroundsecondary color-csforegroundtext w-8 h-8 rounded-sm"
                >
                  <SlIcon className="align-middle mb-0.5" name="trash"></SlIcon>
                </button>
              )}
            </div>
          </div>
        ))}
        {registryKeyPairs.length < 4 && (
          <div>
            <button
              type="button"
              onClick={handleAdditionalCriteria}
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

export default RegistryKeyQuery;
