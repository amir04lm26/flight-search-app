import { render, screen } from "@testing-library/react";
import { Button } from "./button.component";

describe("Button component", () => {
  test("renders with default styles", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200"
    );
  });

  test("renders with the primary variant", () => {
    render(<Button variant='primary'>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-primary text-white hover:bg-primary-light focus:ring-primary"
    );
  });

  test("renders with the text variant", () => {
    render(<Button variant='text'>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "text-primary hover:underline font-medium focus:outline-none focus-visible:underline"
    );
  });

  test("renders with the sm size", () => {
    render(<Button size='sm'>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-3 py-1.5 text-sm");
  });

  test("renders with the lg size", () => {
    render(<Button size='lg'>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-5 py-3 text-lg");
  });

  test("renders with fullWidth prop", () => {
    render(<Button fullWidth>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  test("applies custom className", () => {
    render(<Button className='custom-class'>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50 cursor-not-allowed");
  });

  test("is disabled and shows spinner when loading is true", () => {
    render(<Button loading>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50 cursor-not-allowed");
    expect(button.querySelector("span")).toHaveClass("animate-spin");
  });
});
