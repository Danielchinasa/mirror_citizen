import React, { useState } from "react";
import { Card, Row, Col, Statistic, Space, Table, Tag, Tabs } from "antd";
import { Container, Heading4, InfoSec, MainButton } from "../../globalStyles";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: "Agency",
    dataIndex: "agency",
    key: "agency",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Expires",
    key: "expires",
    dataIndex: "expires",
    render: (_, { expires }) => (
      <>
        {expires.map((expire) => {
          let color = expire.length > 5 ? "geekblue" : "green";
          if (expire === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={expire}>
              {expire.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a href="/">Invite {record.name}</a>
      </Space>
    ),
  },
];
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
const items = [
  {
    key: "1",
    label: "Verification History",
    children: (
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
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
  const handleFlutterPayment = useFlutterwave(config);
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
          <Space direction="horizontal" align="center">
            <Heading4>Recent Activities</Heading4>
            <MainButton
              type="primary"
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
          </Space>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </InfoSec>
    </Container>
  );
};

export default MainDashboard;
