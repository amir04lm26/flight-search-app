import { ChangeEvent, useState } from "react";
import { Input } from "@components/shared/input/input.component";
import { UseFormRegister, UseFormSetValue, FieldError } from "react-hook-form";
import { Dropdown } from "@components/shared/drop-down/drop-down.component";
import { useToggle } from "react-use";
import { SearchFormData } from "../search.model";

export interface IGuestInfo {
  child: number;
  adult: number;
  rooms: number;
}

type GuestSelectionProps = Readonly<{
  currentValues: IGuestInfo;
  onChange: (values: IGuestInfo) => void;
  error: string | undefined;
  register: UseFormRegister<SearchFormData>;
  errors: { child?: FieldError; adult?: FieldError; rooms?: FieldError };
  setValue: UseFormSetValue<SearchFormData>;
}>;

export function GuestSelection({
  currentValues,
  onChange,
  error,
  register,
  errors,
  setValue,
}: GuestSelectionProps) {
  const [isDropdownOpen, toggleDropdown] = useToggle(false);
  const [child, setChild] = useState(currentValues.child);
  const [adult, setAdult] = useState(currentValues.adult);
  const [rooms, setRooms] = useState(currentValues.rooms);

  const handleSave = () => {
    onChange({ child, adult, rooms });
    toggleDropdown(false);
  };

  const handleChangeChild = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Number(evt.target.value));
    setChild(newValue);
    setValue("child", newValue);
  };

  const handleChangeAdult = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Number(evt.target.value));
    setAdult(newValue);
    setValue("adult", newValue);
  };

  const handleChangeRooms = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Number(evt.target.value));
    setRooms(newValue);
    setValue("rooms", newValue);
  };

  return (
    <div className='relative'>
      <Input
        data-testid='dropdown-input'
        type='text'
        placeholder='Children, Adults, Rooms'
        value={`${currentValues.child} child, ${currentValues.adult} adult, ${
          currentValues.rooms
        } room${currentValues.rooms > 1 ? "s" : ""}`}
        readOnly
        onClick={toggleDropdown}
        error={error}
      />

      <Dropdown
        data-testid='dropdown-floating'
        isOpen={isDropdownOpen}
        toggleOpen={handleSave}>
        <div>
          <div className='p-4 space-y-4'>
            <div className='flex items-center space-x-4'>
              <label
                htmlFor='child'
                className='text-sm font-medium text-gray-700 dark:text-gray-300 w-24'>
                Children
              </label>
              <Input
                id='child'
                type='number'
                placeholder='Children'
                className='!mb-0'
                value={child?.toString()}
                error={errors.child?.message}
                {...register("child", {
                  required: "Children count is required",
                  min: { value: 0, message: "At least 0 children" },
                })}
                onChange={handleChangeChild}
              />
            </div>
            <div className='flex items-center space-x-4'>
              <label
                htmlFor='adult'
                className='text-sm font-medium text-gray-700 dark:text-gray-300 w-24'>
                Adults
              </label>
              <Input
                id='adult'
                type='number'
                placeholder='Adults'
                className='!mb-0'
                value={adult?.toString()}
                error={errors.adult?.message}
                {...register("adult", {
                  required: "Adults count is required",
                  min: { value: 1, message: "At least 1 adult" },
                })}
                onChange={handleChangeAdult}
              />
            </div>
            <div className='flex items-center space-x-4'>
              <label
                htmlFor='rooms'
                className='text-sm font-medium text-gray-700 dark:text-gray-300 w-24'>
                Rooms
              </label>
              <Input
                id='rooms'
                type='number'
                placeholder='Rooms'
                className='!mb-0'
                value={rooms?.toString()}
                error={errors.rooms?.message}
                {...register("rooms", {
                  required: "Room count is required",
                  min: { value: 1, message: "At least 1 room" },
                })}
                onChange={handleChangeRooms}
              />
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
