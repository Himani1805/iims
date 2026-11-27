import express from "express";
import { body, param } from "express-validator";
import { MasterData } from "../models/MasterData.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();
const TYPES = [
  "Institution",
  "School",
  "Department",
  "AcademicYear",
  "ProgrammeType",
  "Programme",
  "Semester",
  "Section",
];

router.get("/", protect, async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.type && TYPES.includes(String(req.query.type))) {
      filter.type = String(req.query.type);
    }
    const items = await MasterData.find(filter).sort({ type: 1, name: 1 }).lean();
    const grouped = TYPES.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {});
    items.forEach((item) => {
      grouped[item.type].push({
        id: item._id,
        name: item.name,
        meta: item.meta || {},
      });
    });
    return res.json({ items: grouped });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to load master data" });
  }
});

router.post(
  "/",
  protect,
  adminOnly,
  body("type").isIn(TYPES).withMessage("Invalid master data type"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  validate,
  async (req, res) => {
    try {
      const item = await MasterData.create({
        type: req.body.type,
        name: String(req.body.name).trim(),
        meta: req.body.meta || {},
      });
      return res.status(201).json({
        item: { id: item._id, type: item.type, name: item.name, meta: item.meta },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "This value already exists" });
      }
      return res.status(500).json({ message: error.message || "Failed to create master data" });
    }
  }
);

router.put(
  "/:id",
  protect,
  adminOnly,
  param("id").isMongoId().withMessage("Invalid id"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  validate,
  async (req, res) => {
    try {
      const item = await MasterData.findByIdAndUpdate(
        req.params.id,
        {
          ...(req.body.name ? { name: String(req.body.name).trim() } : {}),
          ...(req.body.meta ? { meta: req.body.meta } : {}),
          ...(typeof req.body.isActive === "boolean" ? { isActive: req.body.isActive } : {}),
        },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: "Item not found" });
      return res.json({
        item: {
          id: item._id,
          type: item.type,
          name: item.name,
          meta: item.meta,
          isActive: item.isActive,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to update master data" });
    }
  }
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  param("id").isMongoId().withMessage("Invalid id"),
  validate,
  async (req, res) => {
    try {
      const item = await MasterData.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: "Item not found" });
      return res.json({ message: "Master data deactivated" });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to delete master data" });
    }
  }
);

export default router;
