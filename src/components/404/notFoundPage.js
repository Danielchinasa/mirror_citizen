// NotFoundPage.js

import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  const history = useHistory();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      history.goBack();
      return;
    }

    history.push("/");
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
        title="Page not found"
        subTitle="The page you are looking for does not exist or may have moved."
        extra={
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
          >
            Go back
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
