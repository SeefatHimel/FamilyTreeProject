import GenComponent from "../../genes/genComponent";
import { useSelector } from "react-redux";
import { useState } from "react";
import ConnectLines from "./connectingLines";

const ViewTree = () => {
  const familyDetails = useSelector(
    (state: any) => state?.members?.MembersList
  );
  const [origin, setOrigin] = useState(familyDetails.members[0].id);
  console.log(
    "🚀 ~ file: viewTree.tsx:6 ~ ViewTree ~ familyDetails",
    familyDetails
  );

  const lineColor = "bg-green-600";
  const lineWidth = "0.5";
  const horizontalLine = `h-${lineWidth} w-full left-[50%] top-[-20px] ${lineColor} absolute`;
  const verticalLine = `h-${lineWidth} w-full left-[-50%] top-[-20px] ${lineColor} absolute`;
  function getMember(id: string) {
    for (let i = 0; i < familyDetails.members.length; i++) {
      if (familyDetails.members[i].id === id) return familyDetails.members[i];
    }
    return false;
  }

  const BuildTree = (member: any, len: number, index: number) => {
    console.log("member", member);

    const spouse = member?.spouse[0] ? getMember(member?.spouse[0]) : null;

    const children =
      member?.children?.length > 0 ? member?.children : spouse?.children;
    console.log("🚀 ~ file: viewTree.tsx:28 ~ BuildTree ~ children", children);
    return (
      <>
        {member && (
          <div className="flex m-1  overflow-visible">
            <div className="m-2 p-0.5 rounded-lg h-min relative">
              <div className="flex mx-auto w-min pb-2 ">
                <div className="rounded-lg relative">
                  {member.id !== origin && (
                    <ConnectLines len={len} index={index} />
                  )}
                  <GenComponent
                    member={member}
                    setOrigin={setOrigin}
                    origin={setOrigin}
                  />
                </div>
                {spouse && (
                  <div className="rounded-lg relative">
                    {member.id !== origin && len > 1 && index < len - 1 && (
                      <div className={horizontalLine} />
                    )}
                    <GenComponent
                      member={spouse}
                      setOrigin={setOrigin}
                      origin={origin}
                    />
                  </div>
                )}
              </div>
              {spouse && (
                <>
                  <div
                    className={`h-${lineWidth}  w-3 left-[50%] top-[80px] bg-cyan-500 absolute`}
                  />
                  <div
                    className={`h-${lineWidth}  w-2.5 right-[50%] top-[80px] bg-cyan-500 absolute`}
                  />
                </>
              )}
              {children && children.length > 0 && (
                <div
                  className={`h-12  w-${lineWidth} left-[50%] top-[80px] bg-cyan-500 absolute`}
                />
              )}
              <div className="flex ">
                {children && children.length > 0 && (
                  <div className="flex p-0.5 rounded-lg">
                    {children &&
                      children.map(
                        (cldId: string, index: number) =>
                          getMember(cldId) &&
                          BuildTree(getMember(cldId), children.length, index)
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
      {
        <div className="mx-auto w-min">
          {BuildTree(getMember(origin), 0, 0)}
        </div>
      }
    </div>
  );
};

export default ViewTree;
