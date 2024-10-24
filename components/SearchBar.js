"use client";

const { useState } = require("react");
const { TextField, Button } = require("@mui/material");
const { styled } = require("@mui/system");

// Styling for the search bar
const SearchContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
  maxWidth: "800px",
  width: "100%",
});

// Styling for TextField
const StyledTextField = styled(TextField)({
  flex: 1,
  marginRight: "10px",
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
});

// Styled Button
const StyledButton = styled(Button)({
  borderRadius: "24px",
  textTransform: "none",
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
