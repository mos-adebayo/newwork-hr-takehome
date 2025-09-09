import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Employee, EmployeeFormValues } from "../../types/employee.ts";
import { ObjectSchema, object, string, number } from "yup";
import { InputField } from "../form-field/InputField.tsx";
import { updateEmployee } from "../../api.ts";
import { RoleGate } from "../role-gate/RoleGate.tsx";
import { MANAGER } from "../../utils/constant.ts";

type Props = {
  profile: Employee | null;
  onCompleted: (data: Employee) => void;
  onCancel: () => void;
};

const schema: ObjectSchema<EmployeeFormValues> = object({
  name: string().required("Name is required"),
  email: string().required("Email is required"),
  phone: string(),
  address: string(),
  department: string(),
  title: string(),
  salary: number().min(500, "Salary should be greater than 500"),
  ssn: string(),
});

export const ProfileForm = ({ profile, onCompleted, onCancel }: Props) => {
  const [pending, setPending] = useState(false);

  const methods = useForm<EmployeeFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      department: profile?.address,
      title: profile?.title,
      salary: profile?.salary,
      ssn: profile?.ssn,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EmployeeFormValues> = async (payload) => {
    const updated = await updateEmployee(payload);
    onCompleted(updated);
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
          name="name"
          control={methods.control}
          render={({ field }) => <InputField label="Name" field={field} />}
        />
        <Controller
          name="email"
          control={methods.control}
          render={({ field }) => <InputField label="Email" field={field} />}
        />
        <Controller
          name="title"
          control={methods.control}
          render={({ field }) => <InputField label="Title" field={field} />}
        />
        <Controller
          name="department"
          control={methods.control}
          render={({ field }) => (
            <InputField label="Department" field={field} />
          )}
        />
        <Controller
          name="phone"
          control={methods.control}
          render={({ field }) => (
            <InputField label="Phone Number" field={field} />
          )}
        />

        <RoleGate allow={[MANAGER]}>
          <Controller
            name="salary"
            control={methods.control}
            render={({ field }) => <InputField label="Salary" field={field} />}
          />
        </RoleGate>

        <Controller
          name="ssn"
          control={methods.control}
          render={({ field }) => <InputField label="SSN" field={field} />}
        />

        <Controller
          name="address"
          control={methods.control}
          render={({ field }) => <InputField label="Address" field={field} />}
        />
        <div className="flex gap-3">
          <button
            disabled={pending}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="text-sm underline"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
