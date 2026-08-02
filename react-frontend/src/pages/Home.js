import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import GemsSection from "../components/GemsSection";
import GemRecommendation from "../components/GemRecommendation";
import AwardsSection from "../components/AwardsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import VideoReviews from "../components/VideoReviews";
import Testimonials from "../components/Testimonials";
import Certificates from "../components/Certificates";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#form-section") {
      setTimeout(() => {
        const section = document.getElementById("form-section");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  }, [location]);
  return (
    <>
      <SEO
        title="Shri Ji Gems | Laal Kitab Visheshagya, Certified Gemstones & Astrology Consultation"
       description="Buy certified natural gemstones including Yellow Sapphire (Pukhraj), Blue Sapphire (Neelam), Ruby (Manik), Emerald (Panna), Pearl and more. Get expert astrology consultation and guidance from a Laal Kitab Visheshagya with secure delivery across India."
        keywords="Shri Ji Gems, Gemstones, Certified Gemstones, Astrology Consultation, Pukhraj, Yellow Sapphire, Neelam, Blue Sapphire, Ruby, Manik, Emerald, Panna, Pearl, Cat's Eye, Coral, Gemstone Store India"
        image="https://shrijigems.in/logo.png"
        url="https://shrijigems.in/"
      />
       <StructuredData />
      <div>
        <Navbar />
        <HeroSection />
        <GemsSection />
        <GemRecommendation />
        <AwardsSection />
        <WhyChooseUs />
        <VideoReviews />
        <Testimonials />
        <Certificates />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default Home;