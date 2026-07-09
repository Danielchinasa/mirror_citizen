import { useState, useEffect } from "react";
import { apiPost } from "../apiUtils";

const useServicePrices = () => {
  const [prices, setPrices] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState("₦");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress") || "";
        const data = await apiPost("/transaction/public/service-prices", {
          ipAddress,
        });
        const priceData = data?.data || null;
        setPrices(priceData);
        const currency = priceData?.[0]?.currency || "NGN";
        setCurrencySymbol(currency.toUpperCase() === "NGN" ? "₦" : "$");
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const getPrice = (index) => {
    const price = prices?.[index]?.price;
    return price ? `${currencySymbol}${Number(price).toLocaleString()}` : null;
  };

  return { prices, getPrice, currencySymbol };
};

export default useServicePrices;
