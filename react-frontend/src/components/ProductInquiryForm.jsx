import React, { useState } from "react";
import "./ProductInquiryForm.css";

function ProductInquiryForm({
  gem,
  quality,
  selectedWeight,
  buyType,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      gem: gem.name,
      quality,
      weight: selectedWeight,
      type: buyType,
    });
  };

  return (
    <div className="product-inquiry">

      <h3>Purchase Inquiry</h3>

      <p className="inquiry-subtitle">
        Interested in this gemstone? Fill in your details and our expert will
        contact you shortly.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number *"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          rows="4"
          placeholder="Message (Optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">
          Submit Purchase Inquiry
        </button>

      </form>

    </div>
  );
}

export default ProductInquiryForm;