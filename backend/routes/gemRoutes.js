const express = require("express");
const router = express.Router();

const { submitGemForm } = require("../controllers/gemController");
const Gem = require("../models/Gem");


/* ================= GEM RECOMMENDATION FORM ================= */

router.post("/gem-recommendation", submitGemForm);


/* ================= GET ALL GEMS ================= */

router.get("/gems", async (req, res) => {
  try {
    const gems = await Gem.find();
    res.json(gems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching gems" });
  }
});


/* ================= GET SINGLE GEM ================= */

router.get("/gems/:id", async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ error: "Gem not found" });
    }

    res.json(gem);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching gem" });
  }
});


// GET RELATED GEMS
router.get("/gems/related/:id", async (req, res) => {
  try {
    const currentGem = await Gem.findById(req.params.id);

    if (!currentGem) {
      return res.status(404).json({ error: "Gem not found" });
    }

    const related = await Gem.find({
      _id: { $ne: currentGem._id }, // exclude current gem
      color: currentGem.color      // match by color (your best field)
    })
      .limit(6);

    // fallback if not enough same-color gems
    if (related.length < 4) {
      const fallback = await Gem.find({
        _id: { $ne: currentGem._id }
      }).limit(6);

      return res.json(fallback);
    }

    res.json(related);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;