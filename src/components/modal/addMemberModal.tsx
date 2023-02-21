import { Button, Form, Image, Input, Modal, Select, Switch } from "antd";
import { useState } from "react";
import { AddFamilyMember, AddOriginFamilyMember } from "../../APIs/familyApis";
import { handleCheckValidity } from "../../services/checkImageLinkValidity";
import { GetFormData, resizeImage } from "../imageUpload/actions";
const { Option } = Select;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  member: any;
};

const AddMemberModal = ({ isModalOpen, setIsModalOpen, member }: Props) => {
  const [validImage, setValidImage] = useState<boolean>(false);
  const [imageType, setImageType] = useState<string>("file");
  const memId = member?.id;
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
    if (member) {
      const response = await AddFamilyMember(values, file, memId);
      console.log("🚀 ~ file: modal.tsx:25 ~ onFinish ~ response", response);
    } else {
      const response = await AddOriginFamilyMember(values);
      console.log("🚀 ~ file: modal.tsx:25 ~ onFinish ~ response", response);
    }
    console.log(values, file);
    // setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onChangeSwitch = (checked: boolean) => {
    setImageType(checked ? "file" : "link");
    setImgLink("");
    setImageSrc("");
    setFile(null);
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
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState<any>(null);
  // console.log("🚀 ~ file: index.tsx:7 ~ UploadForm ~ file", file);

  const handleFileChange = async (event: any) => {
    const resizedImage = await resizeImage(event.target.files[0], 800, 800);
    console.log(
      "🚀 ~ file: addMemberModal.tsx:70 ~ handleFileChange ~ resizedImage:",
      resizedImage
    );
    setFile(resizedImage);
    setImageSrc(URL.createObjectURL(resizedImage));
  };

  const [imgLink, setImgLink] = useState<string>("");

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
          onFinishFailed={onFinishFailed}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Switch
            checkedChildren={<>File</>}
            unCheckedChildren={<>Link</>}
            defaultChecked
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
                // validateStatus={validImage ? "success" : "error"}
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
                  src={`${imageSrc}`}
                  alt="Invalid Image"
                  preview={{ mask: false }}
                  fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqaGgivHe2_fIOSNQcC0aqIvkG2zUrR0qEQ&usqp=CAU"
                />
              </div>
              <Input
                type="file"
                required
                className="flex justify-center pl-24"
                onChange={handleFileChange}
              />
            </div>
          )}
          {member && (
            <Form.Item
              name="relation"
              label="Relation"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                {member?.parents?.length === 0 && (
                  <Option value="Parent">Parent</Option>
                )}
                {member?.parents?.length > 0 && (
                  <Option value="Sibling">Sibling</Option>
                )}
                {member?.spouse?.length > 0 && member.gender === "male" && (
                  <Option value="Child">Child</Option>
                )}

                {member?.spouse?.length === 0 && (
                  <Option value="Spouse">Spouse</Option>
                )}
              </Select>
            </Form.Item>
          )}
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              {/* <Option value="other">other</Option> */}
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
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="bg-green-500">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
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

export default AddMemberModal;
