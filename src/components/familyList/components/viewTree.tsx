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
          <div className="flex">
            <Card>
              <div className="flex mx-auto w-min">
                <div className="bg-red-500 p-1">
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
              <div className="flex">
                {children &&
                  children.map(
                    (cldId: string) =>
                      getMember(cldId) && (
                        <div>{BuildTree(getMember(cldId))}</div>
                      )
                  )}
              </div>
            </Card>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div>Family Name : {familyDetails.name}</div>
      <div>Total members : {familyDetails.members.length} </div>
      {/* {familyDetails &&
        familyDetails.members.map((member: any) => (
          <GenComponent member={member} />
        ))} */}
      {<div>{BuildTree(getMember(origin))}</div>}
    </>
  );
};

export default ViewTree;
