import { render, screen } from "@testing-library/react";
import { PageLoading } from "./page-loading.component";

describe("PageLoading component", () => {
  it("renders loading spinner and message", () => {
    render(<PageLoading />);

    const spinner = screen.getByTestId("page-loading").querySelector("svg");
    expect(spinner).toBeInTheDocument();

    expect(screen.getByText(/Loading, please wait.../i)).toBeInTheDocument();
  });
});
