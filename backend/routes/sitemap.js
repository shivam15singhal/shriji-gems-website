const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const Gem = require("../models/Gem");

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: "https://shrijigems.in",
    });

    // Static pages
    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/gemstones", changefreq: "daily", priority: 0.9 });
    smStream.write({ url: "/about", changefreq: "monthly", priority: 0.8 });
    smStream.write({
      url: "/about-shree-ji-gems",
      changefreq: "monthly",
      priority: 0.8,
    });
    smStream.write({
      url: "/privacy-policy",
      changefreq: "yearly",
      priority: 0.3,
    });
    smStream.write({
      url: "/shipping-policy",
      changefreq: "yearly",
      priority: 0.3,
    });
    smStream.write({
      url: "/terms-and-conditions",
      changefreq: "yearly",
      priority: 0.3,
    });
    smStream.write({
      url: "/payment-methods",
      changefreq: "yearly",
      priority: 0.3,
    });
    smStream.write({
      url: "/return-exchange",
      changefreq: "yearly",
      priority: 0.3,
    });

    // Dynamic gemstone pages
    const gems = await Gem.find();

    gems.forEach((gem) => {
      smStream.write({
        url: `/gems/${gem._id}`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: gem.createdAt,
      });

      ["high", "medium", "low"].forEach((quality) => {
        if (gem.qualities?.[quality]) {
          smStream.write({
            url: `/gems/${gem._id}/${quality}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: gem.createdAt,
          });
        }
      });
    });

    smStream.end();

    const sitemap = await streamToPromise(smStream);

    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;