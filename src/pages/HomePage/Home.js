import React, { useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import { homeObjOne } from "./Data";
/* global Reach */

const Home = () => {
  useEffect(() => {
    const reachScript = document.createElement("script");
    reachScript.src = "https://clk1.reachclk.com/sdk/reach.js";
    reachScript.async = true;

    document.body.appendChild(reachScript);

    reachScript.onload = () => {
      Reach.track();
    };

    return () => {
      document.body.removeChild(reachScript);
    };
  }, []);

  return (
    <>
      <HeroSection {...homeObjOne} />
    </>
  );
};

export default Home;
