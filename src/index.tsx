import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import Login from "./components/auth/login";
import Logout from "./pages";
import Home from "./components/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/nav/header";

import { Provider } from "react-redux";
import { store } from "./storage/store";
import InitialLoading from "./components/InitialLoading";
import ViewTree from "./components/familyList/components/viewTree";
import FamilyList from "./components/familyList";
import CustomLayout from "./layout";
import Registration from "./components/auth/registration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomLayout>
        <Router>
          {/* <App /> */}
          <Routes>
            <Route index path="/login" element={<Login />} />
            <Route index path="/registration" element={<Registration />} />
            <Route index path="/logout" element={<Logout />} />
            <Route index path="/home" element={<Home />} />
            <Route index path="/FamilyTree/List" element={<FamilyList />} />
            <Route index path="/FamilyTree/Family" element={<ViewTree />} />
            <Route index path="/FamilyTree/Family/:id" element={<ViewTree />} />
            <Route index path="/" element={<Home />} />
          </Routes>
        </Router>
      </CustomLayout>
    </Provider>
  </React.StrictMode>
);
