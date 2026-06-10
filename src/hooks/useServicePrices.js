import { useState, useEffect } from "react";
import { apiPost } from "../apiUtils";

const useServicePrices = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress") || "";
        const data = await apiPost("/transaction/public/service-prices", {
          ipAddress,
        });
        setPrices(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const getPrice = (index) => {
    const price = prices?.[index]?.price;
    return price ? `₦${Number(price).toLocaleString()}` : null;
  };

  return { prices, getPrice };
};

export default useServicePrices;
