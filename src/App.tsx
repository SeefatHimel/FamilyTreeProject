import { Image } from "antd";
import { ToastContainer } from "react-toastify";
import Header from "./components/nav/header";
import InitialLoading from "./components/InitialLoading";

function App() {
  return (
    <div>
      <InitialLoading />

      <Image
        src="https://drive.google.com/file/d/1nMKsCtrmpmbNOvllw9AA6NHR83Z_RTPc"
        alt="Failed"
      />
      <ToastContainer
        enableMultiContainer
        theme="colored"
        containerId={"top-right"}
        position="top-right"
        autoClose={5000}
      />
    </div>
  );
}

export default App;
