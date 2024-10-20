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
    setArtworks([...harvardData, ...rijksmuseumData]);
  } catch (err) {
    setError("Failed to fetch artworks");
    setIntroMessage("No artworks found. Please try a different search term.");
  } finally {
    setLoading(false);
  }
};

// Function to handle selected artworks and add them to the exhibition list
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

// Function to remove an artwork from the exhibition list
export const handleRemoveArtwork = (
  artworkToRemove,
  selectedArtworks,
  setSelectedArtworks,
  setSnackbarMessage,
  setShowSnackbar
) => {
  setSelectedArtworks((prevSelected) =>
    prevSelected.filter((artwork) => artwork.url !== artworkToRemove.url)
  );
  setSnackbarMessage("Artwork removed from the exhibition!");
  setShowSnackbar(true);
};
