import React, { useState } from "react";
import { Image, Typography, Button, Avatar, List, Space } from "antd";
import individual from "../../images/individual.svg";
import Corporate from "../../images/Corporate.svg";
import { BtnLink } from "../../globalStyles";
import { useTheme } from "../../components/ThemeProvider";
import { theme } from "antd";
const { Title } = Typography;

const SignUpMode = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];
  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleDivClick = (divIndex) => {
    setSelectedDiv(divIndex);
    console.log("Selected Div:", divIndex);
  };

  const { token } = theme.useToken(); // Get token from useToken
  const { text, bgContainer } = token;

  return (
    <div className="p-5">
      <Title>Create Account</Title>
      <Title level={4}>How do you want to sign up?</Title>
      <Space
        size="large"
        direction="vertical"
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            border: `2px ${text} solid`,
            borderRadius: "10px",
            padding: "20px",
            background: selectedDiv === 1 ? "#2FC818" : bgContainer,
            cursor: "pointer",
          }}
          onClick={() => handleDivClick(1)}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item style={{ cursor: "pointer" }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={64}
                      src={individual}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  title={
                    <Title
                      level={3}
                      style={{
                        cursor: "pointer",
                        color: text,
                      }}
                    >
                      Individual
                    </Title>
                  }
                  description="Select this if you are not a registered business and wish to
              perform verifications."
                />
              </List.Item>
            )}
          />
        </div>
        {/* <div
          style={{
            border: "2px #000 solid",
            borderRadius: "10px",
            padding: "20px",
            background: selectedDiv === 2 ? "#EBFFF0" : "white",
            cursor: "pointer",
          }}
          onClick={() => handleDivClick(2)}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      width={60}
                      src={Corporate}
                      preview={false}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  title={
                    <Title level={3} style={{ cursor: "pointer" }}>
                      Business
                    </Title>
                  }
                  description="Select this if your organisation is registered with CAC and you
                  have a valid RC Number."
                />
              </List.Item>
            )}
          />
        </div> */}
        <BtnLink to={"/individual/sign-up/" + selectedDiv}>
          <Button
            type={selectedDiv !== null ? "primary" : "default"}
            disabled={selectedDiv === null}
            block
            size="large"
          >
            Proceed
          </Button>
        </BtnLink>
      </Space>
    </div>
  );
};

export default SignUpMode;
