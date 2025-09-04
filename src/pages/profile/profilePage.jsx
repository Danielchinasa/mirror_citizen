import React, { useEffect, useState } from "react";
import { Card, Row, Col, notification } from "antd";
import { Typography, Input, Avatar } from "antd";
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
  DynamicTextArea,
} from "../../globalStyles";
import { updateProfile, logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import defaultDp from "../../images/defaultDp.png";
import defaultDpDark from "../../images/defaultDpDark.png";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import { useDropzone } from "react-dropzone";
import { imageBaseUrl } from "../../apiConfig";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userDetails);
  const accessToken = useSelector((state) => state.user);
  const userType = accessToken?.userType;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    phoneNumber: user?.phoneNumber || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    nin: user?.nin || "",
    businessName: user?.businessName || "",
    rcNumber: user?.rcNumber || "",
    designation: user?.designation || "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userToken = accessToken?.jwtToken || "";
  const tokenExpire = user?.expirationDate || "";
  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  const { isDark } = useTheme();

  const [profileImageNew, setProfileImageNew] = useState(null);

  useEffect(() => {
    if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: userDetails.firstName || "",
        phoneNumber: userDetails.phoneNumber || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        address: userDetails.address || "",
        nin: userDetails.nin || "",
        businessName: userDetails.businessName || "",
        rcNumber: userDetails.rcNumber || "",
        designation: userDetails.designation || "",
      }));
    }
  }, [userDetails]);

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, [dispatch, userToken]);

  useEffect(() => {
    const expireDate = new Date(tokenExpire);
    const currentDate = new Date();
    if (currentDate >= expireDate) {
      dispatch(logout());
      history.push("/");
    }
  }, [dispatch, history, tokenExpire]);

  // Utility function to remove empty fields
  const cleanPayload = (data) => {
    const cleaned = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
        cleaned[key] = data[key];
      }
    }
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new payload that only includes fields with data
    const payload = cleanPayload(formData);

    // Only add the profileImage field if a new one was uploaded
    if (profileImageNew) {
      payload.profileImage = profileImageNew.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
    }

    try {
      const response = await dispatch(updateProfile(payload, userToken));
      if (response === "success") {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "Successfully updated profile",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
        });
        dispatch(fetchUserProfile(userToken));
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImageNew(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImage: reader.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 2 * 1024 * 1024, // 2MB
    onDrop,
  });

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Card
            style={{
              width: "100%",
              marginBottom: "30px",
              backgroundColor: bgContainer,
              borderColor: text,
            }}
          >
            {userType?.toLowerCase() === "individual" ? (
              <Title level={4}>Personal Information</Title>
            ) : (
              <Title level={4}>Business Information</Title>
            )}
            <Subtitle $token={token}>Update your profile details here</Subtitle>
          </Card>
          <Row
            justify="space-between"
            style={{ marginTop: "30px", marginBottom: "20px" }}
          >
            <Col span={24} style={{ marginBottom: "30px" }}>
              <Title level={4} style={{ color: text }}>
                Upload Profile Picture
              </Title>
              <Row gutter={24} align="middle">
                <Col xs={24} sm={12}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "2px dashed #aaa",
                      padding: "30px",
                      textAlign: "center",
                      borderRadius: "8px",
                      backgroundColor: isDark ? "#1f1f1f" : "#fafafa",
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p style={{ marginBottom: 0, color: text }}>
                      📁 Drag & drop an image here, or click to select one
                    </p>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      (JPG/PNG, max 2MB)
                    </Text>
                  </div>
                </Col>
                <Col xs={24} sm={12} style={{ textAlign: "center" }}>
                  {profileImageNew ? (
                    <Avatar
                      size={154}
                      src={profileImageNew}
                      style={{ border: "2px solid #ddd" }}
                    />
                  ) : userDetails?.profileImageLocation ? (
                    <Avatar
                      size={154}
                      src={`${imageBaseUrl}${userDetails.profileImageLocation}`}
                      style={{ border: "2px solid #ddd" }}
                    />
                  ) : (
                    <Avatar
                      size={154}
                      src={isDark ? defaultDpDark : defaultDp}
                      style={{ border: "2px solid #ddd" }}
                    />
                  )}
                </Col>
              </Row>
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
              {userType?.toLowerCase() === "individual" ? (
                <>
                  <StyledLabel $token={token}>First Name</StyledLabel>
                  <StyledInput
                    $token={token}
                    value={formData.firstName}
                    name="firstName"
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  ></StyledInput>
                </>
              ) : (
                <>
                  <StyledLabel $token={token}>Business Name</StyledLabel>
                  <StyledInput
                    $token={token}
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
              {userType?.toLowerCase() === "individual" ? (
                <>
                  <StyledLabel $token={token}>Last Name</StyledLabel>
                  <StyledInput
                    $token={token}
                    value={formData.lastName}
                    name="lastName"
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                  ></StyledInput>
                </>
              ) : (
                <>
                  <StyledLabel $token={token}>RC Number</StyledLabel>
                  <StyledInput
                    $token={token}
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
              <StyledLabel $token={token}>Email</StyledLabel>
              <StyledInput
                $token={token}
                disabled={true}
                value={formData.email}
                name="email"
                style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
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
              <StyledLabel $token={token}>Phone number</StyledLabel>
              <StyledInput
                // disabled={!!user?.phoneNumber}
                style={
                  user?.phoneNumber
                    ? { backgroundColor: "#f5f5f5", cursor: "not-allowed" }
                    : {}
                }
                $token={token}
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </Col>

            <Col
              span={12}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              hidden={true}
            >
              <StyledLabel $token={token}>Address</StyledLabel>
              <DynamicTextArea
                $token={token}
                rows={4}
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Col>
            <Col
              span={12}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              hidden={true}
            >
              <StyledLabel $token={token}>NIN</StyledLabel>
              <StyledInput
                $token={token}
                value={formData.nin}
                name="nin"
                onChange={(e) => handleInputChange("nin", e.target.value)}
              ></StyledInput>
            </Col>
            <Col hidden={true}>
              {userType?.toLowerCase() === "business" && (
                <>
                  <StyledLabel $token={token}>Designation</StyledLabel>
                  <StyledInput
                    $token={token}
                    value={formData.designation}
                    name="designation"
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  ></StyledInput>
                </>
              )}
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
            <OutlineButton $token={token} type="primary">
              Change Password
            </OutlineButton>
          </BtnLink>
        </InfoSec>
      </Container>
    </div>
  );
};

export default ProfilePage;
