import { message } from "antd";

export const handleCheckValidity = async (imageLink: string) => {
  function isImageURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }
  let valid = false;
  await isImageURL(imageLink)
    .then(() => {
      console.log("Valid image URL");
      valid = true;
    })
    .catch(() => {
      console.log("Invalid image URL");
      message.error("Invalid image URL");
      valid = false;
    });
  return valid;
};
