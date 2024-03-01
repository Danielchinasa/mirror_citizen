import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Image,
  Typography,
  notification,
  Space,
  Col,
  Row,
  Alert,
  Spin,
  Checkbox,
} from "antd";
import reg from "../../images/reg.jpg";
import slide2 from "../../images/slide2.svg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  MainButtonFull,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { BusinessSignUp } from "../../redux/actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../index.css";
import privacyPolicy from "../../privacyPolicy";
import { Modal } from "antd";
const { Title } = Typography;

const BusinessSignUp2 = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [ipAddress, setIpAddress] = useState("");
  const [ipCountry, setIpCountry] = useState("");
  const designationRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ninRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const [reenterPassword, setReenterPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nin: "",
    phoneNumber: "",
    email: "",
    password: "",
    rememberMe: false,
    userType: "",
    ipAddress: "",
    ipCountry: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const handlePhoneChange = (phone) => {
    // Update state using setPhone

    setPhone(phone);
    setFormData({
      ...formData,
      phoneNumber: phone,
    });
  };
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

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

  const focusOnErrorField = (fieldName) => {
    switch (fieldName) {
      case "designation":
        designationRef.current.focus();
        break;
      case "firstName":
        firstNameRef.current.focus();
        break;
      case "lastName":
        lastNameRef.current.focus();
        break;
      case "nin":
        ninRef.current.focus();
        break;
      case "email":
        emailRef.current.focus();
        break;
      // case "phoneNumber":
      //   phoneNumberRef.current.focus();
      //   break;
      case "password":
        passwordRef.current.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchIpCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIpCountry(response.data.country_name);
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setIpCountry(null);
      }
    };

    fetchIpCountry();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name === "reenterPassword") {
      setReenterPassword(value);
    }

    setFormData({
      ...formData,
      [name]: inputValue,
      userType: "business",
      ipAddress: ipAddress,
      ipCountry: ipCountry,
    });

    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const errors = {};
    // Designation
    if (!formData.designation) {
      errors.designation = "Please enter your Designation";
    }
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
    // if (!formData.phoneNumber) {
    //   errors.phoneNumber = "Please enter your phone number";
    // }

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
        const firstErrorField = Object.keys(errors)[0];
        focusOnErrorField(firstErrorField);
        return;
      }

      if (formData.password !== reenterPassword) {
        setFormErrors({ reenterPassword: "Passwords do not match" });
        focusOnErrorField("reenterPassword");
        return;
      }

      setFormErrors({});
      setLoading(true);
      // Retrieve localStorage data
      const localStorageData = JSON.parse(
        localStorage.getItem("businessFormData")
      );
      // Include localStorage data in the formData object
      const formDataWithLocalStorage = {
        ...formData,
        ...localStorageData,
      };

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(BusinessSignUp(formDataWithLocalStorage));
      const openNotification2 = (placement) => {
        api.error({
          message: `Notification`,
          description: response.message,
          placement,
        });
      };

      setLoading(true);
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Response from signUp:", response);
      // if (response.status !== 200) {
      //   throw new Error(response); // Throw an error with the response status text
      // }

      if (response === "success") {
        // On successful login, navigate to the main dashboard
        // console.log("I reach here");
        history.push("/verify-otp");
      } else {
        setFormErrors({ general: response.message }); // Set error message
        openNotification2("topRight");
      }
    } catch (error) {
      console.error("SignUp failed:", error);
      notification.error({
        message: "Server Error",
        description: error.message || "An error occurred while signing up.",
      });
    } finally {
      setLoading(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleClickPrivacyPolicy = () => {
    // Import the PDF file using require
    // const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");

    // // Open the PDF in a new tab
    // window.open(pdf, "_blank");
    setIsOpen(true);
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
                  <Image
                    src={slide2}
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
              <Spin spinning={loading} tip="Signing Up...">
                <StyledForm onSubmit={handleSignUp}>
                  {formErrors.general && (
                    <Alert
                      message={formErrors.general}
                      type="error"
                      showIcon
                      style={{ marginBottom: "16px" }}
                    />
                  )}
                  <StyledLabel>Designation</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Admin Officer"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    ref={designationRef}
                  />
                  {formErrors.designation && (
                    <Alert
                      message={formErrors.designation}
                      type="error"
                      showIcon
                    />
                  )}
                  <StyledLabel>First name</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    ref={firstNameRef}
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
                    ref={lastNameRef}
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
                    type="text"
                    placeholder="Enter your NIN"
                    name="nin"
                    value={formData.nin}
                    onChange={handleInputChange}
                    pattern="[0-9]*" // Allow only numbers
                    title="Please enter only numbers"
                    ref={ninRef}
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
                    ref={emailRef}
                  />
                  {formErrors.email && (
                    <Alert message={formErrors.email} type="error" showIcon />
                  )}
                  <StyledLabel>Phone number</StyledLabel>
                  <PhoneInput
                    country={"ng"}
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    enableSearch
                    onFocus={handleFocus}
                    className={"input-phone-number mb-3"}
                    inputStyle={{
                      width: "100%",
                      borderColor: isFocused ? "#09c93a" : "",
                      borderRadius: "5px",
                      background: "rgba(53, 65, 56, 0.1)",
                    }}
                  />
                  {/* <StyledInput
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]*" // Allow only numbers
                    title="Please enter only numbers"
                    ref={phoneNumberRef}
                  /> */}
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
                    ref={passwordRef}
                  />
                  {formErrors.password && (
                    <Alert
                      message={formErrors.password}
                      type="error"
                      showIcon
                    />
                  )}
                  <StyledInput
                    type="hidden"
                    placeholder="Create a password "
                    name="userType"
                    value="business"
                    onChange={(e) =>
                      handleInputChange("userType", e.target.value)
                    }
                  />
                  <StyledLabel>Confirm password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Re-enter the password "
                    name="reenterPassword"
                    value={reenterPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.reenterPassword && (
                    <Alert
                      message={formErrors.reenterPassword}
                      type="error"
                      showIcon
                    />
                  )}
                  <Checkbox onChange={onChange}>
                    I certify that I have read and accepted the{" "}
                    <span
                      style={{ color: "#09C93A", cursor: "pointer" }}
                      onClick={handleClickPrivacyPolicy}
                    >
                      e-citizen™ Privacy Policy
                    </span>
                  </Checkbox>
                  <Modal
                    title="Privacy Policy"
                    visible={isOpen}
                    centered
                    // open={open}
                    onOk={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    width={1000}
                  >
                    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
                  </Modal>
                  <MainButtonFull type="primary" htmlType="submit">
                    Proceed
                  </MainButtonFull>
                </StyledForm>
              </Spin>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BusinessSignUp2;
