import React from "react";
import "./Footer.css";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* GLASS CONTAINER */}
      <div className="footer-container">

        {/* COLUMN 1 */}
        <div className="footer-column">
          <h3>CLIENT CARE</h3>
          <ul>
            <li>
  <a href="tel:+919818307307">
    📞 +91-9818307307
  </a>
</li>

<li>
  <a href="mailto:vijaysharmaastrology01@gmail.com">
    📧 vijaysharmaastrology01@gmail.com
  </a>
</li>

<li>
  <a
    href="https://wa.me/919818307307"
    target="_blank"
    rel="noopener noreferrer"
  >
    💬 Chat on WhatsApp
  </a>
</li>
            
          </ul>

          <h3>VISIT OUR ATELIER</h3>
          <p>414/2 Main Chowk Samaypur 
Near HDFC Bank 
Badli, New Delhi – 110042</p>

          <h3>WORKING HOURS</h3>
          <p> 12:00 PM – 8:00 PM</p>

          <h3>Our Policies</h3>
        <ul>
          <li><Link to="/return-exchange">
  Returns & Exchange
</Link></li>
           <li>
  <Link to="/terms-and-conditions">
    Terms & Conditions
  </Link>
</li>
            <li><Link to="/privacy-policy">
  Privacy Policy
</Link></li>
            <li><Link to="/shipping-policy">
  Shipping Policy
</Link></li>
            <li><Link to="/payment-methods">
  Payment Methods
</Link></li>
        </ul>

        </div>

        
        {/* COLUMN 2 */}
        <div className="footer-column">
          <h3>OUR STORY</h3>
          <ul>
          <li>
  <Link to="/about-shree-ji-gems">
    About Shri Ji Gems
  </Link>
</li>
           
          </ul>

          <h3>EXPLORE</h3>
          <ul>
            <li>
            <a href="#form-section">
              Gem Recommendation
            </a>
          </li>
            <li> <a href="gemstones">Gemstones</a></li>
            <li> 
            <Link to="/about">
                About Me
              </Link>
              </li>
          </ul>

          
        </div>

        {/* COLUMN 3 */}
        <div className="footer-column">
          <h3>WHY CHOOSE US</h3>
          <ul>
            <li>100% Natural Certified Gemstones</li>
            <li>Lifetime Authenticity Guarantee</li>
            <li>Free Shipping in India</li>
            <li>Worldwide Delivery</li>
            <li>Secure Payments</li>
            <li>Trusted by 1 Lakh+ Clients</li>
          </ul>

          <h3>CLIENT FAVORITES</h3>
          <ul>
            <li>
  <Link to="/gems/69d34e4921f33666abfc92a8">
    Emerald
  </Link>
</li>

<li>
  <Link to="/gems/69ec455275495fedab57ad65">
    Ruby
  </Link>
</li>

<li>
  <Link to="/gems/69ec470875495fedab57ad6f">
    Pearl
  </Link>
</li>

<li>
  <Link to="/gems/69d34c4221f33666abfc924c">
    Blue Sapphire
  </Link>
</li>

<li>
  <Link to="/gems/69d3500921f33666abfc92b1">
    Yellow Sapphire
  </Link>
</li>

<li>
  <Link to="/gems/69d3530221f33666abfc92bb">
    Opal
  </Link>
</li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-column">
          <img src="/FINAL__LOGO.png" alt="Store" className="store-img" />

          

          <div className="footer-socials">
            <a href="https://www.instagram.com/astro_vijaysharma?igsh=MWN5ZGJhcnl4cHBmcQ%3D%3D"><FaInstagram /></a>
            <a href="https://www.youtube.com/@AstroVijay_01/shorts"><FaYoutube /></a>
          </div>
        </div>

      </div>

      {/* PAYMENTS */}
      <div className="footer-payments">
        <img src="/Footer_logos/OIP.jpg" alt="UPI" />
        <img src="/Footer_logos/master.jpg" alt="MasterCard" />
        <img src="/Footer_logos/paypal.jpg" alt="PayPal" />
        <img src="/Footer_logos/debit.jpg" alt="Cards" />
      </div>

      <p className="footer-bottom">
        © 2026 Shri Ji Gems · All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;
