import { message } from "antd";
import axios from "axios";

import GetCookie from "../hooks/getCookie";
import { RemoveAllCookies } from "../hooks/removeCookie";
import SetCookie from "../hooks/setCookie";

export async function getAuthLink() {
  try {
    const response = await axios.get("auth/getLink");
    console.log("Auth url ", response);
    return response;
  } catch (error: any) {
    console.log(error);
    error?.response?.data?.message &&
      message.error(error?.response?.data?.message);
  }
}

export async function LogOut() {
  try {
    const { data } = await axios.post("auth/logout");
    console.log(data);
    RemoveAllCookies();
    message.success(data.message);
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function GetJwtAccessToken() {
  const refreshToken = GetCookie("refreshToken");
  if (!refreshToken) {
    console.log("logout");
    message.error("Response Token not found");
    return false;
  } else {
    const response = await axios.post("auth/token", {
      token: refreshToken,
    });
    console.log(response);
    if (response.data.accessToken) {
      SetCookie("accessToken", response.data.accessToken);
      return true;
    } else {
      console.log("logout");
      return false;
    }
  }
}

export async function GetJwtTokens(code: string) {
  console.log("Code :", code);
  try {
    const response = await axios.get("auth/login", {
      params: { code: code },
      // code: code,
      withCredentials: true,
    });
    console.log(response);

    console.log("GetJwtTokens >> api >> ", response.data);
    if (response?.data) {
      message.success(response?.data?.message);
    }
    return response.data;
  } catch (error: any) {
    console.error("Login Error", error);
    message.error(error?.response?.data?.message);
    RemoveAllCookies();
    return false;
  }
}

export async function GetData() {
  try {
    const accessToken = GetCookie("accessToken");
    console.log(accessToken);

    const response = await axios.get("auth/getData");
    console.log("data ", response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);

    if (error?.response?.status === 401) {
      const GotJwtAccessToken = await GetJwtAccessToken();
      GotJwtAccessToken
        ? await GetData()
        : message.error(error?.response?.data?.message);
      console.log("GotJwtAccessToken", GotJwtAccessToken);
      if (!GotJwtAccessToken) return -1;
    } else {
      message.error(error?.response?.data?.message);
    }
    console.error(error?.response?.status);
  }
}
