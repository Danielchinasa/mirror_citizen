import React, { useEffect, useState } from "react";
import { Spin, Divider, theme } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/actions";
import {
  FaRegUser,
  FaCalendarAlt,
  FaRestroom,
  FaIdCard,
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import Swal from "sweetalert2";
import { apiGetInternalCall } from "../../apiUtils";
import styled from "styled-components";

/* ── Styled components ───────────────────────────────────────────── */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ $bg }) => $bg || "#f9fafb"};
  padding: 32px 16px 64px;
`;

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  margin-bottom: 24px;
  font-family: Nunito, sans-serif;
  &:hover {
    color: #b38b00;
  }
`;

const ResultCard = styled.div`
  background: ${({ $bg }) => $bg || "#fff"};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: #f9fafb;
  border-bottom: 1px solid #f0f0f0;
  padding: 28px 32px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeaderIcon = styled.div`
  width: 52px;
  height: 52px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #374151;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeaderTitle = styled.h2`
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  font-family: Poppins, sans-serif;
`;

const HeaderSub = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: #333;
  font-family: Nunito, sans-serif;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ $success }) =>
    $success ? "rgba(255,255,255,0.92)" : "rgba(220,38,38,0.12)"};
  color: ${({ $success }) => ($success ? "#15803d" : "#dc2626")};
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: Nunito, sans-serif;
  flex-shrink: 0;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const MetaChip = styled.span`
  background: #f3f4f6;
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 11px;
  color: #6b7280;
  font-family: Nunito, sans-serif;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 28px 32px;
`;

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 16px;
  font-family: Poppins, sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const FieldBox = styled.div`
  background: #f9fafb;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid #f0f0f0;
`;

const FieldLabel = styled.p`
  margin: 0 0 5px;
  font-size: 10px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: Nunito, sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FieldValue = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  font-family: Poppins, sans-serif;
  word-break: break-all;
`;

const ActionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

const ActionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  font-family: Nunito, sans-serif;
  color: #333;
`;

const DashboardBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #111827;
  color: #fff;
  font-weight: 700;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  padding: 12px 28px;
  border-radius: 10px;
  text-decoration: none;
  margin-top: 8px;
  transition: background 0.15s;
  &:hover {
    background: #374151;
    color: #fff;
  }
`;

/* ── Component ───────────────────────────────────────────────────── */

const PremblyNinResult = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";

  const { token } = theme.useToken();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const expireDate = new Date(tokenExpire);
    if (new Date() >= expireDate) {
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
          userToken,
        );

        const payload = response.data || response;

        if (payload.consent === "pending") {
          setLoading(true);
          Swal.fire({
            title: "Awaiting Consent",
            text: "The data subject has not yet granted consent.",
            icon: "info",
            didOpen: () => Swal.showLoading(),
          });
          return;
        }

        Swal.close();
        setLoading(false);

        // Support new Africa/Ghana response shape
        const data =
          payload.data ||
          payload.basic?.nin_data ||
          payload.basic?.data ||
          payload.basic ||
          {};

        setResult(data);
        setMeta({
          status: payload.status,
          resultText: payload.resultText,
          resultCode: payload.resultCode,
          provider: payload.provider,
          countryCode: payload.countryCode,
          serviceCode: payload.serviceCode,
          sessionId: payload.sessionId,
          consent: payload.consent,
          success: payload.success,
        });
      } catch (error) {
        console.error("Error fetching result:", error);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Could not load verification result.",
          icon: "error",
          confirmButtonColor: "#FBCB19",
        });
      }
    };

    fetchData();
  }, [dispatch, userToken]);

  const isVerified = meta?.success === true || meta?.status === "COMPLETED";

  const field = (icon, label, value, highlight = false) => (
    <FieldBox $alt={highlight}>
      <FieldLabel>
        {icon} {label}
      </FieldLabel>
      <FieldValue>
        {value && value !== "-" && value !== "null" ? value : "—"}
      </FieldValue>
    </FieldBox>
  );

  return (
    <PageWrapper $bg={token.bgContainer}>
      <Inner>
        <BackLink to="/main-dashboard">
          <FaArrowLeft /> Back to Dashboard
        </BackLink>

        <Spin spinning={loading} tip="Loading result...">
          <ResultCard>
            {/* ── Header ── */}
            <CardHeader>
              <HeaderIcon>
                <FaIdCard />
              </HeaderIcon>
              <HeaderText>
                <HeaderSub>
                  {meta?.resultText || "Identity Verification Result"}
                </HeaderSub>
                <MetaRow>
                  {meta?.countryCode && (
                    <MetaChip>Country: {meta.countryCode}</MetaChip>
                  )}
                </MetaRow>
              </HeaderText>
              <StatusBadge $success={isVerified}>
                {isVerified ? (
                  <>
                    <FaCheckCircle /> Verified
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> Not Verified
                  </>
                )}
              </StatusBadge>
            </CardHeader>

            {/* ── Body ── */}
            <CardBody>
              {/* Personal Details */}
              <SectionTitle>
                <FaRegUser />
                Personal Details
              </SectionTitle>
              <Grid>
                {field(<FaRegUser />, "Full Name", result?.fullName, true)}
                {field(<FaRegUser />, "First Name", result?.firstName)}
                {field(<FaRegUser />, "Last Name", result?.lastName)}
                {field(<FaRestroom />, "Gender", result?.gender)}
                {field(<FaCalendarAlt />, "Date of Birth", result?.dateOfBirth)}
                {field(<AiOutlineFieldNumber />, "ID Number", result?.idNumber)}
                {field(<FaIdCard />, "ID Type", result?.idType)}
                {field(<FaGlobe />, "Country", result?.country)}
              </Grid>

              <Divider style={{ margin: "4px 0 24px" }} />

              {/* Session info */}
              {meta?.sessionId && (
                <>
                  <SectionTitle>Session Info</SectionTitle>
                  <Grid>
                    {field(null, "Session ID", meta.sessionId)}
                    {field(null, "Consent Status", meta.consent)}
                  </Grid>
                  <Divider style={{ margin: "4px 0 24px" }} />
                </>
              )}

              <DashboardBtn to="/main-dashboard">Go to Dashboard</DashboardBtn>
            </CardBody>
          </ResultCard>
        </Spin>
      </Inner>
    </PageWrapper>
  );
};

export default PremblyNinResult;
