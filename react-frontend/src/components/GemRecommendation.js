import React, { useState } from "react";
import "./GemRecommendation.css";

function GemRecommendation() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    weight: "",
    dob: "",
    tob: "",
    pob: "",
    email: "",
    phone: "",
    country: "",
    budget: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /* ======================
     HANDLE CHANGE
  ====================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // remove error as user fixes input
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  /* ======================
     VALIDATION (PREMIUM)
  ====================== */
  const validateForm = () => {
    const newErrors = {};
    const {
      name, gender, weight, dob, tob,
      pob, email, phone, country, budget
    } = formData;

    if (!name) newErrors.name = "Name is required";
    if (!gender) newErrors.gender = "Please select gender";
    if (!weight) newErrors.weight = "Weight is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!tob) newErrors.tob = "Time of birth is required";
    if (!pob) newErrors.pob = "Place of birth is required";
    if (!country) newErrors.country = "Country is required";
    if (!budget) newErrors.budget = "Please select a budget";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/gem-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setShowPopup(true);
      setFormData({
        name: "", gender: "", weight: "", dob: "", tob: "",
        pob: "", email: "", phone: "", country: "", budget: ""
      });
      setErrors({});
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div  id="form-section" className="gem-reco-wrapper">
      <h2 className="GEMS_HEADING">Discover Your Perfect Gemstone</h2>

      <p className="recommend-subtext">
  Receive a personalized gemstone recommendation based on your birth details, goals, and astrological profile.
</p>

      <div className="container">
        {/* FORM */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              {/* NAME */}
              <div className="form-group">
                <label>Name *</label>
                <input
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              {/* GENDER */}
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? "error" : ""}
                >
                  <option value="">-- Select --</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <span className="field-error">{errors.gender}</span>}
              </div>

              {/* WEIGHT */}
              <div className="form-group">
                <label>Weight *</label>
                <input
                  type="number"
                  name="weight"
                   placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={errors.weight ? "error" : ""}
                />
                {errors.weight && <span className="field-error">{errors.weight}</span>}
              </div>

              {/* DOB */}
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? "error" : ""}
                />
                {errors.dob && <span className="field-error">{errors.dob}</span>}
              </div>

              {/* TOB */}
              <div className="form-group">
                <label>Time of Birth *</label>
                <input
                  type="time"
                  name="tob"
                  value={formData.tob}
                  onChange={handleChange}
                  className={errors.tob ? "error" : ""}
                />
                {errors.tob && <span className="field-error">{errors.tob}</span>}
              </div>

              {/* POB */}
              <div className="form-group">
                <label>Place of Birth *</label>
                <input
                  name="pob"
                   placeholder="Enter your birth place"
                  value={formData.pob}
                  onChange={handleChange}
                  className={errors.pob ? "error" : ""}
                />
                {errors.pob && <span className="field-error">{errors.pob}</span>}
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                   placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label>Contact No *</label>
                <input
                  name="phone"
                   placeholder="Enter your mobile no."
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              {/* COUNTRY */}
              <div className="form-group full-width">
                <label>Country *</label>
                <input
                  name="country"
                   placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors.country ? "error" : ""}
                />
                {errors.country && <span className="field-error">{errors.country}</span>}
              </div>

              {/* BUDGET */}
              <div className="form-group full-width">
                <label>Budget *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={errors.budget ? "error" : ""}
                >
                  <option value="">-- Select --</option>
                  <option>Rs 10,000 and under</option>
                  <option>Rs 10,000 - Rs 25,000</option>
                  <option>Rs 25,000 - Rs 50,000</option>
                  <option>Above Rs 50,000</option>
                </select>
                {errors.budget && <span className="field-error">{errors.budget}</span>}
              </div>

            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Get Gemstone Recommendation"}
            </button>
            <p className="form-trust">
  🔒 Your details are safe and never shared with third parties.
</p>
          </form>
        </div>

        {/* INFO SECTION (UNCHANGED) */}
        <div className="info-section">
          <div className="card">
            <h2>Know the Best Gemstone</h2>
            <p>
              For you based on your <span className="highlight">Kundli</span>
            </p>

            <h3>
              Find Perfect <span className="highlight">Gemstone</span> for your life !!
            </h3>

            <div className="gemstones">
              <img src="/GEMS/EMERALD-040324.webp" alt="gem" />
              <img src="/GEMS/HESSONITE-040324.webp" alt="gem" />
              <img src="/GEMS/yellow-sh-category-image-gp.webp" alt="gem" />
            </div>

            <div className="features">
              <div>🎓 Education</div>
              <div>❤️ Love</div>
              <div>💍 Marriage</div>
              <div>💼 Business</div>
              <div>🧑‍💼 Career</div>
              <div>💰 Money</div>
              <div>🩺 Health</div>
              <div>🏠 Property</div>
              <div>☸️ Vastu Shastra</div>
              <div>💞 Match Making</div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✨</div>
            <h3>Your details have been submitted</h3>
            <p>We will contact you soon</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GemRecommendation;
