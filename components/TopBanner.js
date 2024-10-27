import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Optional: if you want to use this icon in alerts

export default function TopBanner({ selectedArtworks }) {
  const [artworkCount, setArtworkCount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Update artwork count when selectedArtworks changes
  useEffect(() => {
    setArtworkCount(selectedArtworks.length);
  }, [selectedArtworks]);

  // Scroll to 'Your Exhibition' section on basket click
  const handleBasketClick = () => {
    if (artworkCount === 0) {
      setSnackbarMessage("Start Adding to Your Exhibition");
      setSnackbarOpen(true);
    } else {
      document
        .getElementById("yourExhibition")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        width: "100%",
        zIndex: 1300,
        padding: 1,
        backgroundColor: "#355070",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            Your Exhibition
          </Typography>
        </a>

        <IconButton
          color="inherit"
          onClick={handleBasketClick}
          sx={{
            "&:hover": {
              backgroundColor: "#6d597a",
            },
          }}
        >
          <Badge badgeContent={artworkCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
          iconMapping={{
            info: <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}
