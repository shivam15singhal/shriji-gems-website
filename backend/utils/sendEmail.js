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

const sendProductInquiryEmail = async (data) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `🛍 New Purchase Inquiry - ${data.gemName}`,
    html: `
    <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">

      <div style="max-width:650px;margin:auto;background:white;border-radius:12px;overflow:hidden">

        <div style="background:#111;color:white;padding:18px">

          <h2 style="margin:0">
            New Product Inquiry
          </h2>

        </div>

        <div style="padding:24px">

          <h3>Gem Details</h3>

          <table style="width:100%;border-collapse:collapse">

            <tr>
              <td><strong>Gem</strong></td>
              <td>${data.gemName}</td>
            </tr>

            <tr>
              <td><strong>Quality</strong></td>
              <td>${data.quality}</td>
            </tr>

            <tr>
              <td><strong>Carat</strong></td>
              <td>${data.carat}</td>
            </tr>

            <tr>
              <td><strong>Type</strong></td>
              <td>${data.buyType}</td>
            </tr>

          </table>

          <hr>

          <h3>Customer Details</h3>

          <table style="width:100%;border-collapse:collapse">

            <tr>
              <td><strong>Name</strong></td>
              <td>${data.name}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${data.phone}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${data.email || "-"}</td>
            </tr>

            <tr>
              <td><strong>Message</strong></td>
              <td>${data.message || "-"}</td>
            </tr>

          </table>

        </div>

      </div>

    </div>
    `,
  });
};

module.exports = {
  sendEmail,
  sendGemLeadEmail,
  sendProductInquiryEmail
};