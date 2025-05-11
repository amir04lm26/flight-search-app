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
    register,
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
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <div data-testid='outside' /> {/* simulate outside click */}
    </div>
  );
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

    const childInput = screen.getByLabelText(/Children/i);
    fireEvent.change(childInput, { target: { value: "2" } });

    const adultInput = screen.getByLabelText(/Adults/i);
    fireEvent.change(adultInput, { target: { value: "3" } });

    const roomsInput = screen.getByLabelText(/Rooms/i);
    fireEvent.change(roomsInput, { target: { value: "2" } });

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleChange).toHaveBeenCalledWith({
      child: 2,
      adult: 3,
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

    const adultInput = screen.getByLabelText(/Adults/i);
    fireEvent.change(adultInput, { target: { value: "0" } });

    const roomsInput = screen.getByLabelText(/Rooms/i);
    fireEvent.change(roomsInput, { target: { value: "0" } });

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleChange).toHaveBeenCalledWith({
      child: 1,
      adult: 1,
      rooms: 1,
    });
  });
});
