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

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const t = (label, isSw) => {
  const translations = {
    "Awaiting Consent": isSw ? "Kusubiri Idhini" : "Awaiting Consent",
    "The data subject has not yet granted consent.": isSw
      ? "Mhusika wa data bado hajakubali idhini."
      : "The data subject has not yet granted consent.",
    Error: isSw ? "Hitilafu" : "Error",
    "Could not load verification result.": isSw
      ? "Imeshindwa kupakia matokeo ya uthibitishaji."
      : "Could not load verification result.",
    "Loading result...": isSw ? "Inapakia matokeo..." : "Loading result...",
    "Back to Dashboard": isSw ? "Rudi kwenye Dashibodi" : "Back to Dashboard",
    "Identity Verification Result": isSw
      ? "Matokeo ya Uthibitishaji wa Utambulisho"
      : "Identity Verification Result",
    Country: isSw ? "Nchi" : "Country",
    Verified: isSw ? "Imethibitishwa" : "Verified",
    "Not Verified": isSw ? "Haijathibitishwa" : "Not Verified",
    "Personal Details": isSw ? "Maelezo Binafsi" : "Personal Details",
    "Full Name": isSw ? "Jina Kamili" : "Full Name",
    "First Name": isSw ? "Jina la Kwanza" : "First Name",
    "Last Name": isSw ? "Jina la Mwisho" : "Last Name",
    Gender: isSw ? "Jinsia" : "Gender",
    "Date of Birth": isSw ? "Tarehe ya Kuzaliwa" : "Date of Birth",
    "ID Number": isSw ? "Nambari ya Kitambulisho" : "ID Number",
    "ID Type": isSw ? "Aina ya Kitambulisho" : "ID Type",
    "Session Info": isSw ? "Taarifa za Kipindi" : "Session Info",
    "Session ID": isSw ? "Kitambulisho cha Kipindi" : "Session ID",
    "Consent Status": isSw ? "Hali ya Idhini" : "Consent Status",
    "Go to Dashboard": isSw ? "Nenda kwenye Dashibodi" : "Go to Dashboard",
  };
  return translations[label] || label;
};

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
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

  useEffect(() => {
    const expireDate = new Date(tokenExpire);
    if (new Date() >= expireDate) {
      dispatch(logout());
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
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
            title: t("Awaiting Consent", isSw),
            text: t("The data subject has not yet granted consent.", isSw),
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
          title: t("Error", isSw),
          text: t("Could not load verification result.", isSw),
          icon: "error",
          confirmButtonColor: "#111827",
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
          <FaArrowLeft /> {t("Back to Dashboard", isSw)}
        </BackLink>

        <Spin spinning={loading} tip={t("Loading result...", isSw)}>
          <ResultCard>
            {/* ── Header ── */}
            <CardHeader>
              <HeaderIcon>
                <FaIdCard />
              </HeaderIcon>
              <HeaderText>
                <HeaderSub>
                  {meta?.resultText || t("Identity Verification Result", isSw)}
                </HeaderSub>
                <MetaRow>
                  {meta?.countryCode && (
                    <MetaChip>
                      {t("Country", isSw)}: {meta.countryCode}
                    </MetaChip>
                  )}
                </MetaRow>
              </HeaderText>
              <StatusBadge $success={isVerified}>
                {isVerified ? (
                  <>
                    <FaCheckCircle /> {t("Verified", isSw)}
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> {t("Not Verified", isSw)}
                  </>
                )}
              </StatusBadge>
            </CardHeader>

            {/* ── Body ── */}
            <CardBody>
              {/* Personal Details */}
              <SectionTitle>
                <FaRegUser />
                {t("Personal Details", isSw)}
              </SectionTitle>
              <Grid>
                {field(<FaRegUser />, t("Full Name", isSw), result?.fullName, true)}
                {field(<FaRegUser />, t("First Name", isSw), result?.firstName)}
                {field(<FaRegUser />, t("Last Name", isSw), result?.lastName)}
                {field(<FaRestroom />, t("Gender", isSw), result?.gender)}
                {field(
                  <FaCalendarAlt />,
                  t("Date of Birth", isSw),
                  result?.dateOfBirth,
                )}
                {field(
                  <AiOutlineFieldNumber />,
                  t("ID Number", isSw),
                  result?.idNumber,
                )}
                {field(<FaIdCard />, t("ID Type", isSw), result?.idType)}
                {field(<FaGlobe />, t("Country", isSw), result?.country)}
              </Grid>

              <Divider style={{ margin: "4px 0 24px" }} />

              {/* Session info */}
              {meta?.sessionId && (
                <>
                  <SectionTitle>{t("Session Info", isSw)}</SectionTitle>
                  <Grid>
                    {field(null, t("Session ID", isSw), meta.sessionId)}
                    {field(null, t("Consent Status", isSw), meta.consent)}
                  </Grid>
                  <Divider style={{ margin: "4px 0 24px" }} />
                </>
              )}

              <DashboardBtn to="/main-dashboard">
                {t("Go to Dashboard", isSw)}
              </DashboardBtn>
            </CardBody>
          </ResultCard>
        </Spin>
      </Inner>
    </PageWrapper>
  );
};

export default PremblyNinResult;
