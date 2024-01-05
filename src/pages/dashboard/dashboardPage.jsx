import {
  Checkbox,
  Col,
  DatePicker,
  message,
  Row,
  Button,
  Upload,
  Avatar,
  List,
  Divider,
  Space,
  Radio,
  Form,
  Tooltip,
  notification,
} from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Heading,
  Heading4,
  Heading6,
  Img,
  InfoSec,
  MainButtonFull,
  OutlineButtonFull,
  StyledInput,
  StyledLabel,
  DisabledButtonFull,
  StyledForm,
} from "../../globalStyles";

import { InfoCircleOutlined, CameraOutlined } from "@ant-design/icons";
import banner from "../../images/banner.png";
import tick from "../../images/tick.png";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationRequest } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const dateFormat = "YYYY/MM/DD";

const DashboardPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nin: "",
    phone: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    rc: "",
    business_name: "",
    bvn: "",
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    handleInputChange("dob", dateString);
  };

  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data
    try {
      const response = await dispatch(
        sendVerificationRequest(formData, userToken)
      );

      console.log("response");
      console.log(response);
      if (
        (response.basic && response.basic.message === "NO_HIT") ||
        response.business.message === "NO_HIT"
      ) {
        // Display Ant Design notification when NO_HIT
        notification.error({
          message: "Input value not found",
          description: "Please check your input value and try again.",
        });
      } else if (
        response.business &&
        response.business.message === "Awaiting Consent"
      ) {
        localStorage.setItem(
          "verificationRequestId",
          response.business.data.requestId
        );
        // Handle further actions if needed
        history.push("/consent");
      } else {
        // Display error message
        // message.error(response.message || "OTP verification failed");
        // Handle further actions if needed
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error sending verification", error);
    }
  };

  const data = [
    {
      title:
        "The parameter(s) you select will appear here for you to input your search data.",
    },
    {
      title: "Multiple Profiles may be selected as required.",
    },
    {
      title:
        "When you have completed your selection(s), input your search data and proceed to payment.",
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState("basic"); // Default selected form
  const [selectedForm, setSelectedForm] = useState("none"); // Default selected form

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const onChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  const tooltipContentBasic =
    "A Basic Identity Profile gives the distinct characteristics, attributes and information that uniquely identifies an individual. Searchable parameters are NIN, demographics, face, fingerprint, and phone number.";
  const tooltipContentBusiness =
    "A business profile is a set of information and data that are used to confirm and validate the identity of a business or organization. Searchable parameters are registration number(RC), and business name.";
  const tooltipContentFinancial =
    "A financial credit profile is a report card that tells how responsible you are with borrowing and repaying money. It helps lenders decide if they can trust you with a loan or credit. Search parameter is bank verification number (BVN).";

  const [serviceFee, setServiceFee] = useState(0);
  const [vat, setVat] = useState(0);

  const updateServiceFee = (profile) => {
    // Set the service fee based on the selected profile
    if (profile === "nin") {
      setServiceFee(50); // Set the service fee for NIN
    } else if (profile === "phone") {
      setServiceFee(50); // Set the service fee for Phone
    } else if (profile === "demographics") {
      setServiceFee(50); // Set the service fee for Phone
    } else if (profile === "face") {
      setServiceFee(200); // Set the service fee for Phone
    } else if (profile === "rc") {
      setServiceFee(1000); // Set the service fee for Phone
    } else if (profile === "business_name") {
      setServiceFee(1000); // Set the service fee for Phone
    } else if (profile === "bvn") {
      setServiceFee(10); // Set the service fee for Phone
    } else {
      setServiceFee(0); // Set a default value or handle other profiles
    }
    const calculatedVat = serviceFee * 0.1;
    setVat(calculatedVat);
  };
  useEffect(() => {
    updateServiceFee(selectedForm);
  }, [selectedForm]);
  useEffect(() => {
    // Calculate VAT as 10% of the service fee
    const calculatedVat = serviceFee * 0.1;
    setVat(calculatedVat);
  }, [serviceFee]);

  const [liveFaceNin, setLiveFaceNin] = useState("");
  const [isLiveFaceNinValid, setIsLiveFaceNinValid] = useState(true);
  const [makePaymentClicked, setMakePaymentClicked] = useState(false);

  const handleLiveFaceNinChange = (e) => {
    const value = e.target.value;

    // Validate that it contains only numbers and is 11 digits
    const isValid = /^\d{11}$/.test(value);

    setLiveFaceNin(value);
    setIsLiveFaceNinValid(isValid);
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Row>
      <Col>
        <Img src={banner} />
      </Col>
      <Container>
        <StyledForm>
          <InfoSec>
            <Heading>Identity Verification Service</Heading>

            <Row gutter={[50, 50]}>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                {/* <MainButtonFull type="primary">Step 1</MainButtonFull> */}

                <Heading6> Select Profile</Heading6>

                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                  }}
                >
                  <Row
                    onClick={() => setSelectedProfile("basic")}
                    style={{
                      backgroundColor:
                        selectedProfile === "basic" ? "#0DC939" : "#EAFFF0",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "10px",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      color: "#000000",
                    }}
                  >
                    <Col span={21}>Basic Identity Profile</Col>
                    <Col span={3}>
                      <Tooltip title={tooltipContentBasic} color="#F4B40F">
                        <InfoCircleOutlined
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  {selectedProfile === "basic" && (
                    <Form>
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio
                            value="nin"
                            size="large"
                            onClick={() => setSelectedForm("nin")}
                          >
                            National Identity Number (NIN)
                          </Radio>
                          <Radio
                            value="phone"
                            onClick={() => setSelectedForm("phone")}
                          >
                            {" "}
                            Phone Number{" "}
                          </Radio>
                          <Radio
                            value="demographics"
                            onClick={() => setSelectedForm("demographics")}
                          >
                            Demographics
                          </Radio>
                          <Radio
                            value="face"
                            onClick={() => setSelectedForm("face")}
                          >
                            Face{" "}
                          </Radio>
                          <Radio
                            value="fingerprint"
                            onClick={() => setSelectedForm("fingerprint")}
                          >
                            Fingerprint
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form>
                  )}
                  <Row
                    onClick={() => setSelectedProfile("business")}
                    style={{
                      backgroundColor:
                        selectedProfile === "business" ? "#0DC939" : "#EAFFF0",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "10px",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      color: "#000000",
                    }}
                  >
                    <Col span={21}>Business Profile</Col>
                    <Col span={3}>
                      <Tooltip title={tooltipContentBusiness} color="#F4B40F">
                        <InfoCircleOutlined
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  {selectedProfile === "business" && (
                    <Form>
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio
                            value="rc"
                            size="large"
                            onClick={() => setSelectedForm("rc")}
                          >
                            Registration Number (RC)
                          </Radio>
                          <Radio
                            value="business_name"
                            onClick={() => setSelectedForm("business_name")}
                          >
                            {" "}
                            Business Name{" "}
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form>
                  )}
                  <Row
                    onClick={() => setSelectedProfile("financial")}
                    style={{
                      backgroundColor:
                        selectedProfile === "financial" ? "#0DC939" : "#EAFFF0",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "10px",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      color: "#000000",
                    }}
                  >
                    <Col span={21}>Financial Credit Profile</Col>
                    <Col span={3}>
                      <Tooltip title={tooltipContentFinancial} color="#F4B40F">
                        <InfoCircleOutlined
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  {selectedProfile === "financial" && (
                    <Form>
                      <Radio
                        value="bvn"
                        size="large"
                        onClick={() => setSelectedForm("bvn")}
                      >
                        Bank Verification Number (BVN)
                      </Radio>
                    </Form>
                  )}
                </Space>
              </Col>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Heading6>Input Parameters</Heading6>
                {selectedForm === "none" && (
                  <>
                    <p>
                      Select a Profile to verify and the parameter(s) you want
                      to search with.
                    </p>

                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={tick} />}
                            title={item.title}
                          />
                        </List.Item>
                      )}
                    />
                  </>
                )}

                {selectedForm === "nin" && (
                  <>
                    <StyledLabel>National Identity Number (NIN)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter your nin"
                      name="nin"
                      value={formData.nin}
                      onChange={(e) => handleInputChange("nin", e.target.value)}
                    />
                  </>
                )}

                {selectedForm === "phone" && (
                  <>
                    <StyledLabel>Phone Number*</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Enter your Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </>
                )}

                {selectedForm === "demographics" && (
                  <>
                    <StyledLabel>First Name*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                    <StyledLabel>Last Name*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                    <Row gutter={12}>
                      <Col
                        span={8}
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <StyledLabel>Date of Birth*</StyledLabel>
                        <DatePicker
                          format={dateFormat}
                          size="large"
                          name="dob"
                          onChange={handleDateChange}
                        />
                      </Col>
                      <Col
                        span={8}
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <StyledLabel>Gender*</StyledLabel>
                        <Radio.Group
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          value={formData.gender}
                        >
                          <Space>
                            <Radio value="male" size="large">
                              Male
                            </Radio>
                            <Radio value="female">Female</Radio>
                          </Space>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </>
                )}
                {selectedForm === "face" && (
                  <>
                    <StyledLabel>National Identity Number (NIN)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter National Identity Number"
                      name="nin"
                      value={liveFaceNin}
                      onChange={handleLiveFaceNinChange}
                      onChangeCapture={(e) =>
                        handleInputChange("nin", e.target.value)
                      }
                      // onChange={
                      //   handleLiveFaceNinChange();
                      //   handleInputChange("nin", e.target.value);
                      // }}
                      style={{
                        borderColor: isLiveFaceNinValid ? "" : "red",
                      }}
                    />
                    {/* <StyledInput
                      type="number"
                      placeholder="Enter your Phone Number"
                      name="nin"
                      value={formData.nin}
                      onChange={(e) => handleInputChange("nin", e.target.value)}
                    /> */}

                    {!isLiveFaceNinValid && (
                      <p style={{ color: "red" }}>NIN cannot be empty</p>
                    )}
                    <StyledLabel>
                      Upload File or take a live face capture*
                    </StyledLabel>

                    <Row gutter={12}>
                      <Col
                        span={8}
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <Upload {...props}>
                          <Button type="primary" size="large">
                            Browse file
                          </Button>
                        </Upload>
                      </Col>
                      <Col
                        span={8}
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <Button
                          type="primary"
                          icon={<CameraOutlined />}
                          size="large"
                          onClick={() => {
                            const liveCaptureUrl = `https://41.184.212.26/${liveFaceNin}`;
                            if (
                              isLiveFaceNinValid &&
                              liveFaceNin.trim() !== ""
                            ) {
                              window.open(liveCaptureUrl, "_blank");
                            }
                          }}
                          disabled={
                            !isLiveFaceNinValid || liveFaceNin.trim() === ""
                          }
                        >
                          Live Capture
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
                {selectedForm === "rc" && (
                  <>
                    <StyledLabel>Registration Number (RC)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Registration Number"
                      name="rc"
                      value={formData.rc}
                      onChange={(e) => handleInputChange("rc", e.target.value)}
                    />
                  </>
                )}
                {selectedForm === "business_name" && (
                  <>
                    <StyledLabel>Business Name*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Business Name"
                      name="business_name"
                      value={formData.business_name}
                      onChange={(e) =>
                        handleInputChange("business_name", e.target.value)
                      }
                    />
                  </>
                )}
                {selectedForm === "bvn" && (
                  <>
                    <StyledLabel>Bank Verification Number (BVN)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Bank Verification Number"
                      name="bvn"
                      value={formData.bvn}
                      onChange={(e) => handleInputChange("bvn", e.target.value)}
                    />
                  </>
                )}
              </Col>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Heading6>Payment Summary</Heading6>
                <div style={{ backgroundColor: "#FAFBFC", padding: "15px" }}>
                  <p>Financial summary services</p>
                  <Divider />
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Profile: </p>
                    </Col>
                    <Col>
                      <p>{selectedProfile}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Service: </p>
                    </Col>
                    <Col>
                      <p>{selectedForm}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Service Fee: </p>
                    </Col>
                    <Col>
                      <p>₦{serviceFee.toFixed(2)}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Payment Reference: </p>
                    </Col>
                    <Col>
                      <p>9845904</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>VAT (Value Added Tax): </p>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <p>₦{vat.toFixed(2)}</p>
                    </Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 20 }}
                      lg={{ span: 20 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Total Amount Due: </p>
                    </Col>
                    <Col>
                      <p>{`₦${(serviceFee + vat).toFixed(2)}`}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </InfoSec>
          <Row
            justify="end"
            style={{ border: "1px solid #a9b3c1", marginBottom: "30px" }}
          >
            <Col
              span={8}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 7 }}
              lg={{ span: 7 }}
              style={{ textAlign: "right", padding: "10px" }}
            >
              <strong>
                <Checkbox onChange={onChange}>
                  I certify that I have read and accepted the e-citizen Privacy
                  Policy and Terms of Service
                </Checkbox>
              </strong>

              <MainButtonFull
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                disabled={!checkboxChecked}
                style={{
                  backgroundColor: checkboxChecked ? "#0DC939" : "#d9d9d9", // Set the colors based on checkbox state
                  borderColor: checkboxChecked ? "#0DC939" : "#d9d9d9",
                  cursor: checkboxChecked ? "pointer" : "not-allowed", // Change cursor based on checkbox state
                }}
              >
                Make Payment
              </MainButtonFull>
            </Col>
          </Row>
        </StyledForm>
      </Container>
    </Row>
  );
};

export default DashboardPage;
