import GenComponent from "../../genes/genComponent";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { useState } from "react";

const ViewTree = () => {
  const familyDetails = useSelector(
    (state: any) => state?.members?.MembersList
  );
  const [origin, setOrigin] = useState(familyDetails.members[0].id);
  console.log(
    "🚀 ~ file: viewTree.tsx:6 ~ ViewTree ~ familyDetails",
    familyDetails
  );

  function getMember(id: string) {
    for (let i = 0; i < familyDetails.members.length; i++) {
      if (familyDetails.members[i].id === id) return familyDetails.members[i];
    }
    return false;
  }

  const BuildTree = (member: any) => {
    console.log("member", member);

    const spouse = member?.spouse[0] ? getMember(member?.spouse[0]) : null;

    const children =
      member?.children?.length > 0 ? member?.children : spouse?.children;
    console.log("🚀 ~ file: viewTree.tsx:28 ~ BuildTree ~ children", children);
    return (
      <>
        {member && (
          <div className="flex m-1">
            <div className="m-2 p-0.5 rounded-lg h-min">
              <div className="flex mx-auto w-min pb-2">
                <div className="bg-rred-500 rounded-lg">
                  <GenComponent
                    member={member}
                    setOrigin={setOrigin}
                    origin={setOrigin}
                  />
                </div>
                {spouse && (
                  <GenComponent
                    member={spouse}
                    setOrigin={setOrigin}
                    origin={origin}
                  />
                )}
                {/* {member?.spouse[0] &&
                  member?.spouse.map(
                    (spId: string) =>
                      getMember(spId) && (
                        <GenComponent
                          member={getMember(spId)}
                          setOrigin={setOrigin}
                          origin={origin}
                        />
                      )
                  )} */}
              </div>
              {children && children.length > 0 && (
                <div className="h-1 w-5/6 mx-auto bg-red-600" />
              )}
              <div className="flex">
                {children && children.length > 0 && (
                  <div className="flex p-0.5 rounded-lg">
                    {children &&
                      children.map(
                        (cldId: string) =>
                          getMember(cldId) && BuildTree(getMember(cldId))
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="mx-auto w-full">
      <div>Family Name : {familyDetails.name}</div>
      <div>Total members : {familyDetails.members.length} </div>
      {/* {familyDetails &&
        familyDetails.members.map((member: any) => (
          <GenComponent member={member} />
        ))} */}
      {<div className="mx-auto w-min">{BuildTree(getMember(origin))}</div>}
    </div>
  );
};

export default ViewTree;
