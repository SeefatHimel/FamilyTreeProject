import GenComponent from "../../genes/genComponent";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ChildParentConnectLines from "./connectingLines";
import AddMemberModal from "../../modal/addMemberModal";
import { Button, Image } from "antd";
import GetCookie from "../../../hooks/getCookie";
import { GetFamilyDetails } from "../../../APIs/familyApis";
import { setMembers } from "../../../hooks/reducers/membersReducer";
import SpouseConnectorLine from "./spouseConnector";
import React from "react";

const ViewTree = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState<boolean>(false);
  const realoadData = () => setReload(!reload);
  const familyDetails = useSelector(
    (state: any) => state?.members?.MembersList
  );
  // const [familyDetails, setFamilydetails] = useState(
  //   useSelector((state: any) => state?.members?.MembersList)
  // );
  const [origin, setOrigin] = useState(familyDetails?.members[0]?.id);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const lineColor = "bg-green-600";
  // const lineColor2 = "bg-red-600";
  const lineWidth = "px-[1px]";
  const lineHeight = "py-[1px]";
  function getMember(id: string) {
    for (let i = 0; i < familyDetails.members.length; i++) {
      if (familyDetails.members[i].id === id) return familyDetails.members[i];
    }
    return false;
  }

  const BuildTree = (member: any, len: number, index: number) => {
    const spouse = member?.spouse[0] ? getMember(member?.spouse[0]) : null;
    const children =
      member?.children?.length > 0 ? member?.children : spouse?.children;
    // console.log("🚀 ~ file: viewTree.tsx:28 ~ BuildTree ~ children", children);

    return (
      <>
        {member && (
          <div className="flex m-1  overflow-visible">
            <div className="m-2 p-0.5 rounded-lg h-min relative">
              <div className="flex h-min mx-auto w-min pb-2 relative">
                {/* T er down ta */}
                {children && children.length > 0 && (
                  <div className=" overflow-hidden absolute inset-0 ">
                    <div
                      className={`h-full  ${lineWidth} left-[50%] top-[80px] ${lineColor} absolute`}
                    />
                  </div>
                )}
                <div className="rounded-lg relative">
                  {member.id !== origin && (
                    <ChildParentConnectLines
                      len={len}
                      index={index}
                      children={children?.length ? children?.length : 1}
                    />
                  )}
                  <GenComponent
                    member={member}
                    setOrigin={setOrigin}
                    origin={setOrigin}
                  />
                </div>
                {spouse && (
                  <div className="rounded-lg relative">
                    <GenComponent
                      member={spouse}
                      setOrigin={setOrigin}
                      origin={origin}
                    />
                  </div>
                )}
              </div>
              {spouse && (
                <SpouseConnectorLine
                  lineHeight={lineHeight}
                  lineColor={lineColor}
                />
              )}
              <div className="flex justify-center relative">
                {children && children.length > 0 && (
                  <div className="flex p-0.5 rounded-lg ">
                    {children &&
                      children.map((cldId: string, index: number) => (
                        <React.Fragment key={cldId}>
                          {getMember(cldId) &&
                            BuildTree(getMember(cldId), children.length, index)}
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Image
          src="https://drive.google.com/file/d/1nMKsCtrmpmbNOvllw9AA6NHR83Z_RTPc/view"
          alt="Failed"
        />
      </>
    );
  };

  const getFamilyDetails = async () => {
    const familyId = GetCookie("activeFamilyID");
    const data = await GetFamilyDetails(familyId);
    if (!origin && data.members.length > 0) {
      setOrigin(data?.members[0]?.id);
    }
    if (data) dispatch(setMembers(data));

    // setFamilydetails(data);
  };

  useEffect(() => {
    if (familyDetails === null) {
      getFamilyDetails();
    }
  });

  // useEffect(() => {
  //   getFamilyDetails();
  // }, [reload]);

  return familyDetails ? (
    <div className="relative">
      <div className="mx-auto w-full">
        <div>Family Name : {familyDetails.name}</div>
        <div>Total members : {familyDetails.members.length} </div>
        {/* {familyDetails &&
        familyDetails.members.map((member: any) => (
          <GenComponent member={member} />
        ))} */}
        {familyDetails.members.length > 0 && origin ? (
          <div className="mx-auto w-min">
            {BuildTree(getMember(origin), 0, 0)}
          </div>
        ) : (
          <Button
            type="primary"
            // disabled={member.gender !== "male"}
            className="p-1 bg-green-600"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Member
          </Button>
        )}
      </div>
      <AddMemberModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        member={null}
      />
    </div>
  ) : (
    <>No Data</>
  );
};

export default ViewTree;
