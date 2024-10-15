export default async function Page() {
  let data = await fetch(
    "https://api.harvardartmuseums.org/exhibition?apikey=597a9e93-1323-42d0-b7cc-3e17260c9d6d"
  );
  let posts = await data.json();
  let records = posts.records;
  return (
    <ul>
      {records.map((post) => (
        <div>
          <h3 key={post.title}>{post.title}</h3>
          <h4 key={post.url}>{post.url}</h4>
        </div>
      ))}
    </ul>
  );
}
