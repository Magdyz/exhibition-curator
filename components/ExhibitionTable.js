"use client";

import React, { useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

function ExhibitionTable({
  selectedArtworks,
  handleRemoveArtwork,
  setSnackbarMessage,
  setShowSnackbar,
  setSelectedArtworks,
}) {
  // State to manage modal visibility and selected artwork details
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  // Function to clear all selected artworks from the exhibition
  const handleClearExhibition = () => {
    setSelectedArtworks([]); // Set selectedArtworks to an empty array, clearing all selections
    setSnackbarMessage("Exhibition cleared!"); // Display a message to confirm clearing
    setShowSnackbar(true); // Show snackbar notification

    // Update session storage
    sessionStorage.setItem("selectedArtworks", JSON.stringify([]));
  };

  // Function to open the modal with more information about an artwork
  const handleOpenModal = (artwork) => {
    setCurrentArtwork(artwork); // Set the current artwork to display in the modal
    setModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setCurrentArtwork(null); // Clear the current artwork
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedArtworks.map((artwork, index) => (
            <TableRow key={artwork.url}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item>
                    {/* Enlarged Avatar with better spacing */}
                    <Avatar
                      alt={artwork.title}
                      src={artwork.image}
                      style={{ width: 50, height: 50, marginRight: 15 }} // Enlarged Avatar
                    />
                  </Grid>
                  <Grid item>{artwork.title}</Grid>
                </Grid>
              </TableCell>

              <TableCell align="center">
                {/* "More Info" Button with modal functionality */}
                <Button
                  onClick={() => handleOpenModal(artwork)} // Opens the modal with artwork details
                  variant="outlined"
                  color="primary"
                  style={{
                    marginRight: "15px", // Space between buttons
                    textTransform: "none",
                    borderRadius: "20px",
                    padding: "5px 15px",
                  }}
                >
                  Preview
                </Button>

                {/* "Remove" Button */}
                <Button
                  onClick={() =>
                    handleRemoveArtwork(
                      artwork,
                      selectedArtworks,
                      setSelectedArtworks,
                      setSnackbarMessage,
                      setShowSnackbar
                    )
                  }
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Clear Exhibition Button with custom styling */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearExhibition}
        style={{
          margin: "20px 0",
          float: "right",
          backgroundColor: "#15616d",
        }}
      >
        Clear Exhibition
      </Button>

      {/* Modal for displaying more information about the artwork */}
      {/* Modal for displaying more information about the artwork */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentArtwork?.title} {/* Displaying artwork title in the modal */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">
                Artist: {currentArtwork?.artist}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Description:{" "}
                {currentArtwork?.description || "No description available"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Date: {currentArtwork?.date || "Unknown"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Dimensions: {currentArtwork?.dimensions || "Unknown"}
              </Typography>
            </Grid>
            <Grid item>
              {/* Artwork Image */}
              {currentArtwork?.image ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={currentArtwork?.image}
                  alt={currentArtwork?.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image="https://harvardartmuseums.org/assets/images/no_image.png"
                  alt="No Image Available"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
}

export default ExhibitionTable;
