import React, { useEffect } from "react";
import { Card, Row, Col, notification } from "antd";
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
  DynamicTextArea,
} from "../../globalStyles";
import { updateProfile, logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import { LoadingOutlined, ManOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";
import defaultDp from "../../images/defaultDp.png";
import defaultDpDark from "../../images/defaultDpDark.png";
import { Button, Image } from "antd";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import { useDropzone } from "react-dropzone";

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
  const [profileImage, setProfileImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState();
  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setProfileImage(url);
        setFormData({
          ...formData,
          profileImage: url.replace(/^data:image\/[a-z]+;base64,/, ""),
        });
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
  const userFirstName = user?.firstName || "";
  const userLastName = user?.lastName || "";
  const userBal = user?.walletBalance;
  const email = user?.email;
  const phoneNumber = user?.phoneNumber;
  const address = user?.address;
  const nin = user?.nin;
  const businessName = user?.businessName;
  const rcNumber = user?.rcNumber;
  const designation = user?.designation;
  const walletBalance = user?.walletBalance;
  const userType = user?.userType;
  const userImage = user?.profileImageLocation;
  console.log(userType);
  const { Title } = Typography;
  const [formData, setFormData] = useState({
    firstName: userFirstName,
    phoneNumber: phoneNumber,
    lastName: userLastName,
    email: email,
    address: address,
    nin: nin,
    businessName: businessName,
    profileImage: profileImage,
    rcNumber: rcNumber,
    designation: designation,
    walletBalance: walletBalance,
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
  const userToken = user?.jwtToken || "";
  const tokenExpire = user?.expirationDate || "";

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    // Compare the current date with the expiration date
    if (currentDate >= expireDate) {
      dispatch(logout());
      history.push("/");
    } else {
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data
    try {
      const response = await dispatch(updateProfile(formData, userToken));

      console.log(response);
      if (response === "success") {
        // console.log(response);

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
        window.location.reload();
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
            walletBalance: formData.walletBalance,
            firstName: formData.firstName,
            lastName: formData.lastName,
            jwtToken: userToken,
          },
        });
      } else {
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error sending verification", error);
    }
  };
  const { TextArea } = Input;
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

  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  const { isDark } = useTheme();

  const [profileImageNew, setProfileImageNew] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImageNew(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          ),
        });
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
            {userType == "individual" && (
              <Title level={4}>Personal Information</Title>
            )}
            {userType == "business" && (
              <Title level={4}>Business Information</Title>
            )}

            <Subtitle $token={token}>Update your profile details here</Subtitle>
          </Card>
          <Row
            justify="space-between"
            style={{ marginTop: "30px", marginBottom: "20px" }}
          >
            <Col span={12}>
              <div>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #ddd",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    width: "500px",
                  }}
                >
                  <input {...getInputProps()} />
                  <p style={{ color: text }}>
                    Drag & drop an image here, or click to select one
                  </p>
                </div>
                {profileImageNew && (
                  <img
                    src={profileImageNew}
                    alt="Profile Preview"
                    width={200}
                  />
                )}
              </div>
              {/* <div style={{ display: "inline-block", position: "relative" }}>
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  style={{ marginBottom: "20px" }}
                  showUploadList={true}
                  action="https://jsonplaceholder.typicode.com/posts"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              <Subtitle style={{ marginTop: "20px" }} $token={token}>
                Update your profile image here (Max Size: 800kb)
              </Subtitle>
              <StyledInput
                $token={token}
                hidden={false}
                value={formData.profileImageNew}
                name="profileImage"
                onChange={(e) =>
                  setFormData({ ...formData, profileImage: e.target.value })
                }
              /> */}
            </Col>
          </Row>

          <Row gutter={40}>
            <Col span={24}>
              {" "}
              <Image
                width={200}
                // src={`https://e-citizen.ng:8443${userDetails.profileImageLocation}`}
                src={
                  userDetails && userDetails?.profileImageLocation
                    ? `https://e-citizen.ng:8443${userDetails?.profileImageLocation}`
                    : isDark
                    ? defaultDpDark
                    : defaultDp
                }
              />
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
              )}
              {userType == "business" && (
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
              {userType == "individual" && (
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
              )}
              {userType == "business" && (
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
                value={formData.email}
                name="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              ></StyledInput>
              <StyledInput
                $token={token}
                value={formData.walletBalance}
                name="walletBalance"
                hidden="true"
                onChange={(e) =>
                  handleInputChange("walletBalance", e.target.value)
                }
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
                $token={token}
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              ></StyledInput>
            </Col>
            <Col
              span={12}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
            >
              <StyledLabel $token={token}>NIN</StyledLabel>
              <StyledInput
                $token={token}
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
              <StyledLabel $token={token}>Address</StyledLabel>
              <DynamicTextArea
                $token={token}
                rows={4}
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Col>
            <Col>
              {userType == "business" && (
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
