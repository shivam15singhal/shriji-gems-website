import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GemsSection.css";
const API_BASE =process.env.REACT_APP_API_URL || "http://localhost:5000";

function GemsSection() {

  const [gems, setGems] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH GEMS ================= */

  useEffect(() => {

fetch(`${API_BASE}/api/gems`)
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setGems(data.slice(0, 8)); // show first 8 gems on homepage
        } else {
          setGems([]);
        }

      })
      .catch((err) => {
        console.error("Error loading gems:", err);
        setGems([]);
      });

  }, []);

  function openGem(id) {
    navigate(`/gems/${id}`);
  }

  return (

    <div className="home-gems-page">

      <div className="gems-section">

        <h2>Explore Our Most Sought-After Gemstones</h2>
        <p className="gem-subtext">
  Each gemstone is carefully selected for its beauty, energy, and certified authenticity.
</p>

        <div className="gems-list">

          {gems.length === 0 ? (
            <p>Loading gemstones...</p>
          ) : (

            gems.map((gem) => (

              <div
                className="gem-item"
                key={gem._id}
                onClick={() => openGem(gem._id)}
              >

              <img
  src={
    gem.image?.startsWith("http")
      ? gem.image
      : `${API_BASE}${gem.image}`
  }
  alt={gem.name}
/>

                <div className="gem-text">

                  <h3>
                    {gem.name} <span className="arrow">▶</span>
                  </h3>

                  <p>{gem.description}</p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default GemsSection;