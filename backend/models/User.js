const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /* ======================
       BASIC AUTH INFO
    ====================== */
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: false // Google users don’t need password
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    resetPasswordToken: {
  type: String
},

resetPasswordExpire: {
  type: Date
},

    /* ======================
       PROFILE / ASTROLOGY
    ====================== */
    avatar: {
      type: String
    },

    dob: {
      type: String // YYYY-MM-DD
    },

    birthTime: {
      type: String // HH:mm
    },

    birthPlace: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
