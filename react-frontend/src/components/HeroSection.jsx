import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

function LuxuryHero() {
  const navigate = useNavigate();

  return (
    <section className="luxury-hero-section">

      <div className="luxury-hero-container">

        {/* LEFT */}

        <div className="luxury-hero-content">

          {/* <span className="luxury-hero-tag">
            Certified Natural Gemstones
          </span> */}

          <h1 className="luxury-hero-heading">
            Certified Gemstones
            <br />
            For Prosperity,
            <br />
            Protection & Success
          </h1>

          <p className="luxury-hero-description">
            Premium lab-certified gemstones selected for
            prosperity, protection and success.
          </p>

          <button
            className="luxury-hero-btn"
            onClick={() => navigate("/gemstones")}
          >
           Explore Gemstones
          </button>

          <div className="luxury-hero-trust">

            <span>✓ Lab Certified</span>

            <span>✓ Authentic Stones</span>

            <span>✓ Expert Guidance</span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="luxury-hero-image">

          <img
            src="/finalhero.png"
            alt="Luxury Gemstones"
          />

        </div>

      </div>

    </section>
  );
}

export default LuxuryHero;