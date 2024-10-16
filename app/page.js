"use client";

import { useState, useEffect } from "react";
import { fetchHarvardArt } from "@/utils/api";

export default function Page() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    /// Fetch artwork data from Harvard API

    const fetchData = async () => {
      try {
        const data = await fetchHarvardArt("monet"); // For testing trying a search term
        setArtworks(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch artworks");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Harvard Artworks</h1>
      {artworks.length > 0 ? (
        artworks.map((artwork, index) => (
          <div key={index}>
            <img
              src={artwork.image}
              alt={artwork.title}
              style={{ width: "200px" }}
            />
            <h3>{artwork.title}</h3>
            <p>{artwork.artist}</p>
          </div>
        ))
      ) : (
        <p>No artworks found.</p>
      )}
    </div>
  );
}
