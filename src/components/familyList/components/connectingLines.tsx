type Props = {
  len: number;
  index: number;
};
const ConnectLines = ({ len, index }: Props) => {
  const lineColor = "bg-green-600";
  const lineWidth = "0.5";
  const horizontalLine = `h-${lineWidth} w-full left-[50%] top-[-20px] ${lineColor} absolute`;
  const verticalLine = `h-${lineWidth} w-full left-[-50%] top-[-20px] ${lineColor} absolute`;

  return (
    <>
      <div
        className={`h-20 w-${lineWidth} left-[50%] top-[-20px] ${lineColor} absolute overflow-visible`}
      />
      {len > 1 && index > 0 && index < len - 1 && (
        <>
          <div className={horizontalLine} />
          <div className={verticalLine} />
        </>
      )}
      {len > 1 && index === len - 1 && <div className={verticalLine} />}

      {len > 1 && index === 0 && (
        <>
          <div className={horizontalLine} />
        </>
      )}

      {len === 1 && (
        <div
          className={`h-${lineWidth} w-1/2 left-[50%] top-[-20px] bg-blue-500 absolute`}
        />
      )}
    </>
  );
};

export default ConnectLines;
