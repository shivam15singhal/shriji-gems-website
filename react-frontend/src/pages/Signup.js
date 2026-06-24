import React, { useState, useContext } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrength = () => {
    const p = form.password;

    if (p.length < 6)
      return {
        label: "Weak",
        class: "weak"
      };

    if (
      /[A-Z]/.test(p) &&
      /[0-9]/.test(p) &&
      /[^A-Za-z0-9]/.test(p)
    ) {
      return {
        label: "Strong",
        class: "strong"
      };
    }

    return {
      label: "Medium",
      class: "medium"
    };
  };

  const strength = getPasswordStrength();

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
     const res = await axios.post(
  `${API_BASE}/api/auth/google`,
  {
    token: credentialResponse.credential
  }
);

      if (res.data.success) {
        localStorage.setItem(
          "token",
          res.data.token
        );

        setUser(res.data.user);

        navigate("/");
      }
    } catch {
      Swal.fire({
  icon: "error",
  title: "Google Signup Failed",
  text: "Please try again.",
  confirmButtonColor: "#ef4444"
});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
     Swal.fire({
  icon: "warning",
  title: "Password Mismatch",
  text: "Passwords do not match.",
  confirmButtonColor: "#d4af37"
});
      return;
    }

    setLoading(true);

    const res = await signup(form);

    setLoading(false);

    if (res.success && res.token) {
      localStorage.setItem(
  "token",
  res.token
);

setUser(res.user);

Swal.fire({
  icon: "success",
  title: "Account Created",
  text: "Welcome to Shri Ji Gems ✨",
  confirmButtonColor: "#22c55e"
}).then(() => {
  navigate("/");
});
    } else {
     Swal.fire({
  icon: "error",
  title: "Signup Failed",
  text:
    res.message ||
    "Unable to create account",
  confirmButtonColor: "#ef4444"
});
    }
  };

  return (
    <div className="signup-bg">

      <div className="signup-card">

        <h1 className="brand">
          Shri Ji Gems
        </h1>

        <p className="tagline">
          Create your account and begin
          your gemstone journey
        </p>

        <div className="signup-trust">
          <span>
            💎 Certified Gemstones
          </span>

          <span>
            🔒 Secure Account
          </span>
        </div>

        <div className="google-wrapper">
          <GoogleLogin
            onSuccess={
              handleGoogleSuccess
            }
            onError={() =>
              alert(
                "Google signup failed"
              )
            }
            theme="outline"
            shape="pill"
            size="large"
          />
        </div>

        <div className="divider">
          or
        </div>

        <form
          onSubmit={handleSubmit}
        >
          <div className="input-box">
            <input
              name="name"
              required
              onChange={handleChange}
            />
            <label>
              Full Name
            </label>
          </div>

          <div className="input-box">
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
            />
            <label>
              Email Address
            </label>
          </div>

          <div className="input-box">
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
            <label>
              Password
            </label>
          </div>

          <div className="input-box">
            <input
              name="confirmPassword"
              type="password"
              required
              onChange={handleChange}
            />
            <label>
              Confirm Password
            </label>
          </div>

          {form.password && (
            <div
              className={`strength ${strength.class}`}
            >
              Password strength:
              <span>
                {" "}
                {strength.label}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="login-text">
          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            {" "}
            Sign In
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;