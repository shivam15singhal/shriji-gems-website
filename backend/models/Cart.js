const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        gemId: String,
        variantId: String,

        // Snapshot data (because no Gem/GemVariant models)
        name: String,
        image: String,
        weight: {
  type: Number,
  required: true,
},
        origin: String,

        quantity: {
          type: Number,
          default: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        buyType: String,
        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
