const express = require("express");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ======================
   MULTER CONFIG
====================== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ======================
   SIGNUP
====================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local"
    });

    // 🔐 CREATE TOKEN ON SIGNUP
    const token = jwt.sign(
      { id: user._id ,
        role: user.role  
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});


/* ======================
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id ,
        role: user.role  
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================
   GOOGLE OAUTH
====================== */
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        authProvider: "google"
      });
    }

    const jwtToken = jwt.sign(
      { 
        id: user._id,
        role: user.role  
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: jwtToken,
      user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Google authentication failed"
    });
  }
});


router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(
      decoded.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ user });
  } catch {
    res.status(400).json({ message: "Profile update failed" });
  }
});

/* ======================
   UPLOAD AVATAR
====================== */
router.post(
  "/avatar",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByIdAndUpdate(
        decoded.id,
        { avatar: `/uploads/${req.file.filename}` },
        { new: true }
      ).select("-password");

      res.json({ user });
    } catch {
      res.status(400).json({ message: "Avatar upload failed" });
    }
  }
);


router.post("/forgot-password", async (req,res)=>{
  try{

    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire =
      Date.now() + 1000 * 60 * 15;

    await user.save();

    FRONTEND_URL=process.env.FRONTEND_URL || "http://localhost:3000";
    await sendEmail({
      to:user.email,
      subject:"Reset Your Password",
      html:`
        <h2>Password Reset</h2>

        <p>Click below link:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>Valid for 15 minutes.</p>
      `
    });

    res.json({
      success:true,
      message:"Reset email sent"
    });

  }catch(err){
    console.log(err);

    res.status(500).json({
      success:false
    });
  }
});


router.post(
  "/reset-password/:token",
  async (req, res) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token"
        });
      }

      const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );

      user.password = hashedPassword;

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.json({
        success: true,
        message: "Password updated successfully"
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }
);

module.exports = router;