"use client";

const { useState } = require("react");
const { TextField } = require("@mui/material");
const { styled } = require("@mui/system");
import { StyledButton } from "./StyledComponents";

// Styling for the search bar container

const SearchContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px auto",
  maxWidth: "600px",
  width: "90%",
  flexDirection: "column",
  gap: "10px",
});

// Styling for TextField with white background
const StyledTextField = styled(TextField)({
  flex: 1,
  width: "100%",
  backgroundColor: "#ffffff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6200ea",
    },
  },
  "& input": {
    color: "#000",
  },
  "& ::placeholder": {
    color: "#999",
    opacity: 1,
  },
});

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <SearchContainer>
      <StyledTextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Artworks"
        variant="outlined"
        size="medium"
      />
      <StyledButton
        onClick={handleSearch}
        variant="contained"
        aria-label="Search Artworks"
      >
        SEARCH
      </StyledButton>
    </SearchContainer>
  );
}

module.exports = SearchBar;
