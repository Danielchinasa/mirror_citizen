import React from "react";
import { Col, Spin } from "antd";
import { Subtitle, Heading, InfoSec, BtnLink } from "../../globalStyles";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 84,
    }}
    spin
  />
);

const Consent = () => {
  return (
    <div>
      <center>
        <InfoSec>
          <Col
            span={10}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 10 }}
            lg={{ span: 10 }}
          >
            <Spin indicator={antIcon} />
            <Heading>Get the result in a moment!</Heading>
            <Subtitle>
              We have sent a consent request to the third party and are
              currently awaiting their response. You can track the progress via
              the dashboard. Thank you for your patience.
            </Subtitle>
            <BtnLink to="/result">
              <Subtitle color="primary" style={{ marginTop: "50px" }}>
                Return to Dashboard
              </Subtitle>
            </BtnLink>
          </Col>
        </InfoSec>
      </center>
    </div>
  );
};

export default Consent;
