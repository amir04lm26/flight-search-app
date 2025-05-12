import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { SearchFormData } from "../search.model";
import { GuestSelection, IGuestInfo } from "./guest-selection.component";

function WrapperComponent({
  currentValues,
  onChange,
  error,
}: Readonly<{
  currentValues: { child: number; adult: number; rooms: number };
  onChange: (values: IGuestInfo) => void;
  error?: string;
}>) {
  const {
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: currentValues,
  });

  return (
    <div>
      <GuestSelection
        currentValues={currentValues}
        onChange={onChange}
        error={error}
        errors={errors}
        setValue={setValue}
      />
      <div data-testid='outside' /> {/* simulate outside click */}
    </div>
  );
}

function clickIncrement(labelText: string, times = 1) {
  const incrementBtn = screen
    .getByText(new RegExp(labelText, "i"))
    .parentElement!.querySelectorAll("button")[1];
  for (let i = 0; i < times; i++) fireEvent.click(incrementBtn);
}

function clickDecrement(labelText: string, times = 1) {
  const decrementBtn = screen
    .getByText(new RegExp(labelText, "i"))
    .parentElement!.querySelectorAll("button")[0];
  for (let i = 0; i < times; i++) fireEvent.click(decrementBtn);
}

describe("GuestSelection component", () => {
  const defaultValues = { child: 1, adult: 2, rooms: 1 };

  it("renders input with correct placeholder value", () => {
    render(
      <WrapperComponent currentValues={defaultValues} onChange={jest.fn()} />
    );

    const input = screen.getByTestId("dropdown-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1 child, 2 adult, 1 room");
  });

  it("closes dropdown correctly", async () => {
    render(
      <WrapperComponent currentValues={defaultValues} onChange={jest.fn()} />
    );

    expect(screen.queryByTestId("dropdown-floating")).not.toBeInTheDocument();

    const input = screen.getByTestId("dropdown-input");
    fireEvent.click(input);

    expect(screen.getByTestId("dropdown-floating"));

    const adultCount = screen
      .getByText(/Adults/i)
      .parentElement!.querySelector("span");
    expect(adultCount).toHaveTextContent("2");

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(screen.queryByTestId("dropdown-floating")).not.toBeInTheDocument();
  });

  it("opens dropdown and changes values", () => {
    const handleChange = jest.fn();

    render(
      <WrapperComponent currentValues={defaultValues} onChange={handleChange} />
    );

    const input = screen.getByTestId("dropdown-input");
    fireEvent.click(input);

    clickIncrement("Adults", 2);
    clickIncrement("Children", 1);
    clickIncrement("Rooms", 1);

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleChange).toHaveBeenCalledWith({
      child: 2,
      adult: 4,
      rooms: 2,
    });
  });

  it("enforces minimum adult and room values", () => {
    const handleChange = jest.fn();

    render(
      <WrapperComponent currentValues={defaultValues} onChange={handleChange} />
    );

    const input = screen.getByTestId("dropdown-input");
    fireEvent.click(input);

    clickDecrement("adults", 2);
    clickDecrement("children", 2);
    clickDecrement("rooms", 2);

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleChange).toHaveBeenCalledWith({
      adult: 1,
      child: 0,
      rooms: 1,
    });
  });
});
