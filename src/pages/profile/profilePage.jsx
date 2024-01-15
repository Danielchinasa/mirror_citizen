import React from "react";
import { Card, Row, Col } from "antd";
import { Typography, Input } from "antd";

import {
  Container,
  Heading,
  InfoSec,
  StyledLabel,
  Subtitle,
  MainButton,
  StyledInput,
  OutlineButton,
  BtnLink,
} from "../../globalStyles";
import { updateProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import { LoadingOutlined, ManOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const user = useSelector((state) => state.user);
  const userFirstName = user?.user?.firstName || "";
  const userLastName = user?.user?.lastName || "";
  const userBal = user?.user?.walletBalance;
  const email = user?.user?.email;
  const phoneNumber = user?.user?.phoneNumber;
  const address = user?.user?.address;
  const nin = user?.user?.nin;
  const userType = user?.user?.userType;
  console.log(userType);
  const { Title } = Typography;
  const [formData, setFormData] = useState({
    firstName: userFirstName,
    phoneNumber: phoneNumber,
    lastName: userLastName,
    email: email,
    address: address,
    nin: nin,
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const history = useHistory();

  const dispatch = useDispatch();
  const userToken = user?.jwtToken || "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data
    try {
      const response = await dispatch(updateProfile(formData, userToken));

      console.log(response);
      if (response === "success") {
        console.log(response);
        // Handle further actions if needed
        // history.push("/consent");
        dispatch({
          type: "UPDATE_USER_DETAILS",
          payload: {
            user: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              address: formData.address,
              // Add other fields as needed
            },
            jwtToken: userToken,
          },
        });
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
  const { TextArea } = Input;
  return (
    <Container>
      <InfoSec>
        <Card
          style={{
            width: "100%",
          }}
        >
          {userType == "individual" && (
            <Title level={4}>Personal Information</Title>
          )}
          {userType == "business" && (
            <Title level={4}>Business Information</Title>
          )}

          <Subtitle>Update your profile details here</Subtitle>
        </Card>
        <Row justify="space-between" style={{ marginTop: "30px" }}>
          <Col span={12}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            {userType == "individual" && (
              <>
                <StyledLabel>First Name</StyledLabel>
                <StyledInput
                  value={formData.firstName}
                  name="firstName"
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                ></StyledInput>
              </>
            )}
            {userType == "business" && (
              <>
                <StyledLabel>Business Name</StyledLabel>
                <StyledInput
                  value={formData.businessName}
                  name="businessName"
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                ></StyledInput>
              </>
            )}
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            {userType == "individual" && (
              <>
                <StyledLabel>Last Name</StyledLabel>
                <StyledInput
                  value={formData.lastName}
                  name="lastName"
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                ></StyledInput>
              </>
            )}
            {userType == "business" && (
              <>
                <StyledLabel>RC Number</StyledLabel>
                <StyledInput
                  value={formData.rcNumber}
                  name="rcNumber"
                  onChange={(e) =>
                    handleInputChange("rcNumber", e.target.value)
                  }
                ></StyledInput>
              </>
            )}
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Email</StyledLabel>
            <StyledInput
              value={formData.email}
              name="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            ></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Phone number</StyledLabel>
            <StyledInput
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            ></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>NIN</StyledLabel>
            <StyledInput
              value={formData.nin}
              name="nin"
              onChange={(e) => handleInputChange("nin", e.target.value)}
            ></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Address</StyledLabel>
            <TextArea
              rows={4}
              name="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </Col>
        </Row>
        <MainButton
          type="primary"
          onClick={handleSubmit}
          style={{ marginRight: "20px", marginTop: "20px" }}
        >
          Update Profile
        </MainButton>
        <BtnLink to="/set-new-password" style={{ marginTop: "20px" }}>
          <OutlineButton type="primary">Change Password</OutlineButton>
        </BtnLink>
      </InfoSec>
    </Container>
  );
};

export default ProfilePage;
