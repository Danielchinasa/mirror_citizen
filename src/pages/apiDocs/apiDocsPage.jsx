import React from "react";
import { Container, InfoSec } from "../../globalStyles";
import { Typography, Tabs, Tag, Card, Collapse, Divider } from "antd";
import {
  CodeOutlined,
  SafetyCertificateOutlined,
  WalletOutlined,
  ApiOutlined,
  CarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../components/ThemeProvider";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const CodeBlock = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <pre
      style={{
        background: isDark ? "#1a2e1f" : "#f6f8fa",
        border: `1px solid ${isDark ? "#2d4a33" : "#e1e4e8"}`,
        borderRadius: "8px",
        padding: "16px",
        overflowX: "auto",
        fontSize: "13px",
        lineHeight: "1.6",
        color: isDark ? "#e6eee8" : "#24292e",
        fontFamily: "'Fira Code', 'Courier New', monospace",
      }}
    >
      <code>{children}</code>
    </pre>
  );
};

const MethodBadge = ({ method }) => {
  const colorMap = {
    POST: "#FBCB19",
    GET: "#1890ff",
    PUT: "#faad14",
    DELETE: "#f5222d",
  };
  return (
    <Tag
      style={{
        fontWeight: 700,
        fontSize: "13px",
        padding: "2px 12px",
        borderRadius: "4px",
        border: "none",
        color: "#fff",
        background: colorMap[method] || "#666",
      }}
    >
      {method}
    </Tag>
  );
};

const EndpointCard = ({
  method,
  path,
  title,
  icon,
  description,
  request,
  responses,
}) => {
  const { isDark } = useTheme();
  return (
    <Card
      style={{
        marginBottom: "24px",
        borderRadius: "12px",
        border: `1px solid ${isDark ? "#2d4a33" : "#e8e8e8"}`,
        background: isDark ? "#263029" : "#fff",
        boxShadow: isDark
          ? "0 2px 8px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
      bodyStyle={{ padding: "24px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        {icon}
        <Title
          level={4}
          style={{
            margin: 0,
            color: isDark ? "#fff" : "#1a1a1a",
            fontFamily: "Poppins",
          }}
        >
          {title}
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          padding: "10px 16px",
          background: isDark ? "#1a2e1f" : "#f0faf2",
          borderRadius: "8px",
          border: `1px solid ${isDark ? "#2d4a33" : "#d4edda"}`,
        }}
      >
        <MethodBadge method={method} />
        <Text
          code
          style={{
            fontSize: "14px",
            color: isDark ? "#8fd49e" : "#354138",
            background: "transparent",
            border: "none",
            fontFamily: "'Fira Code', 'Courier New', monospace",
          }}
        >
          {path}
        </Text>
      </div>

      {description && (
        <Paragraph
          style={{
            color: isDark ? "#b0c4b8" : "#666",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {description}
        </Paragraph>
      )}

      <Collapse
        ghost
        style={{ background: "transparent" }}
        expandIconPosition="end"
      >
        <Panel
          header={
            <Text strong style={{ color: isDark ? "#8fd49e" : "#FBCB19" }}>
              Request Body
            </Text>
          }
          key="request"
        >
          <CodeBlock>{request}</CodeBlock>
        </Panel>
        {responses.map((resp, index) => (
          <Panel
            header={
              <Text strong style={{ color: isDark ? "#8fd49e" : "#FBCB19" }}>
                {resp.label}
              </Text>
            }
            key={`response-${index}`}
          >
            <CodeBlock>{resp.body}</CodeBlock>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

const ApiDocsPage = () => {
  const { isDark } = useTheme();
  const iconStyle = { fontSize: "20px", color: "#FBCB19" };

  return (
    <InfoSec>
      <Container>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <ApiOutlined style={{ fontSize: "36px", color: "#FBCB19" }} />
            <Title
              style={{
                margin: 0,
                fontFamily: "Poppins",
                color: isDark ? "#fff" : "#354138",
              }}
            >
              API Documentation
            </Title>
          </div>
          <Paragraph
            style={{
              fontSize: "17px",
              color: isDark ? "#b0c4b8" : "#666",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Integration guide for e-Citizen Identity Verification Services in
            Ghana. Wallet-based instant verification APIs for Ghana Card ID and
            Vehicle lookups.
          </Paragraph>
        </div>

        {/* Overview Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {/* Base URL */}
          <Card
            style={{
              borderRadius: "12px",
              border: `1px solid ${isDark ? "#2d4a33" : "#e8e8e8"}`,
              background: isDark ? "#263029" : "#fff",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <CodeOutlined
              style={{
                fontSize: "28px",
                color: "#FBCB19",
                marginBottom: "12px",
              }}
            />
            <Title
              level={5}
              style={{
                color: isDark ? "#fff" : "#354138",
                fontFamily: "Poppins",
              }}
            >
              Base URL
            </Title>
            <div
              style={{
                background: isDark ? "#1a2e1f" : "#f0faf2",
                padding: "12px 16px",
                borderRadius: "8px",
                border: `1px solid ${isDark ? "#2d4a33" : "#d4edda"}`,
              }}
            >
              <Text
                code
                style={{
                  fontSize: "14px",
                  color: isDark ? "#8fd49e" : "#354138",
                  background: "transparent",
                  border: "none",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                }}
              >
                https://&lt;host&gt;/api/v2
              </Text>
            </div>
          </Card>

          {/* Authentication */}
          <Card
            style={{
              borderRadius: "12px",
              border: `1px solid ${isDark ? "#2d4a33" : "#e8e8e8"}`,
              background: isDark ? "#263029" : "#fff",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <SafetyCertificateOutlined
              style={{
                fontSize: "28px",
                color: "#FBCB19",
                marginBottom: "12px",
              }}
            />
            <Title
              level={5}
              style={{
                color: isDark ? "#fff" : "#354138",
                fontFamily: "Poppins",
              }}
            >
              Authentication
            </Title>
            <Paragraph
              style={{
                color: isDark ? "#b0c4b8" : "#666",
                marginBottom: "8px",
              }}
            >
              All endpoints require a Bearer Token in the Authorization header.
            </Paragraph>
            <div
              style={{
                background: isDark ? "#1a2e1f" : "#f0faf2",
                padding: "12px 16px",
                borderRadius: "8px",
                border: `1px solid ${isDark ? "#2d4a33" : "#d4edda"}`,
              }}
            >
              <Text
                code
                style={{
                  fontSize: "14px",
                  color: isDark ? "#8fd49e" : "#354138",
                  background: "transparent",
                  border: "none",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                }}
              >
                Authorization: Bearer &lt;JWT_TOKEN&gt;
              </Text>
            </div>
          </Card>

          {/* Payment */}
          <Card
            style={{
              borderRadius: "12px",
              border: `1px solid ${isDark ? "#2d4a33" : "#e8e8e8"}`,
              background: isDark ? "#263029" : "#fff",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <WalletOutlined
              style={{
                fontSize: "28px",
                color: "#FBCB19",
                marginBottom: "12px",
              }}
            />
            <Title
              level={5}
              style={{
                color: isDark ? "#fff" : "#354138",
                fontFamily: "Poppins",
              }}
            >
              Payment
            </Title>
            <Paragraph
              style={{
                color: isDark ? "#b0c4b8" : "#666",
                marginBottom: "0",
              }}
            >
              All verification requests are wallet-based and billed in Ghanaian
              Cedi (GHS). The required amount is deducted before processing. If
              verification fails, refunds are processed automatically.
            </Paragraph>
          </Card>
        </div>

        <Divider
          style={{
            borderColor: isDark ? "#2d4a33" : "#e8e8e8",
            marginBottom: "40px",
          }}
        />

        {/* Endpoints */}
        <Title
          level={2}
          style={{
            fontFamily: "Poppins",
            color: isDark ? "#fff" : "#354138",
            marginBottom: "24px",
          }}
        >
          Endpoints
        </Title>
        <Paragraph
          style={{
            color: isDark ? "#b0c4b8" : "#666",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Each verification follows a two-step flow: first initiate the request
          with the details below, then complete it with the returned{" "}
          <Text code style={{ background: "transparent", border: "none" }}>
            sessionId
          </Text>{" "}
          using{" "}
          <Text code style={{ background: "transparent", border: "none" }}>
            POST /africa/verification/GH/complete
          </Text>
          . The responses below show a successful completed verification.
        </Paragraph>

        <Tabs
          defaultActiveKey="ghana-card"
          tabBarStyle={{
            marginBottom: "32px",
            fontFamily: "Poppins",
          }}
          type="card"
          size="large"
        >
          {/* Ghana Card ID Tab */}
          <TabPane
            tab={
              <span>
                <IdcardOutlined /> Ghana Card ID
              </span>
            }
            key="ghana-card"
          >
            <EndpointCard
              method="POST"
              path="/africa/verification/GH/initiate"
              title="Ghana Card ID Verification"
              icon={<IdcardOutlined style={iconStyle} />}
              description="Verify a Ghana Card (national ID issued by the National Identification Authority) and retrieve the holder's identity details including full name, date of birth, gender, ID number, and country. Subject consent is required, so provide a phone number and/or email address for the data subject."
              request={`{
  "serviceCode": "ID_CARD",
  "payment": {
    "currency": "GHS",
    "paymentType": "INSTANT"
  },
  "consent": "true",
  "idNumber": "59234107845",
  "subjectPhone": "233241234567",
  "subjectEmail": "subject@example.com",
  "basic": {
    "idNumber": "59234107845"
  }
}`}
              responses={[
                {
                  label: "Response — Successful Verification",
                  body: `{
  "success": true,
  "status": "COMPLETED",
  "resultText": "Ghana Card verification successful",
  "resultCode": "00",
  "countryCode": "GH",
  "serviceCode": "ID_CARD",
  "sessionId": "sess_8f3a2c9d1e",
  "consent": "granted",
  "data": {
    "fullName": "KWAME MENSAH OSEI",
    "firstName": "KWAME",
    "lastName": "OSEI",
    "idNumber": "59234107845",
    "idType": "Ghana Card",
    "gender": "Male",
    "dateOfBirth": "1985-06-14",
    "country": "GH"
  }
}`,
                },
                {
                  label: "Response — Consent Pending",
                  body: `{
  "success": false,
  "status": "PENDING_CONSENT",
  "resultText": "Consent request sent to the data subject",
  "countryCode": "GH",
  "serviceCode": "ID_CARD",
  "sessionId": "sess_8f3a2c9d1e",
  "result": {
    "subjectConsent": {
      "status": "PENDING",
      "required": true,
      "channels": {
        "email": true,
        "whatsapp": false
      }
    }
  }
}`,
                },
              ]}
            />
          </TabPane>

          {/* Vehicle Tab */}
          <TabPane
            tab={
              <span>
                <CarOutlined /> Vehicle
              </span>
            }
            key="vehicle"
          >
            <EndpointCard
              method="POST"
              path="/africa/verification/GH/initiate"
              title="Vehicle Verification"
              icon={<CarOutlined style={iconStyle} />}
              description="Verify a vehicle by its Vehicle Identification Number (VIN) using data from the Driver and Vehicle Licensing Authority (DVLA) and retrieve make, model, year, and specifications. Optionally include a stolen vehicle check with the stolencheck flag."
              request={`{
  "serviceCode": "VIN",
  "payment": {
    "currency": "GHS",
    "paymentType": "INSTANT"
  },
  "vehicle": {
    "vin": "5YFBURHE9JP123456",
    "stolencheck": true
  }
}`}
              responses={[
                {
                  label: "Response — Successful Verification",
                  body: `{
  "success": true,
  "status": "COMPLETED",
  "resultText": "Vehicle verification successful",
  "resultCode": "00",
  "countryCode": "GH",
  "serviceCode": "VIN",
  "sessionId": "sess_5e9c1b7d2a",
  "data": {
    "vehicleName": "Toyota Corolla 2018",
    "vin": "5YFBURHE9JP123456",
    "year": "2018",
    "category": "Sedan",
    "fuelType": "Petrol",
    "engine": "1.8L",
    "transmission": "Automatic",
    "riskLabel": "Low",
    "verificationStatus": "VERIFIED",
    "vehicleSpecification": {
      "make": "Toyota",
      "model": "Corolla",
      "trim": "LE",
      "driveType": "Front-Wheel Drive"
    }
  }
}`,
                },
                {
                  label: "Response — Vehicle on Watchlist",
                  body: `{
  "success": true,
  "status": "COMPLETED",
  "resultText": "Vehicle verification successful",
  "resultCode": "00",
  "countryCode": "GH",
  "serviceCode": "VIN",
  "sessionId": "sess_5e9c1b7d2a",
  "data": {
    "vehicleName": "Toyota Corolla 2018",
    "vin": "5YFBURHE9JP123456",
    "year": "2018",
    "riskLabel": "High",
    "verificationStatus": "VERIFIED",
    "vehicleSpecification": {
      "make": "Toyota",
      "model": "Corolla",
      "trim": "LE"
    },
    "watchlist": {
      "stolen": true,
      "reportedDate": "2024-11-15"
    }
  }
}`,
                },
              ]}
            />
          </TabPane>
        </Tabs>
      </Container>
    </InfoSec>
  );
};

export default ApiDocsPage;
