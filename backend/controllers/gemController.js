const GemLead = require("../models/GemLead");
const { sendGemLeadEmail } = require("../utils/sendEmail");

exports.submitGemForm = async (req, res) => {
  try {
    const leadData = req.body;

    // Save lead to database
    await GemLead.create(leadData);

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Form submitted successfully"
    });

    // Send email in the background
    sendGemLeadEmail(leadData)
      .then(() => {
        console.log("Lead email sent successfully.");
      })
      .catch((err) => {
        console.error("Email failed:", err);
      });

  } catch (error) {
    console.error("Form submit error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};