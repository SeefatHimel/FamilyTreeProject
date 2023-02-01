import React from "react";
import Tree from "react-d3-tree";
import GenComponent from "../../genes/genComponent";
import { useState, useEffect } from "react";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};
type Props = {
  origin: string;
  setOrigin: Function;
  orientation: "vertical" | "horizontal";
  setOrientation: Function;
  members: any;
};
export const OrgChartTree = ({
  origin,
  setOrigin,
  members,
  orientation,
  setOrientation,
}: Props) => {
  function getMember(id: string) {
    for (let i = 0; i < members.length; i++) {
      if (members[i].id === id) return members[i];
    }
    return false;
  }
  const getTree = (memberId: string) => {
    const member = getMember(memberId);
    console.log("🚀 ~ file: testTree.tsx:55 ~ getTree ~ member", member?.name);
    if (!member) {
      console.log("<><>");

      return null;
    }
    return {
      name: member.name,
      memberDetails: member,
      children: member?.children
        ?.filter((childId: string) => {
          return getTree(childId);
        })
        .map((cid: any) => getTree(cid)),
    };
  };
  const [treeData, setTreeData] = useState(getTree(origin));
  console.log("🚀🚀🚀🚀 ~ file: testTree.tsx:54 ~ treeData", treeData);
  useEffect(() => {
    const tmpTree = getTree(origin);
    setTreeData(tmpTree);
  }, [origin]);

  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 0 };
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: any) => (
    <>
      {/* <circle r={15}></circle> */}
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject
        {...foreignObjectProps}
        className="top-4 relative overflow-visible"
      >
        <div
          className={`flex ${
            orientation === "vertical" ? "" : "flex-col"
          } absolute top-[-30%] left-[-48%]`}
        >
          <GenComponent
            member={nodeDatum.memberDetails}
            setOrigin={setOrigin}
            origin={origin}
          />
          <GenComponent
            member={nodeDatum.memberDetails}
            setOrigin={setOrigin}
            origin={origin}
          />
        </div>
        {console.log("🚀 ~ file: testTree.tsx:87 ~ nodeDatum", nodeDatum)}
        {/* <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )}
        </div> */}
      </foreignObject>
    </>
  );
  const svgSquare = {
    shape: "rect",
    shapeProps: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
    },
  };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div
      id=""
      className="mx-auto w-max pl-2 pt-6 overflow-visible"
      // style={{ height: "400em" }}
    >
      {treeData && (
        <Tree
          nodeSize={{ x: 200, y: 200 }}
          data={treeData!}
          renderCustomNodeElement={(rd3tProps: any) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          pathFunc="step"
          orientation={orientation}
          // translate={{ x: 20, y: 20 }}
          svgClassName="w-min  mt-6 pt-6 ml-12 overflow-visible"
          draggable={false}
          zoomable={false}
        />
      )}
    </div>
  );
};
