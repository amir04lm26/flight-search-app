import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input.component";

describe("Input component", () => {
  test("renders input with given placeholder and type", () => {
    render(<Input type='text' placeholder='Enter name' />);
    const input = screen.getByPlaceholderText("Enter name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  test("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <Input type='text' placeholder='Type here' onChange={handleChange} />
    );
    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("disables the input when disabled prop is true", () => {
    render(<Input type='text' placeholder='Disabled' disabled />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input).toHaveClass("cursor-not-allowed");
  });

  test("shows error message when error prop is provided", () => {
    render(
      <Input
        type='text'
        placeholder='With error'
        error='This field is required'
      />
    );
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-danger");
  });
});
