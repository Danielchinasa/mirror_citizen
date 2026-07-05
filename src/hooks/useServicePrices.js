import { useState, useEffect } from "react";
import { apiGet } from "../apiUtils";

const useServicePrices = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiGet("/africa/countries/GH/service-prices");
        const services = response.data?.data || response.data || response;
        setPrices(Array.isArray(services) ? services : null);
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchPrices();
  }, []);

  // Accept a service name string, e.g. "ID Card", "VIN"
  const getPrice = (serviceName) => {
    if (!Array.isArray(prices)) return null;
    const found = prices.find(
      (s) => s.service?.toLowerCase() === serviceName?.toLowerCase(),
    );
    return found?.price ? `GH₵${Number(found.price).toLocaleString()}` : null;
  };

  return { prices, getPrice };
};

export default useServicePrices;
