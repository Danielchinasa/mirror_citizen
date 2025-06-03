import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../apiConfig";

const Sms = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const message = queryParams.get("message");

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/sms/receive?from=${encodeURIComponent(
            from
          )}&message=${encodeURIComponent(message)}`
        );
        console.log(response); // Log the response data
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    postData(); // Call the function to send data when the component mounts
  }, [from, message]); // Include from and message in the dependency array to re-send data if they change

  return <div>{/* You can render any additional content here */}</div>;
};

export default Sms;
