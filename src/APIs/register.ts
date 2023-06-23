import { message } from "antd";
import axios from "axios";
import { apiEndpoints } from "../utils/apiEndpoints";

export async function RegisterUser(data: any) {
  try {
    const response = await axios.post(apiEndpoints.signUp, {
      data,
    });
    console.log(response);
    message.success("User Added");
    return true;
  } catch (error: any) {
    console.log(error);
    message.error(error?.response?.data?.message);
    return false;
  }
}

export async function CheckEmailValidity(passedEmail: any) {
  try {
    await axios.post(apiEndpoints.emailValidity, {
      headers: {},
      data: { email: passedEmail },
      Credential: true,
    });
    return true;
  } catch (error: any) {
    console.log("Email Error", error?.response?.data?.message);
    return false;
  }
}

export async function SignIn(values: any) {
  try {
    const { data } = await axios.post(apiEndpoints.signIn, {
      email: values.email,
      password: values.password,
    });
    return data;
  } catch (error: any) {
    const { data } = error.response;

    message.error(data?.message);
  }
}
