import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar, Spin, Tabs } from "antd";
import {
  Container,
  Heading,
  Heading4,
  InfoSec,
  StyledLabel,
  Heading6,
  CenterText,
  DynamicCard,
} from "../../globalStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVerificationResult,
  logout,
  fetchUserProfile,
} from "../../redux/actions";
import { Typography } from "antd";
import Icon, { RightOutlined, UserOutlined } from "@ant-design/icons";
import "../dashboard/emergency.css";
import {
  FaRegUser,
  FaCalendarAlt,
  FaPray,
  FaHome,
  FaRestroom,
  FaPhoneAlt,
  FaGlobe,
} from "react-icons/fa";
import {
  MdOutlineMail,
  MdOutlineWorkOutline,
  MdOutlinePinDrop,
  MdTitle,
} from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiBigDiamondRing, GiBodyHeight } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { theme } from "antd";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SearchExtensionResult = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";
  const [loading, setLoading] = useState(false);
  const [searchExtensionData, setSearchExtensionData] = useState(null);
  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  useEffect(() => {
    const expireDate = new Date(tokenExpire);
    const currentDate = new Date();

    if (currentDate >= expireDate) {
      dispatch(logout());
      history.push("/");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        const response = await fetchVerificationResult(requestId, userToken);
        setSearchExtensionData(response.data["search-extension"]);
      } catch (error) {
        console.error("Error fetching verification result:", error);
      }
    };

    fetchData();
  }, [dispatch, userToken]);

  const renderDetail = (icon, label, value) => (
    <>
      <StyledLabel $token={token}>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel $token={token}>
        <strong>{value != null && value !== "" ? value : "-"}</strong>
      </StyledLabel>
    </>
  );

  const renderPhoneVerificationSection = () => {
    if (!searchExtensionData?.phoneVerification) return null;

    const { data } = searchExtensionData.phoneVerification;

    return (
      <Row gutter={16}>
        <Col span={24}>
          <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
            Personal Details
          </StyledLabel>
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "First Name", data.firstname)}
          <Divider />
          {renderDetail(<AiOutlineFieldNumber />, "NIN", data.nin)}
          <Divider />
          {renderDetail(<FaPhoneAlt />, "Phone Number", data.telephoneno)}
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "Middle Name", data.middlename)}
          <Divider />
          {renderDetail(<FaCalendarAlt />, "Date of Birth", data.birthdate)}
          <Divider />
          {renderDetail(<FaRestroom />, "Gender", data.gender)}
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "Surname", data.surname)}
          <Divider />
          {renderDetail(<FaGlobe />, "Country of Birth", data.birthcountry)}
          <Divider />
          {renderDetail(<MdOutlineMail />, "Email", data.email)}
        </Col>

        <Col span={6}>
          {renderDetail(
            <MdOutlinePinDrop />,
            "State of Birth",
            data.birthstate
          )}
          <Divider />
          {renderDetail(<MdOutlinePinDrop />, "LGA of Birth", data.birthlga)}
          <Divider />
          {renderDetail(<IoSchoolSharp />, "Profession", data.profession)}
        </Col>

        <Col span={24}>
          <Divider />
          <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
            Additional Information
          </StyledLabel>
        </Col>

        <Col span={6}>
          {renderDetail(
            <FaHome />,
            "Residence Address",
            data.residence_address
          )}
          <Divider />
          {renderDetail(
            <MdOutlinePinDrop />,
            "Residence State",
            data.residence_state
          )}
        </Col>

        <Col span={6}>
          {renderDetail(
            <MdOutlinePinDrop />,
            "Residence LGA",
            data.residence_lga
          )}
          <Divider />
          {renderDetail(
            <MdOutlinePinDrop />,
            "Residence Town",
            data.residence_town
          )}
        </Col>

        <Col span={6}>
          {renderDetail(
            <IoSchoolSharp />,
            "Education Level",
            data.educationallevel
          )}
          <Divider />
          {renderDetail(
            <GiBigDiamondRing />,
            "Marital Status",
            data.maritalstatus
          )}
        </Col>

        <Col span={6}>
          {renderDetail(<FaPray />, "Religion", data.religion)}
          <Divider />
          {renderDetail(
            <MdOutlineWorkOutline />,
            "Employment Status",
            data.employmentstatus
          )}
        </Col>
      </Row>
    );
  };

  const renderBvnVerificationSection = () => {
    if (!searchExtensionData?.bvnVerification) return null;

    const { data } = searchExtensionData.bvnVerification;

    return (
      <Row gutter={16}>
        <Col span={24}>
          <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
            BVN Details
          </StyledLabel>
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "First Name", data.firstName)}
          <Divider />
          {renderDetail(<AiOutlineFieldNumber />, "BVN", data.bvn)}
          <Divider />
          {renderDetail(<FaPhoneAlt />, "Phone Number", data.phoneNumber)}
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "Middle Name", data.middleName)}
          <Divider />
          {renderDetail(<FaCalendarAlt />, "Date of Birth", data.dateOfBirth)}
          <Divider />
          {renderDetail(<FaRestroom />, "Gender", data.gender)}
        </Col>

        <Col span={6}>
          {renderDetail(<FaRegUser />, "Last Name", data.lastName)}
          <Divider />
          {renderDetail(
            <MdOutlinePinDrop />,
            "State of Origin",
            data.stateOfOrigin
          )}
          <Divider />
          {renderDetail(
            <MdOutlinePinDrop />,
            "LGA of Origin",
            data.lgaOfOrigin
          )}
        </Col>

        <Col span={6}>
          {renderDetail(
            <GiBigDiamondRing />,
            "Marital Status",
            data.maritalStatus
          )}
          <Divider />
          {renderDetail(
            <MdOutlineWorkOutline />,
            "Level of Account",
            data.levelOfAccount
          )}
          <Divider />
          {renderDetail(<MdTitle />, "Title", data.title)}
        </Col>

        <Col span={24}>
          <Divider />
          <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
            Additional Information
          </StyledLabel>
        </Col>

        <Col span={6}>
          {renderDetail(
            <FaHome />,
            "Residential Address",
            data.residentialAddress
          )}
          <Divider />
          {renderDetail(
            <MdOutlinePinDrop />,
            "State of Residence",
            data.stateOfResidence
          )}
        </Col>

        <Col span={6}>
          {renderDetail(
            <MdOutlinePinDrop />,
            "LGA of Residence",
            data.lgaOfResidence
          )}
          <Divider />
          {renderDetail(<MdOutlineMail />, "Name on Card", data.nameOnCard)}
        </Col>

        <Col span={6}>
          {renderDetail(
            <FaPhoneAlt />,
            "Additional Phone 1",
            data.phoneNumber1
          )}
          <Divider />
          {renderDetail(
            <FaPhoneAlt />,
            "Additional Phone 2",
            data.phoneNumber2
          )}
        </Col>

        <Col span={6}>
          {renderDetail(<FaGlobe />, "Nationality", data.nationality)}
          <Divider />
          {renderDetail(
            <FaCalendarAlt />,
            "Registration Date",
            data.registrationDate
          )}
        </Col>
      </Row>
    );
  };

  if (loading) {
    Swal.fire({
      background: bgContainer,
      color: text,
      title: "Hmmm...",
      text: "Awaiting Consent",
      icon: "info",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Link to="/main-dashboard" style={{ color: text }}>
            <p style={{ color: text, cursor: "pointer" }}>Go back</p>
          </Link>

          <Card
            style={{
              width: "100%",
              backgroundColor: bgContainer,
              borderColor: text,
            }}
          >
            <Heading4 $token={token}>
              Search Extension Verification Result
            </Heading4>
          </Card>

          <Spin spinning={loading} tip="Awaiting Consent...">
            <DynamicCard
              style={{ width: "100%", marginTop: "20px" }}
              $token={token}
            >
              <Tabs defaultActiveKey="1">
                {searchExtensionData?.phoneVerification && (
                  <TabPane tab="Phone Verification" key="1">
                    {renderPhoneVerificationSection()}
                  </TabPane>
                )}

                {searchExtensionData?.bvnVerification && (
                  <TabPane tab="BVN Verification" key="2">
                    {renderBvnVerificationSection()}
                  </TabPane>
                )}
              </Tabs>

              <Divider />

              <Row gutter={16}>
                <Col span={24}>
                  <StyledLabel $token={token}>
                    <strong>Verification Status:</strong>{" "}
                    {searchExtensionData?.phoneVerification?.verification
                      ?.status ||
                      searchExtensionData?.bvnVerification?.verification
                        ?.status}
                  </StyledLabel>
                  <Divider />
                  <StyledLabel $token={token}>
                    <strong>Reference:</strong>{" "}
                    {searchExtensionData?.phoneVerification?.verification
                      ?.reference ||
                      searchExtensionData?.bvnVerification?.verification
                        ?.reference}
                  </StyledLabel>
                </Col>
              </Row>
            </DynamicCard>
          </Spin>
        </InfoSec>
      </Container>
    </div>
  );
};

export default SearchExtensionResult;
