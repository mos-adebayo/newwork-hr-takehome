import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Employee, EmployeeFormValues } from "../../types/employee.ts";
import { ObjectSchema, object, string, number } from "yup";
import { InputField } from "../form-field/InputField.tsx";
import { updateEmployee } from "../../utils/api.ts";
import { RoleGate } from "../role-gate/RoleGate.tsx";
import { MANAGER } from "../../utils/constant.ts";

type Props = {
  profile: Employee | null;
  onCompleted: (data: Employee) => void;
  onCancel: () => void;
};

const schema: ObjectSchema<EmployeeFormValues> = object({
  name: string().required("Name is required"),
  email: string().email("Enter a valid email").required("Email is required"),
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

  const formErrors = methods.formState.errors;

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
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Name" field={field} />
              {formErrors.name && (
                <p className="text-xs text-red-500">
                  {formErrors.name.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="email"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Email" field={field} />
              {formErrors.email && (
                <p className="text-xs text-red-500">
                  {formErrors.email.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="title"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Title" field={field} />
              {formErrors.title && (
                <p className="text-xs text-red-500">
                  {formErrors.title.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="department"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Department" field={field} />
              {formErrors.department && (
                <p className="text-xs text-red-500">
                  {formErrors.department.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="phone"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Phone Number" field={field} />
              {formErrors.phone && (
                <p className="text-xs text-red-500">
                  {formErrors.phone.message}
                </p>
              )}
            </div>
          )}
        />

        <RoleGate allow={[MANAGER]}>
          <Controller
            name="salary"
            control={methods.control}
            render={({ field }) => (
              <div className="grid gap-1">
                <InputField label="Salary" field={field} />
                {formErrors.salary && (
                  <p className="text-xs text-red-500">
                    {formErrors.salary.message}
                  </p>
                )}
              </div>
            )}
          />
        </RoleGate>

        <Controller
          name="ssn"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="SSN" field={field} />
              {formErrors.ssn && (
                <p className="text-xs text-red-500">{formErrors.ssn.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="address"
          control={methods.control}
          render={({ field }) => (
            <div className="grid gap-1">
              <InputField label="Address" field={field} />
              {formErrors.address && (
                <p className="text-xs text-red-500">
                  {formErrors.address.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="flex gap-2">
          <button
            disabled={pending}
            className="rounded-lg border px-5 py-2 text-sm bg-black text-white hover:bg-gray-800"
          >
            {pending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
