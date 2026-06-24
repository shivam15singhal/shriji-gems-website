import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
  {
    question: "How do I know which gemstone is right for me?",
    answer:
      "Our gemstone recommendations are based on astrology consultation, kundli analysis, and your personal goals related to health, career, relationships, and prosperity.",
  },

  {
    question: "Are your gemstones certified and authentic?",
    answer:
      "Yes, all our gemstones are carefully verified and come with authenticity certification to ensure quality and trust.",
  },

  {
    question: "Can I consult before purchasing a gemstone?",
    answer:
      "Absolutely. We provide personalized astrology consultation to help you choose the most suitable gemstone for your needs.",
  },

  {
    question: "Do you offer shipping across India and internationally?",
    answer:
      "Yes, we provide secure shipping across India as well as international delivery with safe packaging and tracking support.",
  },

  {
    question: "Can gemstones really help according to astrology?",
    answer:
      "According to Vedic astrology, gemstones are believed to strengthen planetary energies and support different aspects of life when worn correctly.",
  },
];

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <p className="faq-subtext">
  Find answers to common questions about certified gemstones,
  astrology consultations, authenticity, shipping, and recommendations.
</p>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={(e) => {
              createRipple(e);
              toggleFAQ(index);
            }}
          >
            <div className="faq-item-head">
              <span className="faq-question">{item.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-content">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
