import React, { useEffect, useState } from "react";

function GenerateTransactionId() {
  const [randomTransactionId, setRandomTransactionId] = useState("");

  useEffect(() => {
    const generateTransactionId = () => {
      const length = 14; // total length including "EA"
      let transactionId = "EA";
      for (let i = 0; i < length - 2; i++) {
        transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
      }
      return transactionId;
    };

    const newTransactionId = generateTransactionId();
    setRandomTransactionId(newTransactionId);
  }, []);

  return { randomTransactionId };
}

export default GenerateTransactionId;
