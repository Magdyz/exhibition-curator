export const fetchHarvardArt = async (query) => {
  const apiKey = "597a9e93-1323-42d0-b7cc-3e17260c9d6d";
  const res = await fetch(
    `https://api.harvardartmuseums.org/object?apikey=${apiKey}&q=${query}`
  );
  const data = await res.json();
  return data.records.map((art) => ({
    title: art.title,
    artist: art.people ? art.people[0].name : "Unknown",
    image: art.primaryimageurl,
    url: art.url,
  }));
};
