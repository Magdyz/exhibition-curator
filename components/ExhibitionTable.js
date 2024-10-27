import React from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ExhibitionTable({
  selectedArtworks,
  handleRemoveArtwork,
  setSnackbarMessage,
  setShowSnackbar,
  setSelectedArtworks,
}) {
  // Function to clear all selected artworks from the exhibition
  const handleClearExhibition = () => {
    setSelectedArtworks([]); // Set selectedArtworks to an empty array, clearing all selections
    setSnackbarMessage("Exhibition cleared!"); // Display a message to confirm clearing
    setShowSnackbar(true); // Show snackbar notification

    // Update session storage
    sessionStorage.setItem("selectedArtworks", JSON.stringify([]));
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
                    <Avatar
                      alt={artwork.title}
                      src={artwork.image}
                      style={{ width: 40, height: 40, marginRight: 10 }}
                    />
                  </Grid>
                  <Grid item>{artwork.title}</Grid>
                </Grid>
              </TableCell>

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
                    borderRadius: "20px",
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
    </TableContainer>
  );
}

export default ExhibitionTable;
