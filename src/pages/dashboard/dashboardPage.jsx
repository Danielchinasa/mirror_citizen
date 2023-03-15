import { CloudUploadOutlined } from "@ant-design/icons";
import { Checkbox, Col, DatePicker, message, Row, Select, Upload } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Container,
  Heading,
  Heading4,
  Heading6,
  Img,
  InfoSec,
  MainButtonFull,
  OutlineButtonFull,
  StyledInput,
  StyledLabel,
  DisabledButtonFull,
} from "../../globalStyles";
import banner from "../../images/banner.png";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const dateFormat = "YYYY/MM/DD";

const DashboardPage = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [disableStep2, setDisableStep2] = useState(true);
  const [disableStep3, setDisableStep3] = useState(true);
  const [disablePayment, setDisablePayment] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState(undefined);

  return (
    <Row>
      <Col>
        <Img src={banner} />
      </Col>
      <Container>
        <InfoSec>
          <Heading>Identity Verification Service</Heading>
          <Row gutter={[50, 50]}>
            <Col
              span={8}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <MainButtonFull type="primary">Step 1</MainButtonFull>
              <Heading6>Agency</Heading6>
              <Select
                showSearch
                size="large"
                onSelect={() => {
                  setStep2(true);
                  setDisableStep2(false);
                }}
                style={{
                  width: "100%",
                }}
                placeholder="Pick verification agency"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "National Identity Management Commission(NIMC)",
                  },
                  {
                    value: "2",
                    label: "Nigeria Inter-Bank Settlement System(NIBSS) ",
                  },
                  {
                    value: "3",
                    label: "Federal Road Safety Corps(FRSC)",
                    disabled: true,
                  },
                  {
                    value: "4",
                    label:
                      "National Agency for the Prohibition of Trafficking in Persons (NAPTIP)",
                    disabled: true,
                  },
                  {
                    value: "5",
                    label: "Nigeria Police Force(NPF) coming soon",
                    disabled: true,
                  },
                ]}
              />
            </Col>
            <Col
              span={8}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              {step2 ? (
                <MainButtonFull type="primary">Step 2</MainButtonFull>
              ) : (
                <OutlineButtonFull type="light">Step 2</OutlineButtonFull>
              )}

              <Heading6>Information Type</Heading6>
              <Select
                disabled={disableStep2}
                showSearch
                size="large"
                style={{
                  width: "100%",
                }}
                onSelect={() => {
                  setStep3(true);
                  setDisableStep3(false);
                }}
                placeholder="Select Information type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "NIMC Basic information",
                  },
                  {
                    value: "2",
                    label: "NIMC Detailed information",
                  },
                ]}
              />
            </Col>
            <Col
              span={8}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              {step3 ? (
                <MainButtonFull type="primary">Step 3</MainButtonFull>
              ) : (
                <OutlineButtonFull type="light">Step 3</OutlineButtonFull>
              )}
              <Heading6>Verification method</Heading6>
              <Select
                disabled={disableStep3}
                showSearch
                size="large"
                style={{
                  width: "100%",
                }}
                value={verificationMethod}
                onChange={(event) => {
                  setVerificationMethod(event);
                  setDisablePayment(false);
                  return false;
                }}
                placeholder="Select Verification method"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "National Identity Number(NIN)",
                  },
                  {
                    value: "2",
                    label: "Fingerprint",
                  },
                  {
                    value: "3",
                    label: "Phone Number",
                  },
                  {
                    value: "4",
                    label: "Bio-Data",
                  },
                ]}
              />
              <div style={{ marginTop: "20px" }}>
                {verificationMethod === "1" ? (
                  <>
                    <StyledLabel>National Identity Number(NIN)</StyledLabel>
                    <StyledInput placeholder="Enter your NIN" />
                  </>
                ) : verificationMethod === "3" ? (
                  <>
                    <StyledLabel>Phone number</StyledLabel>
                    <StyledInput placeholder="Enter your Phone number" />
                  </>
                ) : verificationMethod === "4" ? (
                  <>
                    <StyledLabel>First Name</StyledLabel>
                    <StyledInput placeholder="Enter your First Name" />
                    <StyledLabel>Last Name</StyledLabel>
                    <StyledInput placeholder="Enter your Last Name" />
                    <Row>
                      <Col span={12}>
                        <StyledLabel>Date</StyledLabel>
                        <DatePicker
                          defaultValue={dayjs("2015/01/01", dateFormat)}
                          format={dateFormat}
                          size="large"
                        />
                      </Col>
                      <Col span={12}>
                        <StyledLabel>Gender</StyledLabel>
                        <Select
                          showSearch
                          size="large"
                          style={{
                            width: "100%",
                          }}
                          onSelect={() => {
                            setStep3(true);
                          }}
                          placeholder="Choose a gender"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={[
                            {
                              value: "1",
                              label: "Male",
                            },
                            {
                              value: "2",
                              label: "Female",
                            },
                            {
                              value: "3",
                              label: "Others",
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                  </>
                ) : verificationMethod === "2" ? (
                  <div>
                    <StyledLabel>Upload Finger</StyledLabel>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Dragger>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </InfoSec>
        <Row
          justify="end"
          style={{ border: "1px solid #a9b3c1", marginBottom: "30px" }}
        >
          <Col
            span={8}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            style={{ textAlign: "right", padding: "10px" }}
          >
            <strong>
              <Checkbox onChange={onChange}>
                I certify that I have read and accepted the e-citizen Privacy
                Policy and Terms of Service
              </Checkbox>
            </strong>
            <Heading4>Default fee: ₦200</Heading4>
            {disablePayment ? (
              <DisabledButtonFull>Make payment & get result</DisabledButtonFull>
            ) : (
              <MainButtonFull type="primary">
                Make payment & get result
              </MainButtonFull>
            )}
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default DashboardPage;
