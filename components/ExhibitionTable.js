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
    </TableContainer>
  );
}

export default ExhibitionTable;
