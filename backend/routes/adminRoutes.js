const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

const GemLead = require("../models/GemLead");
const Gem = require("../models/Gem");

const upload = require("../middleware/uploadGemImage");


/**
 * @route   GET /api/admin/leads
 * @desc    Get paginated leads
 * @access  Private (Admin)
 */

router.get("/leads", auth, adminOnly, async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const leads = await GemLead.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await GemLead.countDocuments();

    res.json({
      success: true,
      leads,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {

    console.error("Admin leads error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads"
    });

  }

});



/**
 * @route   PATCH /api/admin/leads/:id/status
 * @desc    Update lead status
 * @access  Private (Admin)
 */

router.patch("/leads/:id/status", auth, adminOnly, async (req, res) => {

  try {

    const { status } = req.body;

    if (!["New", "Contacted", "Closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const lead = await GemLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Status updated",
      lead
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to update status"
    });

  }

});



/**
 * @route   DELETE /api/admin/leads/:id
 * @desc    Delete lead
 * @access  Private (Admin)
 */

router.delete("/leads/:id", auth, adminOnly, async (req, res) => {

  try {

    const lead = await GemLead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    res.json({
      success: true,
      message: "Lead deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to delete lead"
    });

  }

});



/**
 * @route   GET /api/admin/stats
 * @desc    Get lead statistics
 * @access  Private (Admin)
 */

router.get("/stats", auth, adminOnly, async (req, res) => {

  try {

    const totalLeads = await GemLead.countDocuments();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayLeads = await GemLead.countDocuments({
      createdAt: { $gte: todayStart }
    });

    const newLeads = await GemLead.countDocuments({
      status: "New"
    });

    const contactedLeads = await GemLead.countDocuments({
      status: "Contacted"
    });

    const closedLeads = await GemLead.countDocuments({
      status: "Closed"
    });

    res.json({
      success: true,
      totalLeads,
      todayLeads,
      newLeads,
      contactedLeads,
      closedLeads
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Stats failed"
    });

  }

});

/**
 * ================= GEM PRODUCT MANAGEMENT =================
 */


/**
 * @route   GET /api/admin/gems
 * @desc    Get all gems
 * @access  Private (Admin)
 */

router.get("/gems", auth, adminOnly, async (req, res) => {

  try {

    const gems = await Gem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      gems
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch gems"
    });

  }

});


/**
 * @route   POST /api/admin/gems
 * @desc    Create new gem
 * @access  Private (Admin)
 */

router.post("/gems", auth, adminOnly, async (req, res) => {

  try {

    const gem = new Gem(req.body);

    await gem.save();

    res.json({
      success: true,
      message: "Gem created",
      gem
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create gem"
    });

  }

});


/**
 * @route   PUT /api/admin/gems/:id
 * @desc    Update gem
 * @access  Private (Admin)
 */

router.put("/gems/:id", auth, adminOnly, async (req, res) => {

  try {

    const gem = await Gem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      gem
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to update gem"
    });

  }

});


/**
 * @route   DELETE /api/admin/gems/:id
 * @desc    Delete gem
 * @access  Private (Admin)
 */

router.delete("/gems/:id", auth, adminOnly, async (req, res) => {

  try {

    await Gem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Gem deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to delete gem"
    });

  }

});


router.post(
  "/upload-image",
  auth,
  adminOnly,
  upload.single("image"),
  (req, res) => {

    res.json({
      image: req.file.path
    });

  }
);
module.exports = router;