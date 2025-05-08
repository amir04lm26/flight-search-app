import clsx from "clsx";
import React from "react";

type InputProps = {
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  ...rest
}: InputProps) => {
  return (
    <div className='relative'>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2",
          {
            "bg-gray-200 text-gray-500 cursor-not-allowed": disabled,
            "border-danger focus:ring-danger": !disabled && error,
            "border-gray-300 focus:ring-primary": !disabled && !error,
          }
        )}
        {...rest}
      />
      {error && <p className='absolute text-xs text-danger mt-1'>{error}</p>}
    </div>
  );
};
