import { useState } from "react";

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);

  // Shorten URL
  const handleShorten = () => {
    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }

    const shortCode = Math.random().toString(36).substring(2, 8);

    const newUrl = {
      id: Date.now(),
      originalUrl,
      shortUrl: `https://ems.ly/${shortCode}`,
      clicks: 0,
    };

    setUrls([...urls, newUrl]);
    setOriginalUrl("");
  };

  // Retrieve URL
  const handleRetrieve = (id) => {
    const selectedUrl = urls.find((url) => url.id === id);

    if (!selectedUrl) return;

    alert(`Original URL: ${selectedUrl.originalUrl}`);

    setUrls(
      urls.map((url) =>
        url.id === id
          ? { ...url, clicks: url.clicks + 1 }
          : url
      )
    );
  };

  // Update URL
  const handleUpdate = (id) => {
  const newUrl = window.prompt("Enter new Original URL:");

  if (newUrl === null) return;

  setUrls((prevUrls) =>
    prevUrls.map((url) => {
      if (url.id === id) {
        return {
          ...url,
          originalUrl: newUrl,
        };
      }
      return url;
    })
  );
};
  // Delete URL
  const handleDelete = (id) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>URL Shortener</h2>

      <input
        type="text"
        placeholder="Enter Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />

      <button
        onClick={handleShorten}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Shorten URL
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {urls.map((url) => (
    <tr key={url.id}>
      <td>
  <a
    href={url.originalUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    {url.originalUrl}
  </a>
</td>
      <td>
        <a
    href={url.shortUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    {url.shortUrl}
  </a>
  
</td>
      <td>{url.clicks}</td>
      <td>
        <button onClick={() => handleRetrieve(url.id)}>
          Retrieve
        </button>

        <button
  onClick={() => handleUpdate(url.id)}
  style={{ marginLeft: "5px" }}
>
  Update
</button>

        <button
          onClick={() => handleDelete(url.id)}
          style={{ marginLeft: "5px" }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default UrlShortener;