import React from "react";

const services = [
  { title: "🔮 Kundli Vishleshan", desc: "Deep birth chart life insights" ,price: "₹ 11000"},
  { title: "💞 Match-Making", desc: "Marriage compatibility through astrology",price: "₹ 1100" },
  { title: "🏡 Vastu Shastra", desc: "Harmonize spaces for positive energy",price: "₹ 22000" },
  { title: "💎 Gemstone Astrology", desc: "Right gemstones for better life" ,price: " Price May vary "},
  { title: "🎓 Education Guidance", desc: "Choose right path for success" },
  { title: "⚔️ Enemy Problem", desc: "Protection from enemies and negativity" },
  { title: "💰 Money & Finance", desc: "Attract wealth and financial stability" },
  { title: "💼 Career Guidance", desc: "Clarity for career growth decisions" },
  { title: "📈 Business Growth", desc: "Boost profits and remove obstacles" },
  { title: "❤️‍🩹 Health Insights", desc: "Astrology-based health guidance remedies" },
  { title: "📞 Phone Consultation", desc: "Personal guidance via direct call" },
  { title: "🤰 Conceiving Issues", desc: "Support for fertility and conception" }
];

function AboutServices() {
  return (
    <>
      <h2 className="service_heading">Our Services</h2>
      <div className="services-container">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div  />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <p>{s.price}</p>
            {/* <button className="order-button">Order Now</button> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default AboutServices;
