import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Space, Table, Tag, Tabs } from "antd";
import { Container, Heading4, InfoSec, MainButton } from "../../globalStyles";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { fetchVerificationData } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const data = [
  {
    key: "1",
    name: "John Brown",
    agency: "NIMC",
    email: "New York No. 1 Lake Park",
    expires: ["2024/03/13"],
  },
  {
    key: "2",
    name: "Jim Green",
    agency: "NIMC",
    email: "London No. 1 Lake Park",
    expires: ["2024/03/16"],
  },
  {
    key: "3",
    name: "Joe Black",
    agency: "NIMC",
    email: "Sydney No. 1 Lake Park",
    expires: ["2024/03/16"],
  },
];
const onChange = (key) => {
  console.log(key);
};

const config = {
  public_key: "FLWPUBK-**************************-X",
  tx_ref: Date.now(),
  amount: 100,
  currency: "NGN",
  payment_options: "card,mobilemoney,ussd",
  customer: {
    email: "user@gmail.com",
    phone_number: "070********",
    name: "john doe",
  },
  customizations: {
    title: "my Payment Title",
    description: "Payment for items in cart",
    logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  },
};

// const handleFlutterPayment = useFlutterwave(config);

const MainDashboard = () => {
  const dispatch = useDispatch();
  const verificationData = useSelector((state) => state.verificationData);
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    // Dispatch the fetchVerificationData action with the bearer token when the component mounts
    if (userToken) {
      dispatch(fetchVerificationData(userToken));
    }
  }, [dispatch, userToken]);

  // Log the verificationData to the console
  useEffect(() => {
    console.log("Verification Data:", verificationData);
  }, [verificationData]);

  const columns = [
    {
      title: "Date and Time",
      dataIndex: "insertionDate",
      key: "insertionDate",
      render: (insertionDate) => {
        const date = new Date(insertionDate);
        const formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Consent Status",
      dataIndex: "consent",
      key: "consent",
    },
    {
      title: "Selected Profile",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      // render: (text) => <a href="/">status</a>,
      // render: (_, record) => <Space size="middle">{status}</Space>,
    },
  ];
  const items = [
    {
      key: "1",
      label: "Verification History",
      children: (
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={verificationData} />
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Transaction Logs",
      children: "Content of Tab Pane 2",
    },
  ];
  return (
    <Container>
      <InfoSec>
        <Row gutter={20}>
          <Col
            span={6}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
          >
            <Card
              style={{
                marginTop: "10px",
                border: "3px #0DC939 solid",
                borderRadius: "12px",
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <Statistic
                title="Total verification "
                value={500}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "50px",
                  fontWeight: "700",
                }}
              />
            </Card>
          </Col>
          <Col
            span={6}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
          >
            <Card
              style={{
                marginTop: "10px",
                border: "3px #0DC939 solid",
                borderRadius: "12px",
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <Statistic
                title="Successful verification "
                value={450}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "50px",
                  fontWeight: "700",
                }}
              />
            </Card>
          </Col>
          <Col
            span={6}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
          >
            <Card
              style={{
                marginTop: "10px",
                border: "3px #0DC939 solid",
                borderRadius: "12px",
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <Statistic
                title="Failed verification "
                value={50}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "50px",
                  fontWeight: "700",
                }}
              />
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "30px" }}>
          {/* <Heading4>Recent Activities</Heading4> */}
          <MainButton
            type="primary"
            style={{ float: "right" }}
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            Fund Wallet
          </MainButton>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </InfoSec>
    </Container>
  );
};

export default MainDashboard;
