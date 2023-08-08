import React from "react";
import { Card, Row, Col, Statistic, Space, Table, Tag } from "antd";
import { Container, Heading4, InfoSec, Subtitle } from "../../globalStyles";

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

const MainDashboard = () => {
  return (
    <Container>
      <InfoSec>
        <Card
          style={{
            width: "100%",
          }}
        >
          <Heading4>Dashboard</Heading4>
          <Subtitle>Contains all previous activities carried out</Subtitle>
        </Card>
        <Row gutter={3} style={{ marginTop: "30px" }}>
          <Col
            span={6}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            <Card style={{ backgroundColor: "#DFF7E4" }}>
              <Statistic
                title="Verifications"
                value={124}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "30px" }}>
          <Heading4>Recent Activities</Heading4>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </div>
      </InfoSec>
    </Container>
  );
};

export default MainDashboard;
