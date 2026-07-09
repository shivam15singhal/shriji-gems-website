const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   GENERIC SEND EMAIL
========================= */
const sendEmail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {
  await resend.emails.send({
    from: "Shri Ji <noreply@shrijigems.in>",
    to,
    subject,
    html,
    attachments
  });
};

/* =========================
   PRESET: GEM LEAD EMAIL
========================= */
const sendGemLeadEmail = async (leadData) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "💎 New Gem Recommendation Lead",
    html: `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:20px">

      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08)">

        <div style="background:#111;color:#fff;padding:18px 24px">
          <h2 style="margin:0">💎 New Gem Recommendation Lead</h2>
        </div>

        <div style="padding:24px">

          <table style="width:100%;border-collapse:collapse">

            <tr><td>Name</td><td><strong>${leadData.name}</strong></td></tr>
            <tr><td>Phone</td><td>${leadData.phone}</td></tr>
            <tr><td>Email</td><td>${leadData.email}</td></tr>
            <tr><td>Gender</td><td>${leadData.gender}</td></tr>
            <tr><td>Date of Birth</td><td>${leadData.dob}</td></tr>
            <tr><td>Time of Birth</td><td>${leadData.tob}</td></tr>
            <tr><td>Place of Birth</td><td>${leadData.pob}</td></tr>
            <tr><td>Country</td><td>${leadData.country}</td></tr>
            <tr><td>Budget</td><td>${leadData.budget}</td></tr>

          </table>

        </div>

      </div>

    </div>
    `
  });
};

module.exports = {
  sendEmail,
  sendGemLeadEmail
};