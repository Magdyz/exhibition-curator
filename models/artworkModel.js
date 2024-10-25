// Using Winston library in logger to log errors 
const logger =
  typeof window === "undefined" ? require("@/utils/logger").default : null;

// Harvard API call
export const getHarvardArt = async (query) => {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
  try {
    const res = await fetch(
      `https://api.harvardartmuseums.org/object?apikey=${apiKey}&q=${query}`
    );

    // Handle error status codes
    if (res.status === 404) {
      throw new Error(
        "404: No artworks found for this query in Harvard Museum."
      );
    } else if (res.status >= 500) {
      throw new Error(
        "500: Harvard Museum server error. Please try again later."
      );
    }

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      throw new Error("No artworks found in Harvard Museum.");
    }

    return data.records.map((art) => ({
      title: art.title,
      artist: art.people ? art.people[0].name : "Unknown",
      image:
        art.primaryimageurl ||
        "https://harvardartmuseums.org/assets/images/no_image.png",
      url: art.url,
      source: "Harvard",
    }));
  } catch (error) {
    if (logger) {
      logger.error("Error fetching Harvard Artworks:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

// Rijksmuseum API
export const getRijksmuseumArt = async (query) => {
  const apiKey = process.env.NEXT_PUBLIC_RIJKS_API_KEY;
  try {
    const res = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&q=${query}&imgonly=true`
    );

    // Handle specific error status codes
    if (res.status === 404) {
      throw new Error("404: No artworks found for this query in Rijksmuseum.");
    } else if (res.status >= 500) {
      throw new Error("500: Rijksmuseum server error. Please try again later.");
    }

    const data = await res.json();

    if (!data.artObjects || data.artObjects.length === 0) {
      throw new Error("No artworks found in Rijksmuseum.");
    }

    return data.artObjects.map((artObject) => ({
      id: artObject.objectNumber,
      title: artObject.title,
      artist: artObject.principalOrFirstMaker,
      image: artObject.webImage?.url || "",
      source: "Rijksmuseum",
      url: `https://www.rijksmuseum.nl/en/collection/${artObject.objectNumber}`,
    }));
  } catch (error) {
    logger.error("Error fetching Harvard Artworks:", {
      message: error.message,
      stack: error.stack,
    });
    throw error; // Rethrow error to be caught by the controller
  }
};
