import React from "react";
import { Grid, Typography } from "@mui/material";
import ArtCard from "@/components/ArtCard";

function ArtworksGrid({
  artworks,
  selectedArtworks,
  setSelectedArtworks,
  handleSelectArtwork,
  setSnackbarMessage,
  setShowSnackbar,
  introMessage,
}) {
  return (
    <Grid container spacing={3}>
      {artworks.length > 0 ? (
        artworks.map((artwork, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArtCard
              artwork={artwork}
              onSelect={() =>
                handleSelectArtwork(
                  artwork,
                  selectedArtworks,
                  setSelectedArtworks,
                  setSnackbarMessage,
                  setShowSnackbar
                )
              }
              selectedArtworks={selectedArtworks}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="body1">{introMessage}</Typography>
      )}
    </Grid>
  );
}

export default ArtworksGrid;
