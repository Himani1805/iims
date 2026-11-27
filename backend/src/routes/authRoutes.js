import express from "express";
import { User } from "../models/User.js";
import { adminOnly, protect, signToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const userCount = await User.countDocuments();
    const nextRole = userCount === 0 ? "admin" : "user";

    const user = await User.create({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      password,
      role: nextRole,
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: user.toSafeJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: user.toSafeJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Login failed" });
  }
});

router.get("/me", protect, async (req, res) => {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get("/users", protect, adminOnly, async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return res.json({
    users: users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    })),
  });
});

export default router;
