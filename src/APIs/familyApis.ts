import { message } from "antd";
import axios from "axios";

import GetCookie from "../hooks/getCookie";
import SetCookie from "../hooks/setCookie";

// const apiEndpoint = "https://login-backend-himel.onrender.com/";
const localHost = process.env.NODE_ENV === "development" ? true : false;
// const apiEndpoint2 = "https://familytreebackenddev.onrender.com/";
const apiEndpoint = localHost
  ? process.env.REACT_APP_API_URL_LOCAL
  : process.env.REACT_APP_API_URL;

export async function GetFamilyDetails(familyId: any) {
  console.log(
    "🚀 ~ file: familyApis.ts:15 ~ GetFamilyDetails ~ familyId",
    familyId
  );
  try {
    const { data } = await axios.get(
      apiEndpoint + "familyTree/getDetails",
      // familyId
      { params: { familyId: familyId }, withCredentials: true }
    );
    if (data?.id) SetCookie("activeFamilyID", data.id);
    message.success(data?.message);
    return data?.details;
  } catch (error: any) {
    const { data } = error.response;

    message.error(data?.message);
  }
}
export async function GetFamily(values: any) {
  console.log("🚀 ~ file: familyApis.ts:15 ~ GetFamily ~ values", values);
  try {
    const { data } = await axios.post(apiEndpoint + "familyTree/enter", values);
    console.log("🚀 ~ file: familyApis.ts:18 ~ GetFamily ~ data", data.id);
    if (data?.id) SetCookie("activeFamilyID", data.id);
    message.success(data?.message);
    return data;
  } catch (error: any) {
    const { data } = error.response;

    message.error(data?.message);
  }
}

export async function AddFamilyMember(data: any, memId: string) {
  try {
    const response = await axios.post(apiEndpoint + "familyTree/add", {
      familyId: GetCookie("activeFamilyID"),
      data,
      memId,
    });
    console.log(
      "🚀 ~ file: familyApis.ts:41 ~ AddFamilyMember ~ response",
      response
    );
    if (response?.data) {
      message.success(response?.data?.message);
    }
    window.location.reload();
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:51 ~ AddFamilyMember ~ error", error);
    message.error(error?.response?.data?.message);
  }
  console.log("<><><><>><><>");
}

export async function AddOriginFamilyMember(data: any, memId: string) {
  try {
    const response = await axios.post(apiEndpoint + "familyTree/add/origin", {
      familyId: GetCookie("activeFamilyID"),
      data,
      memId,
    });
    console.log(
      "🚀 ~ file: familyApis.ts:41 ~ AddOriginFamilyMember ~ response",
      response
    );
    if (response?.data) {
      message.success(response?.data?.message);
    }
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:51 ~ AddFamilyMember ~ error", error);
    message.error(error?.response?.data?.message);
  }
  console.log("<><><><>><><>");
}

export async function DeleteFamilyMember(memId: string) {
  try {
    const response = await axios.post(apiEndpoint + "familyTree/delete", {
      familyId: GetCookie("activeFamilyID"),
      memId,
    });
    if (response?.data) {
      message.success(response?.data?.message);
    }
  } catch (error: any) {
    console.log(
      "🚀 ~ file: familyApis.ts:69 ~ DeleteFamilyMember ~ error",
      error
    );
    message.error(error?.response?.data?.message);
  }
}

export async function UpdateFamilyMember(data: any) {
  try {
    const response = await axios.put(apiEndpoint + "familyTree/update", {
      familyId: GetCookie("activeFamilyID"),
      data,
    });
    if (response?.data) {
      message.success(response?.data?.message);
    }
    // window.location.reload();
    return false;
    // return true;
  } catch (error: any) {
    console.log(
      "🚀 ~ file: familyApis.ts:51 ~ UpdateFamilyMember ~ error",
      error
    );
    message.error(error?.response?.data?.message);
    return false;
  }
}

export async function UploadImage(formData: any) {
  try {
    await axios.post(apiEndpoint + "upload", formData).then((response) => {
      console.log(response.data);
    });
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:157 ~ UploadImage ~ error", error);

    message.error(error?.response?.data?.message);
    return false;
  }
}

export async function GetImage() {
  try {
    const res: any = await axios.get(apiEndpoint + "download");
    console.log("🚀 ~ file: familyApis.ts:172 ~ GetImage ~ res", res);
    // .then((response) => {
    //   console.log(response.data);
    // });
    return res?.data?.data;
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:157 ~ UploadImage ~ error", error);

    message.error(error?.response?.data?.message);
    return false;
  }
}
