import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";

import {
  Image,
  Typography,
  Button,
  Alert,
  notification,
  Space,
  Col,
  Row,
  Checkbox,
  Spin,
} from "antd";
import { useHistory } from "react-router-dom";

import reg from "../../images/reg.jpg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
  MainButtonFull,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { signUp } from "../../redux/actions";
const { Title } = Typography;

const IndividualSignUp = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];
  // const [selectedDiv, setSelectedDiv] = useState(null);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nin: "",
    phoneNumber: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification`,
      description: "response.message",
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });

    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const errors = {};
    // First Name
    if (!formData.firstName) {
      errors.firstName = "Please enter your first name";
    }

    // Last Name
    if (!formData.lastName) {
      errors.lastName = "Please enter your last name";
    }

    // NIN
    if (!formData.nin) {
      errors.nin = "Please enter your National Identification Number (NIN)";
    } else if (formData.nin.length != 11) {
      errors.nin = "NIN must be 11 characters";
    }
    if (!formData.email) {
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    // Phone Number
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setFormErrors({});
      setLoading(true);

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(signUp(formData));
      const openNotification2 = (placement) => {
        api.error({
          message: `Notification`,
          description: response.message,
          placement,
        });
      };

      console.log("Response from signUp:", response);

      if (response.status === "failed") {
        setFormErrors({ general: response.message }); // Set error message
        openNotification2("topRight");
      } else {
        // On successful login, navigate to the main dashboard
        history.push("/verify-otp");
      }
    } catch (error) {
      console.error("SignUp failed:", error);
    } finally {
      setLoading(false);
    }
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
              <Spin spinning={loading} tip="Logging in...">
                <StyledForm onSubmit={handleSignUp}>
                  {formErrors.general && (
                    <Alert
                      message={formErrors.general}
                      type="error"
                      showIcon
                      style={{ marginBottom: "16px" }}
                    />
                  )}
                  <StyledLabel>First name</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {formErrors.firstName && (
                    <Alert
                      message={formErrors.firstName}
                      type="error"
                      showIcon
                    />
                  )}

                  <StyledLabel>Last name</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastName && (
                    <Alert
                      message={formErrors.lastName}
                      type="error"
                      showIcon
                    />
                  )}
                  <StyledLabel>
                    National Identification Number (NIN)
                  </StyledLabel>
                  <StyledInput
                    type="number"
                    placeholder="Enter your NIN"
                    name="nin"
                    value={formData.nin}
                    onChange={handleInputChange}
                  />
                  {formErrors.nin && (
                    <Alert message={formErrors.nin} type="error" showIcon />
                  )}
                  <StyledLabel>Email address</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Enter your Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <Alert message={formErrors.email} type="error" showIcon />
                  )}
                  <StyledLabel>Phone number</StyledLabel>
                  <StyledInput
                    type="number"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {formErrors.phoneNumber && (
                    <Alert
                      message={formErrors.phoneNumber}
                      type="error"
                      showIcon
                    />
                  )}
                  <StyledLabel>Password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Create a password "
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {formErrors.password && (
                    <Alert
                      message={formErrors.password}
                      type="error"
                      showIcon
                    />
                  )}
                  {/* <StyledInput
                  type="hidden"
                  placeholder="Create a password "
                  name="userType"
                  value="individual"
                  onChange={(e) =>
                    handleInputChange("userType", e.target.value)
                  }
                />
                {formErrors.userType && (
                  <Alert message={formErrors.userType} type="error" showIcon />
                )} */}
                  <StyledLabel>Confirm Password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Re-enter the password "
                  />
                  <Checkbox onChange={onChange}>
                    I certify that I have read and accepted the e-citizen™
                    Privacy Policy
                  </Checkbox>
                  <MainButtonFull type="primary" htmlType="submit">
                    Proceed
                  </MainButtonFull>
                </StyledForm>
              </Spin>
              {/* <BtnLink to={"/verify-otp"}> */}
              {/* <Button type="primary" block size="large" htmlType="submit">
                Proceed
              </Button> */}
              {/* </BtnLink> */}
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default IndividualSignUp;
