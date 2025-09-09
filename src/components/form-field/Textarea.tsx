import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFieldProps<
  TFieldValues extends FieldValues = never,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> = {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
};

export const TextareaField = <
  TFieldValues extends FieldValues = never,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  props: InputFieldProps<TFieldValues, TName>,
) => {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-600">{props.label}</span>
      <textarea
        {...props.field}
        className="rounded-lg border px-3 py-2 outline-none focus:ring"
      ></textarea>
    </label>
  );
};
