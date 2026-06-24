import React from "react";
import "./Certificates.css";

function Certificates() {
  return (
    <section className="certificate-section">
  <h2 className="certificate-heading">
    Certified Authenticity You Can Trust
  </h2>

  <p className="certificate-subtext">
    Every gemstone is carefully verified by globally recognized labs like IGI & GIA, 
    ensuring unmatched quality, transparency, and trust.
  </p>
      <div className="certificate-container">
        <div className="certificate-content">

          <div className="certificate-slider">
            <div className="slides-track">
              <img
                src="/LOGO-CERTIFICATE/IGI_CERTIFICATE.jpg"
                alt="Certificate 1"
              />
              <img
                src="/LOGO-CERTIFICATE/giaa_cert.png"
                alt="Certificate 2"
              />
            </div>
          </div>

          {/* RIGHT: LOGOS */}
          <div className="certificate-logos">
            <img src="/LOGO-CERTIFICATE/logo_IGI.webp" alt="IGI" />
            <img src="/LOGO-CERTIFICATE/gia.webp" alt="GIA" />
            <img src="/LOGO-CERTIFICATE/iigj.jpeg" alt="IIGJ" />
            <img src="/LOGO-CERTIFICATE/logo.svg" alt="GJEPC" />
          </div>

        </div>
      </div>

      <div className="why-certification-wrapper">

  <h3 className="why-heading">Why Certification Matters</h3>

  <div className="why-certification">
    <div className="why-item">
      <div className="why-icon">✔</div>
      <h4>Guaranteed Authenticity</h4>
      <p>Every gemstone is tested and verified to ensure it is 100% genuine.</p>
    </div>

    <div className="why-item">
      <div className="why-icon">✔</div>
      <h4>Quality Assurance</h4>
      <p>Detailed grading ensures the highest standards in cut, clarity, and color.</p>
    </div>

    <div className="why-item">
      <div className="why-icon">✔</div>
      <h4>Secure Investment</h4>
      <p>Certified jewelry retains value and provides long-term trust and reliability.</p>
    </div>
  </div>

</div>
    </section>
  );
}

export default Certificates;
