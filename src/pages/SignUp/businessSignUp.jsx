import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Typography, Button, Alert, Space, Col, Row } from "antd";
import reg from "../../images/Verify_NIN_on_ecitizen.jpg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import slide from "../../images/slide.svg";
const { Title } = Typography;

const BusinessSignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    businessName: "",
    rcNumber: "",
    officeAddress: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Business Name
    if (!formData.businessName) {
      errors.businessName = "Please enter your business name";
    }

    // RC Number
    if (!formData.rcNumber) {
      errors.rcNumber = "Please enter your RC number";
    }

    // Office Address
    if (!formData.officeAddress) {
      errors.officeAddress = "Please enter your office address";
    }

    return errors;
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value, userType: "business" });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const handleNext = (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If validation passes, proceed with the next step or API call
    // For now, let's store the form data in localStorage and log it
    localStorage.setItem("businessFormData", JSON.stringify(formData));

    // Navigate to the next page
    history.push("/individual/sign-up/3");
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
                  <Image
                    src={slide}
                    preview={false}
                    style={{ cursor: "pointer" }}
                  />
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
              <StyledForm onSubmit={handleNext}>
                {formErrors.general && (
                  <Alert
                    message={formErrors.general}
                    type="error"
                    showIcon
                    style={{ marginBottom: "16px" }}
                  />
                )}

                <StyledLabel>Business name</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your business name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                />
                {formErrors.businessName && (
                  <Alert
                    message={formErrors.businessName}
                    type="error"
                    showIcon
                  />
                )}

                <StyledLabel>RC Number</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your RC number"
                  name="rcNumber"
                  value={formData.rcNumber}
                  onChange={(e) =>
                    handleInputChange("rcNumber", e.target.value)
                  }
                />
                {formErrors.rcNumber && (
                  <Alert message={formErrors.rcNumber} type="error" showIcon />
                )}

                <StyledLabel>Office address</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter office address"
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={(e) =>
                    handleInputChange("officeAddress", e.target.value)
                  }
                />
                {formErrors.officeAddress && (
                  <Alert
                    message={formErrors.officeAddress}
                    type="error"
                    showIcon
                  />
                )}

                <Button type="primary" block size="large" htmlType="submit">
                  Next
                </Button>
              </StyledForm>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BusinessSignUp;
