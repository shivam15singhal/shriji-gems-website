const PDFDocument = require("pdfkit");

/* -------------------------------------------------------
   COLORS
------------------------------------------------------- */

const COLORS = {
  primary: "#C85A84",
  dark: "#222222",
  gray: "#666666",
  border: "#D9D9D9",
  light: "#F7F7F7",
  white: "#FFFFFF",
};

/* -------------------------------------------------------
   HELPER FUNCTIONS
------------------------------------------------------- */

function drawBox(doc, x, y, width, height) {
  doc
    .lineWidth(1)
    .strokeColor(COLORS.border)
    .rect(x, y, width, height)
    .stroke();
}

function drawFilledBox(
  doc,
  x,
  y,
  width,
  height,
  color = COLORS.primary
) {
  doc
    .save()
    .fillColor(color)
    .rect(x, y, width, height)
    .fill()
    .restore();
}

function drawLine(doc, x1, y1, x2, y2) {
  doc
    .lineWidth(1)
    .strokeColor(COLORS.border)
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .stroke();
}

function label(doc, text, x, y) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.gray)
    .text(text, x, y);
}

function value(doc, text, x, y, width = 180) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(COLORS.dark)
    .text(text || "-", x, y, {
      width,
    });
}

function money(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/* -------------------------------------------------------
   MAIN FUNCTION
------------------------------------------------------- */

const generateInvoicePDF = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
      });

      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      const PAGE_LEFT = 40;
      const PAGE_RIGHT = 555;
      const PAGE_WIDTH = PAGE_RIGHT - PAGE_LEFT;

      let y = 40;

      /* =====================================================
                            HEADER
      ===================================================== */

      // Uncomment when logo is available

      
      doc.image(
        "public/LOGO_DONE.png",
        PAGE_LEFT,
        y,
        {
          width: 55,
        }
      );
      

      doc
        .font("Helvetica-Bold")
        .fontSize(24)
        .fillColor(COLORS.primary)
        .text("SHRI JI GEMS", 110, y);

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.dark)
        .text("Lal Kitab Astrology", 110, y + 28);

            doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(COLORS.gray)
        .text("Natural & Certified Gemstones", 110, y + 45);

      y += 80;

      drawLine(
        doc,
        PAGE_LEFT,
        y,
        PAGE_RIGHT,
        y
      );

      y += 15;

      /* =====================================================
                      GST INVOICE DETAILS
      ===================================================== */

      const invoiceBoxHeight = 95;

      drawBox(
        doc,
        PAGE_LEFT,
        y,
        PAGE_WIDTH,
        invoiceBoxHeight
      );

      // Invoice Title

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.dark)
        .text(
          "GST TAX INVOICE",
          PAGE_LEFT + 12,
          y + 12
        );

      // Invoice Information

      const invoiceNo = `SJG-${String(order._id).slice(-6)}`;

      const invoiceDate = new Date(
        order.createdAt
      ).toLocaleDateString("en-IN");

      const dueDate = invoiceDate;

      const leftX = PAGE_LEFT + 260;
      const rightX = PAGE_LEFT + 380;

      let infoY = y + 12;

      label(doc, "Invoice #", leftX, infoY);
      value(doc, invoiceNo, rightX, infoY);

      infoY += 18;

      label(doc, "Invoice Date", leftX, infoY);
      value(doc, invoiceDate, rightX, infoY);

      infoY += 18;

      label(doc, "Order ID", leftX, infoY);

      value(
        doc,
        String(order._id),
        rightX,
        infoY,
        120
      );

      infoY += 18;

      label(doc, "Due Date", leftX, infoY);
      value(doc, dueDate, rightX, infoY);

      infoY += 18;

      label(doc, "Payment Mode", leftX, infoY);

      value(
        doc,
        order.paymentMethod || "-",
        rightX,
        infoY
      );

      y += invoiceBoxHeight + 18;

      /* =====================================================
                      BILL TO / SOLD BY
      ===================================================== */

      const customerBoxHeight = 160;
      const halfWidth = PAGE_WIDTH / 2;

      // Left Box

      drawBox(
        doc,
        PAGE_LEFT,
        y,
        halfWidth,
        customerBoxHeight
      );

      // Right Box

      drawBox(
        doc,
        PAGE_LEFT + halfWidth,
        y,
        halfWidth,
        customerBoxHeight
      );

      // Header Backgrounds

      drawFilledBox(
        doc,
        PAGE_LEFT,
        y,
        halfWidth,
        24,
        COLORS.primary
      );

      drawFilledBox(
        doc,
        PAGE_LEFT + halfWidth,
        y,
        halfWidth,
        24,
        COLORS.primary
      );

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(COLORS.white)
        .text(
          "BILL TO",
          PAGE_LEFT + 12,
          y + 7
        );

      doc.text(
        "SOLD BY",
        PAGE_LEFT + halfWidth + 12,
        y + 7
      );

      doc.fillColor(COLORS.dark);

      // ---------------- BILL TO ----------------

      let customerY = y + 36;

            label(
        doc,
        "Customer Name",
        PAGE_LEFT + 12,
        customerY
      );

      value(
        doc,
        order.shippingDetails?.name || "-",
        PAGE_LEFT + 12,
        customerY + 13,
        220
      );

      customerY += 34;

      label(
        doc,
        "Phone",
        PAGE_LEFT + 12,
        customerY
      );

      value(
        doc,
        order.shippingDetails?.phone || "-",
        PAGE_LEFT + 12,
        customerY + 13
      );

      customerY += 34;

      label(
        doc,
        "Email",
        PAGE_LEFT + 12,
        customerY
      );

      value(
        doc,
        order.shippingDetails?.email ||
          order.user?.email ||
          "-",
        PAGE_LEFT + 12,
        customerY + 13,
        220
      );

      customerY += 34;

      label(
        doc,
        "Address",
        PAGE_LEFT + 12,
        customerY
      );

      value(
        doc,
        order.shippingDetails?.address || "-",
        PAGE_LEFT + 12,
        customerY + 13,
        220
      );

      // ---------------- SOLD BY ----------------

      let sellerY = y + 36;
      const sellerX = PAGE_LEFT + halfWidth + 12;

      label(
        doc,
        "Business Name",
        sellerX,
        sellerY
      );

      value(
        doc,
        "Shri Ji Gems",
        sellerX,
        sellerY + 13
      );

      sellerY += 34;

      label(
        doc,
        "GSTIN",
        sellerX,
        sellerY
      );

      value(
        doc,
        "YOUR_GSTIN_HERE",
        sellerX,
        sellerY + 13
      );

      sellerY += 34;

      label(
        doc,
        "Address",
        sellerX,
        sellerY
      );

      value(
        doc,
        "Badli, New Delhi - 110042",
        sellerX,
        sellerY + 13,
        210
      );

      sellerY += 34;

      label(
        doc,
        "Email",
        sellerX,
        sellerY
      );

      value(
        doc,
        "vijaysharmaastrology01@gmail.com",
        sellerX,
        sellerY + 13,
        210
      );

      y += customerBoxHeight + 18;

      /* =====================================================
                        PRODUCT TABLE
      ===================================================== */

      const tableStartY = y;

      // Table Columns

      const col1 = PAGE_LEFT + 10; // Description
      const col2 = 300; // HSN
      const col3 = 350; // Qty
      const col4 = 390; // Unit Price
      const col5 = 465; // GST
      const col6 = 515; // Total

      // Header Background

      drawFilledBox(
        doc,
        PAGE_LEFT,
        tableStartY,
        PAGE_WIDTH,
        28,
        COLORS.primary
      );

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.white);

      doc.text(
        "Product Description",
        col1,
        tableStartY + 8
      );

      doc.text(
        "Qty",
        col3,
        tableStartY + 8
      );

      doc.text(
        "Unit Price",
        col4,
        tableStartY + 8
      );

      doc.text(
        "GST",
        col5,
        tableStartY + 8
      );

      doc.text(
        "Total",
        col6,
        tableStartY + 8
      );

      drawLine(
        doc,
        PAGE_LEFT,
        tableStartY + 28,
        PAGE_RIGHT,
        tableStartY + 28
      );

      let rowY = tableStartY + 40;

      let subtotal = 0;
      let totalGST = 0;

      /* =====================================================
                        PRODUCT LOOP
      ===================================================== */

      order.items.forEach((item, index) => {
                const qty = Number(item.quantity || 1);

        const unitPrice = Number(item.price || 0);

        const taxableValue = qty * unitPrice;

        const gst = taxableValue * 0.03;

        const total = taxableValue + gst;

        subtotal += taxableValue;
        totalGST += gst;

        // Product Name

        doc
          .font("Helvetica-Bold")
          .fontSize(11)
          .fillColor(COLORS.dark)
          .text(
            item.name || "Gemstone",
            col1,
            rowY,
            {
              width: 230,
            }
          );

        rowY += 16;

        // Product Description

        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor(COLORS.gray);

        
        doc.text(
  `Taxable Value : ${money(taxableValue)}`,
  col1,
  rowY
);

rowY += 13;

        // Right Columns

        doc
          .font("Helvetica")
          .fontSize(10)
          .fillColor(COLORS.dark);

        

        doc.text(
          qty.toString(),
          col3,
          rowY - 13
        );

        doc.text(
          money(unitPrice),
          col4,
          rowY - 13
        );

        doc.text(
          money(gst),
          col5,
          rowY - 13
        );

        doc.text(
          money(total),
          col6,
          rowY - 13,
          {
            width: 40,
            align: "right",
          }
        );

        rowY += 5;

        // Divider Between Products

        if (
          index !==
          order.items.length - 1
        ) {
          drawLine(
            doc,
            PAGE_LEFT,
            rowY,
            PAGE_RIGHT,
            rowY
          );

          rowY += 6;
        }
      });

      /* =====================================================
                  UPDATE TABLE HEIGHT
      ===================================================== */

      const actualTableHeight =
        rowY -
        tableStartY +
        10;

      drawBox(
        doc,
        PAGE_LEFT,
        tableStartY,
        PAGE_WIDTH,
        actualTableHeight
      );

      y = rowY + 20;
      

      /* =====================================================
                    CALCULATE TOTALS
      ===================================================== */

    

      const grandTotal = order.totalAmount;

      /* =====================================================
                      TOTALS SECTION
      ===================================================== */

      const summaryWidth = 250;
      const summaryX =
        PAGE_RIGHT - summaryWidth;

      drawBox(
        doc,
        summaryX,
        y,
        summaryWidth,
        80
      );

      label(
        doc,
        "Subtotal",
        summaryX + 15,
        y + 15
      );

      value(
        doc,
        money(subtotal),
        summaryX + 140,
        y + 15
      );

      label(
        doc,
        "GST",
        summaryX + 15,
        y + 38
      );

      value(
        doc,
        money(totalGST),
        summaryX + 140,
        y + 38
      );

      

      drawFilledBox(
        doc,
        summaryX,
        y + 56,
        summaryWidth,
        23,
        COLORS.primary
      );

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(COLORS.white)
        .text(
          "Grand Total",
          summaryX + 15,
          y + 62
        );

      doc.text(
        money(grandTotal),
        summaryX + 130,
        y + 62,
        {
          width: 100,
          align: "right",
        }
      );

      y += 100;
      

      /* =====================================================
                    PAYMENT DETAILS
      ===================================================== */

      drawBox(
        doc,
        PAGE_LEFT,
        y,
        PAGE_WIDTH,
        90
      );

      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor(COLORS.primary)
        .text(
          "PAYMENT DETAILS",
          PAGE_LEFT + 10,
          y + 10
        );

      label(
        doc,
        "Payment Status",
        PAGE_LEFT + 15,
        y + 38
      );

      value(
    doc,
    order.paymentMethod === "COD"
        ? "Pending"
        : "Paid",
        PAGE_LEFT + 150,
        y + 38
      );

      label(
        doc,
        "Payment Method",
        PAGE_LEFT + 15,
        y + 60
      );

      value(
        doc,
        order.paymentMethod || "Online",
        PAGE_LEFT + 150,
        y + 60
      );

      label(
        doc,
        "Transaction ID",
        PAGE_LEFT + 15,
        y + 82
      );

      value(
        doc,
       order.razorpayPaymentId || "-",
        PAGE_LEFT + 150,
        y + 82
      );

      
      y += 110;
      if (y + 260 > doc.page.height - doc.page.margins.bottom) {
  doc.addPage();
  y = 40;
}
    
      /* =====================================================
                    NOTES & TERMS
      ===================================================== */

      drawBox(
        doc,
        PAGE_LEFT,
        y,
        PAGE_WIDTH,
        105
      );

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(COLORS.primary)
        .text(
          "Notes",
          PAGE_LEFT + 10,
          y + 10
        );

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.dark)
        .text(
          "Thank you for shopping with Shri Ji Gems. All gemstones are natural and certified unless otherwise stated.",
          PAGE_LEFT + 10,
          y + 28,
          {
            width: 520,
          }
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(COLORS.primary)
        .text(
          "Terms & Conditions",
          PAGE_LEFT + 10,
          y + 58
        );

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.gray)
        .text(
          "This is a computer-generated GST invoice and does not require a physical signature. Goods once sold are subject to the company's return and exchange policy.",
          PAGE_LEFT + 10,
          y + 74,
          {
            width: 520,
          }
        );

      y += 120;

      /* =====================================================
                        SIGNATURE
      ===================================================== */

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.dark)
        .text(
          "Authorized Signatory",
          PAGE_RIGHT - 140,
          y
        );

      drawLine(
        doc,
        PAGE_RIGHT - 150,
        y - 10,
        PAGE_RIGHT - 20,
        y - 10
      );

      y += 35;

      /* =====================================================
                          FOOTER
      ===================================================== */

      drawLine(
        doc,
        PAGE_LEFT,
        y,
        PAGE_RIGHT,
        y
      );

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.gray)
        .text(
          "SHRI JI GEMS | Natural & Certified Gemstones",
          PAGE_LEFT,
          y + 12,
          {
            align: "center",
            width: PAGE_WIDTH,
          }
        );

      doc.text(
        "Email: info@shrijigems.com | Phone: +91-9818307307",
        PAGE_LEFT,
        y + 25,
        {
          align: "center",
          width: PAGE_WIDTH,
        }
      );

      doc.text(
        "Website: www.shrijigems.in",
        PAGE_LEFT,
        y + 38,
        {
          align: "center",
          width: PAGE_WIDTH,
        }
      );
            /* =====================================================
                      FINISH PDF
      ===================================================== */

      doc.end();

      return doc;

    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateInvoicePDF;