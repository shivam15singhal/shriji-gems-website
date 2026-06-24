import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const API_BASE = "http://localhost:5000";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/forgot-password`,
        { email }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Failed to send email"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Forgot Password</h1>

        <p>
          Enter your email address and we'll
          send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="success-msg">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;