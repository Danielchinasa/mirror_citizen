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
import slide from "../../images/slide.svg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;

const BusinessSignUp = () => {
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
                <BtnLink to="/individual/sign-up/3">
                  <Image src={slide} preview={false} />
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
                <StyledLabel>Business name</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your business name"
                />
                <StyledLabel>RC Number</StyledLabel>
                <StyledInput type="text" placeholder="Enter your RC number" />
                <StyledLabel>Office address</StyledLabel>
                <StyledInput type="text" placeholder="Enter office address" />
              </StyledForm>
              <BtnLink to={"/individual/sign-up/3"}>
                <Button type="primary" block size="large">
                  Next
                </Button>
              </BtnLink>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BusinessSignUp;
