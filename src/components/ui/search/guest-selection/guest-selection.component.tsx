import { useState } from "react";
import { Input } from "@components/shared/input/input.component";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { Dropdown } from "@components/shared/drop-down/drop-down.component";
import { useToggle } from "react-use";
import { SearchFormData } from "../search.model";
import { Button } from "@components/shared/button/button.component";
import { CountInput } from "@components/shared/input/count/count-input.component";

export interface IGuestInfo {
  child: number;
  adults: number;
  rooms: number;
}

type GuestSelectionProps = Readonly<{
  currentValues: IGuestInfo;
  onChange: (values: IGuestInfo) => void;
  error: string | undefined;
  errors: { child?: FieldError; adults?: FieldError; rooms?: FieldError };
  setValue: UseFormSetValue<SearchFormData>;
}>;

export function GuestSelection({
  currentValues,
  onChange,
  error,
  errors,
  setValue,
}: GuestSelectionProps) {
  const [isDropdownOpen, toggleDropdown] = useToggle(false);
  const [child, setChild] = useState(currentValues.child);
  const [adults, setAdult] = useState(currentValues.adults);
  const [rooms, setRooms] = useState(currentValues.rooms);

  const handleSave = () => {
    onChange({ child, adults, rooms });
    toggleDropdown(false);
  };

  const handleChangeChild = (newValue: number) => {
    setChild(newValue);
    setValue("child", newValue);
  };

  const handleChangeAdult = (newValue: number) => {
    setAdult(newValue);
    setValue("adults", newValue);
  };

  const handleChangeRooms = (newValue: number) => {
    setRooms(newValue);
    setValue("rooms", newValue);
  };

  return (
    <div className='relative'>
      <Input
        data-testid='dropdown-input'
        type='text'
        placeholder='Children, Adults, Rooms'
        value={`${currentValues.child} child, ${currentValues.adults} adults, ${
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
            <CountInput
              label='Adults'
              name='adults'
              value={adults}
              min={1}
              onChange={handleChangeAdult}
              error={errors.adults}
            />

            <CountInput
              label='Children'
              name='child'
              value={child}
              min={0}
              onChange={handleChangeChild}
              error={errors.child}
            />

            <CountInput
              label='Rooms'
              name='rooms'
              value={rooms}
              min={1}
              onChange={handleChangeRooms}
              error={errors.rooms}
            />

            <Button
              data-testid='search-apply-btn'
              fullWidth
              onClick={handleSave}>
              Apply
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
