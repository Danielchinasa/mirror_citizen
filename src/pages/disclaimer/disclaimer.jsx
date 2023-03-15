import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
  Subtitle,
  Heading,
  OutlineButton,
  MainButton,
  InfoSec,
} from "../../globalStyles";

const Disclaimer = () => {
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
            <Heading>Disclaimer</Heading>
            <Subtitle>
              Kindly be advised that a request for consent will be sent to the
              third party, that would require an approval to complete the
              verification.
            </Subtitle>
            <Row justify="space-around">
              <Col>
                <OutlineButton type="primary">Back</OutlineButton>
              </Col>
              <Col>
                <Link to="/consent">
                  <MainButton
                    type="primary"
                    style={{ paddingRight: "50px", paddingLeft: "50px" }}
                  >
                    Make payment
                  </MainButton>
                </Link>
              </Col>
            </Row>
          </Col>
        </InfoSec>
      </center>
    </div>
  );
};

export default Disclaimer;
