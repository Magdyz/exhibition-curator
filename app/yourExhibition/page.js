"use client";

import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ExhibitionTable from "@/components/ExhibitionTable";
import { handleRemoveArtwork } from "@/controllers/exhibitionController";
import SnackbarNotification from "@/components/SnackbarNotification"; // Importing SnackbarNotification component
import TopBanner from "@/components/TopBanner";

export default function YourExhibitionPage() {
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Load selected artworks from sessionStorage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedArtworks = sessionStorage.getItem("selectedArtworks");
      if (savedArtworks) {
        setSelectedArtworks(JSON.parse(savedArtworks)); // Set artworks from session storage
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && selectedArtworks.length > 0) {
      sessionStorage.setItem(
        "selectedArtworks",
        JSON.stringify(selectedArtworks)
      );
    }
  }, [selectedArtworks]);

  return (
    <Container>
      <TopBanner selectedArtworks={selectedArtworks} />{" "}
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
      <SnackbarNotification
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
      />
    </Container>
  );
}
