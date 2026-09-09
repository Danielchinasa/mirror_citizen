import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../analytics/analytics";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
};

export default usePageTracking;
