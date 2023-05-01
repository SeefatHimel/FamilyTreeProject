import { Button, Form, Image, Input, Modal, Switch } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UpdateFamilyMember } from "../../APIs/familyApis";
import { handleCheckValidity } from "../../services/checkImageLinkValidity";
import { ImgbbUploader } from "../imgbb";
// import { useState } from "react";
// const { Option } = Select;

const EditMemberModal = ({ isModalOpen, setIsModalOpen, member }: any) => {
  const [imgLink, setImgLink] = useState<string>(member.imgLink);
  const [validImage, setValidImage] = useState<boolean>(false);
  const [imageType, setImageType] = useState<string>("link");

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
    console.log(
      "🚀 ~ file: editMemberModal.tsx:39 ~ onFinish ~ values:",
      values
    );
    const tmp = { ...member };
    tmp.name = values.name;
    tmp.imgLink = values.imgLink;
    if (values.imgLink) tmp.imgPath = null;
    // tmp.gender = values.gender;
    console.log(
      "🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ member",
      member
    );
    console.log("🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ tmp", tmp);
    const updated = await UpdateFamilyMember(tmp);
    console.log(updated);
    // window.location.reload();
    if (updated) setIsModalOpen(false);
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
  const onChangeSwitch = (checked: boolean) => {
    setImageType(checked ? "file" : "link");
    console.log(`switch to ${checked ? "file" : "link"}`);
  };
  const validateLink = async (rule: any, value: any) => {
    const resp = await handleCheckValidity(value);
    if (!value || value === "") {
      return Promise.reject("You must enter a image");
    } else if (!resp) {
      return Promise.reject("Please enter a valid image Link");
    } else {
      return Promise.resolve();
    }
  };
  const handleFileUpload = async (link: string) => {
    setImgLink(link);
    setImageType("link");
    const resp = await handleCheckValidity(link);
    if (resp) {
      !validImage && setValidImage(!validImage);
    } else validImage && setValidImage(!validImage);
  };
  useEffect(() => {
    initialImageCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      imgLink: imgLink,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgLink]);
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
          <Switch
            checkedChildren={<>File</>}
            unCheckedChildren={<>Link</>}
            // defaultChecked
            checked={imageType === "file"}
            className="bg-green-600 hover:bg-green-400 absolute right-8"
            onChange={onChangeSwitch}
          />
          {imageType === "link" && (
            <div>
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
                validateStatus={validImage ? "success" : "error"}
                hasFeedback
                name="imgLink"
                label="Image"
                validateFirst
                rules={[
                  // { required: true },
                  {
                    validator: validateLink,
                    // message: "Enter a valid email",
                  },
                ]}
                // help={
                //   validImage || imgLink.length === 0
                //     ? ""
                //     : "Input a Valid Image Link"
                // }
              >
                <Input
                  className="flex items-center justify-center text-center"
                  value={imgLink}
                  onChange={async (e) => {
                    setImgLink(e.target.value);
                    const resp = await handleCheckValidity(e.target.value);
                    console.log(
                      "🚀 ~ file: addMemberModal.tsx:89 ~ onChange={ ~ resp:",
                      resp
                    );
                    if (resp) {
                      !validImage && setValidImage(!validImage);
                    } else validImage && setValidImage(!validImage);
                  }}
                />
              </Form.Item>
            </div>
          )}
          {imageType === "file" && (
            <div className="mb-6">
              <div className="h-[100px] w-fit mx-auto mb-3 rounded-full border-2 border-red-600  flex items-center justify-center overflow-hidden">
                <Image
                  width={100}
                  src={`${imgLink}`}
                  alt="Invalid Image"
                  preview={{ mask: false }}
                  fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqaGgivHe2_fIOSNQcC0aqIvkG2zUrR0qEQ&usqp=CAU"
                />
              </div>
              <ImgbbUploader
                handleFileUpload={handleFileUpload}
                apiKey={"011b0db5cc767987436b6039bde8033e"}
                apiUrl={"https://api.imgbb.com/1/upload"}
              />
              {/* <Input
                type="file"
                required
                className="flex justify-center pl-24"
                onChange={handleFileChange}
              /> */}
            </div>
          )}

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
