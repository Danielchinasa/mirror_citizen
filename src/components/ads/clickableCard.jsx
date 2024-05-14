import React from "react";

const ClickableCard = ({ imageUrl, onClick }) => {
  return (
    <div
      className="col-sm-12 col-md-6 col-lg-3 mb-3"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
        cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
      }}
      onClick={onClick}
    ></div>
  );
};

export default ClickableCard;
