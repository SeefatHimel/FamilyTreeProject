import { toast } from "react-toastify";

export const handleCheckValidity = async (imageLink: string) => {
  function isImageURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }
  isImageURL(imageLink)
    .then(() => {
      console.log("Valid image URL");
      return true;
    })
    .catch(() => {
      console.log("Invalid image URL");
      toast.error("Invalid image URL");
      return false;
    });
  return true;
};
