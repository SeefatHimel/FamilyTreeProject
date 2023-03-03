import { Button, Image } from "antd";
import { useState } from "react";
import UploadForm from ".";
import { GetImage } from "../../APIs/familyApis";

const ImageShow = () => {
  const localHost = process.env.NODE_ENV === "development" ? true : false;
  const apiEndpoint = localHost
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL;
  const [img, setImg] = useState<any>(null);
  const getImage = async () => {
    const res = await GetImage();
    res && setImg(res);
    console.log("🚀 ~ file: home.tsx:11 ~ <><><><> ~ res", res);
  };
  return (
    <>
      <UploadForm />
      {`${apiEndpoint}${img?.path}`}
      <Button onClick={() => getImage()}>Get Image</Button>
      {img && (
        <div className="h-[100px] w-fit rounded-full border-2 border-red-600  flex items-center justify-center overflow-hidden">
          <Image
            // height={200}
            width={100}
            src={`${apiEndpoint}${img?.path}`}
            alt="No Image"
          ></Image>
        </div>
      )}
    </>
  );
};

export default ImageShow;
