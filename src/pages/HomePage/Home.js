import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import NewsletterSection from "../../components/newsletter/newsLetterSection";
import { homeObjOne } from "./Data";
const Home = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisited");

    if (!hasVisitedBefore) {
      setShowNewsletterModal(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closeNewsletterModal = () => {
    setShowNewsletterModal(false);
  };

  return (
    <>
      <HeroSection {...homeObjOne} />
      <NewsletterSection
        visible={showNewsletterModal}
        onClose={closeNewsletterModal}
      />
    </>
  );
};

export default Home;
