import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../app/404/page";

describe("404 Page", () => {
  it("renders 404 error message", () => {
    render(<NotFoundPage />);

    // Assert that the 404 message is displayed
    const errorMessage = screen.getByText(/404/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
