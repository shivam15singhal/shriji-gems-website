import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./GemQualityPage.css";
import { addToCart as addToCartAPI } from "../services/cartService";
import RelatedProducts from "../components/RelatedProducts";
import Swal from "sweetalert2";

function GemQualityPage() {

  const { id, quality } = useParams();
  const navigate = useNavigate();

  const [gem, setGem] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // 🔥 NEW

  const [buyType, setBuyType] = useState("Loose");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/gems/${id}`)
      .then((res) => res.json())
      .then((data) => setGem(data))
      .catch(console.error);
  }, [id]);

  if (!gem || !gem.qualities) return <h2>Loading...</h2>;

  const data = gem.qualities?.[quality];
  if (!data) return <h2>Invalid quality</h2>;

  const weights = [4.25, 5.25, 6.25, 7.25, 8.25, 9.25, 10.25, 11.25, 12.25];

  const pricePerRatti = data.pricePerRatti;

  const totalPrice = selectedWeight
    ? Math.round(pricePerRatti * selectedWeight * quantity)
    : null;

const totalSlides = data.video
  ? data.images.length + 1
  : data.images.length;

const nextImage = () => {

  const currentSlide = showVideo
    ? data.images.length
    : currentIndex;

  const nextSlide =
    currentSlide === totalSlides - 1
      ? 0
      : currentSlide + 1;

  if (data.video && nextSlide === data.images.length) {
    setShowVideo(true);
  } else {
    setShowVideo(false);
    setCurrentIndex(nextSlide);
  }
};

const prevImage = () => {

  const currentSlide = showVideo
    ? data.images.length
    : currentIndex;

  const prevSlide =
    currentSlide === 0
      ? totalSlides - 1
      : currentSlide - 1;

  if (data.video && prevSlide === data.images.length) {
    setShowVideo(true);
  } else {
    setShowVideo(false);
    setCurrentIndex(prevSlide);
  }
};

  // 🛒 ADD TO CART
  async function handleAddToCart() {

    if (!selectedWeight) {
     Swal.fire({
  icon: "warning",
  title: "Select Weight",
  text: "Please select a gemstone weight first.",
  confirmButtonColor: "#ff6f9f"
});
      return;
    }

    try {

      const item = {
        gemId: gem._id,
        variantId: quality,
        quality,
        name: `${quality.toUpperCase()} ${gem.name}`,
        image: data.images[currentIndex] || gem.image,
        weight: selectedWeight,
        quantity,
        price: Math.round(pricePerRatti * selectedWeight),
        buyType,
        id: `${gem._id}-${quality}-${selectedWeight}`
      };

      await addToCartAPI(item);

      Swal.fire({
  icon: "success",
  title: "Added to Cart",
  text: "Gemstone added successfully.",
  confirmButtonColor: "#25D366",
  timer: 1800,
  showConfirmButton: false
});
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      if (err.response?.status === 401) {
        Swal.fire({
  icon: "info",
  title: "Login Required",
  text: "Please login to continue.",
  confirmButtonColor: "#ff6f9f"
}).then(() => {
  navigate("/login");
});
      } else {
       Swal.fire({
  icon: "error",
  title: "Something Went Wrong",
  text: "Failed to add item to cart.",
  confirmButtonColor: "#ff6f9f"
});
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className="quality-page">

        {/* LEFT */}
        <div className="image-section">

          {/* THUMBNAILS */}
          <div className="thumbnail-list">

            {/* VIDEO THUMBNAIL */}
            {data.video && (
              <div
                className={`video-thumb ${showVideo ? "active" : ""}`}
                onClick={() => setShowVideo(true)}
              >
                ▶
              </div>
            )}

            {data.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000${img}`}
                onClick={() => {
                  setCurrentIndex(i);
                  setShowVideo(false);
                }}
                className={!showVideo && i === currentIndex ? "active" : ""}
                alt=""
              />
            ))}

          </div>

          {/* MAIN */}
          <div className="main-image">

            {showVideo && data.video ? (
              <video
                src={`http://localhost:5000${data.video}`}
                controls
                muted
                 autoPlay
  playsInline
                className="main-media"
              />
            ) : (
              <img
                src={`http://localhost:5000${data.images[currentIndex]}`}
                alt=""
                className="main-media"
              />
            )}

           <>
  <button className="nav-btn left" onClick={prevImage}>
    ‹
  </button>

  <button className="nav-btn right" onClick={nextImage}>
    ›
  </button>
</>

          </div>

        </div>

        {/* RIGHT */}
        <div className="details-section">
<div className="product-badges">
  <span>✓ Natural</span>
  <span>✓ Lab Certified</span>
  <span>🔥 Best Seller</span>
</div>
          <h1>
            {quality.toUpperCase()} {gem.name}
          </h1>

         <div className="price-box">
  <span className="price-label">Starting Price</span>
  <h2>₹15,000 / Ratti</h2>
</div>

<div className="trust-strip">
  <span>🚚 Free Shipping</span>
  <span>📜 Certified</span>
  <span>🔒 Secure Payment</span>
</div>

          <p className="description">{data.description}</p>

          {/* OPTIONS */}
          <div className="detail-options">
            {["Loose", "Ring", "Pendant"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  checked={buyType === type}
                  onChange={() => setBuyType(type)}
                />
                {type}
              </label>
            ))}
          </div>

          {/* WEIGHT */}
          <div className="weight-section">
            <h4>Select Carat</h4>

            <div className="weights">
              {weights.map((w) => (
                <button
                  key={w}
                  className={selectedWeight === w ? "active" : ""}
                  onClick={() => setSelectedWeight(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div className="quantity-section">

  <h4>Quantity</h4>

  <div className="qty-box">

    <button
      onClick={() =>
        setQuantity((prev) => Math.max(1, prev - 1))
      }
    >
      −
    </button>

    <span>{quantity}</span>

    <button
      onClick={() =>
        setQuantity((prev) => prev + 1)
      }
    >
      +
    </button>

  </div>

</div>

          {/* PRICE */}
          {totalPrice && (
            <p className="total-price">
              Total Price: ₹{totalPrice.toLocaleString()}
            </p>
          )}
        

          <button className="add-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>

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
      {gem.astrology && (
  <section className="astro-section">

    <h2>Astrological Benefits</h2>

    <div className="astro-card">

      {/* LEFT */}

      <div className="astro-column">

        <h3>Benefits</h3>

        <ul className="benefits-list">
          {gem.astrology.benefits?.map((benefit, index) => (
            <li key={index}>
              <span className="check-icon">✓</span>
              {benefit}
            </li>
          ))}
        </ul>

      </div>

      {/* RIGHT */}

      <div className="astro-column">

        <h3>Recommended For</h3>

        <div className="zodiac-tags">
          {gem.astrology.recommendedFor?.map((sign) => (
            <span key={sign}>{sign}</span>
          ))}
        </div>

        <div className="astro-note">
          This gemstone is traditionally recommended by astrologers
          for individuals belonging to the above zodiac signs.
        </div>

      </div>

    </div>

  </section>
)}
{/* TRUST & AUTHENTICITY */}

<section className="trust-section">

  <h2>Authenticity & Trust</h2>

  <p className="trust-subtitle">
    Every gemstone is carefully verified and delivered with complete confidence.
  </p>

  <div className="trust-grid">

    <div className="trust-card">
      <div className="trust-icon">✓</div>
      <h3>Natural Gemstone</h3>
      <p>
        Sourced and selected for its natural beauty and authenticity.
      </p>
    </div>

    <div className="trust-card">
      <div className="trust-icon">📜</div>
      <h3>Lab Certified</h3>
      <p>
        Certification provided to verify quality and authenticity.
      </p>
    </div>

    <div className="trust-card">
      <div className="trust-icon">🛡</div>
      <h3>Authenticity Guarantee</h3>
      <p>
        Every purchase is backed by our authenticity commitment.
      </p>
    </div>

    <div className="trust-card">
      <div className="trust-icon">🚚</div>
      <h3>Secure Delivery</h3>
      <p>
        Carefully packed and shipped safely to your doorstep.
      </p>
    </div>

  </div>

</section>

{/* WHY BUY FROM US */}

<section className="why-us-section">

  <div className="why-us-header">
    <h2>Why Buy From Us</h2>

    <p>
      Trusted by gemstone enthusiasts and astrology believers across India.
    </p>
  </div>

  <div className="why-us-grid">

    <div className="why-card">
      <span className="why-number">5000+</span>
      <h3>Happy Customers</h3>
      <p>Thousands of customers trust us for authentic gemstones.</p>
    </div>

    <div className="why-card">
      <span className="why-number">25+</span>
      <h3>Years Experience</h3>
      <p>Decades of expertise in gemstone selection and guidance.</p>
    </div>

    <div className="why-card">
      <span className="why-number">100%</span>
      <h3>Natural Stones</h3>
      <p>Carefully sourced gemstones with verified authenticity.</p>
    </div>

    <div className="why-card">
      <span className="why-number">24/7</span>
      <h3>Expert Support</h3>
      <p>Get assistance before and after your purchase.</p>
    </div>

  </div>

</section>
{/* FAQ SECTION */}

<section className="faq-section">

  <div className="faq-header">
    <h2>Frequently Asked Questions</h2>

    <p>
      Everything you need to know before purchasing your gemstone.
    </p>
  </div>

  <div className="faq-container">

    <details className="faq-item">
      <summary>Is this a natural gemstone?</summary>
      <p>
        Yes, all gemstones offered are carefully sourced and verified for authenticity.
      </p>
    </details>

    <details className="faq-item">
      <summary>Will I receive a certificate?</summary>
      <p>
        Certification is provided for eligible gemstones wherever applicable.
      </p>
    </details>

    <details className="faq-item">
      <summary>How do I know which weight is suitable for me?</summary>
      <p>
        The recommended weight depends on individual requirements and astrological guidance.
      </p>
    </details>

    <details className="faq-item">
      <summary>Can I order a ring or pendant instead of a loose stone?</summary>
      <p>
        Yes, you can select Ring or Pendant from the available purchase options.
      </p>
    </details>

    <details className="faq-item">
      <summary>How long does delivery take?</summary>
      <p>
        Delivery timelines vary by location, but most orders are delivered within a few business days.
      </p>
    </details>

    <details className="faq-item">
      <summary>Is the packaging secure?</summary>
      <p>
        Every gemstone is packed carefully to ensure safe delivery and protection during transit.
      </p>
    </details>

  </div>

</section>

<RelatedProducts gemId={gem._id} />
    </>
  );
}

export default GemQualityPage;