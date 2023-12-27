import React from "react";
import { Card, Row, Col } from "antd";
import { Typography } from "antd";

import {
  Container,
  Heading,
  InfoSec,
  StyledLabel,
  Subtitle,
  MainButton,
  StyledInput,
} from "../../globalStyles";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  const userType = user?.user?.userType;
  console.log(userType);
  const { Title } = Typography;
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
          <Col span={12} style={{ textAlign: "end" }}>
            <MainButton type="primary">Update Profile</MainButton>
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
            <StyledLabel>First Name</StyledLabel>
            <StyledInput value={userFirstName}></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Last Name</StyledLabel>
            <StyledInput value={userLastName}></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Email</StyledLabel>
            <StyledInput value={email}></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Phone number</StyledLabel>
            <StyledInput value={phoneNumber}></StyledInput>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledLabel>Address</StyledLabel>
            <StyledInput value={address}></StyledInput>
          </Col>
        </Row>
      </InfoSec>
    </Container>
  );
};

export default ProfilePage;
