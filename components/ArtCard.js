"use client";

const {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Alert,
} = require("@mui/material");
const CheckCircleIcon = require("@mui/icons-material/CheckCircle").default;
const { useState } = require("react");

// ArtCard component to display individual artwork details
function ArtCard({ artwork, onSelect, selectedArtworks }) {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
        <Typography variant="body2" color="text.secondary">
          Century: {artwork.century}
        </Typography>

        <Button
          onClick={handleAddToExhibition}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add to Exhibition
        </Button>
        {/* Button to preview artwork in a new tab */}
        <Button
          onClick={() => window.open(artwork.url, "_blank")} // Opens the URL in a new tab
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2 }}
        >
          Preview
        </Button>
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
    </Card>
  );
}

module.exports = ArtCard;
