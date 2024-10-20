"use client";

import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import {
  handleSearch,
  handleSelectArtwork,
  handleRemoveArtwork,
  handleFilterAndSort,
} from "@/controllers/exhibitionController";
import FilterBar from "@/components/FilterBar";
import ExhibitionTable from "@/components/ExhibitionTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArtworksGrid from "@/components/ArtworksGrid";
import SnackbarNotification from "@/components/SnackbarNotification";

const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

export default function Page() {
  const [artworks, setArtworks] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Store search results here
  const [selectedArtworks, setSelectedArtworks] = useState(() => {
    // Load selected artworks from sessionStorage or initialize as empty array
    const savedArtworks = sessionStorage.getItem("selectedArtworks");
    return savedArtworks ? JSON.parse(savedArtworks) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [introMessage, setIntroMessage] = useState("");
  const [filter, setFilter] = useState(""); // For filter (Harvard or Rijks)
  const [sortOrder, setSortOrder] = useState("asc"); // For sort (ascending or descending)

  // Effect to load selected artworks from sessionStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedArtworks = sessionStorage.getItem("selectedArtworks");
      if (savedArtworks) {
        setSelectedArtworks(JSON.parse(savedArtworks));
      }
    }
  }, []);

  // Effect to save selected artworks to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "selectedArtworks",
        JSON.stringify(selectedArtworks)
      );
    }
  }, [selectedArtworks]);

  // Handle Search
  const handleSearchArtworks = async (searchTerm) => {
    await handleSearch(
      searchTerm,
      setSearchResults, // Store results in searchResults
      setError,
      setLoading,
      setIntroMessage
    );
    setArtworks([]); // Clear artworks when a new search is performed
  };

  // Handle Filter and Sort Change
  const handleFilterSortChange = () => {
    handleFilterAndSort(searchResults, filter, sortOrder, setArtworks);
  };

  // Effect to handle sorting whenever the filter or sortOrder changes
  useEffect(() => {
    if (searchResults.length > 0) {
      handleFilterSortChange();
    }
  }, [filter, sortOrder, searchResults]);

  return (
    <Container>
      <SearchBar onSearch={handleSearchArtworks} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchResults={searchResults}
        setArtworks={setArtworks}
        handleFilterSortChange={handleFilterSortChange}
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <ArtworksGrid
          artworks={artworks}
          selectedArtworks={selectedArtworks}
          setSelectedArtworks={setSelectedArtworks}
          handleSelectArtwork={handleSelectArtwork}
          setSnackbarMessage={setSnackbarMessage}
          setShowSnackbar={setShowSnackbar}
          introMessage={introMessage}
        />
      )}

      {selectedArtworks.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <Typography variant="h4" gutterBottom>
            Your Exhibition
          </Typography>

          <ExhibitionTable
            selectedArtworks={selectedArtworks}
            handleRemoveArtwork={handleRemoveArtwork}
            setSnackbarMessage={setSnackbarMessage}
            setShowSnackbar={setShowSnackbar}
            setSelectedArtworks={setSelectedArtworks}
          />
        </div>
      )}

      <SnackbarNotification
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
      />
    </Container>
  );
}
