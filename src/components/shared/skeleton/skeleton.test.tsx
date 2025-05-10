import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton.component";

describe("Skeleton Component", () => {
  it("should render a skeleton with default properties", () => {
    render(<Skeleton />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("bg-gray-300");
    expect(skeleton).toHaveStyle("width: 100%");
    expect(skeleton).toHaveStyle("height: 1rem");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("should render a skeleton with a custom width and height", () => {
    render(<Skeleton width={150} height={50} />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle("width: 150px");
    expect(skeleton).toHaveStyle("height: 50px");
  });

  it("should render a circular skeleton when circle prop is true", () => {
    render(<Skeleton circle />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("should render a skeleton with a custom class", () => {
    render(<Skeleton className='custom-class' />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("custom-class");
  });
});
