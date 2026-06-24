const axios = require("axios");
const shiprocketLogin = require("./shiprocket");

const createShipment = async (order) => {
  const token = await shiprocketLogin();

  const res = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      order_id: order._id.toString(),
      order_date: new Date(),
      billing_customer_name: order.user.name,
      billing_email: order.user.email,
      billing_phone: order.shippingDetails.phone,
      billing_address: order.shippingDetails.address,
      payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
      order_items: order.items.map(i => ({
        name: i.name,
        sku: i.productId,
        units: i.quantity,
        selling_price: i.price
      }))
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

module.exports = createShipment;
