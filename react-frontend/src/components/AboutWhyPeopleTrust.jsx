import React from "react";


function WhyPeopleTrust() {
  const reasons = [
    {
      icon: "🔒",
      title: "100% Confidential",
      text: "Your personal details and consultation discussions remain completely private and secure."
    },
    {
      icon: "📜",
      title: "Authentic Lal Kitab Guidance",
      text: "Practical remedies and guidance based on the proven principles of Lal Kitab astrology."
    },
    {
      icon: "⭐",
      title: "15+ Years Experience",
      text: "Years of experience helping individuals solve challenges related to career, marriage, and finances."
    },
    {
      icon: "💎",
      title: "Personalized Solutions",
      text: "Every consultation is tailored according to your birth chart and unique life circumstances."
    },
    {
      icon: "🌍",
      title: "Online & Worldwide",
      text: "Consultations available via phone, WhatsApp, and video calls for clients across the globe."
    },
    {
      icon: "❤️",
      title: "Trusted by Thousands",
      text: "More than 1 thousand people have trusted Vijay Sharma for astrological guidance and remedies."
    }
  ];

  return (
    <section className="About-trust-vijay-section">

      <div className="About-trust-header">
        <h2>Why People Trust Vijay Sharma</h2>

        <p>
          Thousands of individuals rely on Vijay Sharma Ji for genuine
          astrological guidance, practical remedies, and life-changing insights.
        </p>
      </div>

      <div className="About-trust-grid">

        {reasons.map((item, index) => (

          <div className="About-trust-card" key={index}>

            <div className="About-trust-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyPeopleTrust;