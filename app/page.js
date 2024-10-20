"use client";

import { useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material"; // Import table-related components
import ArtCard from "@/components/ArtCard";
import dynamic from "next/dynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  handleSearch,
  handleSelectArtwork,
  handleRemoveArtwork,
} from "@/controllers/exhibitionController"; // controller functions

const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

export default function Page() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [introMessage, setIntroMessage] = useState("");

  return (
    <Container>
      <SearchBar
        onSearch={(searchTerm) =>
          handleSearch(
            searchTerm,
            setArtworks,
            setError,
            setLoading,
            setIntroMessage
          )
        }
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
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
      )}

      {selectedArtworks.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <Typography variant="h4" gutterBottom>
            Your Exhibition
          </Typography>
          {/* Responsive Table for the Exhibition List */}
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
                    <TableCell>{artwork.title}</TableCell>
                    <TableCell align="center">
                      <Button
                        href={artwork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        color="primary"
                        style={{
                          marginLeft: "10px",
                          textTransform: "none",
                          borderRadius: "20px", // Rounded button
                          padding: "5px 15px",
                        }}
                      >
                        View More
                      </Button>
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
          </TableContainer>
        </div>
      )}

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
