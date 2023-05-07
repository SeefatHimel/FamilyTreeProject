import React, { useState } from "react";
import { UploadImage } from "../../APIs/familyApis";

import { resizeImage } from "./actions";
import { message } from "antd";

const UploadForm = () => {
  const [file, setFile] = useState<any>(null);
  // console.log("🚀 ~ file: index.tsx:7 ~ UploadForm ~ file", file);

  const handleFileChange = async (event: any) => {
    const resizedImage = await resizeImage(event.target.files[0], 800, 800);
    setFile(resizedImage);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (file) {
      console.log("🚀 ~ file: index.tsx:17 ~ handleSubmit ~ file", file);
      const formData = new FormData();
      console.log(
        "🚀 ~ file: index.tsx:19 ~ handleSubmit ~ formData",
        formData
      );
      formData.append("image", file);

      console.log(
        "🚀 ~ file: index.tsx:15 ~ handleSubmit ~ formData",
        formData
      );
      UploadImage(formData);
    } else message.error("No file");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
