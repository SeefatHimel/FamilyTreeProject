import { FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  ApartmentOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const SideMenu = () => {
  const navigate = useNavigate();
  const SideMenuOption = ({ option, active }: any) => {
    return (
      <div
        className={`flex items-center gap-2 rounded-lg py-[10px] px-1 pl-[10px] 
        hover:cursor-pointer 
        hover:stroke-black 
        hover:bg-[#ECECED] 
        hover:text-black ${
          active
            ? "bg-[#ECECED] stroke-black text-black"
            : "stroke-[#ADACB0] text-[#ADACB0]"
        }`}
        onClick={() => {
          navigate(option.link);
        }}
      >
        <div className={""}>
          <div className="flex items-center gap-4">
            {option.icon}
            {option.title}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen w-[200px] items-center justify-center bg-[#F8F8F8] px-5">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex w-full flex-col gap-6">
          {" "}
          <div
            // className="flex items-center justify-center rounded-md p-4 text-white hover:cursor-pointer"
            className="flex w-full gap-2 pt-8 text-left"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="">
              <ApartmentOutlined />
            </div>
          </div>
          <div className=" rounded-md text-gray-200">
            <div className="flex flex-col gap-3">
              {sideMenuOptions?.map((option) => (
                <SideMenuOption
                  key={Math.random()}
                  option={option}
                  active={window.location.pathname.includes(option.link)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

export const sideMenuOptions = [
  { link: "/home", title: "Home", icon: <HomeOutlined /> },
  { link: "/FamilyTree/List", title: "List", icon: <FiList /> },
  { link: "/FamilyTree/Enter", title: "Enter", icon: <UsergroupAddOutlined /> },
];
