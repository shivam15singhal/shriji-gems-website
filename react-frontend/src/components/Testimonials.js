import React from "react";
import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">
        DELIGHTFUL WORDS OF 1 LAKH+ BUYERS
      </h2>
      <div className="trust-bar">
  <div>⭐ 4.9/5 Rating</div>
  <div>👥 1 Lakh+ Customers</div>
  <div>💎 Certified Gemstones</div>
</div>

      <div className="testimonial-grid">

        {/* LEFT BIG CARD */}
        <div className="testimonial-card big-card">
          <img
            src="/TEXT-REV/TEXT_4.png"
            alt="Review 1"
            className="big-image"
          />

          <h3>Beyond my expectations</h3>
          <span className="customer-name">
Rahul Sharma • Jaipur
</span>

          <div className="rating">
  ⭐⭐⭐⭐⭐ <span>(5.0)</span>
</div>

          <p>
            Firstly I was confused that online gemstone and jewelry purchasing is genuine or not. 
            But after receiving my order I was very satisfied, as the ring was beyond my expectations. 
            The staff was cooperative and the quality is excellent. I will definitely purchase again.
          </p>
        </div>

        {/* MIDDLE COLUMN (TOP CARD) */}
        <div className="testimonial-card small-card">
          <img
            src="/TEXT-REV/TEXT_3.png"
            alt="Review 2"
            className="small-image"
          />

          <h3>Beautiful Ruby Ring!</h3>
          <span className="customer-name">
Sunita aggarwal • Delhi
</span>

          <div className="rating">
  ⭐⭐⭐⭐⭐ <span>(5.0)</span>
</div>

          <p>
            Thank you very much for the beautiful Ruby Ring! It looks stunning and fits perfectly. 
            The shine and craftsmanship are truly impressive.
          </p>
        </div>

        {/* RIGHT BIG CARD */}
        <div className="testimonial-card big-card">
          <img
            src="/TEXT-REV/TEXT_2.png"
            alt="Review 4"
            className="big-image"
          />

          <h3>Best quality gemstones</h3>
          <span className="customer-name">
Ajay • Delhi
</span>

          <div className="rating">
  ⭐⭐⭐⭐⭐ <span>(5.0)</span>
</div>

          <p>
            I recently had the pleasure of ordering and the entire experience was exceptional. 
            The professionalism and product quality exceeded expectations. 
            From start to finish, everything was smooth and delightful.
          </p>
        </div>

        {/* MIDDLE COLUMN (BOTTOM CARD) */}
        <div className="testimonial-card small-card">
          <img
            src="/TEXT-REV/TEXT_1.png"
            alt="Review 3"
            className="small-image"
          />

          <h3>Impressed with this service</h3>
          <span className="customer-name">
Swati • Mumbai
</span>

          <div className="rating">
  ⭐⭐⭐⭐⭐ <span>(5.0)</span>
</div>

          <p>
            I am really impressed with this service. The ordering process was smooth, delivery was quick, 
            and the product quality exceeded my expectations.
          </p>
        </div>

      </div>
      
    </section>
  );
}

export default Testimonials;