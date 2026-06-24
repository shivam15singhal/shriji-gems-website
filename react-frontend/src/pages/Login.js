import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential
        }
      );

     if (res.data.success) {

  await Swal.fire({
    icon: "success",
    title: "Welcome Back!",
    text: "Login successful.",
    timer: 1500,
    showConfirmButton: false
  });

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);
  navigate("/");
}
    } catch (err) {
      Swal.fire({
  icon: "error",
  title: "Google Login Failed",
  text: "Unable to sign in with Google.",
  confirmButtonColor: "#ff8fb3"
});
    }
  };

  // 📝 Email Login
  const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  const res = await login(form);

  setLoading(false);

  if (res.token) {

    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome back ${res.user?.name || ""}!`,
      timer: 1500,
      showConfirmButton: false
    });

    localStorage.setItem("token", res.token);

    setUser(res.user);

    navigate("/");

  } else {

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: res.message || "Invalid email or password.",
      confirmButtonColor: "#ff8fb3"
    });

  }
};

  return (
   <div className="login-bg">
  <div className="login-wrapper">

    <div className="login-left">
      <div className="login-left-content">
        <img
          src="/WhatsApp Image 2025-11-29 at 12.55.33.jpeg"
          alt="Vijay Sharma"
        />

        <h2>Vijay Sharma</h2>

        <p>
          Lal Kitab Visheshagya • 15+ Years Experience
        </p>

        <div className="left-stats">
          <div>
            <h3>5000+</h3>
            <span>Consultations</span>
          </div>

          <div>
            <h3>4.8★</h3>
            <span>Client Rating</span>
          </div>

          <div>
            <h3>15+</h3>
            <span>Years</span>
          </div>
        </div>
      </div>
    </div>
      <div className="login-card">
        <h1 className="brand">Shri Ji Gems</h1>
        <p className="tagline">Welcome back, cosmic soul ✨</p>
        <div className="login-trust">
  <span>✨ Trusted by 1k+ Clients</span>
  <span>🔒 100% Confidential</span>
</div>
        {/* Google Login */}
        <div className="google-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
            theme="outline"
            shape="pill"
            size="large"
          />
        </div>

        <div className="divider">or</div>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          <div className="input-box">
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <div className="forgot-link">
 <span
  onClick={() =>
    navigate("/forgot-password")
  }
>
  Forgot Password?
</span>
</div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={() => navigate("/signup")}> Create one</span>
        </p>
        
      </div>
    </div>

    </div>
  );
}

export default Login;
