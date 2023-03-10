import React from "react";
import {InfoSection, Pricing} from "../../components";
import HeroSection from "../../components/HeroSection/HeroSection";
import {homeObjOne, homeObjThree, homeObjTwo, homeObjFour} from "./Data";

const Home = () => {
    return (
        <>
            <HeroSection {...homeObjOne} />
        </>
    );
};

export default Home;
