import React, { useState } from "react";

const reviews = [
  {
    name: "Praveen",
    text:
      "Very good remedies. His guidance is truly amazing — like showing a light that helps you step out of darkness into clarity.",
  },
  {
    name: "Shafaat",
    text:
      "Talking to Vijay is always very satisfying and relaxing. His calm and confident voice gives you peace. Thank you for your guidance, Vijay Ji.",
  },
  {
    name: "Jyotishmita",
    text:
      "Thank you for your insightful guidance. Your advice has been truly helpful and reassuring.",
  },
  {
    name: "Arshia",
    text:
      "Trust me guys, he is so sweet and kind. His predictions are very accurate. He is my favorite! God bless you sir.",
  },
  {
    name: "Anurag",
    text:
      "Thank you for your deep support. Your guidance has helped me a lot in every way. Thank you so much.",
  },
  {
    name: "Shikha",
    text:
      "Thank you so much, Vijay Sir. It was nice talking to you and I hope to connect with you again soon. Thank you for the solutions and remedies.",
  },
  {
    name: "Sunil",
    text:
      "Vijay Ji is the perfect combination of a friend, a guide, a mentor, a spiritual guru, an astrologer, a remedy provider, and a brother.",
  },
  {
    name: "Ankur",
    text:
      "Best astrologer. He gives very effective and accurate remedies. Very kind and generous. Highly recommended.",
  },
];

function ClientReviews() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="astro-review-section">
      <div className="astro-review-header">
        <div>
          <h2 className="astro-review-title">
            Trusted by <span>AstroTalk Users</span>
          </h2>
          <p className="astro-review-subtitle">
            ⭐ 5.0 Rated • Verified Reviews from AstroTalk
          </p>
        </div>

        <div className="astro-review-arrows">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>

      <div className="astro-review-slider">
        <div
          className="astro-review-track"
          style={{ transform: `translateX(-${index * 320}px)` }}
        >
          {reviews.map((review, i) => (
            <div className="astro-review-card" key={i}>
              <div className="astro-stars">★★★★★</div>
              <p className="astro-review-text">{review.text}</p>

              <div className="astro-review-footer">
                {/* <img src="/user.png" alt="user" /> */}
                <div>
                  <h3>{review.name}</h3>
                  <p>AstroTalk User</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="astro-review-dots">
        {reviews.map((_, i) => (
          <span key={i} className={i === index ? "active" : ""}></span>
        ))}
      </div>
    </section>
  );
}

export default ClientReviews;
