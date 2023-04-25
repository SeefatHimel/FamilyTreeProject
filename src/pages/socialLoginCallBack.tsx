import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { GetJwtTokens } from "../APIs";
import GetCookie from "../hooks/getCookie";
import { SaveUserInfo } from "../services/saveUserInfo";

const SocialLoginCallback = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let path = "";
  const getJwtAccessToken = async () => {
    const refreshToken = await GetCookie("refreshToken");
    if (refreshToken) navigate("/");
    else {
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
    }
  };
  useEffect(() => {
    getJwtAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen flex flex-col ">
      <Spin
        className="w-full mt-[20%]"
        spinning={true}
        size="large"
        tip="Signing In"
      />
    </div>
  );
};

export default SocialLoginCallback;
