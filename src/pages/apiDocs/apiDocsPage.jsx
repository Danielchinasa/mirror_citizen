import React, { useState } from "react";
import { Container, InfoSec } from "../../globalStyles";
import { Typography, Tabs, Tag, Card, Collapse, Divider } from "antd";
import {
  CodeOutlined,
  SafetyCertificateOutlined,
  WalletOutlined,
  ApiOutlined,
  UserOutlined,
  BankOutlined,
  PhoneOutlined,
  ShopOutlined,
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
    POST: "#09C93A",
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
            <Text strong style={{ color: isDark ? "#8fd49e" : "#09C93A" }}>
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
              <Text strong style={{ color: isDark ? "#8fd49e" : "#09C93A" }}>
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
  const iconStyle = { fontSize: "20px", color: "#09C93A" };

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
            <ApiOutlined style={{ fontSize: "36px", color: "#09C93A" }} />
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
            Integration guide for e-Citizen Identity Verification Services.
            Wallet-based instant verification APIs for NIN, BVN, Phone,
            Business, and Vehicle lookups.
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
                color: "#09C93A",
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
                https://&lt;host&gt;/api/v1/lookup
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
                color: "#09C93A",
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
                color: "#09C93A",
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
              All verification requests are wallet-based. The required amount is
              deducted before processing. If verification fails, refunds are
              processed automatically.
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

        <Tabs
          defaultActiveKey="nin"
          tabBarStyle={{
            marginBottom: "32px",
            fontFamily: "Poppins",
          }}
          type="card"
          size="large"
        >
          {/* NIN Tab */}
          <TabPane
            tab={
              <span>
                <UserOutlined /> NIN
              </span>
            }
            key="nin"
          >
            <EndpointCard
              method="POST"
              path="/verify-nin"
              title="Verify NIN"
              icon={<UserOutlined style={iconStyle} />}
              description="Verify a National Identification Number (NIN) and retrieve the associated identity details including name, date of birth, phone, gender, address, and photo."
              request={`{
  "nin": "12345678901"
}`}
              responses={[
                {
                  label: "Response — Successful Verification",
                  body: `{
  "success": true,
  "nin": "12345678901",
  "firstName": "JOHN",
  "lastName": "DOE",
  "middleName": "MICHAEL",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "08012345678",
  "gender": "Male",
  "address": "Abuja, Nigeria",
  "photo": "base64EncodedImageString"
}`,
                },
              ]}
            />
          </TabPane>

          {/* BVN Tab */}
          <TabPane
            tab={
              <span>
                <BankOutlined /> BVN
              </span>
            }
            key="bvn"
          >
            <EndpointCard
              method="POST"
              path="/bvn"
              title="Verify BVN"
              icon={<BankOutlined style={iconStyle} />}
              description="Verify a Bank Verification Number (BVN) and retrieve identity details with verification status and match score."
              request={`{
  "bvn": "22334455667"
}`}
              responses={[
                {
                  label: "Response — Successful Verification",
                  body: `{
  "status": true,
  "detail": "Verification successful",
  "response_code": "00",
  "endpoint_name": "bvn_with_phone",
  "data": {
    "first_name": "JOHN",
    "last_name": "DOE",
    "middle_name": "MICHAEL",
    "date_of_birth": "1990-01-01",
    "phone_number": "08012345678",
    "bvn": "22123456789",
    "gender": "Male"
  },
  "verification": {
    "status": "VERIFIED",
    "match_score": 98,
    "matched_fields": ["first_name", "last_name", "phone_number"]
  }
}`,
                },
              ]}
            />
          </TabPane>

          {/* Phone Tab */}
          <TabPane
            tab={
              <span>
                <PhoneOutlined /> Phone
              </span>
            }
            key="phone"
          >
            <EndpointCard
              method="POST"
              path="/phone"
              title="Verify Phone"
              icon={<PhoneOutlined style={iconStyle} />}
              description="Verify a phone number and retrieve network, country, activity status, and line type information."
              request={`{
  "phone": "08012345678"
}`}
              responses={[
                {
                  label: "Response — Successful Verification",
                  body: `{
  "status": true,
  "detail": "Phone number verification successful",
  "response_code": "00",
  "endpoint_name": "phone_number/advance",
  "data": {
    "phone_number": "08012345678",
    "network": "MTN",
    "country": "Nigeria",
    "is_active": true,
    "line_type": "mobile"
  },
  "verification": {
    "status": "VERIFIED",
    "reference": "abc123xyz",
    "match_score": 100
  },
  "session": {
    "id": "sess_987654321",
    "created_at": "2026-03-29T20:10:00Z"
  }
}`,
                },
              ]}
            />
          </TabPane>

          {/* Business Tab */}
          <TabPane
            tab={
              <span>
                <ShopOutlined /> Business
              </span>
            }
            key="business"
          >
            <EndpointCard
              method="POST"
              path="/business"
              title="Business Verification — Entity Number Search"
              icon={<ShopOutlined style={iconStyle} />}
              description="Look up a business using its RC number from the Corporate Affairs Commission (CAC). Returns company details including address, approved name, and registration info."
              request={`{
  "rc_number": 1234567
}`}
              responses={[
                {
                  label: "Response — Successful Entity Number Search",
                  body: `{
  "success": true,
  "requestId": 10234,
  "request parameter": "123456",
  "message": "Business API call successful",
  "data": [
    {
      "data": {
        "requestId": 10234,
        "state": "Lagos",
        "cacid": "RC123456",
        "address": "12 Marina Street, Lagos",
        "approvedName": "ABC TECH LIMITED",
        "branchAddress": "Ikeja Branch",
        "rcNumber": "123456",
        "lga": "Lagos Island",
        "email": "info@abctech.com",
        "classificationId": "Private Company",
        "registrationDate": "2020-05-10"
      },
      "shareholders-data": null
    }
  ]
}`,
                },
                {
                  label: "Response — No Record Found",
                  body: `{
  "success": true,
  "message": "No record found",
  "data": null
}`,
                },
              ]}
            />

            <EndpointCard
              method="POST"
              path="/business"
              title="Business Verification — Company Name Search"
              icon={<ShopOutlined style={iconStyle} />}
              description="Look up a business using its company name. Returns matching company details from the CAC database."
              request={`{
  "company_name": "ABC LTD"
}`}
              responses={[
                {
                  label: "Response — Successful Name Search",
                  body: `{
  "success": true,
  "requestId": 10235,
  "request parameter": "ABC TECH LIMITED",
  "message": "Business API call successful",
  "data": [
    {
      "data": {
        "requestId": 10235,
        "state": "Abuja",
        "cacid": "RC987654",
        "address": "Plot 45, Wuse Zone 2",
        "approvedName": "ABC TECH LIMITED",
        "branchAddress": null,
        "rcNumber": "987654",
        "lga": "AMAC",
        "email": "contact@abctech.com",
        "classificationId": "LLC",
        "registrationDate": "2019-03-21"
      },
      "shareholders-data": null
    }
  ]
}`,
                },
                {
                  label: "Response — No Record Found",
                  body: `{
  "success": true,
  "message": "No record found",
  "data": null
}`,
                },
              ]}
            />
          </TabPane>

          {/* Vehicle VIN Tab */}
          <TabPane
            tab={
              <span>
                <CarOutlined /> Vehicle VIN
              </span>
            }
            key="vehicle-vin"
          >
            <EndpointCard
              method="POST"
              path="/vehicle"
              title="Vehicle VIN Verification"
              icon={<CarOutlined style={iconStyle} />}
              description="Verify a Vehicle Identification Number (VIN). Optionally include a stolen vehicle check. Returns vehicle make, model, year, specs, and stolen status."
              request={`{
  "vin": "1HGCM82633A123456",
  "stolenCheck": true
}`}
              responses={[
                {
                  label: "Response — VIN Lookup WITH Stolen Check (Not Stolen)",
                  body: `{
  "success": true,
  "data": [
    {
      "vin": "1HGCM82633A123456",
      "make": "Honda",
      "model": "Accord",
      "year": 2020,
      "engine": "2.4L",
      "country": "Japan",
      "status": "Valid",
      "specifications": {
        "fuel_type": "Petrol",
        "transmission": "Automatic"
      }
    },
    {
      "vin": "1HGCM82633A123456",
      "stolen": false,
      "reported_date": null,
      "reporting_country": null
    }
  ],
  "pdfUrl": "https://your-domain.com/files/vin-report-12345.pdf"
}`,
                },
                {
                  label: "Response — VIN Lookup WITHOUT Stolen Check",
                  body: `{
  "success": true,
  "data": [
    {
      "vin": "1HGCM82633A123456",
      "make": "Toyota",
      "model": "Camry",
      "year": 2018,
      "engine": "2.5L",
      "country": "USA",
      "status": "Valid"
    }
  ],
  "pdfUrl": "https://your-domain.com/files/vin-report-67890.pdf"
}`,
                },
                {
                  label: "Response — Vehicle is Stolen",
                  body: `{
  "success": true,
  "data": [
    {
      "vin": "1HGCM82633A123456",
      "make": "Lexus",
      "model": "RX 350",
      "year": 2019,
      "status": "Valid"
    },
    {
      "vin": "1HGCM82633A123456",
      "stolen": true,
      "reported_date": "2024-11-15",
      "reporting_country": "Nigeria"
    }
  ],
  "pdfUrl": "https://your-domain.com/files/vin-report-44556.pdf"
}`,
                },
              ]}
            />
          </TabPane>

          {/* Vehicle License Tab */}
          <TabPane
            tab={
              <span>
                <IdcardOutlined /> Vehicle License
              </span>
            }
            key="vehicle-license"
          >
            <EndpointCard
              method="POST"
              path="/vehicle/license"
              title="Vehicle License Verification"
              icon={<IdcardOutlined style={iconStyle} />}
              description="Verify a vehicle license number. Returns plate number, vehicle make/model, registration year, expiry date, and validity status."
              request={`{
  "licenseNumber": "ABC123XY"
}`}
              responses={[
                {
                  label: "Response — Valid License",
                  body: `{
  "success": true,
  "data": {
    "license_number": "ABC123XYZ",
    "plate_number": "KJA-123AA",
    "vehicle_make": "Toyota",
    "vehicle_model": "Corolla",
    "vehicle_color": "Black",
    "registration_year": "2021",
    "expiry_date": "2027-05-12",
    "status": "VALID",
    "state": "Lagos"
  }
}`,
                },
                {
                  label: "Response — Expired License",
                  body: `{
  "success": true,
  "data": {
    "license_number": "ABC123XYZ",
    "plate_number": "KJA-123AA",
    "vehicle_make": "Honda",
    "vehicle_model": "Civic",
    "expiry_date": "2022-05-12",
    "status": "EXPIRED",
    "state": "Abuja"
  }
}`,
                },
                {
                  label: "Response — No Record Found",
                  body: `{
  "success": true,
  "data": {
    "message": "No record found",
    "status": "NOT_FOUND"
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
