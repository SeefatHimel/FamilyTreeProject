import Header from "../components/nav/header";

const CustomLayout = ({ children }: any) => {
  return (
    <div>
      {/* <Header /> */}
      <div>{children}</div>
    </div>
  );
};

export default CustomLayout;
