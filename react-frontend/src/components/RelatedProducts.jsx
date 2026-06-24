import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatedProducts.css";

function RelatedProducts({ gemId }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/gems/related/${gemId}`)
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
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
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