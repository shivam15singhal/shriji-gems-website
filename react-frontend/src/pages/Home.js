import React from "react";
import Navbar from "../components/Navbar";
import GemsSection from "../components/GemsSection";
import GemRecommendation from "../components/GemRecommendation";
import AwardsSection from "../components/AwardsSection";
import VideoReviews from "../components/VideoReviews";
import Testimonials from "../components/Testimonials";
import Certificates from "../components/Certificates";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";
import HeroSection from "../components/HeroSection";



function Home() {
  return (
    <div>
    
    <Navbar />
    <HeroSection/>
    <GemsSection />
    <GemRecommendation />
    <AwardsSection />
    <WhyChooseUs/>
    <VideoReviews />
    <Testimonials />
    <Certificates />
    <FAQ />
<Footer />
    </div>
  );
}

export default Home;
