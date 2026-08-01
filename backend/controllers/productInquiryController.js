const ProductInquiry = require("../models/ProductInquiry");
const { sendProductInquiryEmail } = require("../utils/sendEmail");

exports.submitProductInquiry = async (req, res) => {
  try {
    const inquiryData = req.body;

    // Save inquiry
    await ProductInquiry.create(inquiryData);

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
    });

    // Send email asynchronously
    sendProductInquiryEmail(inquiryData)
      .then(() => {
        console.log("✅ Product inquiry email sent.");
      })
      .catch((err) => {
        console.error("❌ Email failed:", err);
      });

  } catch (error) {
    console.error("Product Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};