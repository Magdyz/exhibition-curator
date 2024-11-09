import React from "react";
import { StyledButton } from "./StyledComponents"; // Styled button imported to match SearchBar style
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";

// Align filter and sort sections with SearchBar's look and feel
const FilterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "600px",
  width: "90%", // Same width as SearchBar container
  margin: "10px auto",
});

const StyledFormControl = styled(FormControl)({
  width: "100%",
  backgroundColor: "#ffffff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px", // Match rounded style of SearchBar
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

function FilterBar({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  searchResults,
  setArtworks,
  handleFilterSortChange,
}) {
  return (
    <FilterContainer>
      {/* Filter by Museum with same style as SearchBar */}
      <StyledFormControl variant="outlined">
        <InputLabel>Filter by Museum</InputLabel>
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            if (e.target.value === "") {
              setArtworks(searchResults);
            }
          }}
          label="Filter by Museum"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="harvard">Harvard</MenuItem>
          <MenuItem value="rijksmuseum">Rijksmuseum</MenuItem>
        </Select>
      </StyledFormControl>

      {/* Sort by Name with same style as SearchBar */}
      <StyledFormControl variant="outlined">
        <InputLabel>Sort by Name</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort by Name"
        >
          <MenuItem value="asc">Ascending (A-Z)</MenuItem>
          <MenuItem value="desc">Descending (Z-A)</MenuItem>
        </Select>
      </StyledFormControl>

      {/* Apply Filter and Sort Button */}
      <StyledButton onClick={handleFilterSortChange} variant="contained">
        APPLY FILTER AND SORT
      </StyledButton>
    </FilterContainer>
  );
}

export default FilterBar;
