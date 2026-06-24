const PDFDocument = require("pdfkit");

const generateInvoicePDF = (order) => {
  
  return new Promise((resolve, reject) => {
    console.log("ORDER RECEIVED IN PDF =", order.shippingDetails);
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
      });

      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      /* HEADER */

      doc
        .fontSize(26)
        .fillColor("#d96a92")
        .text("Shri Ji GEMS", {
          align: "center",
        });

      doc
        .fontSize(11)
        .fillColor("#666")
        .text("Natural & Certified Gemstones", {
          align: "center",
        });

      doc.moveDown(2);

      /* INVOICE DETAILS */

      doc
        .fontSize(18)
        .fillColor("#111")
        .text("TAX INVOICE");

      doc.moveDown(0.5);

      doc.fontSize(11);

      doc.text(
        `Invoice Number: SJG-${String(order._id).slice(-6)}`
      );

      doc.text(`Order ID: ${order._id}`);

      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleDateString(
          "en-IN"
        )}`
      );

      doc.text(
        `Payment Method: ${order.paymentMethod}`
      );

      doc.text(`Order Status: ${order.status}`);

      doc.moveDown(1.5);

      /* CUSTOMER DETAILS */

      doc
        .fontSize(16)
        .fillColor("#111")
        .text("Customer Details");

      doc.moveDown(0.5);

      doc.fontSize(11);

      doc.text(
        `Name: ${
          order.shippingDetails?.name || "-"
        }`
      );

      doc.text(
        `Phone: ${
          order.shippingDetails?.phone || "-"
        }`
      );

      doc.text(
        `Email: ${
          order.shippingDetails?.email ||
          order.user?.email ||
          "-"
        }`
      );

      doc.text(
        `Address: ${
          order.shippingDetails?.address || "-"
        }`
      );

      doc.moveDown(1.5);

      /* ORDER ITEMS */

      doc
        .fontSize(16)
        .fillColor("#111")
        .text("Order Items");

      doc.moveDown(0.7);

      const tableTop = doc.y;

      doc
        .rect(50, tableTop, 500, 25)
        .fill("#d96a92");

      doc
        .fillColor("#fff")
        .fontSize(11)
        .text("Product", 60, tableTop + 8);

      doc.text("Qty", 300, tableTop + 8);

      doc.text("Price", 360, tableTop + 8);

      doc.text("Subtotal", 450, tableTop + 8);

      let y = tableTop + 35;

      order.items.forEach((item) => {
        const subtotal =
          item.price * item.quantity;

        doc
          .fillColor("#111")
          .fontSize(10)
          .text(item.name, 60, y, {
            width: 220,
          });

        doc.text(
          item.quantity.toString(),
          300,
          y
        );

        doc.text(
          `₹${item.price.toLocaleString()}`,
          360,
          y
        );

        doc.text(
          `₹${subtotal.toLocaleString()}`,
          450,
          y,
          {
            width: 90,
          }
        );

        y += 28;
      });

      doc.y = y + 10;

      /* PAYMENT SUMMARY */

      doc
        .strokeColor("#e5e5e5")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      doc
        .fontSize(12)
        .fillColor("#111")
        .text(
          `Subtotal : ₹${order.totalAmount.toLocaleString()}`
        );

      doc.text("Shipping : Free");

      doc.text("GST : Included");

      doc.moveDown(0.5);

      doc
        .fontSize(18)
        .fillColor("#d96a92")
        .text(
          `Grand Total : ₹${order.totalAmount.toLocaleString()}`
        );

      doc.moveDown(1.5);

      /* FOOTER */

      doc
        .strokeColor("#e5e5e5")
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      doc
        .fontSize(10)
        .fillColor("#777")
        .text(
          "Thank you for shopping with Shri Ji Gems.",
          {
            align: "center",
          }
        );

      doc.text(
        "Astrologer Vijay Sharma | Lal Kitab Visheshagya",
        {
          align: "center",
        }
      );

      doc.text(
        "+91 9818307307",
        {
          align: "center",
        }
      );

      doc.text(
        "vijaysharmaastrology01@gmail.com",
        {
          align: "center",
        }
      );

      doc.text(
        "Badli, New Delhi - 110033",
        {
          align: "center",
        }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateInvoicePDF;
