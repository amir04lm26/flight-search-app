import { render, screen, fireEvent } from "@testing-library/react";
import { format, subDays } from "date-fns";
import { DateInput } from "./date-input.component";
import {
  CALENDAR_VISUAL_DATE_FORMAT,
  DEFAULT_DATE_FORMAT,
} from "@constants/date.constant";

describe("DateInput Component", () => {
  it("renders correctly with initial props", () => {
    render(<DateInput value='2025-05-01 to 2025-05-07' onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
  });

  it("toggles calendar visibility when input is clicked", () => {
    render(<DateInput value='' onChange={jest.fn()} />);

    const input = screen.getByPlaceholderText("Select date");

    expect(screen.queryByTestId("calendar-modal")).not.toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.getByTestId("calendar-modal")).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.queryByTestId("calendar-modal")).not.toBeInTheDocument();
  });

  it("disables all dates before today", () => {
    render(<DateInput value='' onChange={jest.fn()} />);
    const today = new Date();
    const todayFormatted = format(today, CALENDAR_VISUAL_DATE_FORMAT);

    fireEvent.click(screen.getByPlaceholderText("Select date"));

    const calendar = screen.getByTestId("calendar-modal");

    const todayCell = calendar.querySelector(
      `[aria-label='${todayFormatted}']`
    );
    expect(todayCell).toBeInTheDocument();

    const disabledDay = calendar.querySelector(
      ".react-calendar__tile[disabled]"
    );
    expect(disabledDay).toBeInTheDocument();
  });

  it("selects a single date when not in range mode", () => {
    const handleChange = jest.fn();
    const today = new Date();
    const todayValue = format(today, DEFAULT_DATE_FORMAT);
    const todayLabel = format(today, CALENDAR_VISUAL_DATE_FORMAT);

    render(<DateInput value={todayValue} onChange={handleChange} />);

    fireEvent.click(screen.getByPlaceholderText("Select date"));

    const calendar = screen.getByTestId("calendar-modal");
    const targetDay = calendar.querySelector(`[aria-label="${todayLabel}"]`);

    expect(targetDay).not.toBeNull();

    if (targetDay) {
      fireEvent.click(targetDay);
    }

    expect(handleChange).toHaveBeenCalledWith(todayValue);
  });

  it("selects a date range when in range mode", () => {
    const handleChange = jest.fn();

    const today = new Date();
    const startDateFormatted = format(today, CALENDAR_VISUAL_DATE_FORMAT);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    const endDateFormatted = format(endDate, CALENDAR_VISUAL_DATE_FORMAT);

    render(
      <DateInput
        value={`${startDateFormatted} to ${endDateFormatted}`}
        onChange={handleChange}
        selectRange={true}
      />
    );

    fireEvent.click(screen.getByPlaceholderText("Select date"));

    const calendar = screen.getByTestId("calendar-modal");

    const startDay = calendar.querySelector(
      `[aria-label='${startDateFormatted}']`
    );
    const endDay = calendar.querySelector(`[aria-label='${endDateFormatted}']`);

    expect(startDay).not.toBeNull();
    expect(endDay).not.toBeNull();

    if (startDay && endDay) {
      fireEvent.click(startDay);
      fireEvent.click(endDay);
    }

    expect(handleChange).toHaveBeenCalledWith(
      `${format(today, DEFAULT_DATE_FORMAT)} to ${format(
        endDate,
        DEFAULT_DATE_FORMAT
      )}`
    );
  });

  it("does not change value when a disabled (past) date is selected", () => {
    const handleChange = jest.fn();
    const today = new Date();
    const todayValue = format(today, DEFAULT_DATE_FORMAT);

    render(
      <DateInput
        value={todayValue}
        onChange={handleChange}
        selectRange={false}
      />
    );

    fireEvent.click(screen.getByPlaceholderText("Select date"));

    const calendar = screen.getByTestId("calendar-modal");

    const yesterday = subDays(today, 1);
    const yesterdayLabel = format(yesterday, CALENDAR_VISUAL_DATE_FORMAT);

    const invalidDay = calendar.querySelector(
      `[aria-label='${yesterdayLabel}']`
    );

    expect(invalidDay).not.toBeNull();
    expect(invalidDay?.parentElement).toBeDisabled();

    if (invalidDay) {
      fireEvent.click(invalidDay);
    }

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("displays error message when error prop is passed", () => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const yesterdayFormatted = format(yesterday, DEFAULT_DATE_FORMAT);

    render(
      <DateInput
        value={yesterdayFormatted}
        onChange={jest.fn()}
        error='Invalid date range'
      />
    );

    expect(screen.getByText("Invalid date range")).toBeInTheDocument();
  });
});
