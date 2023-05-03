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
import ViewTree from "./components/familyList/components/viewTree";
import Home from "./components/home";
import CustomLayout from "./layout";
import SocialLoginCallback from "./pages/socialLoginCallBack";
import { store } from "./storage/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
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
