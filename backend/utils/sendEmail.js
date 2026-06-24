const nodemailer = require("nodemailer");

/* =========================
   CREATE TRANSPORTER (ONCE)
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   GENERIC SEND EMAIL
========================= */
const sendEmail = async ({ to, subject, html, attachments=[] }) => {
  const mailOptions = {
    from: `"Shri Ji" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments
  };

  await transporter.sendMail(mailOptions);
};

/* =========================
   PRESET: GEM LEAD EMAIL
========================= */
const sendGemLeadEmail = async (leadData) => {
  await sendEmail({
    to: process.env.EMAIL_TO,
    subject: "💎 New Gem Recommendation Lead",
    html: `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:20px">

      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08)">

        <div style="background:#111;color:#fff;padding:18px 24px">
          <h2 style="margin:0">💎 New Gem Recommendation Lead</h2>
        </div>

        <div style="padding:24px">

          <table style="width:100%;border-collapse:collapse">

            <tr>
              <td style="padding:10px 0;color:#666">Name</td>
              <td style="font-weight:600">${leadData.name}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Phone</td>
              <td style="font-weight:600">${leadData.phone}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Email</td>
              <td style="font-weight:600">${leadData.email}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Gender</td>
              <td>${leadData.gender}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Date of Birth</td>
              <td>${leadData.dob}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Time of Birth</td>
              <td>${leadData.tob}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Place of Birth</td>
              <td>${leadData.pob}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Country</td>
              <td>${leadData.country}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#666">Budget</td>
              <td style="font-weight:600">${leadData.budget}</td>
            </tr>

          </table>

          <div style="margin-top:30px;padding:16px;background:#f8f8f8;border-radius:8px">
            📞 <strong>Action Required:</strong> Please contact the customer as soon as possible.
          </div>

        </div>

        <div style="background:#fafafa;padding:14px;text-align:center;font-size:12px;color:#888">
          Shri Ji Lead Notification
        </div>

      </div>

    </div>
    `
  });
};

module.exports = {
  sendEmail,        // 🔥 for orders / refunds / status
  sendGemLeadEmail  // 🔥 keeps existing functionality
};
