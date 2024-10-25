"use client";

import TopBanner from "@/components/TopBanner"; // Importing TopBanner component
import { useState, useEffect } from "react"; // Importing React hooks
import { Container, Typography } from "@mui/material"; // Importing Material UI components
import dynamic from "next/dynamic"; // For dynamic imports
import {
  handleSearch,
  handleSelectArtwork,
  handleRemoveArtwork,
  handleFilterAndSort,
} from "@/controllers/exhibitionController"; // Importing controller functions
import FilterBar from "@/components/FilterBar"; // Importing FilterBar component
import ExhibitionTable from "@/components/ExhibitionTable"; // Importing ExhibitionTable component
import LoadingSpinner from "@/components/LoadingSpinner"; // Importing LoadingSpinner component
import ArtworksGrid from "@/components/ArtworksGrid"; // Importing ArtworksGrid component
import SnackbarNotification from "@/components/SnackbarNotification"; // Importing SnackbarNotification component

// Dynamically import SearchBar component (Server Side Rendering disabled)
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

export default function Page() {
  // State variables for managing artworks and UI states
  const [artworks, setArtworks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [introMessage, setIntroMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load selected artworks from sessionStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedArtworks = sessionStorage.getItem("selectedArtworks");
      if (savedArtworks) {
        setSelectedArtworks(JSON.parse(savedArtworks)); // Parse and set saved artworks
      }
    }
  }, []);

  // Save selected artworks to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && selectedArtworks.length > 0) {
      sessionStorage.setItem(
        "selectedArtworks",
        JSON.stringify(selectedArtworks) // Convert selected artworks to JSON string
      );
    }
  }, [selectedArtworks]);

  // Function to handle artwork search
  const handleSearchArtworks = async (searchTerm) => {
    await handleSearch(
      searchTerm,
      setSearchResults,
      setError,
      setLoading,
      setIntroMessage
    );
    setArtworks([]); // Clear artworks after search
  };

  // Function to handle filtering and sorting of artworks
  const handleFilterSortChange = () => {
    handleFilterAndSort(searchResults, filter, sortOrder, setArtworks);
  };

  // Effect to filter and sort artworks whenever filter or sortOrder changes
  useEffect(() => {
    if (searchResults.length > 0) {
      handleFilterSortChange();
    }
  }, [filter, sortOrder, searchResults]);

  return (
    <Container>
      <TopBanner selectedArtworks={selectedArtworks} />{" "}
      {/* Display top banner */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <SearchBar onSearch={handleSearchArtworks} />{" "}
        {/* Search bar for user input */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          searchResults={searchResults}
          setArtworks={setArtworks}
          handleFilterSortChange={handleFilterSortChange}
        />
      </Container>
      {loading ? ( // Conditional rendering based on loading state
        <LoadingSpinner /> // Show loading spinner
      ) : error ? ( // Check for error
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
      {selectedArtworks.length > 0 && ( // Display exhibition if there are selected artworks
        <div id="yourExhibition" style={{ marginTop: "30px" }}>
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
