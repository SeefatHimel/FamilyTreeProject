import { Avatar, Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { BellFilled, ProfileFilled } from "@ant-design/icons";

import { pageNames } from "../../data/constants";
import { getLocalStorage } from "../../storage/storage";
import LogOutButton from "../auth/logOutButton";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const path: any = window.location.pathname;
  const [pageInfo, setPageInfo] = useState<any>([]);

  useEffect(() => {
    const tmp = getLocalStorage("userDetails");
    if (!userDetails && tmp) setUserDetails(tmp);
  }, [userDetails, path]);
  const items: MenuProps["items"] = [
    {
      key: "3",
      icon: (
        <div>
          <button
            // type="ghost"
            className={`flex w-full items-center`}
            onClick={async () => {}}
          >
            <div className="ml-3 flex items-center gap-1">
              <ProfileFilled />{" "}
              <span className="text-[15px] font-semibold"> Account</span>
            </div>
          </button>
        </div>
      ),
    },
    {
      key: "2",
      icon: (
        <div className="ml-3 w-[200px]">
          <LogOutButton />
        </div>
      ),
    },
  ];
  const menuProps = {
    items,
    onClick: () => {},
  };

  const dropdownRender = (menu: React.ReactNode) => (
    <div className="float-right">{menu}</div>
  );
  return (
    <div className=" mb-2 flex h-16 w-full items-center justify-between">
      <div className="py-6 text-xl text-blue-500  hover:text-green-500">
        {pageNames?.map(
          (option: any) =>
            path.includes(option.link) && (
              <div
                key={Math.random()}
                className={`flex items-center gap-2 rounded-lg text-black `}
              >
                <div className=" stroke-black">{option.icon}</div>
                <div className={`text-base font-semibold`}>{option.title}</div>
              </div>
            )
        )}
        {pageInfo[0] && (
          <div
            className={`flex items-center gap-2 rounded-lg text-black `}
            onClick={() => {
              // navigate(pageInfo[0].link);
            }}
          >
            <div>{pageInfo[0].icon}</div>
            <div className={`text-sm`}>{pageInfo[0].title}</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center"
          style={{
            border: "1px solid #ECECED",
            borderRadius: "8px",
          }}
        >
          <BellFilled />
        </div>

        <div>
          <Dropdown
            menu={menuProps}
            dropdownRender={dropdownRender}
            onOpenChange={(open) => {
              setDropdownOpen(open);
            }}
            trigger={["click"]}
            className="transition-all delay-1000 duration-1000"
            overlayClassName="duration-1000 delay-1000 transition-all"
          >
            <div className="flex w-[300px] items-center justify-between">
              <div className="flex items-center gap-2">
                {userDetails?.picture ? (
                  <Avatar
                    src={userDetails.picture}
                    alt="N"
                    className="h-[40px] w-[40px]"
                  />
                ) : (
                  <Avatar
                    src={
                      "https://st3.depositphotos.com/15437752/19006/i/600/depositphotos_190061104-stock-photo-silhouette-male-gradient-background-white.jpg"
                    }
                    alt="N"
                    className="h-[40px] w-[40px]"
                  />
                )}
                <div className="flex flex-col text-sm">
                  <div className="font-semibold">{userDetails?.name}</div>
                </div>
              </div>
              <div
                className="flex h-7 w-7 cursor-pointer items-center justify-center bg-[#ECECED]"
                style={{
                  borderRadius: "8px",
                }}
              >
                {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
