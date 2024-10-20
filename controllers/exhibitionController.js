import { getHarvardArt, getRijksmuseumArt } from "@/models/artworkModel";

// Handle search across both APIs
export const handleSearch = async (
  searchTerm,
  setArtworks,
  setError,
  setLoading,
  setIntroMessage
) => {
  setLoading(true);
  setError(null);
  setIntroMessage("");
  try {
    const [harvardData, rijksmuseumData] = await Promise.all([
      getHarvardArt(searchTerm),
      getRijksmuseumArt(searchTerm),
    ]);

    const combinedData = [...harvardData, ...rijksmuseumData];

    if (combinedData.length === 0) {
      throw new Error("No artworks found for this query.");
    }

    setArtworks(combinedData);
  } catch (err) {
    console.error("Error in handleSearch:", err.message);

    // Error Handling

    if (err.message.includes("404")) {
      setError(err.message); 
    } else if (err.message.includes("500")) {
      setError("Server error occurred. Please try again later."); 
    } else {
      setError("No artworks found. Please try a different search term.");
    }
    setIntroMessage("No artworks found. Please try a different search term.");
  } finally {
    setLoading(false);
  }
};

// Export functions for filtering, sorting, selecting, and removing artworks
export const handleFilterAndSort = (
  artworks,
  filter,
  sortOrder,
  setArtworks
) => {
  let filteredArtworks = [...artworks];

  // Filter by source (Harvard or Rijksmuseum)
  if (filter === "harvard") {
    filteredArtworks = filteredArtworks.filter(
      (artwork) => artwork.source === "Harvard"
    );
  } else if (filter === "rijksmuseum") {
    filteredArtworks = filteredArtworks.filter(
      (artwork) => artwork.source === "Rijksmuseum"
    );
  }

  // Sort by name (ascending or descending)
  filteredArtworks.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  setArtworks(filteredArtworks);
};

export const handleSelectArtwork = (
  artwork,
  selectedArtworks,
  setSelectedArtworks,
  setSnackbarMessage,
  setShowSnackbar
) => {
  setSelectedArtworks((prevSelected) => {
    if (prevSelected.some((selected) => selected.url === artwork.url)) {
      return prevSelected; // No change if the artwork is already in the list
    }

    setSnackbarMessage("Artwork added to the exhibition!");
    setShowSnackbar(true);
    return [...prevSelected, artwork];
  });
};

export const handleRemoveArtwork = (
  artworkToRemove,
  selectedArtworks,
  setSelectedArtworks,
  setSnackbarMessage,
  setShowSnackbar
) => {
  setSelectedArtworks((prevSelected) => {
    if (!Array.isArray(prevSelected)) {
      return [];
    }

    return prevSelected.filter(
      (artwork) => artwork.url !== artworkToRemove.url
    );
  });

  setSnackbarMessage("Artwork removed from the exhibition!");
  setShowSnackbar(true);
};
