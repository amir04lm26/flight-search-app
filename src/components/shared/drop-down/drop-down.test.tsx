import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./drop-down.component";

describe("Dropdown Component", () => {
  it("renders when isOpen is true", () => {
    render(
      <Dropdown isOpen={true} toggleOpen={() => {}}>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Dropdown isOpen={false} toggleOpen={() => {}}>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();
  });

  it("accepts additional section props and applies them", () => {
    const { container } = render(
      <Dropdown
        isOpen={true}
        toggleOpen={() => {}}
        className='custom-class'
        data-testid='dropdown'>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    const dropdownSection = container.querySelector("section");
    expect(dropdownSection).toHaveClass("custom-class");
    expect(dropdownSection).toHaveAttribute("data-testid", "dropdown");
  });

  it("calls toggleOpen when clicking outside", () => {
    const toggleOpen = jest.fn();

    render(
      <div>
        <Dropdown isOpen={true} toggleOpen={toggleOpen}>
          <div>Dropdown Content</div>
        </Dropdown>
        <div data-testid='outside'>Outside Area</div>
      </div>
    );

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });
});
