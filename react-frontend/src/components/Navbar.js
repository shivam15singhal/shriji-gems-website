import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../services/cartService";
import { AuthContext } from "../context/AuthContext";
import { HiBars3, HiXMark } from "react-icons/hi2";
import "./Navbar.css";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMagnifyingGlass
} from "react-icons/hi2";

const API_BASE = "http://localhost:5000";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [cartCount, setCartCount] = useState(0);
  const [showGemsDropdown, setShowGemsDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [gems, setGems] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownTimer = useRef(null);

  /* ADMIN CHECK */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    }
  }, [user]);

  /* CART */
  useEffect(() => {
    async function loadCartCount() {
      try {
        const data = await getCart();
        const totalQty = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalQty);
      } catch {
        setCartCount(0);
      }
    }

    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);
    return () => window.removeEventListener("cartUpdated", loadCartCount);
  }, []);

  /* LOAD GEMS */
  useEffect(() => {
    fetch(`${API_BASE}/api/gems`)
      .then((res) => res.json())
      .then((data) => setGems(data))
      .catch(() => {});
  }, []);

  function goToGemList() {
    navigate("/gemstones");
    setShowGemsDropdown(false);
  }

  const openAccountDropdown = () => {
    clearTimeout(dropdownTimer.current);
    setShowAccountDropdown(true);
    setShowGemsDropdown(false);
  };

  const closeAccountDropdown = () => {
    dropdownTimer.current = setTimeout(() => {
      setShowAccountDropdown(false);
    }, 180);
  };

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const results = gems.filter((gem) =>
      gem.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(results.slice(0, 5));
  }, [search, gems]);

  return (
  <>
    {/* TOP TRUST BAR */}

    <div className="top-trust-bar">
      <span>📜 100% Lab Certified Gemstones</span>
      <span>✨ Expert Astrology Guidance</span>
      <span>🚚 Free Shipping Across India</span>
    </div>

    <nav className="main-navbar">

      {/* LEFT */}
      <div
 
  className={`nav-left ${
    mobileMenuOpen ? "mobile-open" : ""
  }`}
>
        <ul>
          <li
            className="gem-dropdown"
            onMouseEnter={() => {
              setShowGemsDropdown(true);
              setShowAccountDropdown(false);
            }}
            onMouseLeave={() => setShowGemsDropdown(false)}
          >
            <span
              className="dropdown-title"
              onClick={goToGemList}
            >
              Gemstones
            </span>

            {showGemsDropdown && (
              <div className="dropdown-menu gems-dropdown">
                {gems.map((gem) => (
                  <Link
                    key={gem._id}
                    to={`/gems/${gem._id}`}
                    className="dropdown-item"
                    onClick={() =>
                      setShowGemsDropdown(false)
                    }
                  >
                    {gem.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <a href="#form-section">
              Gem Recommendation
            </a>
          </li>
          <li>
  <Link to="/about">
    About Us
  </Link>
</li>


          {user?.role === "admin" && (
            <li>
              <Link to="/admin">
                Admin Dashboard
              </Link>
            </li>
          )}
    
    {!user ? (
  <>
    <li className="mobile-only">
      <Link to="/login">Login</Link>
    </li>

    <li className="mobile-only">
      <Link to="/signup">Create Account</Link>
    </li>
  </>
) : (
  <>
    <li className="mobile-only">
      <Link to="/profile">My Profile</Link>
    </li>

    <li className="mobile-only">
      <Link to="/orders">My Orders</Link>
    </li>

    <li className="mobile-only">
      <button
        className="mobile-logout-btn"
        onClick={() => setShowLogoutConfirm(true)}
      >
        Logout
      </button>
    </li>
  </>
)}
          
          
        </ul>
      </div>

<div
  className="mobile-menu-btn"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
  {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
</div>

      {/* CENTER LOGO */}

      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        <img
          src="/FINAL__LOGO.png"
          alt="Shri Ji Gems"
        />
      </div>
      
      {/* RIGHT */}

      <div className="nav-right-wrapper">

        {/* SEARCH */}

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search gemstones..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSearchDropdown(true);
            }}
          />

          {showSearchDropdown &&
            searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((gem) => (
                  <Link
                    key={gem._id}
                    to={`/gems/${gem._id}`}
                    className="search-item"
                    onClick={() => {
                      setSearch("");
                      setShowSearchDropdown(false);
                    }}
                  >
                    {gem.name}
                  </Link>
                ))}
              </div>
            )}
        </div>

        {/* RIGHT NAV */}

        <div className="nav-right">
          <ul>

            {/* CART */}

            <li>
             <Link to="/cart" className="icon-link cart-link">

  <HiOutlineShoppingBag className="nav-icon" />

  <span>Cart</span>

  <span id="cart-count">
    {cartCount}
  </span>

</Link>
            </li>

            {/* ACCOUNT */}

            {!user ? (
              <li
                className="account-dropdown"
                onMouseEnter={openAccountDropdown}
                onMouseLeave={closeAccountDropdown}
              >
                <span
                  className="dropdown-title"
                  onClick={() =>
                    setShowAccountDropdown(
                      (prev) => !prev
                    )
                  }
                >
                <HiOutlineUser className="nav-icon" />
                  Account
                </span>

                {showAccountDropdown && (
                  <div
                    className="dropdown-menu account-menu"
                    onMouseEnter={
                      openAccountDropdown
                    }
                    onMouseLeave={
                      closeAccountDropdown
                    }
                  >
                    <div className="account-section">
                      <p className="account-label">
                        Already have an account?
                      </p>

                      <Link
                        to="/login"
                        className="dropdown-item account-login"
                      >
                        Log In
                      </Link>
                    </div>

                    <div className="account-divider"></div>

                    <div className="account-section">
                      <p className="account-label">
                        New here?
                      </p>

                      <Link
                        to="/signup"
                        className="dropdown-item account-signup"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li
                className="user-dropdown"
                onMouseEnter={openAccountDropdown}
                onMouseLeave={closeAccountDropdown}
              >
                <span className="dropdown-title user-trigger">
                  Hi, {user.name}

                  {isAdmin && (
                    <span style={{ marginLeft: 6 }}>
                      👑
                    </span>
                  )}
                </span>

                {showAccountDropdown && (
                  <div className="dropdown-menu user-menu">

                    <p className="user-greeting">
                      Signed in as{" "}
                      <strong>
                        {user.name}
                      </strong>
                    </p>

                    <div className="account-divider"></div>

                    <Link
                      to="/orders"
                      className="dropdown-item"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/profile"
                      className="dropdown-item"
                    >
                      My Profile
                    </Link>

                    <div className="account-divider"></div>

                    <button
                      className="dropdown-item logout-item"
                      onClick={() =>
                        setShowLogoutConfirm(true)
                      }
                    >
                      Logout
                    </button>

                  </div>
                )}
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>

    {/* LOGOUT MODAL */}

    {showLogoutConfirm && (
      <div className="logout-overlay">
        <div className="logout-modal">

          <p>
            Are you sure you want to logout?
          </p>

          <div className="logout-actions">

            <button
              className="confirm-btn"
              onClick={() => {
                logout();
                setShowLogoutConfirm(false);
                navigate("/");
              }}
            >
              Yes, Logout
            </button>

            <button
              className="cancel-btn"
              onClick={() =>
                setShowLogoutConfirm(false)
              }
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    )}
  </>
);
}

export default Navbar;