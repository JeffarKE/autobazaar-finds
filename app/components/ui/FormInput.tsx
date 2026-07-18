"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import {
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
    label: string;
    required?: boolean;
    helperText?: string;
    icon?: ReactNode;
  };

export default function FormInput<T extends FieldValues>({
  name,
  label,
  required,
  helperText,
  icon,
  className = "",
  ...props
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-2">

      <label
        htmlFor={name}
        className={`block text-sm font-semibold transition-colors ${
          error
            ? "text-red-600"
            : "text-gray-800 dark:text-gray-100"
        }`}
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">

        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          {...register(name)}
          {...props}
          className={`
            w-full
            rounded-xl
            border
            bg-white
            dark:bg-gray-900
            dark:text-white
            border-gray-300
            dark:border-gray-700
            py-3
            transition-all
            duration-200
            outline-none
            focus:border-green-600
            focus:ring-4
            focus:ring-green-100
            dark:focus:ring-green-900
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${
              icon ? "pl-12 pr-4" : "px-4"
            }
            ${
              error
                ? "border-red-500 focus:ring-red-100 dark:focus:ring-red-900"
                : ""
            }
            ${className}
          `}
        />
      </div>

      {error ? (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{String(error.message)}</span>
        </div>
      ) : helperText ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}