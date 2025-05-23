import React, { useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import Calendar, { CalendarProps } from "react-calendar";

import { Input } from "../input.component";
import { useClickAway, useToggle } from "react-use";
import clsx from "clsx";
import { DEFAULT_DATE_FORMAT } from "@constants/date.constant";
import { Dropdown } from "@components/shared/drop-down/drop-down.component";

type DateInputProps = Readonly<{
  value?: string; // "2025-05-01" or "2025-05-01 to 2025-05-07"
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  selectRange?: boolean;
  minDate?: Date;
}>;

export function DateInput({
  value,
  onChange,
  error,
  placeholder = "Select date",
  selectRange = false,
  minDate,
}: DateInputProps) {
  const [showCalendar, toggleShowCalendar] = useToggle(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const localMinDate = minDate ?? new Date();

  useEffect(() => {
    if (!value) {
      setSelectedDate(null);
      setSelectedRange(null);
      return;
    }

    if (selectRange) {
      const parts = value.split(" to ");
      if (parts.length === 2) {
        const [startStr, endStr] = parts;
        const start = parse(startStr, DEFAULT_DATE_FORMAT, new Date());
        const end = parse(endStr, DEFAULT_DATE_FORMAT, new Date());
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          setSelectedRange([start, end]);
        }
      }
    } else {
      const date = parse(value, DEFAULT_DATE_FORMAT, new Date());
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
      }
    }
  }, [value, selectRange]);

  useClickAway(calendarRef, () => showCalendar && toggleShowCalendar(false));

  const handleDateChange: CalendarProps["onChange"] = (val) => {
    if (selectRange && Array.isArray(val) && val[0] && val[1]) {
      const [start, end] = val;
      setSelectedRange([start, end]);
      onChange(
        `${format(start, DEFAULT_DATE_FORMAT)} to ${format(
          end,
          DEFAULT_DATE_FORMAT
        )}`
      );
      toggleShowCalendar(false);
    } else if (!Array.isArray(val) && val instanceof Date) {
      setSelectedDate(val);
      onChange(format(val, DEFAULT_DATE_FORMAT));
      toggleShowCalendar(false);
    }
  };

  const displayValue = (() => {
    if (selectRange) {
      if (!selectedRange) return "";
      return `${format(selectedRange[0], DEFAULT_DATE_FORMAT)} to ${format(
        selectedRange[1],
        DEFAULT_DATE_FORMAT
      )}`;
    }

    if (!selectedDate) return "";
    return format(selectedDate, DEFAULT_DATE_FORMAT);
  })();

  return (
    <div ref={calendarRef} className='relative'>
      <Input
        readOnly
        value={displayValue}
        placeholder={placeholder}
        onClick={toggleShowCalendar}
        error={error}
      />
      <Dropdown
        data-testid='calendar-modal'
        isOpen={showCalendar}
        toggleOpen={toggleShowCalendar}>
        <Calendar
          selectRange={selectRange}
          onChange={handleDateChange}
          value={selectRange ? selectedRange : selectedDate}
          minDate={localMinDate}
          className={clsx({ range: selectRange })}
        />
      </Dropdown>
    </div>
  );
}
