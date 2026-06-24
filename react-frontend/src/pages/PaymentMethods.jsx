import React from "react";
import "./TermsConditions.css";

function PaymentMethods() {
  return (
    <div className="terms-page">

      <section className="terms-hero">

        <div className="terms-hero-content">

          <span className="terms-badge">
            Secure Payments
          </span>

          <h1>Payment Methods</h1>

          <p>
            Learn about the payment options, transaction security,
            refunds, verification processes, and payment-related
            policies at Shri Ji Gems.
          </p>

          <div className="last-updated">
            Last Updated: January 2026
          </div>

        </div>

      </section>

      <section className="terms-content">

        <div className="terms-card">

          <div className="term-block">
            <h2>1. Accepted Payment Methods</h2>

            <p>
              We offer secure and convenient payment options
              for customers across India and internationally.
            </p>

            <h3>UPI Payments</h3>

            <ul>
              <li>Google Pay (GPay)</li>
              <li>PhonePe</li>
              <li>Paytm</li>
              <li>BHIM UPI</li>
              <li>Other UPI-enabled Applications</li>
            </ul>

            <h3>Debit & Credit Cards</h3>

            <ul>
              <li>Visa</li>
              <li>Mastercard</li>
              <li>RuPay</li>
              <li>American Express (if supported)</li>
            </ul>

            <h3>Net Banking</h3>

            <p>
              Payments can be made through major Indian banks
              using secure net banking services.
            </p>

            <h3>Digital Wallets</h3>

            <p>
              Selected wallet options may be available through
              our payment gateway.
            </p>
          </div>

          <div className="term-block">
            <h2>2. International Payments</h2>

            <p>
              For international customers, supported international
              cards and payment methods may be available depending
              on the payment gateway being used.
            </p>
          </div>

          <div className="term-block">
            <h2>3. Payment Security</h2>

            <p>
              Your security is important to us.
            </p>

            <ul>
              <li>All transactions are processed through trusted and secure payment gateways.</li>
              <li>We do not store debit card, credit card, banking, or UPI credentials on our servers.</li>
              <li>Payment information is encrypted using industry-standard security protocols.</li>
              <li>Customer payment details remain protected throughout the transaction process.</li>
            </ul>
          </div>

          <div className="term-block">
            <h2>4. Order Confirmation</h2>

            <p>
              Once payment is successfully completed:
            </p>

            <ul>
              <li>You will receive order confirmation via Email, SMS, or WhatsApp.</li>
              <li>Your order will move to the processing and shipping stage.</li>
            </ul>

            <p>
              If you do not receive confirmation within a reasonable
              period, please contact our support team.
            </p>
          </div>

          <div className="term-block">
            <h2>5. Failed Transactions</h2>

            <p>
              If a payment fails but money is deducted:
            </p>

            <ul>
              <li>The amount is usually refunded automatically by your bank or payment provider within 3–7 business days.</li>
              <li>If the issue persists, contact your bank first.</li>
              <li>You may also contact us with transaction details for assistance.</li>
            </ul>
          </div>

          <div className="term-block">
            <h2>6. Pricing & Currency</h2>

            <ul>
              <li>All prices displayed on our website are in Indian Rupees (INR) unless stated otherwise.</li>
              <li>International customers may incur currency conversion charges from their bank or card provider.</li>
            </ul>
          </div>

          <div className="term-block">
            <h2>7. Taxes</h2>

            <p>
              Applicable GST and taxes, if any, will be displayed
              during checkout and included in the final order amount.
            </p>
          </div>

          <div className="term-block">
            <h2>8. Cash on Delivery (COD)</h2>

            <p>
              Cash on Delivery may be available for selected
              locations and eligible order values.
            </p>

            <ul>
              <li>Availability of COD will be displayed during checkout.</li>
              <li>COD eligibility may vary depending on location and order value.</li>
            </ul>
          </div>

          <div className="term-block">
            <h2>9. Payment Verification</h2>

            <p>
              For security purposes, Shri Ji Gems may contact
              customers to verify certain high-value or unusual
              transactions before processing an order.
            </p>
          </div>

          <div className="term-block contact-block">

            <h2>10. Contact Us</h2>

            <p><strong>Shri Ji Gems</strong></p>

            <p>📞 +91-9818307307</p>

            <p>📧 vijaysharmaastrology01@gmail.com</p>

            <p>📍 Badli, New Delhi – 110033</p>

            <p>🕒 Tuesday – Sunday | 11:00 AM – 8:00 PM</p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PaymentMethods;