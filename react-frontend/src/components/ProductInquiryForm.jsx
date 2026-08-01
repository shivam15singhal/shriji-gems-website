import React, { useState } from "react";
import "./ProductInquiryForm.css";
import Swal from "sweetalert2";

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
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const handleSubmit = async (e) => {
if (!gem) return ;
  e.preventDefault();

  if (!selectedWeight) {
  Swal.fire({
    icon: "warning",
    title: "Select Carat",
    text: "Please select a gemstone carat before submitting your inquiry.",
    confirmButtonColor: "#ff6f9f",
  });
  return;
}
if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  Swal.fire({
    icon: "warning",
    title: "Invalid Phone Number",
    text: "Please enter a valid 10-digit mobile number.",
    confirmButtonColor: "#ff6f9f",
  });
  return;
}

if (
  formData.email &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
) {
  Swal.fire({
    icon: "warning",
    title: "Invalid Email",
    text: "Please enter a valid email address.",
    confirmButtonColor: "#ff6f9f",
  });
  return;
}

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/product-inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gemName: gem.name,
        quality,
        buyType,
        carat: selectedWeight,

        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    Swal.fire({
  icon: "success",
  title: "Inquiry Submitted",
  text: "Thank you for your interest. Our gemstone expert will contact you shortly.",
  confirmButtonColor: "#25D366",
});

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

  } catch (err) {
    Swal.fire({
  icon: "error",
  title: "Something Went Wrong",
  text: "Unable to submit your inquiry. Please try again.",
  confirmButtonColor: "#ff6f9f",
});
  }
  setLoading(false);
};

  return (
    <div className="product-inquiry">

      <h3>Purchase Inquiry</h3>

      <p className="inquiry-subtitle">
        Fill in your details and our gemstone expert will contact you with personalized guidance before your purchase.
      </p>
      <div className="selected-gem-card">

    <h4>Selected Gemstone</h4>

    <div className="selected-item">
        <span>💎 Gemstone</span>
        <strong>{quality.toUpperCase()} {gem.name}</strong>
    </div>

    <div className="selected-item">
        <span>⚖ Type</span>
        <strong>{buyType}</strong>
    </div>

    <div className="selected-item">
        <span>✨ Carat</span>
        <strong>
            {selectedWeight ? `${selectedWeight} ct` : "Not Selected"}
        </strong>
    </div>

</div>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

<label>Name *</label>

<input
    type="text"
    placeholder="Enter your name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    disabled={loading}
/>

</div>
<div className="form-group">

<label>Mobile Number *</label>

<input
    type="tel"
    placeholder="Enter your mobile number"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    required
    disabled={loading}
/>

</div>

        <div className="form-group">

<label>Email Address</label>

<input
    type="email"
    placeholder="Enter your email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    disabled={loading}
/>

</div>

        <div className="form-group">

<label>Message</label>

<textarea
    rows="4"
    placeholder="Tell us if you have any questions about this gemstone..."
    name="message"
    value={formData.message}
    onChange={handleChange}
    disabled={loading}
/>

</div>

        <button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Request This Gemstone"}
</button>
<p className="privacy-text">
  🔒 Your information is secure and will only be used to contact you
  regarding this gemstone inquiry.
</p>

      </form>

    </div>
  );
}

export default ProductInquiryForm;