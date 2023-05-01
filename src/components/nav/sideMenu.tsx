import {
  ApartmentOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const SideMenuOption = ({ option, active }: any) => {
    return (
      <div
        className={`group flex items-center gap-2 rounded-lg py-[10px] px-1 pl-[10px] hover:cursor-pointer hover:bg-[#ECECED] hover:text-black ${
          active ? "bg-[#ECECED] text-black" : ""
        }`}
        onClick={() => {
          navigate(option.link);
        }}
      >
        <div
          className={` group-hover:stroke-black group-hover:text-black ${
            active ? "stroke-black " : "stroke-[#ADACB0] text-[#ADACB0]"
          }`}
        >
          {option.icon}
        </div>
        <div
          className={`text-sm ${
            active ? "font-semibold text-black" : "font-medium text-[#4D4E55]"
          }`}
        >
          {option.title}
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
                  // active={router.asPath.includes(option.link)}
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
  { link: "/", title: "Home", icon: <HomeOutlined /> },
  { link: "/FamilyTree/List", title: "Enter", icon: <UsergroupAddOutlined /> },
];
