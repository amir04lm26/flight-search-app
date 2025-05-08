import React from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200";

const ringStyle = "focus:outline-none focus:ring-2 focus:ring-offset-2";

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary-light focus:ring-primary",
  secondary: "bg-secondary text-white hover:bg-orange-700 focus:ring-secondary",
  outline:
    "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300",
  icon: "text-gray-500 hover:text-gray-700 p-2",
  text: "text-primary hover:underline font-medium focus:outline-none focus-visible:underline",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        baseStyles,
        variant !== "icon" && variant !== "text" && sizeStyles[size],
        variant !== "icon" && variant !== "text" && ringStyle,
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
