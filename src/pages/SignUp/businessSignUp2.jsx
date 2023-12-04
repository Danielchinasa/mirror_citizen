import React, { useState } from "react";
import {
  Image,
  Typography,
  Button,
  Avatar,
  List,
  Space,
  Col,
  Row,
  Checkbox,
} from "antd";
import individual from "../../images/individual.svg";
import Corporate from "../../images/Corporate.svg";
import reg from "../../images/reg.jpg";
import slide2 from "../../images/slide2.svg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;

const BusinessSignUp2 = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];
  const [selectedDiv, setSelectedDiv] = useState(null);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <Row>
        <Col span={8} sm={0} xs={0} md={8} lg={8}>
          <Image src={reg} preview={false} />
        </Col>
        <Col span={13} sm={24} xs={24} md={13} lg={13}>
          <div className="p-5">
            <BtnLink to="/sign-up">
              <ArrowLeftOutlined
                style={{
                  fontSize: "25px",
                  color: "#000",
                }}
              />
            </BtnLink>

            <Row>
              <Col span={18} sm={24} xs={24} md={18} lg={18}>
                <Title>Create Account</Title>
              </Col>
              <Col span={6} sm={24} xs={24} md={6} lg={6}>
                <BtnLink to="/individual/sign-up/2">
                  <Image src={slide2} preview={false} />
                </BtnLink>
              </Col>
            </Row>

            <Title level={4}>BUSINESS ACCOUNT</Title>
            <Space
              size="large"
              direction="vertical"
              style={{
                display: "flex",
              }}
            >
              <StyledForm>
                <StyledLabel>Designation</StyledLabel>
                <StyledInput type="text" placeholder="Admin Officer" />
                <StyledLabel>First name</StyledLabel>
                <StyledInput type="text" placeholder="Enter your first name" />
                <StyledLabel>Last name</StyledLabel>
                <StyledInput type="text" placeholder="Enter your last name" />
                <StyledLabel>National Identification Number (NIN)</StyledLabel>
                <StyledInput type="text" placeholder="Enter your NIN" />
                <StyledLabel>Email address</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your Email address"
                />
                <StyledLabel>Phone number</StyledLabel>
                <StyledInput type="text" placeholder="Enter phone number" />
                <StyledLabel>Password</StyledLabel>
                <StyledInput type="text" placeholder="Create a password " />
                <StyledLabel>Confirm password</StyledLabel>
                <StyledInput type="text" placeholder="Re-enter the password " />
              </StyledForm>
              <BtnLink to={"/verify-otp"}>
                <Button type="primary" block size="large">
                  Proceed
                </Button>
              </BtnLink>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BusinessSignUp2;
