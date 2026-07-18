"use client";

import { TextareaHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

type FormTextareaProps<T extends FieldValues> =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: Path<T>;
    label: string;
    required?: boolean;
  };

export default function FormTextarea<T extends FieldValues>({
  name,
  label,
  required,
  ...props
}: FormTextareaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <textarea
        id={name}
        {...register(name)}
        {...props}
        className={`
          min-h-[140px]
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          outline-none
          transition
          resize-y
          focus:ring-2
          focus:ring-red-600
          ${
            error
              ? "border-red-500"
              : "border-gray-300"
          }
        `}
      />

      {error && (
        <p className="text-sm text-red-600">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}