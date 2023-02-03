import axios from "axios";
import { toast } from "react-toastify";
import GetCookie from "../hooks/getCookie";
// import GetCookie from "../hooks/getCookie";
// import { RemoveAllCookies } from "../hooks/removeCookie";
import SetCookie from "../hooks/setCookie";

// const apiEndpoint = "https://login-backend-himel.onrender.com/";
const localHost = process.env.NODE_ENV === "development" ? true : false;
const apiEndpoint = localHost
  ? process.env.REACT_APP_API_URL_LOCAL
  : process.env.REACT_APP_API_URL;
console.log("🚀 ~ file: index.ts:12 ~ process.env", process.env);

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
    console.log(
      "🚀 ~ file: familyApis.ts:18 ~ GetFamilyDetails ~ data",
      data.id
    );
    if (data?.id) SetCookie("activeFamilyID", data.id);
    toast.success(data?.message, {
      containerId: "top-right",
    });
    return data?.details;
  } catch (error: any) {
    const { data } = error.response;

    toast.error(data?.message, {
      containerId: "top-right",
    });
  }
}
export async function GetFamily(values: any) {
  console.log("🚀 ~ file: familyApis.ts:15 ~ GetFamily ~ values", values);
  try {
    const { data } = await axios.post(apiEndpoint + "familyTree/enter", values);
    console.log("🚀 ~ file: familyApis.ts:18 ~ GetFamily ~ data", data.id);
    if (data?.id) SetCookie("activeFamilyID", data.id);
    toast.success(data?.message, {
      containerId: "top-right",
    });
    return data?.details;
  } catch (error: any) {
    const { data } = error.response;

    toast.error(data?.message, {
      containerId: "top-right",
    });
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
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:51 ~ AddFamilyMember ~ error", error);
    toast.error(error?.response?.data?.message, {
      containerId: "top-right",
    });
  }
  console.log("<><><><>><><>");
}

export async function AddOriginFamilyMember(data: any) {
  try {
    const response = await axios.post(apiEndpoint + "familyTree/add/origin", {
      familyId: GetCookie("activeFamilyID"),
      data,
    });
    console.log(
      "🚀 ~ file: familyApis.ts:41 ~ AddOriginFamilyMember ~ response",
      response
    );
    if (response?.data) {
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
  } catch (error: any) {
    console.log("🚀 ~ file: familyApis.ts:51 ~ AddFamilyMember ~ error", error);
    toast.error(error?.response?.data?.message, {
      containerId: "top-right",
    });
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
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
  } catch (error: any) {
    console.log(
      "🚀 ~ file: familyApis.ts:69 ~ DeleteFamilyMember ~ error",
      error
    );
    toast.error(error?.response?.data?.message, {
      containerId: "top-right",
    });
  }
}

export async function UpdateFamilyMember(data: any) {
  try {
    const response = await axios.put(apiEndpoint + "familyTree/update", {
      familyId: GetCookie("activeFamilyID"),
      data,
    });
    if (response?.data) {
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
    return true;
  } catch (error: any) {
    console.log(
      "🚀 ~ file: familyApis.ts:51 ~ UpdateFamilyMember ~ error",
      error
    );
    toast.error(error?.response?.data?.message, {
      containerId: "top-right",
    });
    return false;
  }
}
