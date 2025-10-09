import { AnimatePresence, m as motion } from "framer-motion";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import BuildQuery from "@/components/create-job/BuildQuery/BuildQuery";
import ChooseHost from "@/components/create-job/ChooseHost";
import JobDetails from "@/components/create-job/DetailsJob";
import Header from "@/components/create-job/Header";
import ProgressBar from "@/components/create-job/ProgressBar";
import Schedule from "@/components/create-job/Schedule/Schedule";

import { initialVariants } from "@/lib/animations/variants";
import applyZodErrorsToFormErrors from "@/lib/apply-zod-errors-to-form-errors";
import { FAAS } from "@/lib/constants";
import {
  CreateJobContext,
  getCurrentStep,
} from "@/lib/contexts/CreateJobContext";
import { FalconContext } from "@/lib/contexts/FalconContext/FalconContext";
import { useParsedLoaderData } from "@/lib/hooks/use-parsed-loader-data";
import { Loader } from "@/lib/types";
import { EditJobSchema, editJobSchema } from "@/lib/validations/api-validation";
import {
  AllSteps,
  buildQuerySchema,
  chooseHostSchema,
  jobDetailsSchema,
  scheduleSchema,
} from "@/lib/validations/form-validation";
import { parseSchedule } from "@/lib/utils/schedule";

export const loader: Loader = ({ falcon }) => {
  return async (args) => {
    const jobId = args.params.id;
    if (!jobId) {
      throw new Error("EditJob requires an id");
    }

    const { name, version, path } = FAAS.getJobDetails;
    const getJobDetails = falcon.cloudFunction({ name, version });

    const job = await getJobDetails.get({
      params: { query: { id: [jobId] } },
      path,
    });

    return {
      job,
    };
  };
};

function EditJob() {
  const data = useParsedLoaderData<EditJobSchema>(editJobSchema);
  const { state, getStepStatus, goNext } = useContext(CreateJobContext);
  const { createJob, setLoadingState, timezone } = useContext(FalconContext);
  const navigate = useNavigate();
  const {
    resource: { target, action, schedule, ...job },
  } = data.job.body;

  const scheduleInfo = parseSchedule(schedule, timezone);

  const methods = useForm<AllSteps>({
    defaultValues: {
      jobName: job.name,
      jobDescription: job.description ?? "",
      peopleToNotify:
        job.notifications?.map((option) => ({
          label: option,
          value: option,
        })) ?? [],

      queryType: action.query_type === "file" ? "file" : "registry",
      filePaths:
        action.query_type === "file"
          ? action.query_file_paths.map((path) => ({ path }))
          : [],
      registryKeyPairs:
        action.query_type === "registryKey" ? action.registry_keys : [],

      hostType: Array.isArray(target.hosts) ? "hosts" : "hostGroups",
      hosts: target.hosts ?? [],
      hostGroups: target.host_groups ?? [],
      isOfflineQueueing: target.offline_queueing,
      shouldRunNow: job.run_now,
      scheduleStrategy: scheduleInfo.strategy,
      startDate: scheduleInfo.startDate,
      startTime: scheduleInfo.startTime,
      recurrencyStrategy: scheduleInfo.recurrencyStrategy as "never", // TS is not smart enough to infer the type here
      frequencyType: scheduleInfo.frequencyType,
      daysOfWeek: scheduleInfo.daysOfWeek,
      daysOfMonth: scheduleInfo.daysOfMonth,
      endsType: scheduleInfo.endsType as "never", // TS is not smart enough to infer the type here
      endDate: scheduleInfo.endDate,
    },
  });

  const onSubmit: SubmitHandler<AllSteps> = async (formData) => {
    const parsedJobDetailsData = jobDetailsSchema.safeParse(formData);
    const parsedBuildQueryData = buildQuerySchema.safeParse(formData);
    const parsedHostSchemaData = chooseHostSchema.safeParse(formData);
    const parsedScheduleData = scheduleSchema.safeParse(formData);

    if (state.step1 === "editing") {
      if (parsedJobDetailsData.success) {
        goNext();
      } else {
        applyZodErrorsToFormErrors(parsedJobDetailsData, methods.setError);
      }
    } else if (state.step2 === "editing") {
      if (parsedBuildQueryData.success) {
        goNext();
      } else {
        applyZodErrorsToFormErrors(parsedBuildQueryData, methods.setError);
      }
    } else if (state.step3 === "editing") {
      if (parsedHostSchemaData.success) {
        goNext();
      } else {
        applyZodErrorsToFormErrors(parsedHostSchemaData, methods.setError);
      }
    } else if (state.step4 === "editing") {
      if (parsedScheduleData.success) {
        console.log("Submit the form!");
        try {
          setLoadingState(true);
          await createJob({
            data: {
              parsedBuildQueryData,
              parsedHostSchemaData,
              parsedJobDetailsData,
              parsedScheduleData,
            },
            id: data.job.body.resource.id,
            version: data.job.body.resource.version,
          });
          navigate("/all-jobs", {
            state: { jobName: formData.jobName, action: "edit" },
          });
          setLoadingState(false);
        } catch {
          setLoadingState(false);
          throw "Cannot submit form with invalid data.";
        }
      } else {
        applyZodErrorsToFormErrors(parsedScheduleData, methods.setError);
      }
    }
  };

  return (
    <div className="absolute top-16 w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-12 grid-rows-1 gap-2"
        >
          <ProgressBar />
          <div className="col-span-8 flex flex-col">
            <AnimatePresence custom={state.direction}>
              <motion.div
                key={getCurrentStep(state)}
                custom={state.direction}
                initial="enter"
                variants={initialVariants}
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  duration: 0.7,
                  bounce: 0.3,
                }}
                className="pt-8"
              >
                {getStepStatus("step1").isCurrentStep && (
                  <JobDetails isEditMode />
                )}
                {getStepStatus("step2").isCurrentStep && <BuildQuery />}
                {getStepStatus("step3").isCurrentStep && <ChooseHost />}
                {getStepStatus("step4").isCurrentStep && <Schedule />}
              </motion.div>
            </AnimatePresence>
          </div>
          {createPortal(<Header />, document.getElementById("portal")!)}
        </form>
      </FormProvider>
    </div>
  );
}

export default EditJob;
