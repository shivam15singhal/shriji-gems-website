const mongoose = require("mongoose");

const productInquirySchema = new mongoose.Schema(
  {
    gemName: {
      type: String,
      required: true,
    },

    quality: {
      type: String,
      required: true,
    },

    buyType: {
      type: String,
      required: true,
    },

    carat: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProductInquiry",
  productInquirySchema
);