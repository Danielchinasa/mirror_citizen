import { useState, useEffect } from "react";
import { apiGet } from "../apiUtils";

const useServicePrices = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiGet("/africa/countries/CI/service-prices");
        const services = response.data?.data || response.data || response;
        setPrices(Array.isArray(services) ? services : null);
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchPrices();
  }, []);

  // Accept a service name string, e.g. "National ID NNI", "Residents ID", "VIN"
  // Pass isCI=true for FCFA display, false for USD display
  const getPrice = (serviceName, isCI = true) => {
    if (!Array.isArray(prices)) return null;
    const found = prices.find(
      (s) => s.service?.toLowerCase() === serviceName?.toLowerCase(),
    );
    if (!found) return null;
    if (isCI) {
      return found.price
        ? `CFA ${Number(found.price).toLocaleString()}`
        : null;
    }
    return found.price2 ? `$${Number(found.price2).toFixed(2)}` : null;
  };

  return { prices, getPrice };
};

export default useServicePrices;
