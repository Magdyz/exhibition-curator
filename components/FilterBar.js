import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

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
    <Grid container spacing={2} style={{ margin: "20px 0" }}>
      {/* Filter by Source */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Filter by Museum</InputLabel>
          <Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              if (e.target.value === "") {
                setArtworks(searchResults); // Reset artworks to the search results
              }
            }}
            label="Filter by Source"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="harvard">Harvard</MenuItem>
            <MenuItem value="rijksmuseum">Rijksmuseum</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sort by Name */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Sort by Name</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort by Name"
          >
            <MenuItem value="asc">Ascending (A-Z)</MenuItem>
            <MenuItem value="desc">Descending (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Apply Filter and Sort Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleFilterSortChange}
          style={{ width: "100%" }}
        >
          Apply Filter and Sort
        </Button>
      </Grid>
    </Grid>
  );
}

export default FilterBar;
