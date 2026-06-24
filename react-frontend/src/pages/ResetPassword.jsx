import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import Swal from "sweetalert2";

const API_BASE = "http://localhost:5000";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Password Mismatch",
      text: "Passwords do not match.",
      confirmButtonColor: "#d4af37"
    });
    return;
  }

  try {
    Swal.fire({
      title: "Updating Password...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const res = await axios.post(
      `${API_BASE}/api/auth/reset-password/${token}`,
      {
        password
      }
    );

    Swal.fire({
      icon: "success",
      title: "Password Updated",
      text: res.data.message,
      confirmButtonColor: "#22c55e"
    }).then(() => {
      navigate("/login");
    });

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Reset Failed",
      text:
        err.response?.data?.message ||
        "Reset failed",
      confirmButtonColor: "#ef4444"
    });
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button type="submit">
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;