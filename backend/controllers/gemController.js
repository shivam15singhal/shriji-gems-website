const GemLead = require("../models/GemLead");
const { sendGemLeadEmail } = require("../utils/sendEmail");

exports.submitGemForm = async (req, res) => {
  try {

    const leadData = req.body;

    // 1️⃣ Save lead to database
    await GemLead.create(leadData);

    // 2️⃣ Send email (do not block user)
    try {
      await sendGemLeadEmail(leadData);
    } catch (err) {
      console.error("Email failed:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Form submitted successfully"
    });

  } catch (error) {
    console.error("Form submit error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};