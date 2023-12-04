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
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;

const IndividualSignUp = () => {
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
            <Title>Create Account</Title>
            <Title level={4}>INDIVIDUAL ACCOUNT</Title>
            <Space
              size="large"
              direction="vertical"
              style={{
                display: "flex",
              }}
            >
              <StyledForm>
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
                <StyledInput
                  type="text"
                  placeholder="Enter your phone number"
                />
                <StyledLabel>Password</StyledLabel>
                <StyledInput type="text" placeholder="Create a password " />
                <StyledLabel>Confirm Password</StyledLabel>
                <StyledInput type="text" placeholder="Re-enter the password " />
                <Checkbox onChange={onChange}>
                  I certify that I have read and accepted the e-citizen™ Privacy
                  Policy
                </Checkbox>
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

export default IndividualSignUp;
