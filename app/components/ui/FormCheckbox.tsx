"use client";

import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

type FormCheckboxProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
    label: string;
  };

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  ...props
}: FormCheckboxProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          {...props}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-600"
        />

        <span className="text-sm text-gray-700">
          {label}
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-600">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}