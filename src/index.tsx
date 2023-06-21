import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/auth/login";
import Registration from "./components/auth/registration";
import FamilyList from "./components/familyList";
import FamilyListForm from "./components/familyList/components/familyListForm";
import ViewTree from "./components/viewFamilyTree";
import Home from "./components/homePage";
import CustomLayout from "./layout";
import SocialLoginCallback from "./pages/socialLoginCallBack";
import { store } from "./storage/store";
import Axios from "axios";
import GetCookie from "./hooks/getCookie";
import { message } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const apiEndpoint = "https://login-backend-himel.onrender.com/";
const localHost = process.env.NODE_ENV === "development" ? true : false;
const baseUrl = localHost
  ? process.env.REACT_APP_API_URL_LOCAL
  : process.env.REACT_APP_API_URL;

Axios.defaults.baseURL = baseUrl;
Axios.interceptors.request.use(
  (config) => {
    const token = GetCookie("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(undefined, async (error) => {
  const { status, data } = error.response;
  if (!error.response) {
    message.error("Backend Crashed");
  }
  if (data?.error?.message)
    message.error(
      data?.error?.message ? data?.error?.message : "Something Went Wrong"
    );
  // if (status === 401) userAPI.logout();

  throw error.response;
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CustomLayout>
          {/* <App /> */}
          <Routes>
            <Route index path="/login" element={<Login />} />
            <Route index path="/registration" element={<Registration />} />
            <Route index path="/home" element={<Home />} />
            <Route
              index
              path="/FamilyTree/Enter"
              element={<FamilyListForm />}
            />
            <Route index path="/FamilyTree/List" element={<FamilyList />} />
            <Route index path="/FamilyTree/Family" element={<ViewTree />} />
            <Route index path="/FamilyTree/Family/:id" element={<ViewTree />} />
            <Route
              index
              path="/socialLogin/redirect"
              element={<SocialLoginCallback />}
            />
            <Route index path="/" element={<Home />} />
          </Routes>
        </CustomLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
