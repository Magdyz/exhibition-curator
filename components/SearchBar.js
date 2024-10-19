"use client";

const { useState } = require("react");
const { TextField, Button } = require("@mui/material");
const { styled } = require("@mui/system");

// Styled container for the search bar
const SearchContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto", // Center the container
  maxWidth: "800px", // Set a maximum width for larger screens
  width: "100%", // Make it responsive
});

// Styled TextField for a minimalistic look
const StyledTextField = styled(TextField)({
  flex: 1,
  marginRight: "10px", // Space between the input and button
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px", // Rounded corners
    "& fieldset": {
      borderColor: "#ccc", // Light border color
    },
    "&:hover fieldset": {
      borderColor: "#aaa", // Darker border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6200ea", // Primary color when focused
    },
  },
});

// Styled Button
const StyledButton = styled(Button)({
  borderRadius: "24px", // Rounded corners for the button
  textTransform: "none", // Prevent uppercase transformation
});

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <StyledTextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Artworks" // Placeholder instead of label
        variant="outlined"
        size="medium" // Set size for consistency
      />
      <StyledButton onClick={handleSearch} variant="contained" color="primary">
        Search
      </StyledButton>
    </SearchContainer>
  );
}

module.exports = SearchBar;
