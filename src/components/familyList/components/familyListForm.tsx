import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GetFamily } from "../../../APIs/familyApis";
import { setMembers } from "../../../hooks/reducers/membersReducer";
import { getLocalStorage, setLocalStorage } from "../../../storage/storage";

const FamilyListForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async (values: any) => {
    console.log(values);
    const data = await GetFamily(values);
    console.log(
      "🚀 ~ file: familyListForm.tsx:17 ~ signIn ~ data:",
      data,
      data?.details.name
    );
    if (data?.details.name) {
      let familyList: string[] = getLocalStorage("familyList");
      if (!familyList) familyList = [];
      console.log(
        "🚀 ~ file: familyListForm.tsx:21 ~ signIn ~ familyList:",
        familyList
      );
      if (!familyList.includes(data.id)) {
        familyList.push(data.id);
        setLocalStorage("familyList", familyList);
      }
      console.log(
        "🚀 ~ file: familyListForm.tsx:17 ~ signIn ~ data",
        data?.details
      );
      dispatch(setMembers(data?.details));
      // const savedUserInfo = data && (await SaveUserInfo(data, dispatch));
      // savedUserInfo
      //   ? console.log("saved user info")
      //   : console.log(" failed to save user info");

      // message.success(data?.message);

      // const params = {
      //   color: "blue",
      // };
      // const options = {
      //   pathname: "/FamilyTree/Family",
      //   id: `?${GetCookie("activeFamilyID")}`,
      // };
      // navigate(options, { replace: true });
      console.log("<><><><><>");

      navigate("/FamilyTree/Family/" + data.id);
    }
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    await signIn(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col w-[400px] mx-auto gap-4 pt-5">
      <div className="font-semibold text-lg">Enter your Family Credentials</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your Family Name!" },
            {
              min: 0,
              max: 200,
              message: "Please input a valid Name.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-red-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FamilyListForm;
