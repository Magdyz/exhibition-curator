import { render, screen } from "@testing-library/react";
import Custom500 from "../../app/500-page";

describe("500 Page", () => {
  it("renders 500 error message", () => {
    render(<Custom500 />);

    // Assert that the 500 error message is displayed
    const errorMessage = screen.getByText(/500 - Server-side Error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
