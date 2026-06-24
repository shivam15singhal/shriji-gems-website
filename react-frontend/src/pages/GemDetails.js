import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import "./GemDetails.css";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function GemDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [gem, setGem] = useState(null);

  /* ================= FETCH GEM ================= */

  useEffect(() => {
    fetch(`/api/gems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGem(data);
      })
      .catch(console.error);
  }, [id]);

  /* ================= LOADING ================= */

  if (!gem) {
    return (
      <>
        <Navbar />
        <div className="gem-skeleton">
          <div className="skeleton-img"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      </>
    );
  }

  /* ================= GET QUALITY IMAGES ================= */

  const highImg =
    gem.highQualityImage ||
    gem.variants?.find((v) => v.quality === "high")?.image;

  const mediumImg =
    gem.mediumQualityImage ||
    gem.variants?.find((v) => v.quality === "medium")?.image;

  const lowImg =
    gem.lowQualityImage ||
    gem.variants?.find((v) => v.quality === "low")?.image;

  /* ================= JSX ================= */

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="gem-hero">

        <div className="gem-hero-left">
          <div className="gem-image-wrap">
            <img
            src={`${API_BASE}${gem?.image}`}
              alt={gem?.name}
            />
          </div>
        </div>

        <div className="gem-hero-right">

  <nav className="buy-breadcrumb">
    <Link to="/">Home</Link>
    <span>/</span>
    <Link to="/gemstones">Gemstones</Link>
    <span>/</span>
    <span className="current">{gem?.name}</span>
  </nav>

  <div className="gem-badge">
    Certified Natural Gemstone
  </div>

  <h1>{gem?.name}</h1>

  <div className="gem-rating">
    ⭐⭐⭐⭐⭐
    <span>4.9 / 5 Customer Rating</span>
  </div>

  <p className="gem-description">
    {gem?.description}
  </p>

  <div className="gem-highlights">
    <div className="highlight-item">
      ✓ Lab Certified
    </div>

    <div className="highlight-item">
      ✓ Astrology Recommended
    </div>

    <div className="highlight-item">
      ✓ Natural & Genuine
    </div>

    <div className="highlight-item">
      ✓ Secure Delivery
    </div>
  </div>

  <div className="gem-facts">

    <div className="fact-card">
      <span>Certification</span>
      <strong>Lab Certified</strong>
    </div>

    <div className="fact-card">
      <span>Quality</span>
      <strong>Premium Grade</strong>
    </div>

    <div className="fact-card">
      <span>Shipping</span>
      <strong>Pan India</strong>
    </div>

    <div className="fact-card">
      <span>Consultation</span>
      <strong>Available</strong>
    </div>
    <div className="gem-actions">
  <a
    href="https://wa.me/919818307307"
    target="_blank"
    rel="noreferrer"
    className="consult-btn"
  >
    Consult Vijay Sharma Ji
  </a>
</div>

  </div>

</div>
      </section>

      {/* QUALITY SECTION */}
    
<section className="gem-quality">

  <h2>Choose Your Preferred Quality</h2>

  <p className="quality-subtitle">
    Select the quality grade that best matches your requirements,
    budget, and astrological preferences.
  </p>

  <div className="quality-list">

    {/* HIGH */}
    <div
      className="quality-row high"
      onClick={() => navigate(`/gems/${id}/high`)}
    >
      <div className="quality-content">

        <span className="quality-badge">
          PREMIUM GRADE
        </span>

        <h3>High Quality {gem.name}</h3>

        <p>
          Finest quality gemstone selected for customers looking
          for maximum purity, superior appearance, and premium
          certification standards.
        </p>

        <ul>
          <li>✓ Highest Purity Available</li>
          <li>✓ Premium Appearance</li>
          <li>✓ Recommended For Serious Buyers</li>
          <li>✓ Best Astrological Recommendation</li>
        </ul>

      </div>

      <div className="quality-image">
        <img
      src={`${API_BASE}${highImg}`}
          alt="High Quality"
        />
      </div>
    </div>

    {/* MEDIUM */}
    <div
      className="quality-row medium"
      onClick={() => navigate(`/gems/${id}/medium`)}
    >
      <div className="quality-content">

        <span className="quality-badge">
          MOST POPULAR
        </span>

        <h3>Medium Quality {gem.name}</h3>

        <p>
          A balanced option offering excellent quality and value.
          Perfect for customers seeking authenticity without
          premium pricing.
        </p>

        <ul>
          <li>✓ Excellent Value For Money</li>
          <li>✓ Good Purity Standards</li>
          <li>✓ Popular Customer Choice</li>
          <li>✓ Suitable For Daily Wear</li>
        </ul>

      </div>

      <div className="quality-image">
        <img
         src={`${API_BASE}${mediumImg}`}
          alt="Medium Quality"
        />
      </div>
    </div>

    {/* LOW */}
    <div
      className="quality-row low"
      onClick={() => navigate(`/gems/${id}/low`)}
    >
      <div className="quality-content">

        <span className="quality-badge">
          BUDGET FRIENDLY
        </span>

        <h3>Low Quality {gem.name}</h3>

        <p>
          An affordable entry-level option for customers looking
          to begin their gemstone journey within a comfortable budget.
        </p>

        <ul>
          <li>✓ Affordable Pricing</li>
          <li>✓ Genuine Gemstone</li>
          <li>✓ Beginner Friendly</li>
          <li>✓ Great Starter Option</li>
        </ul>

      </div>

      <div className="quality-image">
        <img
          src={`${API_BASE}${lowImg}`}
          alt="Low Quality"
        />
      </div>
    </div>

  </div>

</section>

    </>
  );
}

export default GemDetails;