type Props = {
  len: number;
  index: number;
  children: number;
};
const ChildParentConnectLines = ({ len, index, children }: Props) => {
  const getWidth = () => {
    let val = children * 120;
    val += 20;
    return val + "px";
  };
  const lineColor = "bg-green-600";
  // const lineColor2 = "bg-blue-600";
  // const lineColor3 = "bg-cyan-300";
  const lineWidth = "px-[1px]";
  const lineHeight = "py-[1px]";

  const childRightBar = `${lineHeight} w-full left-[50%] top-[-18px] ${lineColor} absolute`;
  const childLeftBar = `${lineHeight} w-[${getWidth()}px] right-[50%] top-[-18px] ${lineColor} absolute`;

  const childParentConnector = `h-20 ${lineWidth} left-[50%] top-[-18px] ${lineColor} absolute overflow-visible`;

  return (
    <>
      <div className={childParentConnector} />
      {len > 1 && (
        <>
          {index < len - 1 && (
            <div
              className={childRightBar}
              style={{
                width: getWidth(),
              }}
            />
          )}
          {index > 0 && (
            <div
              className={childLeftBar}
              style={{
                width: getWidth(),
              }}
            />
          )}
        </>
      )}
      {/* {len > 1 && index === len - 1 && <div className={verticalLine} />} */}
      {/*  */}
      {/* {len > 1 && index === 0 && <div className={horizontalLine} />} */}
    </>
  );
};

export default ChildParentConnectLines;
