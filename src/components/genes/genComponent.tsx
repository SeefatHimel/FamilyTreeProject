import { UserOutlined } from "@ant-design/icons";
import { Card, Avatar, Button } from "antd";
import { useState } from "react";
import AddMemberModal from "../modal/modal";

const GenComponent = ({ member, origin, setOrigin }: any) => {
  const [hovering, setHovering] = useState(false);
  const [options, setOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memId = member.id;
  return (
    <div className="bg-gray-500 p-4 relative">
      <Card
        size="small"
        className="max-w-xs w-52 relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setOptions(false);
        }}
      >
        <Button
          type="primary"
          className={`absolute right-2 top-2 bg-slate-400 p-0 m-0 rounded-lg ${
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
        <div className="flex flex-col items-center">
          <Avatar size={64} src={member.imgLink} alt="Error" />{" "}
          {/* <Avatar size={64} icon={<UserOutlined />} />{" "} */}
          <div>{member?.name ? member?.name : "No name"}</div>
        </div>
        <div
          className={` absolute right-9 top-0 grid grid-cols-2 gap-2 z-100 ${
            options ? "" : "hidden"
          }`}
        >
          <Button
            type="primary"
            className="p-0.5 bg-green-600"
            onClick={() => setIsModalOpen(true)}
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
            // onClick={() => setOrigin(member.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
      <AddMemberModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        memId={memId}
      />
      {/* <Button onClick={() => setIsModalOpen(true)}>add mem</Button> */}
    </div>
  );
};

export default GenComponent;
