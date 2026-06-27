import React, { useEffect, useRef, useState } from "react";


const images = [
  "/AWARDS-PIC/award1.jpeg",
  "/AWARDS-PIC/award2.jpeg",
  "/AWARDS-PIC/award3.png",
  "/AWARDS-PIC/award4.jpeg",
  "/AWARDS-PIC/award1.jpeg",
];

const duplicated = [...images, ...images, ...images];

function AwardsCarousel() {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const [index, setIndex] = useState(images.length);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(1);
  const [activeIndex, setActiveIndex] = useState(index);

  const autoPlay = useRef(null);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  /* ===========================
      RESPONSIVE CARD WIDTH
  ============================ */

  useEffect(() => {
    const update = () => {
      if (!viewportRef.current) return;

      const width = viewportRef.current.offsetWidth;

      let visible = 4;

      if (width < 600) visible = 1;
      else if (width < 900) visible = 2;
      else if (width < 1200) visible = 3;

      setCardsVisible(visible);

      setCardWidth(width / visible);
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  /* ===========================
      AUTOPLAY
  ============================ */

  const startAutoPlay = () => {
    stopAutoPlay();

    autoPlay.current = setInterval(() => {
      nextSlide();
    }, 3500);
  };

  const stopAutoPlay = () => {
    if (autoPlay.current) {
      clearInterval(autoPlay.current);
    }
  };

  useEffect(() => {
    startAutoPlay();

    return stopAutoPlay;
  }, []);

  /* ===========================
      SLIDER
  ============================ */

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
     startAutoPlay();
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
      startAutoPlay();
  };

  /* ===========================
      INFINITE LOOP
  ============================ */

  useEffect(() => {
    const total = images.length;

    if (index >= total * 2) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(total);

        requestAnimationFrame(() => {
          trackRef.current.style.transition =
            "transform .6s ease";
        });
      }, 600);
    }

    if (index <= total - 1) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(total * 2 - 1);

        requestAnimationFrame(() => {
          trackRef.current.style.transition =
            "transform .6s ease";
        });
      }, 600);
    }
  }, [index]);

  /* ===========================
      ACTIVE CENTER CARD
  ============================ */

  useEffect(() => {
    const center = index + Math.floor(cardsVisible / 2);

    setActiveIndex(center);
  }, [index, cardsVisible]);

  /* ===========================
      KEYBOARD
  ============================ */

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowRight") nextSlide();

      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* ===========================
      TOUCH
  ============================ */

  const handleTouchStart = (e) => {
    touchStart.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;

    const distance =
      touchStart.current - touchEnd.current;

    if (distance > 50) nextSlide();

    if (distance < -50) prevSlide();
  };

  return (
    <section className="gallery-section">

      <h2 className="gallery-title">
        Meet Your Astrologer
      </h2>

      <div
        className="gallery-full"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >

        <button
          className="nav-btn left"
          onClick={prevSlide}
        >
          ‹
        </button>

        <div
          className="gallery-viewport"
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <div
            ref={trackRef}
            className="gallery-track"
            style={{
              transform: `translateX(-${index * cardWidth+20}px)`
            }}
          >

            {duplicated.map((img, i) => (
              <div
                key={i}
                className={`gallery-card ${
                  i === activeIndex ? "active" : ""
                }`}
                style={{
                  width: `${cardWidth - 20}px`
                }}
              >

                <img
                  src={img}
                  alt={`Award ${i}`}
                  loading="lazy"
                  draggable="false"
                />

              </div>
            ))}

          </div>

        </div>

        <button
          className="nav-btn right"
          onClick={nextSlide}
        >
          ›
        </button>

      </div>

    </section>
  );
}

export default AwardsCarousel;