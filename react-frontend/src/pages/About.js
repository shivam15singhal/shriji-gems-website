import React from "react";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutServices from "../components/AboutServices";
import AwardsCarousel from "../components/AwardsCarousel";
import ClientReviews from "../components/ClientReviews";
import AboutFAQ from "../components/AboutFAQ";
import Footer from "../components/Footer";
import WhyPeopleTrust from "../components/AboutWhyPeopleTrust";
import "./About.css";


function About() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutServices />
      <AwardsCarousel />
      <ClientReviews />
      <WhyPeopleTrust />
      {/* <BlogsSection /> */}
      <AboutFAQ />
      <Footer />
    </>
  );
}

export default About;
