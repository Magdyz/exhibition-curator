"use client"; // This ensures it's a client component

import { useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import ArtCard from "@/components/ArtCard";
import dynamic from "next/dynamic"; // Import dynamic for client-side components
import { fetchHarvardArt, fetchRijksmuseumArt } from "@/utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Import SearchBar with server side rendering disabled
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

// main function

export default function Page() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [introMessage, setIntroMessage] = useState("");

  // Handle search across both APIs // !! needs some more error handling !!
  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);
    setIntroMessage("");
    try {
      // Fetch data from both APIs
      const [harvardData, rijksmuseumData] = await Promise.all([
        fetchHarvardArt(searchTerm),
        fetchRijksmuseumArt(searchTerm),
      ]);

      // Combine results from both APIs
      setArtworks([...harvardData, ...rijksmuseumData]);
    } catch (err) {
      setIntroMessage("No artworks found. Please try a different search term.");
      setError("Failed to fetch artworks");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle selected artworks and add them to the exhibition list
  const handleSelectArtwork = (artwork) => {
    setSelectedArtworks((prevSelected) => {
      if (prevSelected.some((selected) => selected.url === artwork.url)) {
        return prevSelected; // No change if the artwork is already in the list
      }
      setSnackbarMessage("Artwork added to the exhibition!");
      setShowSnackbar(true);
      return [...prevSelected, artwork];
    });
  };

  // Function to remove an artwork from the exhibition list
  const handleRemoveArtwork = (artworkToRemove) => {
    setSelectedArtworks((prevSelected) =>
      prevSelected.filter((artwork) => artwork.url !== artworkToRemove.url)
    );
    setSnackbarMessage("Artwork removed from the exhibition!");
    setShowSnackbar(true);
  };

  return (
    <Container>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading or Error Handling */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        // Display artworks as cards
        <Grid container spacing={3}>
          {artworks.length > 0 ? (
            artworks.map((artwork, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ArtCard
                  artwork={artwork}
                  onSelect={() => handleSelectArtwork(artwork)}
                  selectedArtworks={selectedArtworks}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">{introMessage}</Typography>
          )}
        </Grid>
      )}

      {/* Display Selected Artworks (Exhibition List) */}
      {selectedArtworks.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <Typography variant="h4" gutterBottom>
            Your Exhibition
          </Typography>
          <Grid container spacing={3}>
            {selectedArtworks.map((artwork, index) => (
              <Grid
                item
                xs={12}
                key={artwork.url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">
                  {index + 1}. {artwork.title}
                </Typography>
                <DeleteIcon
                  onClick={() => handleRemoveArtwork(artwork)}
                  style={{ cursor: "pointer", color: "red" }}
                />
                <a href={artwork.url} target="_blank" rel="noopener noreferrer">
                  View More
                </a>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Popup Snackbar for feedback */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
