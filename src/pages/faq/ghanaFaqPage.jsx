import React from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse, Typography } from "antd";
import { theme } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const GhanaFaqPage = () => {
  const generalItems = [
    {
      key: "1",
      title: "Does e-Citizen comply with privacy standards?",
      content:
        "Yes. e-Citizen is designed as a consent-driven platform. For this market, the service should be operated in line with applicable local data protection rules, Biosec/e-Citizen privacy policies, and GDPR where it applies to cross-border or diaspora users.",
    },
    {
      key: "2",
      title: "What data requires consent?",
      content:
        "Personal data requires consent or another lawful basis before it is displayed to a third party. This includes data that can identify a person directly or indirectly, such as names, identification numbers, phone numbers, dates of birth, addresses, photographs, or similar identity information.",
    },
    {
      key: "3",
      title: "What data may be accessible without consent?",
      content:
        "Public records, non-personal vehicle history data, and information accessed by a public authority with the required lawful basis may not require the same customer consent flow. e-Citizen should still apply access controls, audit logging, and responsible-use checks.",
    },
    {
      key: "4",
      title: "How does consent work?",
      content:
        "For services that return personal data, the data subject is asked to authorise the check before the result is released. Depending on the source, consent may be collected through the portal, SMS, email, OTP, WhatsApp, or another approved channel. If consent is not completed, personal data should not be displayed.",
    },
    {
      key: "5",
      title: "Why do I need to pay before verifying?",
      content:
        "e-Citizen is a premium verification service. Fees cover secure integrations, data provider charges, payment processing, infrastructure, monitoring, and customer support. The applicable local or diaspora price is shown before payment.",
    },
    {
      key: "6",
      title: "Why do I need to register before verifying?",
      content:
        "Registration helps protect the platform, lets you track your transactions, and gives you access to your payment history and eligible verification results.",
    },
    {
      key: "7",
      title: "Is my verification result saved on e-Citizen?",
      content:
        "Verification results may be temporarily stored in your account so you can view your search history. Results should be deleted or anonymised after the applicable retention period stated in the privacy policy.",
    },
    {
      key: "8",
      title: "What do I do if my information is not correct?",
      content:
        "e-Citizen aggregates and displays data from authorised data sources. If the information is incorrect, you should contact the relevant custodian agency or issuing authority to correct the source record.",
    },
    {
      key: "9",
      title:
        "I did not receive a verification email, SMS, OTP or WhatsApp message. What should I do?",
      content:
        "Check your spam or junk folder and confirm that the phone number or email address supplied is correct. If the message still does not arrive, contact support with your payment reference, service name, and the phone number or email used.",
    },
    {
      key: "10",
      title: "I paid but did not receive a result. What should I do?",
      content:
        "Contact support with the payment reference, amount paid, service selected, country, and the email or phone number used. The support team can trace the payment and confirm whether the verification request was completed, pending, failed, or requires a refund/retry.",
    },
  ];

  const matrixItems = [
    {
      key: "1",
      title: "Ghana Card / Ghana National ID",
      content:
        "Information normally required: ID/card number; supporting details where required. Consent position: Required where personal data is returned. Typical result: Identity status and permitted identity fields.",
    },
    {
      key: "2",
      title: "Driver's Licence",
      content:
        "Information normally required: Licence number; supporting details where required. Consent position: Required where personal data is returned. Typical result: Licence status and permitted licence fields.",
    },
    {
      key: "3",
      title: "Phone Number",
      content:
        "Information normally required: Phone number; OTP/consent where required. Consent position: Required where personal data is returned. Typical result: Subscriber or identity match indicators.",
    },
    {
      key: "4",
      title: "WAEC Result",
      content:
        "Information normally required: Exam number, year, type, PIN/token where required. Consent position: Depends on the data source and service type. Typical result: Candidate record and available result details.",
    },
    {
      key: "5",
      title: "VIN Vehicle History",
      content:
        "Information normally required: 17-character VIN. Consent position: Usually not required for non-personal/public vehicle history data. Typical result: Vehicle history fields available from VIN sources.",
    },
    {
      key: "6",
      title: "Service availability note",
      content:
        "Service availability depends on live data-source connectivity and provider uptime. Where a source is unavailable, e-Citizen may return a pending, failed, or unavailable status rather than a result.",
    },
  ];

  const countryServiceItems = [
    {
      key: "1",
      title: "Ghana Card / Ghana National ID Verification",
      content: (
        <Collapse accordion>
          <Panel
            key="1"
            header="What is Ghana Card / Ghana National ID verification?"
          >
            <p>
              Ghana Card / Ghana National ID verification helps confirm that an
              identity number or card details match the record held by the
              relevant national identity data source, where the source is
              available through e-Citizen.
            </p>
          </Panel>
          <Panel
            key="2"
            header="What information do I need for Ghana Card / Ghana National ID verification?"
          >
            <p>
              You will normally need the identity number or card number.
              Depending on the data provider, you may also be asked for
              supporting details such as name, date of birth, phone number, or
              consent information.
            </p>
          </Panel>
          <Panel key="3" header="What information can the result provide?">
            <p>
              The result may confirm identity status and return available
              details such as names, gender, date of birth, photograph or match
              indicators, and other fields permitted by the data source. The
              exact fields depend on the provider and regulatory restrictions.
            </p>
          </Panel>
          <Panel key="4" header="Is consent required?">
            <p>
              Yes. Where personal identity information is returned, consent or
              another lawful basis is required before the result is displayed to
              a third party.
            </p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: "2",
      title: "Driver's Licence Verification",
      content: (
        <Collapse accordion>
          <Panel key="1" header="What is driver's licence verification?">
            <p>
              This service helps confirm whether a driver's licence record
              exists and whether the licence details match the data available
              from the relevant licensing source.
            </p>
          </Panel>
          <Panel key="2" header="What information do I need?">
            <p>
              You will normally need the licence number. Depending on the data
              source, additional details such as name, date of birth, or consent
              information may be required.
            </p>
          </Panel>
          <Panel key="3" header="What information can the result provide?">
            <p>
              The result may confirm licence status and return permitted details
              such as names, licence class/category, issue/expiry dates, or
              match indicators, depending on the source.
            </p>
          </Panel>
          <Panel key="4" header="Is consent required?">
            <p>Yes, where the check returns personal identity information.</p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: "3",
      title: "Phone Number Verification",
      content: (
        <Collapse accordion>
          <Panel key="1" header="What is phone number verification?">
            <p>
              Phone number verification helps confirm identity information
              linked to a mobile number where the relevant telecommunications or
              identity data source is available.
            </p>
          </Panel>
          <Panel key="2" header="What information do I need?">
            <p>
              You will normally need the mobile phone number. The data source
              may require OTP, SMS, WhatsApp, email, or another consent step
              before personal data is released.
            </p>
          </Panel>
          <Panel key="3" header="What information can the result provide?">
            <p>
              The result may confirm whether the number has a matching record
              and may return permitted identity or match information. The exact
              fields depend on the data provider and consent flow.
            </p>
          </Panel>
          <Panel key="4" header="Is consent required?">
            <p>Yes, where subscriber or identity information is returned.</p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: "4",
      title: "WAEC Result Verification",
      content: (
        <Collapse accordion>
          <Panel key="1" header="What is WAEC result verification?">
            <p>
              WAEC result verification helps confirm examination result
              information where the relevant examination data can be accessed
              through an approved verification flow.
            </p>
          </Panel>
          <Panel key="2" header="What information do I need?">
            <p>
              You may need the examination number, examination year, examination
              type, and any required PIN, serial number, token, or consent
              detail required by the source.
            </p>
          </Panel>
          <Panel key="3" header="What information can the result provide?">
            <p>
              The result may confirm the candidate record and available subject
              results. It is a verification report and does not replace an
              official certificate issued by the examination body.
            </p>
          </Panel>
          <Panel key="4" header="Can anyone check my result?">
            <p>
              Access should be limited to the person with the required
              information and lawful authority or consent to run the check.
            </p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: "5",
      title: "VIN Vehicle History Report",
      content: (
        <Collapse accordion>
          <Panel key="1" header="What is a VIN vehicle history report?">
            <p>
              A VIN vehicle history report uses a Vehicle Identification Number
              to retrieve available history about a vehicle. It can be useful
              before buying a used or imported vehicle.
            </p>
          </Panel>
          <Panel key="2" header="What information do I need?">
            <p>
              You need the 17-character VIN. The VIN is usually found on the
              dashboard, door frame, registration documents, or vehicle purchase
              documents.
            </p>
          </Panel>
          <Panel key="3" header="What information can a VIN check provide?">
            <p>
              A VIN report may include accident history, title or salvage
              records, mileage/odometer information, recalls, ownership history,
              auction/sales records, service records, and theft or recovery
              indicators where available.
            </p>
          </Panel>
          <Panel key="4" header="Is a VIN check reliable?">
            <p>
              A VIN check is useful, but it may not contain every event in a
              vehicle's history. Some records may be missing, delayed, or
              unavailable from the source databases.
            </p>
          </Panel>
        </Collapse>
      ),
    },
  ];

  const paymentsItems = [
    {
      key: "1",
      title: "How are prices and payment options shown?",
      content:
        "Payment gateways and currencies may vary by market. The available options are shown at checkout.",
    },
    {
      key: "2",
      title: "Can a result be blank or unavailable?",
      content:
        "Service availability depends on live data-source connectivity and provider uptime. Where a source is unavailable, e-Citizen may return a pending, failed, or unavailable status rather than a result.",
    },
    {
      key: "3",
      title: "How do I contact support?",
      content: "Support: info@e-citizen.africa",
    },
  ];

  const items = [
    {
      key: "1",
      title: "GENERAL FAQS",
      content: (
        <Collapse accordion>
          {generalItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              <p>{item.content}</p>
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "2",
      title: "SERVICE AVAILABILITY MATRIX",
      content: (
        <Collapse accordion>
          {matrixItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              <p>{item.content}</p>
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "3",
      title: "COUNTRY SERVICE FAQS",
      content: (
        <Collapse accordion>
          {countryServiceItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              {item.content}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "4",
      title: "PAYMENTS, RESULTS AND SUPPORT",
      content: (
        <Collapse accordion>
          {paymentsItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              <p>{item.content}</p>
            </Panel>
          ))}
        </Collapse>
      ),
    },
  ];

  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Card
            style={{
              width: "100%",
              background: bgContainer,
              borderColor: text,
            }}
          >
            <Title level={4} style={{ color: text }}>
              Frequently Asked Questions
            </Title>
          </Card>

          <DynamicCollapse
            $token={token}
            size="large"
            accordion
            defaultActiveKey={["1"]}
            style={{ marginTop: "30px" }}
          >
            {items.map((item) => (
              <Panel key={item.key} header={item.title}>
                {item.content}
              </Panel>
            ))}
          </DynamicCollapse>
        </InfoSec>
      </Container>
    </div>
  );
};

export default GhanaFaqPage;
