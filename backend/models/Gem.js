const mongoose = require("mongoose");

const qualitySchema = new mongoose.Schema({
  images: {
    type: [String],
    default: []
  },
  video: {
    type: String,
    default: ""
  },
  pricePerRatti: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  }
});

const gemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  image: String,

  highQualityImage: String,
  mediumQualityImage: String,
  lowQualityImage: String,

  qualities: {
    high: {
      type: qualitySchema,
      default: () => ({})
    },
    medium: {
      type: qualitySchema,
      default: () => ({})
    },
    low: {
      type: qualitySchema,
      default: () => ({})
    }
  },
  astrology: {
    benefits: {
      type: [String],
      default: []
    },

    recommendedFor: {
      type: [String],
      default: []
    }
  },

  color: {
    type: String,
    default: "",
    trim: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Gem", gemSchema);