import express from "express";
import { body, param } from "express-validator";
import { User } from "../models/User.js";
import { adminOnly, protect, signToken } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const passwordRule = body("password")
  .isString()
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Za-z]/)
  .withMessage("Password must include a letter")
  .matches(/[0-9]/)
  .withMessage("Password must include a number");

router.post(
  "/signup",
  authLimiter,
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  passwordRule,
  validate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

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
  }
);

router.post(
  "/login",
  authLimiter,
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

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
  }
);

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

router.patch(
  "/users/:id/role",
  protect,
  adminOnly,
  param("id").isMongoId().withMessage("Invalid user id"),
  body("role").isIn(["admin", "user"]).withMessage("Role must be admin or user"),
  validate,
  async (req, res) => {
    try {
      const target = await User.findById(req.params.id);
      if (!target) {
        return res.status(404).json({ message: "User not found" });
      }

      if (String(target._id) === String(req.user._id) && req.body.role !== "admin") {
        return res.status(400).json({ message: "You cannot demote your own account" });
      }

      if (target.role === "admin" && req.body.role === "user") {
        const adminCount = await User.countDocuments({ role: "admin" });
        if (adminCount <= 1) {
          return res.status(400).json({ message: "At least one admin is required" });
        }
      }

      target.role = req.body.role;
      await target.save();

      return res.json({
        user: {
          id: target._id,
          name: target.name,
          email: target.email,
          role: target.role,
          createdAt: target.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to update role" });
    }
  }
);

export default router;
