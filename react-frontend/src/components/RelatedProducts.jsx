import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatedProducts.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const optimizeCloudinary = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_500/"
  );
};

function RelatedProducts({ gemId }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/gems/related/${gemId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [gemId]);

  if (!products.length) return null;

  const handleClick = (id) => {
    navigate(`/gems/${id}/medium`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="related-section">

      <div className="related-header">
        

        <h2>You May Also Like</h2>

        <p>
          Explore similar premium gemstones selected for you.
        </p>
      </div>

      <div className="related-container">

        {products.map((item) => (
          <div
            key={item._id}
            className="related-card"
            onClick={() => handleClick(item._id)}
          >
            <div className="related-image-wrapper">
  <img
  src={optimizeCloudinary(item.image)}
  alt={item.name}
  loading="lazy"
  decoding="async"
/>
            </div>

            <h4>{item.name}</h4>

            <p className="related-price">
              ₹
              {item.qualities?.medium?.pricePerRatti?.toLocaleString() ||
                "N/A"}

              <span>/ ratti</span>
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default RelatedProducts;