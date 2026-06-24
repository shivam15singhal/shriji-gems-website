import React, { useState, useRef, useEffect } from "react";
import "./VideoReviews.css";

function VideoReviews() {
  const videos = [
    { src: "/VIDEO-REV/VIDEO_1.mp4", user: "User 1" },
    { src: "/VIDEO-REV/VIDEO_5.mp4", user: "User 2" },
    { src: "/VIDEO-REV/VIDEO_6.mp4", user: "User 3" },
    { src: "/VIDEO-REV/VIDEO_3.mp4", user: "User 4" },
    { src: "/VIDEO-REV/VIDEO_4.mp4", user: "User 5" },
    { src: "/VIDEO-REV/VIDEO_2.mp4", user: "User 6" },
  ];

  const infiniteVideos = [...videos, ...videos];
  const CARD_WIDTH = 315;

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState({});
  const [duration, setDuration] = useState({});
  const [currentTime, setCurrentTime] = useState({});

  const videoRefs = useRef({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SWIPE_THRESHOLD = 60;

  /* ---------- HELPERS ---------- */

  const formatTime = (t = 0) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ---------- PLAY / PAUSE ---------- */

  const handleClick = (idx) => {
    const video = videoRefs.current[idx];
    if (!video) return;

    if (activeVideo === idx) {
      video.pause();
      setActiveVideo(null);
      return;
    }

    if (activeVideo !== null && videoRefs.current[activeVideo]) {
      const prev = videoRefs.current[activeVideo];
      prev.pause();
      prev.currentTime = 0;
    }

    setActiveVideo(idx);
    setIsMuted(false);

    requestAnimationFrame(() => {
      video.muted = false;
      video.play();
    });
  };

  /* ---------- HOVER PREVIEW (DESKTOP) ---------- */

  const handleHoverPlay = (idx) => {
    if (activeVideo !== null) return;
    const video = videoRefs.current[idx];
    if (!video) return;

    video.muted = true;
    video.play();
  };

  const handleHoverPause = (idx) => {
    if (activeVideo !== null) return;
    const video = videoRefs.current[idx];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  /* ---------- MUTE ---------- */

  const toggleMute = (idx, e) => {
    e.stopPropagation();
    const video = videoRefs.current[idx];
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  /* ---------- PROGRESS + TIME ---------- */

  const updateProgress = (idx) => {
    const video = videoRefs.current[idx];
    if (!video) return;

    if (video.duration && !duration[idx]) {
      setDuration((d) => ({ ...d, [idx]: video.duration }));
    }

    setCurrentTime((t) => ({ ...t, [idx]: video.currentTime }));

    setProgress((p) => ({
      ...p,
      [idx]: video.duration
        ? (video.currentTime / video.duration) * 100
        : 0,
    }));
  };

  const seekVideo = (idx, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    const video = videoRefs.current[idx];
    if (!video || !video.duration) return;

    video.currentTime = percent * video.duration;
  };

  /* ---------- SLIDER ---------- */

  const nextSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
    setActiveVideo(null);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
    setActiveVideo(null);
  };

  /* ---------- INFINITE RESET ---------- */

  useEffect(() => {
    if (index === videos.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 600);
    }

    if (index < 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(videos.length - 1);
      }, 600);
    }
  }, [index, videos.length]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  }, [isTransitioning]);

  /* ---------- SWIPE ---------- */

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    distance > 0 ? nextSlide() : prevSlide();
  };

  return (
    <section className="video-section">
      <h1 className="rev_heading">Voices of Trust & Satisfaction</h1>

      <p className="reviews-subtext">
  Hear directly from customers who experienced the authenticity, quality, and positive impact of our certified gemstones.
</p>

      <div className="slider-wrapper">
        <button className="nav-btn left" onClick={prevSlide}>‹</button>

        <div
          className="slider-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${index * CARD_WIDTH}px)`,
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
          >
            {infiniteVideos.map((video, idx) => (
              <div
                key={idx}
                className={`review-card ${
                  activeVideo === idx ? "playing" : ""
                }`}
                onClick={() => handleClick(idx)}
                onMouseEnter={() => handleHoverPlay(idx)}
                onMouseLeave={() => handleHoverPause(idx)}
              >
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  className="review-video"
                  src={video.src}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={() => updateProgress(idx)}
                />

                {activeVideo !== idx ? (
                  <>
                    <div className="play-icon">▶</div>
                    <div className="review-info">
                      <h3>{video.user}</h3>
                      <p>Verified buyer review</p>
                    </div>
                  </>
                ) : (
                  <div
                    className="custom-controls"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="mute-btn"
                      onClick={(e) => toggleMute(idx, e)}
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </button>

                    <div
                      className="progress-bar"
                      onClick={(e) => seekVideo(idx, e)}
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${progress[idx] || 0}%` }}
                      />
                    </div>

                    <div className="time">
                      {formatTime(currentTime[idx] || 0)} /{" "}
                      {formatTime(duration[idx] || 0)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="nav-btn right" onClick={nextSlide}>›</button>
      </div>
    </section>
  );
}

export default VideoReviews;
