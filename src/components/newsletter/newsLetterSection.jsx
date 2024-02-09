import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;

const NewsletterSection = ({ visible, onClose }) => {
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log("Submitted values:", values);
    // You can add additional logic here, such as sending the form data to a server
    // and then close the modal using onClose()
    onClose();
  };

  return (
    <Modal
      // title="Subscribe to Our Newsletter"
      title={
        <h2 style={{ fontSize: "25px", textAlign: "center" }}>
          Subscribe to Our Newsletter
        </h2>
      }
      titleFontSize={30}
      visible={visible}
      centered
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <p style={{ textAlign: "center" }}>
        Be the first to get news about E-citizen
      </p>
      <Form name="newsletter" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email!",
            },
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Subscribe
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewsletterSection;
