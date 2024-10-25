"use client";

const { useState } = require("react");
const { TextField, Button } = require("@mui/material");
const { styled } = require("@mui/system");

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

// Styled Button
const StyledButton = styled(Button)({
  borderRadius: "24px",
  textTransform: "none",
  padding: "8px 16px",
  width: "100%",
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
      <StyledButton onClick={handleSearch} variant="contained" color="primary">
        Search
      </StyledButton>
    </SearchContainer>
  );
}

module.exports = SearchBar;
