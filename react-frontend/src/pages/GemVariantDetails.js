import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./GemVariantDetails.css";
import { addToCart as addToCartAPI } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_BASE =process.env.REACT_APP_API_URL || "http://localhost:5000";

function GemVariantDetails() {
  const { gemId, variantIndex } = useParams();
  const navigate = useNavigate();
  const [gem, setGem] = useState(null);
  const [variant, setVariant] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [buyType, setBuyType] = useState("Loose");
  const [certification, setCertification] = useState("Free Lab Certificate");
  const [pooja, setPooja] = useState("No Energization");

  useEffect(() => {
    fetch(`${API_BASE}/api/gems/${gemId}`)
      .then((res) => res.json())
      .then((data) => {
        setGem(data);
        const foundVariant = data.variants[Number(variantIndex)];
        setVariant(foundVariant);
      })
      .catch(console.error);
  }, [gemId, variantIndex]);

  if (!gem || !variant) return <h2>Loading...</h2>;

  const images = [variant.image, variant.image, variant.image];

  function prevImage() {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  }

  function nextImage() {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? prev : prev + 1
    );
  }

 
async function handleAddToCart() {
  try {
    await addToCartAPI({
      gemId: gem._id,
      variantId: variant._id,
      name: gem?.name || "Gem",
      image: variant?.image || gem?.image || "",
      weight: variant.weight,   // NUMBER is OK
      origin: variant.origin || "",
      quantity: 1,
      price: variant.price,
      buyType,
      certification,
      pooja,
    });

  await Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${gem.name} has been added to your cart.`,
      confirmButtonColor: "#ff8fb3",
      timer: 1800,
      showConfirmButton: false
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Please login to add items to cart");
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Failed to add item to cart.",
        confirmButtonColor: "#dc2626"
      });
    }
  }
}



console.log("VARIANT 👉", variant);


  return (
    <>
      <Navbar />

      <div className="detail-breadcrumb">
        Home / Gemstones / {gem.name}
      </div>

      <section className="detail-container">
        {/* IMAGE SLIDER */}
        <div className="detail-images">
          <div className="slider-wrapper">
            <button
              className="slider-arrow left"
              onClick={prevImage}
              disabled={currentIndex === 0}
            >
              ‹
            </button>

            <img
              className="detail-main-img"
              src={images[currentIndex]}
              alt={gem.name}
            />

            <button
              className="slider-arrow right"
              onClick={nextImage}
              disabled={currentIndex === images.length - 1}
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="thumbnail-strip">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={i === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="detail-info">
          <h1>{gem.name}</h1>

          <p className="detail-price">
            ₹{variant.price.toLocaleString()}
          </p>

          <p>Weight: {variant.weight} Carats</p>
          <p>Origin: {variant.origin}</p>

          <p className="detail-desc">{gem.description}</p>

          <label>Certification *</label>
          <select
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
          >
            <option>Free Lab Certificate</option>
            <option>IGI Certified</option>
            <option>Premium Lab Report</option>
          </select>

          <label>Pooja / Energization *</label>
          <select
            value={pooja}
            onChange={(e) => setPooja(e.target.value)}
          >
            <option>No Energization</option>
            <option>Basic Pooja</option>
            <option>Full Energization</option>
          </select>

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

          <button className="detail-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </section>
    </>
  );
}

export default GemVariantDetails;
