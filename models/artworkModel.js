export const getHarvardArt = async (query) => {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
  const res = await fetch(
    `https://api.harvardartmuseums.org/object?apikey=${apiKey}&q=${query}`
  );
  const data = await res.json();

  // Map through the records and return a data structure
  return data.records.map((art) => ({
    title: art.title,
    artist: art.people ? art.people[0].name : "Unknown",
    image:
      art.primaryimageurl ||
      "https://harvardartmuseums.org/assets/images/no_image.png",
    url: art.url,
    century: art.century,
  }));
};

export const getRijksmuseumArt = async (query) => {
  const apiKey = process.env.NEXT_PUBLIC_RIJKS_API_KEY;
  const res = await fetch(
    `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&q=${query}&imgonly=true`
  );
  const data = await res.json();

  return data.artObjects.map((artObject) => ({
    id: artObject.objectNumber,
    title: artObject.title,
    artist: artObject.principalOrFirstMaker,
    image: artObject.webImage?.url || "",
    url: `https://www.rijksmuseum.nl/en/collection/${artObject.objectNumber}`,
  }));
};