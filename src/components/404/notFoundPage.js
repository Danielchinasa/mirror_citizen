// NotFoundPage.js

import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import CustomNotFoundImage from "../../images/lady.svg"; // Import your custom image

const NotFoundPage = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Result
        status="404"
        title="Result not found"
        subTitle="Please check your input value and try again."
        extra={
          <Button type="primary" onClick={handleGoHome}>
            Back to Verifications
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
