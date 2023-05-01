import { useRef, useState } from "react";

export function ImgbbUploader({ apiKey, apiUrl, handleFileUpload }) {
  const [imageUrl, setImageUrl] = useState(null);

  function handleUpload() {
    const file = fileInputRef.current.files[0];
    const formData = new FormData();

    formData.append("key", apiKey);
    formData.append("image", file);
    formData.append("album", "x10Bsm");

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        const url = result.data.url;
        setImageUrl(url);
        handleFileUpload(url);
        console.log(`Image uploaded: ${url}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fileInputRef = useRef(null);

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
    </div>
  );
}
