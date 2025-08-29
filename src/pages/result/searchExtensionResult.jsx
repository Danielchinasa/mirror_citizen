import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar, Spin, Tabs, Collapse } from "antd";
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
import { apiGetInternalCall } from "../../apiUtils";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const SearchExtensionResult = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";
  const [loading, setLoading] = useState(false);
  const [searchExtensionData, setSearchExtensionData] = useState({});
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
        const response = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken
        );
        // console.log("Response " + response.data);
        setSearchExtensionData(response.data);
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
    if (!searchExtensionData.premblyPhoneVerification) return null;

    const phoneData = searchExtensionData.premblyPhoneVerification;

    return (
      <div style={{ marginBottom: "24px" }}>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                Phone Verification Details
              </span>
            }
            key="1"
          >
            <Row gutter={16}>
              <Col span={24}>
                <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                  Personal Details
                </StyledLabel>
              </Col>

              <Col
                span={24}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <Avatar
                  size={120}
                  src={
                    phoneData.photo
                      ? `data:image/jpeg;base64,${phoneData.photo}`
                      : "https://via.placeholder.com/120"
                  }
                  icon={<UserOutlined />}
                />
              </Col>

              <Col span={6}>
                {renderDetail(<FaRegUser />, "First Name", phoneData.firstname)}
                <Divider />
                {renderDetail(<AiOutlineFieldNumber />, "NIN", phoneData.nin)}
                <Divider />
                {renderDetail(
                  <FaPhoneAlt />,
                  "Phone Number",
                  phoneData.telephoneno
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Middle Name",
                  phoneData.middlename
                )}
                <Divider />
                {renderDetail(
                  <FaCalendarAlt />,
                  "Date of Birth",
                  phoneData.birthDate
                )}
                <Divider />
                {renderDetail(<FaRestroom />, "Gender", phoneData.gender)}
              </Col>

              <Col span={6}>
                {renderDetail(<FaRegUser />, "Surname", phoneData.surname)}
                <Divider />
                {renderDetail(
                  <FaGlobe />,
                  "Country of Birth",
                  phoneData.birthCountry
                )}
                <Divider />
                {renderDetail(<MdOutlineMail />, "Email", phoneData.email)}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "State of Birth",
                  phoneData.birthstate
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "LGA of Birth",
                  phoneData.birthlga
                )}
                <Divider />
                {renderDetail(
                  <IoSchoolSharp />,
                  "Profession",
                  phoneData.profession
                )}
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
                  phoneData.residenceAddress
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "Residence State",
                  phoneData.residenceState
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "Residence LGA",
                  phoneData.residenceLga
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "Residence Town",
                  phoneData.residenceTown
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <IoSchoolSharp />,
                  "Education Level",
                  phoneData.educationallevel
                )}
                <Divider />
                {renderDetail(
                  <GiBigDiamondRing />,
                  "Marital Status",
                  phoneData.maritalstatus
                )}
              </Col>

              <Col span={6}>
                {renderDetail(<FaPray />, "Religion", phoneData.religion)}
                <Divider />
                {renderDetail(
                  <MdOutlineWorkOutline />,
                  "Employment Status",
                  phoneData.employmentstatus
                )}
              </Col>
              <Col span={24}>
                <Divider />
                <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                  Next of Kin Information
                </StyledLabel>
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "NOK First Name",
                  phoneData.nokFirstname
                )}
                <Divider />
                {renderDetail(
                  <FaRegUser />,
                  "NOK Middle Name",
                  phoneData.nokMiddlename
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "NOK Surname",
                  phoneData.nokSurname
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "NOK Address",
                  phoneData.nokAddress1
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "NOK Town",
                  phoneData.nokTown
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "NOK LGA",
                  phoneData.nokLga
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "NOK State",
                  phoneData.nokState
                )}
              </Col>

              <Col span={24}>
                <Divider />
                <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                  Parent Information
                </StyledLabel>
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Parent First Name",
                  phoneData.pfirstname
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Parent Surname",
                  phoneData.psurname
                )}
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </div>
    );
  };

  const renderBvnVerificationSection = () => {
    if (!searchExtensionData?.premblyBvnVerification?.[0]) return null;

    const bvnData = searchExtensionData.premblyBvnVerification[0];

    return (
      <div style={{ marginBottom: "24px" }}>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                BVN Verification Details
              </span>
            }
            key="1"
          >
            <Row gutter={16}>
              <Col span={24}>
                <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                  BVN Details
                </StyledLabel>
              </Col>
              <Col
                span={24}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <Avatar
                  size={120}
                  src={
                    bvnData.photo
                      ? `data:image/jpeg;base64,${bvnData.photo}`
                      : "https://via.placeholder.com/120"
                  }
                  icon={<UserOutlined />}
                />
              </Col>

              <Col span={6}>
                {renderDetail(<FaRegUser />, "First Name", bvnData.firstName)}
                <Divider />
                {renderDetail(<AiOutlineFieldNumber />, "BVN", bvnData.bvn)}
                <Divider />
                {renderDetail(
                  <FaPhoneAlt />,
                  "Phone Number",
                  bvnData.phoneNumber
                )}
              </Col>

              <Col span={6}>
                {renderDetail(<FaRegUser />, "Middle Name", bvnData.middleName)}
                <Divider />
                {renderDetail(
                  <FaCalendarAlt />,
                  "Date of Birth",
                  bvnData.dateOfBirth
                )}
                <Divider />
                {renderDetail(<FaRestroom />, "Gender", bvnData.gender)}
              </Col>

              <Col span={6}>
                {renderDetail(<FaRegUser />, "Last Name", bvnData.lastName)}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "State of Origin",
                  bvnData.stateOfOrigin
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "LGA of Origin",
                  bvnData.lgaOfOrigin
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <GiBigDiamondRing />,
                  "Marital Status",
                  bvnData.maritalStatus
                )}
                <Divider />
                {renderDetail(
                  <MdOutlineWorkOutline />,
                  "Level of Account",
                  bvnData.levelOfAccount
                )}
                <Divider />
                {renderDetail(<MdTitle />, "Title", bvnData.title)}
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
                  bvnData.residentialAddress
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "State of Residence",
                  bvnData.stateOfResidence
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "LGA of Residence",
                  bvnData.lgaOfResidence
                )}
                <Divider />
                {renderDetail(
                  <MdOutlineMail />,
                  "Name on Card",
                  bvnData.nameOnCard
                )}
              </Col>

              <Col span={6}>
                {renderDetail(
                  <FaPhoneAlt />,
                  "Additional Phone 1",
                  bvnData.phoneNumber1
                )}
                <Divider />
                {renderDetail(
                  <FaPhoneAlt />,
                  "Additional Phone 2",
                  bvnData.phoneNumber2
                )}
              </Col>

              <Col span={6}>
                {renderDetail(<FaGlobe />, "Nationality", bvnData.nationality)}
                <Divider />
                {renderDetail(
                  <FaCalendarAlt />,
                  "Registration Date",
                  bvnData.registrationDate
                )}
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </div>
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
              {renderPhoneVerificationSection()}
              {renderBvnVerificationSection()}

              <Divider />

              <Row gutter={16}>
                <Col span={24}>
                  <StyledLabel $token={token}>
                    <strong>Verification Status:</strong>{" "}
                    {searchExtensionData?.premblyPhoneVerification?.[0]
                      ?.verificationStatus ||
                      searchExtensionData?.premblyBvnVerification?.[0]
                        ?.verificationStatus}
                  </StyledLabel>
                  <Divider />
                  <StyledLabel $token={token}>
                    <strong>Reference:</strong>{" "}
                    {searchExtensionData?.premblyPhoneVerification?.[0]
                      ?.verificationReference ||
                      searchExtensionData?.premblyBvnVerification?.[0]
                        ?.verificationReference}
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
