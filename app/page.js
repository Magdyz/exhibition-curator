"use client"; // Client-side only

import TopBanner from "@/components/TopBanner"; // Importing TopBanner component
import { useState, useEffect } from "react"; // Importing React hooks
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material"; // Importing Material UI components
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

  // Show disclaimer modal only once per session
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Check session storage to see if the disclaimer has been shown
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenDisclaimer = sessionStorage.getItem("hasSeenDisclaimer");
      if (!hasSeenDisclaimer) {
        setShowDisclaimer(true); // Show modal if not already shown in this session
      }
    }
  }, []);

  // Close the disclaimer modal and set session storage to indicate it's been shown
  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenDisclaimer", "true"); // Store flag to prevent showing again in this session
    }
  };

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
    <Container sx={{ paddingTop: { xs: "64px", sm: "72px" } }}>
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </Container>
      <SnackbarNotification
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
      />
      {/* Disclaimer Modal */}
      <Dialog open={showDisclaimer} onClose={handleCloseDisclaimer}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This webpage does not store any of your data in a database. All data
            is temporarily stored only in your browser's cache to improve
            usability and enhance your experience.
            <br />
            <br />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDisclaimer}
            sx={{ marginTop: "20px" }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
