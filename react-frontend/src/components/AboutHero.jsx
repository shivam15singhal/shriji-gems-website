import React from "react";

function AboutHero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
  <h4 className="hero-subtitle">
    When you’re looking for clarity
  </h4>

  <h1 className="hero-title">
    Personal answers to life’s questions
  </h1>

  <h2 className="hero-astro">
    Astrologer Vijay Sharma
  </h2>

  <p className="hero-description">
    Offering calm, confidential and deeply personalized astrological
    guidance — so you can make decisions with confidence and peace of mind.
  </p>

  <div className="hero-features">
    <span>✔ Experienced & trusted guidance</span>
    <span>✔ Practical remedies you can apply</span>
    <span>✔ Solutions tailored to you</span>
    <span>✔ Complete privacy & discretion</span>
  </div>

  <p className="hero-people">
    Trusted by <strong>1.2 Lakh+</strong> people seeking clarity and direction
  </p>

<button
  className="hero-btn"
  onClick={() => window.location.href = "tel:+919818307307"}
>
  Book Your Consultation Call
</button>
</div>

        <div className="hero-image">
          <img src="/check.png" alt="Astrologer" />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
