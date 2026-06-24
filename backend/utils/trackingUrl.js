const getTrackingUrl = (courier, trackingNumber) => {
  if (!courier || !trackingNumber) return null;

  const map = {
    delhivery: `https://www.delhivery.com/track/package/${trackingNumber}`,
    bluedart: `https://www.bluedart.com/tracking?awb=${trackingNumber}`,
    dtdc: `https://www.dtdc.in/tracking/tracking_results.asp?cnno=${trackingNumber}`,
    indiapost: `https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx?trackid=${trackingNumber}`,
    shiprocket: `https://shiprocket.co/tracking/${trackingNumber}`
  };

  return map[courier.toLowerCase()] || null;
};

module.exports = getTrackingUrl;
