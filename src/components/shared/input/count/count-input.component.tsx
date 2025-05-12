import { Button } from "@components/shared/button/button.component";
import { FieldError } from "react-hook-form";

type CountInputProps = Readonly<{
  label?: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: FieldError;
}>;

export function CountInput({
  label,
  name,
  value,
  onChange,
  min,
  max,
  error,
}: CountInputProps) {
  const hasMin = typeof min === "number";
  const hasMax = typeof max === "number";

  const handleDecrement = () => {
    onChange(hasMin ? Math.max(min, value - 1) : value - 1);
  };

  const handleIncrement = () => {
    onChange(hasMax ? Math.min(max, value + 1) : value + 1);
  };

  return (
    <div className='flex items-center space-x-4'>
      {label && (
        <label
          htmlFor={name}
          className='text-sm font-medium text-gray-700 dark:text-gray-300 w-22'>
          {label}
        </label>
      )}
      <div className='flex items-center border border-gray-300 dark:border-gray-600 rounded w-24 justify-between px-2 py-1'>
        <Button
          type='button'
          variant='text'
          size='sm'
          onClick={handleDecrement}
          disabled={hasMin && value <= min}>
          −
        </Button>
        <span className='text-sm text-gray-900 dark:text-gray-100'>
          {value}
        </span>
        <Button
          type='button'
          variant='text'
          size='sm'
          onClick={handleIncrement}
          disabled={hasMax && value >= max}>
          +
        </Button>
      </div>
      {error && (
        <span className='text-xs text-red-500 dark:text-red-400'>
          {error.message}
        </span>
      )}
    </div>
  );
}
