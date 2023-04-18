import Card from "antd/es/card/Card";
// import { Button, Input } from "antd";
import axios from "axios";
import GoogleButton from "react-google-button";
// import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import RegistrationForm from "./components/registrationForm";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getAuthLink } from "../../../APIs";
import IntroSection from "../components/introSection";

export const getLink = async () => {
  const res = await getAuthLink();
  console.log("$$$$", res?.data);
  window.open(res?.data, "_self");
  window.location.href = res?.data;
};

const Registration = () => {
  // const handleSubmit = () => {
  //   console.log("submit");
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen">
        <div className="flex w-full flex-row">
          <IntroSection link="login" />

          <div className="relative flex flex-1 flex-col items-center justify-center px-10">
            <div className="flex max-w-md flex-1  flex-col justify-center space-y-5">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Sign in to account
                </h2>
                <p className="text-md md:text-xl">
                  Sign up or log in to start tracking your time
                </p>
              </div>
              <div className="flex max-w-md flex-col space-y-5">
                <RegistrationForm />
                <div className="flex items-center justify-center">
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Or</span>
                  <span className="w-full border border-black"></span>
                </div>
                <button
                  className="relative flex flex-none items-center justify-center rounded-lg border-2 border-black px-3 py-2 font-medium md:px-4 md:py-3"
                  onClick={() => {
                    setIsModalOpen(true);
                    getLink();
                  }}
                >
                  {/* <Link href={`${config?.baseUrl}/auth/google`}> */}
                  <span className="absolute left-4">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        fill="#EA4335 "
                        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                      />
                    </svg>
                  </span>
                  <span
                  // onClick={() => setIsModalOpen(true)}
                  >
                    Sign in with Google
                  </span>
                  {/* </Link> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        closable={false}
        centered
        className="w-20 bg-transparent"
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex h-40 flex-col items-center justify-center gap-4">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            size="large"
          />
          <h1>Logging In</h1>
        </div>
      </Modal>
    </>
  );
};
export default Registration;
// <div>
//   <div className="text-xl text-blue-500 p-6">First we have to log in</div>
//   <div className="w-2/3 mx-auto">
//     <Card title="Credentials" bordered={false}>
//       <RegistrationForm />
//     </Card>
//     <div className="p-6">
//       <div className="text-blue-600 p-2">Register with Google</div>
//       <GoogleButton onClick={() => getLink()} />
//     </div>
//   </div>
// </div>
