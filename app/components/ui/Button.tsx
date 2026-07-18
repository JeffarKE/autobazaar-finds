"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg",

    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",

    outline:
      "border border-green-700 bg-white text-green-700 hover:bg-green-50 dark:bg-transparent dark:text-green-400 dark:border-green-500 dark:hover:bg-green-950",

    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",

    md: "h-12 px-6 text-base",

    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-semibold
        transition-all
        duration-200
        ease-out
        hover:-translate-y-0.5
        active:translate-y-0
        active:scale-[0.98]
        focus:outline-none
        focus:ring-4
        focus:ring-green-200
        dark:focus:ring-green-900
        disabled:pointer-events-none
        disabled:opacity-60
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}