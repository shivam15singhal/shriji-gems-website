import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./GemstoneList.css";
import Footer from "../components/Footer";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function GemstoneList() {

  const [allGems, setAllGems] = useState([]);
  const [filteredGems, setFilteredGems] = useState([]);
  const [activeLetter, setActiveLetter] = useState("all");
  const [activeColor, setActiveColor] = useState(null);

  /* ================= FETCH GEMS ================= */

  useEffect(() => {

    fetch(`${API_BASE}/api/gems`)
      .then((res) => res.json())
      .then((data) => {

        const gems = data || [];

        setAllGems(gems);
        setFilteredGems(gems);

      })
      .catch((err) => {

        console.error("Failed to load gems", err);
        setFilteredGems([]);

      });

  }, []);

  /* ================= FILTER LOGIC ================= */

  useEffect(() => {

    let filtered = [...allGems];

    if (activeLetter !== "all") {

      filtered = filtered.filter((g) =>
        g.name?.toLowerCase().startsWith(activeLetter.toLowerCase())
      );

    }

    if (activeColor) {
  filtered = filtered.filter(
    (g) =>
      g.color &&
      g.color.toLowerCase() === activeColor.toLowerCase()
  );
}

    setFilteredGems(filtered);

  }, [activeLetter, activeColor, allGems]);

  return (

    <>
      <Navbar />
      

      {/* FILTER BAR */}
      

      <section className="filter-bar">

        {/* FILTER BY NAME */}

        <div className="filter-by-name">

          <h4>BY NAME</h4>

          <div className="alphabet-filter">

            {["all", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (

              <span
                key={letter}
                className={activeLetter === letter ? "active" : ""}
                onClick={() => {

                  setActiveLetter(letter);

                  if (letter === "all") setActiveColor(null);

                }}
              >
                {letter.toUpperCase()}
              </span>

            ))}

          </div>

        </div>

        {/* FILTER BY COLOR */}

        <div className="filter-by-color">

          <h4>BY COLOR</h4>

          <div className="color-filter">

            {[
              "red",
              "blue",
              "green",
              "yellow",
              "white",
              "black",
              "pink",
              "purple",
              "brown",
              "orange",
              "grey"
            ].map((color) => (

              <span
                key={color}
                className={`color-circle ${color} ${
                  activeColor === color ? "active-color" : ""
                }`}
                onClick={() =>
                  setActiveColor(activeColor === color ? null : color)
                }
              ></span>

            ))}

          </div>

        </div>

      </section>

      {/* GEM LIST */}

      <section className="gemstone-section">

        <h1>Explore Our Gemstone Collection</h1>
        <input
  type="text"
  placeholder="Search gemstones..."
  className="gem-search"
/>

        <h4>
          Gemstone Names with Pictures - Click on any gem to get detailed
          information, prices, photos and videos.
        </h4>
        <p className="gem-count">
  {filteredGems.length} Gemstones Found
</p>

        <div className="gems-list">

          {filteredGems.length === 0 ? (

            <p>No gemstones found.</p>

          ) : (

            filteredGems.map((gem) => (

              <Link
                to={`/gems/${gem._id}`}
                className="gem-card"
                key={gem._id}
              >

                <div className="gem-image">

                  <img
  src={gem.image}
  alt={gem.name}
/>

                </div>

                <div className="gem-info">

                  <h3>{gem.name}</h3>

                  <p>{gem.description}</p>
                  <button className="gem-btn">
  View Details
</button>

                </div>

              </Link>

            ))

          )}

        </div>
        

      </section>
       <Footer />

    </>
  );
}

export default GemstoneList;