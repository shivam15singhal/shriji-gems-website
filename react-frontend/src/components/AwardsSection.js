import React, { useEffect, useState } from "react";
import "./AwardsSection.css";
import { useNavigate } from "react-router-dom";

function AwardsSection() {
  const navigate = useNavigate();

  const images = [
  "/AWARDS-PIC/award1.jpeg",
  "/AWARDS-PIC/award2.jpeg",
  "/AWARDS-PIC/award3.png"
];


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
    
      <h1 className="award_heading">Trusted Guidance & Industry Recognition</h1>
      <p className="awards-subtext">
  Helping thousands choose the right gemstones through expert guidance, trusted consultation, and industry recognition.
</p>

      <div className="section">
        {/* LEFT CARD */}
        <div className="card card-left">
          <h3>
           Need Help Choosing <span>The Right Gemstone?</span>
          </h3>

          <p>
            Connect with our Expert and find the best stone for you.
          </p>

          <div className="expert-img">
            <img
              src="/WhatsApp Image 2025-11-29 at 12.55.33.jpeg"
              alt="Expert"
            />
          </div>
          <p className="expert-stats">
5000+ Consultations • 15+ Years Experience
</p>

          <div className="reviews">
            <div className="review-box">
              <div className="review-left">
                <img
                  src="/LOGO-CERTIFICATE/Google.webp"
                  alt="Google"
                />
                <span>Google Review</span>
              </div>
              <div className="review-right">⭐ 4.7</div>
            </div>

            <div className="review-box">
              <div className="review-left">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                />
                <span>Facebook Review</span>
              </div>
              <div className="review-right">⭐ 4.4</div>
            </div>
          </div>

          <div className="buttons">
            <button
              className="btn btn-call"
              onClick={() =>
                (window.location.href = "tel:+918826881352")
              }
            >
              📞 CALL NOW
            </button>

            <button
              className="btn btn-expert"
              onClick={() => navigate("/about")}
            >
              👤 Know more about me
            </button>
          </div>
        </div>

   {/* RIGHT CARD - SLIDER */}
<div className="card card-right">
  <div className="award-slider">

  <div
    className="award-slides"
    style={{
      transform: `translateX(-${index * 100}%)`
    }}
  >
    {images.map((img, i) => (
      <div className="award-slide" key={i}>
        <img src={img} alt={`Award ${i + 1}`} />
      </div>
    ))}
  </div>

  <button
    className="award-prev"
    onClick={prevSlide}
  >
    ‹
  </button>

  <button
    className="award-next"
    onClick={nextSlide}
  >
    ›
  </button>

</div>
</div>

      </div>
    </>
  );
}

export default AwardsSection;