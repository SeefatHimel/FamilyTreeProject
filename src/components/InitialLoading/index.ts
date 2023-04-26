import GetCookie from "../../hooks/getCookie";
import SetCookie from "../../hooks/setCookie";
import { SaveUserInfo } from "../../services/saveUserInfo";
import { getLocalStorage } from "../../storage/storage";

const InitialLoading = async (userDetails: any, dispatch: any) => {
  const activeUserID = GetCookie("activeUserID");
  const refreshToken = GetCookie("refreshToken");
  console.log("initial loading", activeUserID, userDetails);
  try {
    if (!userDetails && activeUserID) {
      const tmpDetails = getLocalStorage("userDetails");
      const savedUserInfo = await SaveUserInfo(
        { userData: tmpDetails },
        dispatch
      );
      if (savedUserInfo) {
        console.log("saved user info");
      } else console.log(" failed to save user info");
    } else
      console.log(
        "🚀 ~ file: index.js:12 ~ initialLoad ~ userDetails",
        userDetails
      );
    if (!refreshToken && activeUserID) {
      const tmpToken = getLocalStorage("refreshToken");
      tmpToken && SetCookie("refreshToken", tmpToken);
      console.log("Saved refreshToken : ", GetCookie("refreshToken"));
      return true;
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:47 ~ InitialLoading ~ error:", error);
    return false;
  }
};

export default InitialLoading;
