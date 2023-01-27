import { Button, Form, Input, Modal, Select } from "antd";
import { UpdateFamilyMember } from "../../APIs/familyApis";
import { useState } from "react";
const { Option } = Select;

const EditMemberModal = ({ isModalOpen, setIsModalOpen, member }: any) => {
  const memId = member.id;
  const [gender, setGerder] = useState(member.gender);
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
    const tmp = { ...member };
    tmp.name = values.name;
    tmp.imgLink = values.imgLink;
    // tmp.gender = values.gender;
    console.log(
      "🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ member",
      member
    );
    console.log("🚀 ~ file: editMemberModal.tsx:27 ~ onFinish ~ tmp", tmp);
    const updated = await UpdateFamilyMember(tmp);
    console.log(updated);
    if (updated) setIsModalOpen(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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

          <Form.Item
            initialValue={member.imgLink}
            name="imgLink"
            label="Image"
            rules={[{ required: true }]}
          >
            <Input />
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditMemberModal;
