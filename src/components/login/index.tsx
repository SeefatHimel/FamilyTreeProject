import Card from "antd/es/card/Card";
import GoogleButton from "react-google-button";
import { getAuthLink } from "../../APIs";
import LoginForm from "./components/loginForm";

const Login = () => {
  const getLink = async () => {
    const res = await getAuthLink();
    console.log("$$$$", res?.data);
    window.open(res?.data, "_self");
    window.location.href = res?.data;
  };
  return (
    <div>
      <div className="w-2/3 mx-auto">
        <Card title="Credentials" bordered={false}>
          <LoginForm />
        </Card>
        <div className="p-6">
          <div className="text-blue-600 p-2">Log in with Google</div>
          <GoogleButton onClick={() => getLink()} />
        </div>
      </div>
    </div>
  );
};
export default Login;
