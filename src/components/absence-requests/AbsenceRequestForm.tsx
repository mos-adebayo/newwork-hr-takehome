import { useState } from "react";
import type { AbsenceFormValues, AbsenceRequest } from "../../types/absence.ts";
import {
  FormProvider,
  useForm,
  Controller,
  type SubmitHandler,
} from "react-hook-form";
import { object, ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitAbsence } from "../../api.ts";
import { InputField } from "../form-field/InputField.tsx";
import { TextareaField } from "../form-field/Textarea.tsx";

type Props = {
  onCompleted: (data: AbsenceRequest) => void;
};

const schema: ObjectSchema<AbsenceFormValues> = object({
  startDate: string().required("Start date is required"),
  endDate: string().required("End date is required"),
  reason: string().required("Reason is required"),
});

const initialValues = {
  startDate: "",
  endDate: "",
  reason: "",
};

export const AbsenceRequestForm = ({ onCompleted }: Props) => {
  const [pending, setPending] = useState(false);

  const methods = useForm<AbsenceFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<AbsenceFormValues> = async (payload) => {
    setPending(true);
    const updated = await submitAbsence(payload);
    onCompleted(updated);
    methods.reset();
    setPending(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-3"
      >
        <Controller
          name="startDate"
          control={methods.control}
          render={({ field }) => (
            <InputField label="Start date" field={field} type="date" />
          )}
        />
        <Controller
          name="endDate"
          control={methods.control}
          render={({ field }) => (
            <InputField label="End date" field={field} type="date" />
          )}
        />
        <Controller
          name="reason"
          control={methods.control}
          render={({ field }) => <TextareaField label="Reason" field={field} />}
        />

        <button
          disabled={pending}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {pending ? "Submitting..." : "Submit request"}
        </button>
      </form>
    </FormProvider>
  );
};
