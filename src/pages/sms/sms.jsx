import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Sms = () => {
  const { from, message } = useParams(); // Get the parameters from the URL

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.get(
          `/sms/receive?from=${from}&message=${message}`
        );
        console.log(response.data); // Log the response data
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    postData(); // Call the function to send data when the component mounts
  }, [from, message]); // Include from and message in the dependency array to re-send data if they change

  return <div>{/* You can render any additional content here */}</div>;
};

export default Sms;
