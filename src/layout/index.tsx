import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { GetJwtTokens } from "../APIs";
import InitialLoading from "../components/InitialLoading";
import NavBar from "../components/nav/navbar";
import { publicRoutes } from "../data/constants";
import GetCookie from "../hooks/getCookie";
import { SaveUserInfo } from "../services/saveUserInfo";
import SideMenu from "../components/nav/sideMenu";

const CustomLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.user.userDetails);
  console.log(
    "🚀 ~ file: index.tsx:11 ~ CustomLayout ~ userDetails:",
    userDetails
  );
  let path = window.location.pathname;
  console.log("🚀 ~ file: index.tsx:7 ~ CustomLayout ~ path:", path);
  const getJwtAccessToken = async () => {
    const refreshToken = await GetCookie("refreshToken");
    console.log(window.location.pathname);
    if (path === window.location.pathname) return;
    else path = window.location.pathname;
    console.log(path, window.location.pathname);

    const code = searchParams.get("code");
    console.log("code", code, "refreshToken", refreshToken);

    if (refreshToken && !code) return;

    const data = await GetJwtTokens(code!);
    const savedUserInfo = data && (await SaveUserInfo(data, dispatch));
    savedUserInfo
      ? console.log("Saved user info")
      : console.log("Failed to save user info");
    console.log(data);
    if (data) navigate("/");
    else navigate("/login");
  };
  const checkLogin = async () => {
    console.log(
      "🚀 ~ file: index.tsx:24 ~ checkLogin :",
      publicRoutes.includes(path),
      userDetails
    );
    if (!userDetails && !publicRoutes.includes(path)) {
      const res2 = await InitialLoading(userDetails, dispatch);
      console.log("🚀 ~ file: index.tsx:31 ~ checkLogin ~ res2:", res2);
    }
    if (!GetCookie("refreshToken") && !publicRoutes.includes(path)) {
      const res2 = await InitialLoading(userDetails, dispatch);
      console.log("🚀 ~ file: index.tsx:26 ~ checkLogin ~ res2:", res2);
      const res = await getJwtAccessToken();
      console.log("🚀 ~ file: index.tsx:52 ~ checkLogin ~ res", res);
    }
  };
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, path]);
  // useEffect(() => {
  //   if (path !== window.location.pathname) path = window.location.pathname;
  // }, [path]);
  return (
    <div
      className=""
      style={{
        maxWidth: "calc(100vw - 15px)",
      }}
    >
      <div className="h-screen">
        <Spin spinning={!userDetails && !publicRoutes.includes(path)}>
          <div className={`${userDetails ? "flex" : ""}`}>
            {userDetails && <SideMenu />}
            <div className="w-[90%]">
              {userDetails && <NavBar />}
              {(userDetails || publicRoutes.includes(path)) && (
                <div className="overflow-x-auto">{children}</div>
              )}
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default CustomLayout;
