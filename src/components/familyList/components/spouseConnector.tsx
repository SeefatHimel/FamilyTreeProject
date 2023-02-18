type Props = {
  lineHeight: string;
  lineColor: string;
};
export const SpouseConnectorLine = ({ lineHeight, lineColor }: Props) => {
  return (
    <>
      <div
        className={`${lineHeight}  w-3 left-[50%] top-[80px] ${lineColor} absolute`}
      />
      <div
        className={`${lineHeight}  w-2.5 right-[50%] top-[80px] ${lineColor} absolute`}
      />
    </>
  );
};

export default SpouseConnectorLine;
