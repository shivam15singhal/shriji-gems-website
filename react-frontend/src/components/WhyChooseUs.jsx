import React from "react";
import "./WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <section className="why-choose-section">

      {/* HEADER */}
      <div className="why-choose-header">
        <h2 className="why-choose-heading">Why Thousands Trust Shri Ji Gems</h2>

        <p className="why-choose-subtext">
        Natural certified gemstones, expert consultation, and trusted service for customers across India.
        </p>
      </div>

      <div className="why-stats">

  <div className="why-stat">
    <h3>10,000+</h3>
    <p>Happy Customers</p>
  </div>

  <div className="why-stat">
    <h3>15+</h3>
    <p>Years Experience</p>
  </div>

  <div className="why-stat">
    <h3>100%</h3>
    <p>Certified Gemstones</p>
  </div>

  <div className="why-stat">
    <h3>4.8★</h3>
    <p>Customer Rating</p>
  </div>

</div>

      {/* CARDS */}
      <div className="why-choose-grid">

        <div className="why-card">
          <div className="why-icon">✨</div>

          <h3>100% Natural Gemstones</h3>

          <p>
           Lab-tested and ethically sourced gemstones with verified authenticity.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">💎</div>

          <h3>Lab Certification Included</h3>

          <p>
           Every gemstone is delivered with trusted certification for complete confidence.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">🛡️</div>

          <h3>Trusted By Thousands</h3>

          <p>
            Helping customers with trusted recommendations
            and positive experiences.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">🌙</div>

          <h3>Expert Astrological Consultation</h3>

          <p>
            Personalized gemstone recommendations based on your birth details.
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;