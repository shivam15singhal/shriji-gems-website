const mongoose = require("mongoose");

const gemLeadSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  gender: { type: String },

  weight: { type: Number },

  dob: { type: String },

  tob: { type: String },

  pob: { type: String },

  email: { 
    type: String,
    lowercase: true,
    trim: true
  },

  phone: { 
    type: String,
    required: true,
    trim: true
  },

  country: { type: String },

  budget: { type: String },

  status: {
    type: String,
    enum: ["New", "Contacted", "Closed"],
    default: "New"
  },

  // ⭐ New Fields

  source: {
    type: String,
    enum: ["Website", "Instagram", "Facebook", "WhatsApp", "Other"],
    default: "Website"
  },

  notes: {
    type: String,
    default: ""
  },

  followUpDate: {
    type: Date
  }

},
{
  timestamps: true // creates createdAt and updatedAt automatically
}
);

module.exports = mongoose.model("GemLead", gemLeadSchema);