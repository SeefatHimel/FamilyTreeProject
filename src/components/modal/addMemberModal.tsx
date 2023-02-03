import { Button, Form, Input, Modal, Select } from "antd";
import { AddFamilyMember, AddOriginFamilyMember } from "../../APIs/familyApis";
const { Option } = Select;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  member: any;
};

const AddMemberModal = ({ isModalOpen, setIsModalOpen, member }: Props) => {
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
      const response = await AddFamilyMember(values, memId);
      console.log("🚀 ~ file: modal.tsx:25 ~ onFinish ~ response", response);
    } else {
      const response = await AddOriginFamilyMember(values);
      console.log("🚀 ~ file: modal.tsx:25 ~ onFinish ~ response", response);
    }
    console.log(values);
    setIsModalOpen(false);
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
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="imgLink" label="Image" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

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
