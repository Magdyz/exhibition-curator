"use client"; // Add this line

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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation"; // Import router from next/navigation

export default function TopBanner({ selectedArtworks }) {
  const router = useRouter(); // Initialize router
  const [artworkCount, setArtworkCount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Update artwork count when selectedArtworks changes
  useEffect(() => {
    setArtworkCount(selectedArtworks.length);
  }, [selectedArtworks]);

  // Navigate to 'Your Exhibition' page on basket click
  const handleBasketClick = () => {
    if (artworkCount === 0) {
      setSnackbarMessage("Start Adding to Your Exhibition");
      setSnackbarOpen(true);
    } else {
      router.push("/yourExhibition"); // Navigate to the new page
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
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          aria-label="Navigate to Home Page"
        >
          <Typography
            variant="h6"
            sx={{
              marginLeft: 1,
              "&:hover": {
                color: "#bb86fc", // Change color on hover
              },
            }}
          >
            Your Exhibition
          </Typography>
        </a>

        <IconButton
          color="inherit"
          onClick={handleBasketClick}
          aria-label="View Your Exhibition"
          sx={{
            "&:hover": {
              backgroundColor: "#6d597a",
            },
          }}
        >
          <Badge badgeContent={artworkCount} color="secondary">
            <LibraryBooksIcon />
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
