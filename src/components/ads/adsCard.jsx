import React from "react";
import { Typography, Image } from "antd";

const { Text } = Typography;

const AdsCard = ({ title, imageSrc, content, backgroundColor }) => {
  return (
    <div
      style={{
        width: 300,
        border: "1px solid #f0f0f0",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        borderTopRightRadius: "30px",
        borderTopLeftRadius: "30px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: backgroundColor || "#DDF9EA",
          borderTopRightRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <Text>{title}</Text>
          <Image width={40} src={imageSrc} />
        </div>
      </div>
      <div
        style={{
          padding: "30px",
        }}
      >
        <Text>{content}</Text>
      </div>
    </div>
  );
};
export default AdsCard;
