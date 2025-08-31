import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar, Spin, Typography, theme } from "antd";
import {
  Container,
  Heading4,
  InfoSec,
  StyledLabel,
  DynamicCard,
} from "../../globalStyles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/actions";
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
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { imageBaseUrl } from "../../apiConfig";
import { apiGetInternalCall } from "../../apiUtils";
import "../dashboard/emergency.css";

const { Text } = Typography;

const PremblyNinResult = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";

  const [loading, setLoading] = useState(false);

  // profile fields
  const [firstName, setFirstName] = useState("-");
  const [middleName, setMiddleName] = useState("-");
  const [lastName, setLastName] = useState("-");
  const [nin, setNin] = useState("-");
  const [dob, setDob] = useState("-");
  const [gender, setGender] = useState("-");
  const [residenceAddress, setResidenceAddress] = useState("-");
  const [phone, setPhone] = useState("-");
  const [signature, setSignature] = useState("-");
  const [maritalStatus, setMaritalStatus] = useState("-");
  const [religion, setReligion] = useState("-");
  const [educationLevel, setEducationLevel] = useState("-");
  const [profession, setProfession] = useState("-");
  const [email, setEmail] = useState("-");
  const [birthCountry, setBirthCountry] = useState("-");
  const [birthState, setBirthState] = useState("-");
  const [birthLGA, setBirthLGA] = useState("-");
  const [originState, setOriginState] = useState("-");
  const [originPlace, setOriginPlace] = useState("-");
  const [employmentStatus, setEmploymentStatus] = useState("-");
  const [originLGA, setOriginLGA] = useState("-");
  const [photo, setPhoto] = useState("-");
  const [residenceLGA, setResidenceLGA] = useState("-");
  const [residenceState, setResidenceState] = useState("-");
  const [height, setHeight] = useState("-");
  const [title, setTitle] = useState("-");

  // New state variables for next of kin details
  const [nokFirstName, setNokFirstName] = useState("-");
  const [nokMiddleName, setNokMiddleName] = useState("-");
  const [nokSurname, setNokSurname] = useState("-");
  const [nokAddress1, setNokAddress1] = useState("-");
  const [nokAddress2, setNokAddress2] = useState("-");
  const [nokTown, setNokTown] = useState("-");
  const [nokState, setNokState] = useState("-");
  const [nokLga, setNokLga] = useState("-");

  const requestId = localStorage.getItem("verificationRequestId");

  // theme tokens
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
  }, [dispatch, userToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        const response = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken
        );

        if (response.data.consent === "pending") {
          setLoading(true);
        } else {
          setLoading(false);
        }

        const data = response.data.data;

        setFirstName(data.firstname || "-");
        setMiddleName(data.middlename || "-");
        setLastName(data.surname || "-");
        setNin(data.nin || "-");
        setDob(data.birthDate || "-");
        setGender(data.gender || "-");
        setResidenceAddress(data.residenceAddress || "-");
        setPhone(data.telephoneno || "-");
        setMaritalStatus(data.maritalstatus || "-");
        setReligion(data.religion || "-");
        setEducationLevel(data.educationallevel || "-");
        setProfession(data.profession || "-");
        setEmail(data.email || "-");
        setBirthCountry(data.birthCountry || "-");
        setBirthState(data.birthstate || "-");
        setBirthLGA(data.birthlga || "-");
        setResidenceState(data.residenceState || "-");
        setResidenceLGA(data.residenceLga || "-");
        setEmploymentStatus(data.employmentstatus || "-");
        setHeight(data.heigth || "-");
        setOriginState(data.selfOriginState || "-");
        setOriginLGA(data.selfOriginLga || "-");
        setOriginPlace(data.selfOriginPlace || "-");
        setTitle(data.title || "-");
        setPhoto(data.photo || "-");
        setSignature(data.signature || "-");

        // Update state with Next of Kin data
        setNokFirstName(data.nokFirstname || "-");
        setNokMiddleName(data.nokMiddlename || "-");
        setNokSurname(data.nokSurname || "-");
        setNokAddress1(data.nokAddress1 || "-");
        setNokAddress2(data.nokAddress2 || "-");
        setNokTown(data.nokTown || "-");
        setNokState(data.nokState || "-");
        setNokLga(data.nokLga || "-");
      } catch (error) {
        console.error("Error checking consent:", error);
      }
    };

    fetchData();
  }, [dispatch, userToken]);

  // SweetAlert effect
  useEffect(() => {
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
    } else {
      Swal.close();
    }
  }, [loading, bgContainer, text]);

  const renderDetail = (icon, label, value) => (
    <>
      <StyledLabel $token={token}>
        {icon}&nbsp; {label}
      </StyledLabel>
      <StyledLabel $token={token}>
        <strong>
          {value != null && value !== "null" && value !== "" ? value : "-"}
        </strong>
      </StyledLabel>
    </>
  );

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
            <Heading4 $token={token}>Verification Result</Heading4>
          </Card>
          <Spin spinning={loading} tip="Awaiting Consent...">
            <DynamicCard
              style={{ width: "100%", marginTop: "20px" }}
              $token={token}
            >
              <div>
                <Text>Person Identity Profile </Text>
                <RightOutlined />
                <Text>National Identification Number (NIN)</Text>
              </div>
              <Divider />
              <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                Personal Details
              </StyledLabel>
              <br />
              <Row gutter={16}>
                <Row style={{ marginBottom: "20px", textAlign: "center" }}>
                  <Col span={12} style={{}}>
                    {photo && photo !== "-" ? (
                      <Avatar
                        size={124}
                        src={`data:image/png;base64,${photo}`}
                        alt="Photo"
                      />
                    ) : (
                      <Avatar size={124} icon={<UserOutlined />} />
                    )}
                    <div style={{ marginTop: "8px" }}>
                      <Text strong>Photo</Text>
                    </div>
                  </Col>

                  {/* <Col span={12}>
                    {signature && signature !== "-" ? (
                      <Avatar
                        size={124}
                        src={`data:image/png;base64,${signature}`}
                        alt="Signature"
                      />
                    ) : (
                      <Avatar size={124} icon={<UserOutlined />} />
                    )}
                    <div style={{ marginTop: "8px" }}>
                      <Text strong>Signature</Text>
                    </div>
                  </Col> */}
                </Row>
                <Divider />

                <Col span={6}>
                  {renderDetail(<FaRegUser />, "First Name", firstName)}
                  <Divider />
                  {renderDetail(<AiOutlineFieldNumber />, "NIN", nin)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Middle Name", middleName)}
                  <Divider />
                  {renderDetail(<FaCalendarAlt />, "Birth Date", dob)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Surname", lastName)}
                  <Divider />
                  {renderDetail(<FaRestroom />, "Gender", gender)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaPhoneAlt />, "Phone Number", phone)}
                  <Divider />
                  {renderDetail(<MdOutlineMail />, "Email", email)}
                </Col>
                <Divider />
                <Col span={6}>
                  {renderDetail(<FaGlobe />, "Country of Birth", birthCountry)}
                  <Divider />
                  {renderDetail(
                    <FaHome />,
                    "Residence Address",
                    residenceAddress
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "State of Birth",
                    birthState
                  )}
                  <Divider />
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Residence State",
                    residenceState
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdOutlinePinDrop />, "LGA of Birth", birthLGA)}
                  <Divider />
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Residence LGA",
                    residenceLGA
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(<IoSchoolSharp />, "Profession", profession)}
                  <Divider />
                  {renderDetail(
                    <IoSchoolSharp />,
                    "Education Level",
                    educationLevel
                  )}
                </Col>
                <Divider />
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Origin State",
                    originState
                  )}
                  <Divider />
                  {renderDetail(<GiBodyHeight />, "Height", height)}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdOutlinePinDrop />, "Origin LGA", originLGA)}
                  <Divider />
                  {renderDetail(
                    <GiBigDiamondRing />,
                    "Marital Status",
                    maritalStatus
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Origin Place",
                    originPlace
                  )}
                  <Divider />
                  {renderDetail(<MdTitle />, "Title", title)}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlineWorkOutline />,
                    "Employment Status",
                    employmentStatus
                  )}
                  <Divider />
                  {renderDetail(<FaPray />, "Religion", religion)}
                </Col>
              </Row>
              <Divider />
              <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                Next of Kin Details
              </StyledLabel>
              <br />
              <Row gutter={16}>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "First Name", nokFirstName)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Middle Name", nokMiddleName)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Surname", nokSurname)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaHome />, "Address 1", nokAddress1)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaHome />, "Address 2", nokAddress2)}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdOutlinePinDrop />, "Town", nokTown)}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdOutlinePinDrop />, "State", nokState)}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdOutlinePinDrop />, "LGA", nokLga)}
                </Col>
              </Row>
            </DynamicCard>
          </Spin>
        </InfoSec>
      </Container>
    </div>
  );
};

export default PremblyNinResult;
