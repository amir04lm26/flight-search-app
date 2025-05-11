import clsx from "clsx";
import { ChangeEvent } from "react";

type InputProps = {
  type?: "text" | "email" | "password" | "number";
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={clsx("mb-5", className)}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2",
          {
            "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400":
              disabled,
            "border-danger focus:ring-danger dark:border-red-500 dark:focus:ring-red-500":
              !disabled && error,
            "border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400":
              !disabled && !error,
          }
        )}
        {...rest}
      />
      {error && (
        <p className='text-xs text-danger mt-1 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
};
