import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";

import { LogOut } from "../../APIs";
import { resetUser } from "../../hooks/reducers/userReducer";

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    console.log("logging out");

    if (await LogOut()) {
      dispatch(resetUser());
      navigate("/login");
    }
  };
  return (
    <button className="flex items-center gap-1" onClick={() => handleLogOut()}>
      <LogoutOutlined />
      <span className="text-[15px] font-semibold">Log out</span>
    </button>
  );
};

export default LogOutButton;
