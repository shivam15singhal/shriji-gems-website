const axios = require("axios");

let tokenCache = null;

const shiprocketLogin = async () => {
  if (tokenCache) return tokenCache;

  const res = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    }
  );

  tokenCache = res.data.token;
  return tokenCache;
};

module.exports = shiprocketLogin;
