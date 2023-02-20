import { Button, Form, Image, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleCheckValidity } from "../../services/checkImageLinkValidity";
// import { useState } from "react";
// const { Option } = Select;

const EditMemberModal = ({ isModalOpen, setIsModalOpen, member }: any) => {
  const [imgLink, setImgLink] = useState<string>(member.imgLink);
  const [validImage, setValidImage] = useState<boolean>(false);
  // const memId = member.id;
  // const [gender, setGerder] = useState(member.gender);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // const tmp = { ...member };
    // tmp.name = values.name;
    // tmp.imgLink = values.imgLink;
    // // tmp.gender = values.gender;
    // console.log(
    //   "🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ member",
    //   member
    // );
    // console.log("🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ tmp", tmp);
    // const updated = await UpdateFamilyMember(tmp);
    // console.log(updated);
    // // window.location.reload();
    // if (updated) setIsModalOpen(false);
    toast.error("Please input a Valid Image Link");
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialImageCheck = async () => {
    if (await handleCheckValidity(imgLink)) {
      !validImage && setValidImage(!validImage);
    } else validImage && setValidImage(!validImage);
  };

  useEffect(() => {
    initialImageCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            initialValue={member.name}
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div className="h-[100px] w-fit mx-auto mb-3 rounded-full border-2 border-red-600  flex items-center justify-center overflow-hidden">
            <Image
              width={100}
              src={`${imgLink}`}
              alt="Invalid Image"
              preview={{ mask: false }}
              fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqaGgivHe2_fIOSNQcC0aqIvkG2zUrR0qEQ&usqp=CAU"
            />
          </div>
          <Form.Item
            initialValue={member.imgLink}
            name="imgLink"
            label="Image"
            rules={[{ required: true }]}
          >
            <Input
              onChange={async (e) => {
                setImgLink(e.target.value);
                if (await handleCheckValidity(e.target.value)) {
                  !validImage && setValidImage(!validImage);
                } else validImage && setValidImage(!validImage);
              }}
            />
          </Form.Item>

          {/* <Form.Item
            initialValue={member.gender}
            name="gender"
            label="Gender"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              value={gender}
              onChange={(e) => console.log(e)}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}
          <Form.Item {...tailLayout}>
            <Button className="mr-2" htmlType="submit">
              Submit
            </Button>
            <Button className="mr-2" htmlType="button" danger onClick={onReset}>
              Reset
            </Button>
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditMemberModal;
