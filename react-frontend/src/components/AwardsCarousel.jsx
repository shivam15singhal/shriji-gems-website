import React, { useEffect, useRef, useState } from "react";

const images = [
  "/AWARDS-PIC/award1.jpeg",
  "/AWARDS-PIC/award2.jpeg",
  "/AWARDS-PIC/award3.png",
  "/AWARDS-PIC/award4.jpeg",
  "/AWARDS-PIC/award1.jpeg",
];

const duplicatedImages = [...images, ...images, ...images];

function AwardsCarousel() {
  const [index, setIndex] = useState(images.length);
  const trackRef = useRef(null);

  const CARD_WIDTH = 260; // card width + gap

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  // Infinite loop correction
  useEffect(() => {
    if (index >= images.length * 2) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(images.length);
      }, 600);
    }

    if (index <= images.length - 1) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(images.length * 2 - 1);
      }, 600);
    }
  }, [index]);

  // Restore transition
  useEffect(() => {
    if (trackRef.current) {
      requestAnimationFrame(() => {
        trackRef.current.style.transition = "transform 0.6s ease";
      });
    }
  }, [index]);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title"> Meet Your Astrologer</h2>

      <div className="gallery-full">
        <button className="nav-btn left" onClick={prevSlide}>‹</button>

        <div className="gallery-viewport">
          <div
            ref={trackRef}
            className="gallery-track"
            style={{
              transform: `translateX(-${index * CARD_WIDTH}px)`
            }}
          >
            {duplicatedImages.map((img, i) => {
              const isActive = i === index + 1;
              return (
                <div
                  className={`gallery-card ${isActive ? "active" : ""}`}
                  key={i}
                >
                  <img src={img} alt="Award" />
                </div>
              );
            })}
          </div>
        </div>

        <button className="nav-btn right" onClick={nextSlide}>›</button>
      </div>
    </section>
  );
}

export default AwardsCarousel;
