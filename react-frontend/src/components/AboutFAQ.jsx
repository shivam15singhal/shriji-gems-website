import React, { useState } from "react";

const faqs = [
  {
    q: "Who is Vijay Sharma?",
    a: "Vijay Sharma is a renowned Lal Kitab Visheshagya (Lal Kitab Expert) known for providing practical astrological guidance and effective remedies based on the principles of Lal Kitab. He has helped numerous individuals overcome challenges related to career, marriage, finances, health, and family life."
  },
  {
    q: "What is Vijay Sharma's area of expertise?",
    a: "Vijay Sharma specializes in Lal Kitab astrology, horoscope analysis, Kundli reading, planetary dosha solutions, and personalized astrological remedies designed to bring positive changes in life."
  },
  {
    q: "Why should I consult Vijay Sharma?",
    a: "Vijay Sharma is known for offering simple, practical, and result-oriented Lal Kitab remedies. His consultations focus on understanding the root cause of problems and providing easy-to-follow solutions tailored to each individual's birth chart."
  },
  {
    q: "What issues can Vijay Sharma help with?",
    a: "He provides guidance on career growth, business success, marriage and relationship concerns, financial stability, health-related challenges, education, property matters, and family issues through astrological analysis and Lal Kitab remedies."
  },
  {
    q: "Are the Lal Kitab remedies suggested by Vijay Sharma easy to follow?",
    a: "Yes. Vijay Sharma believes in recommending simple and practical Lal Kitab remedies that can be easily incorporated into daily life while maintaining the authenticity of traditional astrological principles."
  },
  {
    q: "Can I consult Vijay Sharma online?",
    a: "Yes. Consultations are available through phone calls, video calls, and online platforms, making it convenient for clients across India and abroad to seek guidance."
  },
  {
    q: "Is my personal information kept confidential?",
    a: "Absolutely. All birth details, personal information, and consultation discussions are treated with complete privacy and confidentiality."
  },
  {
    q: "How can I book an appointment with Vijay Sharma?",
    a: "You can schedule a consultation by contacting the office through phone, WhatsApp, or the appointment form available on the website. The team will assist you with the booking process and consultation details."
  }
];

function AboutFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section-about">

      <div className="faq-header-about">
        <span className="faq-tag">
          Frequently Asked Questions
        </span>

        <h2>
          Questions About
          <span> Vijay Sharma Ji</span>
        </h2>

        <p>
          Find answers to common questions regarding
          Lal Kitab consultation, astrology guidance,
          remedies and appointment booking.
        </p>
      </div>

      <div className="faq-container-about">
        {faqs.map((faq, index) => (
          <div
            className={`faq-card-about ${
              open === index ? "active" : ""
            }`}
            key={index}
          >
            <button
              className="faq-question-about"
              onClick={() =>
                setOpen(open === index ? null : index)
              }
            >
              <span>{faq.q}</span>

              <div className="faq-icon">
                {open === index ? "−" : "+"}
              </div>
            </button>

            {open === index && (
              <div className="faq-answer-about">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}

export default AboutFAQ;