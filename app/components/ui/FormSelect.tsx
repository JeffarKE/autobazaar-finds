"use client";

import { SelectHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> =
  SelectHTMLAttributes<HTMLSelectElement> & {
    name: Path<T>;
    label: string;
    options: Option[];
    required?: boolean;
    placeholder?: string;
  };

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  required,
  placeholder = "Select an option",
  ...props
}: FormSelectProps<T>) {
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

      <select
        id={name}
        {...register(name)}
        {...props}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:ring-2
          focus:ring-red-600
          ${
            error
              ? "border-red-500"
              : "border-gray-300"
          }
        `}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}