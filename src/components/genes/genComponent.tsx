// import { UserOutlined } from "@ant-design/icons";
import { Card, Button, Image } from "antd";
import { useState } from "react";
import { DeleteFamilyMember } from "../../APIs/familyApis";
import AddMemberModal from "../modal/addMemberModal";
import EditMemberModal from "../modal/editMemberModal";

const GenComponent = ({ member, origin, setOrigin }: any) => {
  const [hovering, setHovering] = useState(false);
  const [options, setOptions] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const memId = member.id;
  return (
    <div className="relative">
      <div
        // size="small"
        className="max-w-xs w-30 relative p-2 pt-0 m-2"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setOptions(false);
        }}
      >
        <Button
          type="primary"
          className={`absolute right-2 top-2 bg-slate-400 p-0 m-0 rounded-lg z-30 ${
            hovering ? "" : "invisible"
          }`}
          shape="circle"
          size="small"
          onClick={() => {
            setOptions(!options);
          }}
        >
          ---
        </Button>
        <div className="flex flex-col items-center relative">
          <div className="absolute top-[-2px] z-20 h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={member.imgLink}
              alt="Error"
              className="z-20"
              preview={{
                mask: false,
              }}
            />
          </div>
          {/* <Avatar size={64} icon={<UserOutlined />} />{" "} */}
          <Card
            size="small"
            className={`mt-12 z-10 w-20 text-center ${
              member.gender === "male" ? "bg-blue-500" : "bg-rose-400"
            }`}
          >
            <div>{member?.name ? member?.name : "No name"}</div>
          </Card>
        </div>
        <div
          className={`w-32 p-2 bg-slate-400 absolute right-9 top-0 flex flex-wrap justify-center rounded-xl gap-2 z-30 ${
            options ? "" : "hidden"
          }`}
        >
          <Button
            type="primary"
            // disabled={member.gender !== "male"}
            className="p-0.5 bg-green-600"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add
          </Button>
          <Button
            type="primary"
            className="p-0.5 bg-green-600"
            disabled={member.parents.length === 0}
            onClick={() => setOrigin(member.parents[0])}
          >
            Go Up
          </Button>
          <Button
            type="primary"
            className="p-0.5 bg-green-600"
            disabled={member.parents.length === 0}
            onClick={() => setOrigin(member.id)}
          >
            Make Origin
          </Button>

          <Button
            type="primary"
            className="p-0.5 bg-red-600"
            onClick={() => DeleteFamilyMember(member.id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="p-0.5 bg-green-600"
            onClick={() => setIsEditModalOpen(true)}
          >
            Update
          </Button>
        </div>
      </div>
      <EditMemberModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        member={member}
      />
      <AddMemberModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        member={member}
      />
    </div>
  );
};

export default GenComponent;
