import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./MyProfile.css";
import Swal from "sweetalert2";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function MyProfile() {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    dob: user?.dob || "",
    birthTime: user?.birthTime || "",
    birthPlace: user?.birthPlace || "",
  });

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user) return null;

  /* =========================
     ZODIAC SIGN
  ========================= */

  const getZodiacSign = (date) => {
    if (!date) return "Not available";

    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;

    const zodiac = [
      ["Capricorn", 19],
      ["Aquarius", 18],
      ["Pisces", 20],
      ["Aries", 19],
      ["Taurus", 20],
      ["Gemini", 20],
      ["Cancer", 22],
      ["Leo", 22],
      ["Virgo", 22],
      ["Libra", 22],
      ["Scorpio", 21],
      ["Sagittarius", 21],
      ["Capricorn", 31],
    ];

    return day > zodiac[month - 1][1]
      ? zodiac[month][0]
      : zodiac[month - 1][0];
  };

  /* =========================
     PROFILE COMPLETION
  ========================= */

  const fields = [
    user.name,
    user.email,
    user.dob,
    user.birthTime,
    user.birthPlace,
    user.avatar,
  ];

  const completed = fields.filter(Boolean).length;
  const progress = Math.round((completed / fields.length) * 100);

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     SAVE PROFILE
  ========================= */

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE}/api/auth/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
setEditMode(false);

Swal.fire({
  icon: "success",
  title: "Profile Updated",
  text: "Your astrology details have been updated successfully.",
  confirmButtonColor: "#ff8fb3"
});
    } catch {
     Swal.fire({
  icon: "error",
  title: "Update Failed",
  text: "Unable to update profile.",
  confirmButtonColor: "#ff8fb3"
});
    }
  };

  /* =========================
     AVATAR UPLOAD
  ========================= */

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("avatar", file);

    try {
      const token = localStorage.getItem("token");

       await axios.post(
        `${API_BASE}/api/auth/avatar`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
  icon: "success",
  title: "Avatar Updated",
  text: "Your profile photo has been updated.",
  timer: 1500,
  showConfirmButton: false
});
    } catch {
     Swal.fire({
  icon: "error",
  title: "Upload Failed",
  text: "Failed to upload avatar.",
  confirmButtonColor: "#ff8fb3"
});
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = async () => {

  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    reverseButtons: true
  });

  if (!result.isConfirmed) return;

  localStorage.removeItem("token");

  setUser(null);

  await Swal.fire({
    icon: "success",
    title: "Logged Out",
    text: "You have been logged out successfully.",
    timer: 1500,
    showConfirmButton: false
  });

  navigate("/login");
};
if (progress === 100) {
  Swal.fire({
    icon: "success",
    title: "Profile Complete 🎉",
    text: "Your profile is now fully completed.",
    confirmButtonColor: "#ff8fb3"
  });
}

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-container">

          {/* SIDEBAR */}

          <div className="profile-sidebar">

            <div className="avatar-box">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <label className="avatar-upload">
                Change Avatar
                <input type="file" hidden onChange={uploadAvatar} />
              </label>
            </div>

            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>

            <div className="meta">
              <div>
                <span>Account</span>
                <strong>
                  {user.authProvider === "google" ? "Google" : "Email"}
                </strong>
              </div>

              <div>
                <span>Member Since</span>
                <strong>
                  {new Date(user.createdAt).toLocaleDateString()}
                </strong>
              </div>
            </div>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
            <button
  className="consult-btn-profile"
  onClick={() =>
    window.open(
      "https://wa.me/919818307307",
      "_blank"
    )
  }
>
  Consult Vijay Sharma Ji
</button>

          </div>

          {/* MAIN */}

          <div className="profile-main">

            {/* PROFILE PROGRESS */}

            <div className="profile-card">

              <h3>Profile Completion</h3>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
<p className="completion-text">
  Complete your profile to receive
  more personalized gemstone and
  astrology recommendations.
</p>
              <span>{progress}% completed</span>

            </div>


            {/* ASTROLOGY DETAILS */}

            <div className="profile-card">

              <h3>Astrology Details</h3>

              <div className="astro-row">
                <label>🌙 Date of Birth</label>

                {editMode ? (
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.dob || "Not set"}</span>
                )}
              </div>


              <div className="astro-row">
                <label>⏳ Birth Time</label>

                {editMode ? (
                  <input
                    type="time"
                    name="birthTime"
                    value={form.birthTime}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.birthTime || "Not set"}</span>
                )}
              </div>


              <div className="astro-row">
                <label>📍 Birth Place</label>

                {editMode ? (
                  <input
                    type="text"
                    name="birthPlace"
                    value={form.birthPlace}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.birthPlace || "Not set"}</span>
                )}
              </div>


              <div className="astro-row">
                <label>♈ Zodiac Sign</label>
                <span>{getZodiacSign(user.dob)}</span>
              </div>


              <div className="profile-actions">

                {editMode ? (
                  <>
                    <button onClick={saveProfile}>
                      Save Changes
                    </button>

                    <button
                      className="secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)}>
                    Edit Astrology Details
                  </button>
                )}

              </div>

            </div>


            {/* SECURITY */}

            <div className="profile-card">

             <div className="profile-card">

  <h3>Account Status</h3>

  <div className="security-row">
    <span>Email Verified</span>
    <strong>✓ Verified</strong>
  </div>

  <div className="security-row">
    <span>Account Type</span>
    <strong>
      {user.authProvider === "google"
        ? "Google Account"
        : "Email Account"}
    </strong>
  </div>

</div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default MyProfile;