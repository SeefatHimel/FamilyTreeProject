import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 w-full h-full bg-slate-400">
      <div className="w-full h-max">
        <div className="text-center text-3xl font-extrabold">Welcome</div>
        <div className="text-center text-lg font-bold w-1/2 mx-auto">
          You have successfully logged in to our server.
        </div>
      </div>
      <div className="mx-auto text-center pt-12">This is Home Page</div>
      <div className="w-full py-4 text-center">
        <Button
          className="m-auto"
          onClick={() => navigate("/FamilyTree/Enter")}
        >
          View Family Tree
        </Button>
      </div>
    </div>
  );
};

export default Home;
