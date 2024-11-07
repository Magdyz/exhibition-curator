"use client";

const {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} = require("@mui/material");
const CheckCircleIcon = require("@mui/icons-material/CheckCircle").default;
import CloseIcon from "@mui/icons-material/Close";
const { useState } = require("react");

// ArtCard component to display individual artwork details
function ArtCard({ artwork, onSelect, selectedArtworks }) {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToExhibition = () => {
    try {
      if (selectedArtworks.some((selected) => selected.url === artwork.url)) {
        throw new Error("Artwork already in the exhibition list");
      } else {
        onSelect();
        setSnackbarMessage("Added to exhibition");
      }
    } catch (error) {
      setSnackbarMessage(error.message);
    }
    setSnackbarOpen(true);
  };

  // Open the modal to display detailed artwork information
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card>
      {artwork.image ? (
        <CardMedia
          component="img"
          height="200"
          image={artwork.image}
          alt={artwork.title}
        />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image="https://harvardartmuseums.org/assets/images/no_image.png" // Placeholder image if no image is available
          alt="No Image Available"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {artwork.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Artist: {artwork.artist}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button
            onClick={handleAddToExhibition}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#6d597a",
            }}
          >
            Add to Exhibition
          </Button>

          {/* Preview Button - Opens Modal */}
          <Button onClick={handleOpenModal} variant="outlined" color="primary">
            Preview
          </Button>
        </div>
      </CardContent>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("added") ? "success" : "info"}
          sx={{ width: "100%" }}
          iconMapping={{
            success: (
              <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
            ),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Modal for detailed artwork information */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {artwork.title}
          {/* Close Button in Modal */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {artwork.image ? (
            <CardMedia
              component="img"
              height="200"
              image={artwork.image}
              alt={artwork.title}
            />
          ) : (
            <CardMedia
              component="img"
              height="200"
              image="https://harvardartmuseums.org/assets/images/no_image.png" // Placeholder image if no image is available
              alt="No Image Available"
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Artist: {artwork.artist}</Typography>
          <Typography variant="body2">
            {/* Add other artwork details here if available from API */}
            Description: {artwork.description || "No description available"}
          </Typography>
          <Typography variant="body2">
            Date: {artwork.date || "Unknown"}
          </Typography>
          <Typography variant="body2">
            Dimensions: {artwork.dimensions || "Unknown"}
          </Typography>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

module.exports = ArtCard;
