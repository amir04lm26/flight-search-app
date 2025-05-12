import { render, screen, fireEvent } from "@testing-library/react";
import { CountInput } from "./count-input.component";
import React from "react";

describe("CountInput", () => {
  const setup = (props = {}) => {
    const onChange = jest.fn();
    const defaultProps = {
      name: "quantity",
      value: 2,
      onChange,
      min: 1,
      max: 3,
      ...props,
    };
    render(<CountInput {...defaultProps} />);
    return { onChange };
  };

  it("renders with a label", () => {
    setup({ label: "Adults" });
    expect(screen.getByText("Adults")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders without a label", () => {
    setup();
    expect(screen.queryByLabelText(/.+/)).not.toBeInTheDocument();
  });

  it("calls onChange with incremented value", () => {
    const { onChange } = setup();
    const plusButton = screen.getByRole("button", { name: "+" });

    fireEvent.click(plusButton);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with decremented value", () => {
    const { onChange } = setup();
    const minusButton = screen.getByRole("button", { name: "−" });

    fireEvent.click(minusButton);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("does not decrement below min", () => {
    const { onChange } = setup({ value: 1 });
    const minusButton = screen.getByRole("button", { name: "−" });

    fireEvent.click(minusButton);
    expect(onChange).not.toHaveBeenCalledWith(1); // button is disabled
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not increment above max", () => {
    const { onChange } = setup({ value: 3 });
    const plusButton = screen.getByRole("button", { name: "+" });

    fireEvent.click(plusButton);
    expect(onChange).not.toHaveBeenCalledWith(3);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays error message if provided", () => {
    setup({ error: { message: "Required" } });
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
