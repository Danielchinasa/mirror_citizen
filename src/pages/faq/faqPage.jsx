import React from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse } from "antd";
import { Typography } from "antd";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { Title } = Typography;
const { Panel } = Collapse;

const FaqPage = () => {
  const generalItems = [
    {
      key: "1",
      title: "What data requires consent?",
      content: (
        <p>
          ‘Personal Data’ which is defined under the Nigerian Data Protection
          Act (NDPA) as ‘any information relating to an individual, who can be
          identified or is identifiable, directly or indirectly, by reference to
          an identifier such as a name, an identification number, location data,
          an online identifier or one or more factors specific to the physical,
          physiological, genetic, psychological, cultural, social, or economic
          identity of that individual.’
        </p>
      ),
    },
    {
      key: "2",
      title: "What data is accessible without consent?",
      content: (
        <p>
          According to GDPR and NDPR data regulations, there is no consent
          requirement for disclosure of an individual’s personal data that is
          already in the public domain or publicly available. Also, when the
          accessing body is a government body or security agency and has met the
          relevant regulatory procedural policies & requirements, the data
          subjects’ consent will not be required.
        </p>
      ),
    },
    {
      key: "3",
      title: "How does consent work? ",
      content: (
        <>
          <p>
            Certain information is considered private according to GDPR and
            NDPA, and this data requires your express consent to be viewed by a
            third party. Your privacy is important to us!
          </p>
          <p>
            Basic Identity profile: The consent request is sent to the
            registered SMS and email (where available) attached to the data
            subject’s NIN in the national identity system. Financial Credit
            profile: The consent request is sent to the registered SMS and email
            (where available) attached to the data subject’s BVN in the
            NIBSS/BVN database.
          </p>
        </>
      ),
    },
    {
      key: "4",
      title: "What is a NIN?",
      content: (
        <p>
          The National Identification Number (NIN) is an 11-digit unique number
          issued to all Nigerians and Legal Residents. The NIN links an
          individual’s identity across the different agency databases; providing
          it for verification enables a robust background check.
        </p>
      ),
    },
    {
      key: "5",
      title: "Why do I need to pay before verifying a NIN?",
      content: (
        <p>
          e-Citizen™.ng is a premium service because we put in international
          standards and best practices to integrate data from multiple agencies
          who charge for access.
        </p>
      ),
    },
    {
      key: "6",
      title: "Why do I need to register before verifying a NIN?",
      content: (
        <p>
          Users are required to register to enjoy the verification experience
          e-Citizen™.ng provides.
        </p>
      ),
    },
    {
      key: "7",
      title: "Is my verification result saved on e-Citizen™.ng website?",
      content: (
        <>
          <p>
            Verification results are temporarily stored to the user’s account so
            they can view their search history later. However, search results
            will be deleted after the data retention period as specified in our
            data retention policy at e-citizen.ng.
          </p>
          <p>
            If your question is not answered above, please feel free to write us
            from our contact page or send an email to info@e-citizen.ng{" "}
          </p>
        </>
      ),
    },
    {
      key: "8",
      title: "What do I do if my information is not correct?",
      content: (
        <p>
          Please visit the NIMC website for steps on how to modify your
          information.
        </p>
      ),
    },
  ];

  const financialItem = [
    {
      key: "1",
      title: "What is a Credit Profile?",
      content: (
        <p>
          A credit profile, also known as a credit report, is a detailed record
          of an individual's credit history. It includes information about
          credit accounts, such as the types of accounts (credit cards,
          mortgages, loans), the date they were opened, the credit limit or loan
          amount, account balances, and payment history. This profile is used by
          lenders to evaluate creditworthiness and decide on lending terms. It
          affects the ability to borrow money and the interest rates offered.
          The credit profile is compiled by credit bureaus based on information
          from various sources, including banks, credit card companies, and
          other financial institutions. Data from credit bureaus is what is
          reported by banks and other lenders. Therefore, if a person has not
          taken a loan before, or if the credit bureau has not been updated with
          their records, there would be no data returned for them.
        </p>
      ),
    },
    {
      key: "2",
      title: "Do I need a credit score in Nigeria?",
      content: (
        <p>
          Yes. As long as you are making transactions and using credit
          facilities, you will have a credit report and score. You may not know
          this score, but lenders and organizations will have access to the
          score to use it to make decisions on issues concerning you. It is,
          therefore, better to know the score, so you can know what to expect
          and how to either maintain your good score or improve a bad one.
        </p>
      ),
    },
    {
      key: "3",
      title: "Who can use my credit score in Nigeria?",
      content: (
        <p>
          Creditors, landlords, employees, banks, and credit organizations can
          all use your credit score to make decisions concerning you. Since your
          credit score is a measure of your trustworthiness, it can help them to
          determine if they can take the risk of doing business with you.
        </p>
      ),
    },
    {
      key: "4",
      title: "What is a Credit Bureau?",
      content: (
        <p>
          A credit bureau is an agency that collects and maintains individual
          credit information and provides it to lenders, creditors, and
          consumers. This information is used to create credit reports, which
          include details of an individual's credit history, like loan
          repayments and credit card usage. Lenders use these reports to assess
          creditworthiness when deciding on loan applications. Credit bureaus
          get their information from various sources, including banks, credit
          card companies, and other financial institutions. The main purpose of
          a credit bureau is to provide accurate and up-to-date data that helps
          in making informed lending decisions.
        </p>
      ),
    },
    {
      key: "5",
      title: "What Credit Bureaus do e-citizen check?",
      content: (
        <div>
          <p>1. First Central Credit Bureau </p>
          <p>2. CRC Credit Bureau</p>
          <p>3. Credit Registry </p>
        </div>
      ),
    },
    {
      key: "6",
      title: "What is Bad Credit?",
      content: (
        <p>
          If you have 'bad credit,' it might be due to missed repayments or
          bankruptcy in your past. However, having bad credit doesn't completely
          close the door on getting loans. It does mean your choices will be
          more limited, and you'll likely face higher interest rates compared to
          someone with a spotless credit history. This is different from having
          'no credit,' where you've never taken out a loan and therefore lack a
          credit history.
        </p>
      ),
    },
    {
      key: "7",
      title: "What is a good credit score?",
      content: <p>A good credit score is typically 700 and above.</p>,
    },

    {
      key: "8",
      title: "Is it possible to improve your credit history?",
      content: (
        <p>
          When you do obtain credit, consistently making repayments can help
          repair a damaged credit history. Remember, having 'bad credit' is
          different from 'no credit' - the latter means you've never had a loan
          and have no credit history.
        </p>
      ),
    },
    {
      key: "9",
      title: "Types of loans you’re likely to be approved for with bad credit ",
      content: (
        <p>
          There are lenders who specialize in 'bad credit loans' for individuals
          with a poor credit history. These loans usually come with higher
          interest rates and lower borrowing limits due to the increased risk
          perceived by the lender. However, it's important to note that lenders
          don't solely focus on credit history; they also consider factors like
          employment, income, stability, and other assets, including property
          ownership.
        </p>
      ),
    },
    {
      key: "10",
      title: "How long can it take to improve my credit score?",
      content: (
        <p>
          It might take months or even years to improve your credit score. With
          the right knowledge of how all the weighting factors work, you can
          take appropriate steps to boost your credit score fast. Your credit
          score is your credit history over the years. It will not suddenly be
          improved because you have started to do the right things within a
          short period.
        </p>
      ),
    },
    {
      key: "11",
      title: "Is consent required to view my credit profile? ",
      content: <p>Yes</p>,
    },
  ];

  const businessItems = [
    {
      key: "1",
      title: "What is a Business Profile?",
      content: (
        <p>
          A business profile is a set of data points and information that can be
          used to confirm and validate the identity of a business or
          organization. This enables users to confirm the authenticity of
          information supplied by businesses they are considering for
          engagement.
        </p>
      ),
    },
    {
      key: "2",
      title: "What data source does e-citizen check for Business Profile?",
      content: (
        <p>
          Business Profile data comes from the Corporate Affairs Commission
          (CAC).
        </p>
      ),
    },
    {
      key: "3",
      title: "What information do I need for a Business Profile check?",
      content: (
        <div>
          <p>1. RC Number; OR</p>
          <p>2. Business Name.</p>
        </div>
      ),
    },
    {
      key: "4",
      title: "What information does a Business Profile check provide?",
      content: (
        <div>
          <p>
            A Business Profile check returns detailed information on the
            business to be verified, including:
          </p>
          <p>1.Company Address</p>
          <p>2. Email address</p>
          <p>3. Registration Number</p>
          <p>4. Company Type</p>
          <p>5. Principal Business Activity</p>
          <p>6. Share Capital</p>
          <p>7. Date of Incorporation</p>
          <p>8. Company Status </p>
          <p>9. Details of Officers/Directors </p>
          <p>10. Details of Persons with Significant Control </p>
        </div>
      ),
    },
  ];

  const vehicleItems = [
    {
      key: "1",
      title: "What is a Vehicle History Report ",
      content: (
        <p>
          This service is most suitable for buyers of foreign-used vehicles that
          have not been used locally. A vehicle history report chronicles the
          life of a vehicle abroad, and contains information such as Accident
          History, Actual Mileage, Maintenance History, Date of Shipping to
          Nigeria or another destination, type, number of owners, etc.
        </p>
      ),
    },
    {
      key: "2",
      title: "What is a Vehicle Registration Number Search",
      content: (
        <p>
          This service is uses a Nigerian vehicle registration number to verify
          if the vehicle is registered in Nigeria, and whether or not a vehicle
          has been reported as stolen or missing.
        </p>
      ),
    },
    {
      key: "3",
      title: "What information does a VIN check provide? ",
      content: (
        <p>
          A VIN check provides information such as accident history, title
          history, outstanding recalls, odometer readings, ownership history,
          service history, and more.
        </p>
      ),
    },
    {
      key: "4",
      title: "Is a VIN check reliable?",
      content: (
        <p>
          Yes, a VIN check is a reliable source of information about a vehicle's
          history, but it's important to keep in mind that not all information
          may be available. Some information may be missing or outdated.
        </p>
      ),
    },
    {
      key: "5",
      title: "What is a ClearVin Vehicle History Report? ",
      content: (
        <>
          <p>
            ClearVin specializes in providing both commercial and public
            customers with vehicle history information by VIN number.
          </p>
          <p>
            ClearVin is an authorized data provider of National Motor Vehicle
            Title Information System (NMVTIS) that consolidates the vehicle
            records from U.S. state Department of Motor Vehicles (DMVs),
            insurance carriers, auto recyclers, junk and salvage yards.
            Additionally, ClearVin obtains information from salvage auctions,
            economic reports, government agencies, and other proprietary sources
            to provide comprehensive and accurate VIN check.
          </p>
        </>
      ),
    },
    {
      key: "7",
      title: "How often should I check a VIN?",
      content: (
        <p>
          It's recommended to run a VIN check before purchasing a used vehicle
          or every time you are considering buying a used vehicle. This helps to
          ensure that you have the most up-to-date information about the
          vehicle's history.
        </p>
      ),
    },

    {
      key: "6",
      title: "How long does it take to get a vehicle history report? ",
      content: (
        <p>
          Our vehicle history reports are instant. This implies that you get
          your report as soon as you make payment.
        </p>
      ),
    },
    {
      key: "8",
      title: "Can a VIN check tell if a car has been stolen?",
      content: (
        <p>
          Yes, a VIN check can provide information on whether a vehicle has been
          reported stolen or if it has been recovered from theft.
        </p>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      title: "GENERAL",
      content: (
        <Collapse accordion>
          {generalItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              {item.content}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "2",
      title: "FINANCIAL CREDIT PROFILE",
      content: (
        <Collapse accordion>
          {financialItem.map((item) => (
            <Panel key={item.key} header={item.title}>
              {item.content}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "3",
      title: "BUSINESS PROFILE",
      content: (
        <Collapse accordion>
          {businessItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              {item.content}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "4",
      title: "VEHICLE HISTORY PROFILE",
      content: (
        <Collapse accordion>
          {vehicleItems.map((item) => (
            <Panel key={item.key} header={item.title}>
              {item.content}
            </Panel>
          ))}
        </Collapse>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
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

          {/* FAQ content goes here */}
          <DynamicCollapse
            $token={token}
            size="large"
            accordion
            defaultActiveKey={["1"]}
            onChange={onChange}
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

export default FaqPage;
