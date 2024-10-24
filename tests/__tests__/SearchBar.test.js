import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

describe("SearchBar", () => {
  it("renders search input", () => {
    render(<SearchBar onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/Search.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onSearch when enter is pressed", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, { target: { value: "monet" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(onSearchMock).toHaveBeenCalledWith("monet");
  });
});
