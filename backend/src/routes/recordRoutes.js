import express from "express";
import { body, param, query } from "express-validator";
import { Record } from "../models/Record.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", async (_req, res) => {
  try {
    const [grouped, recent, total] = await Promise.all([
      Record.aggregate([
        { $group: { _id: "$moduleKey", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Record.find().sort({ createdAt: -1 }).limit(8).lean(),
      Record.countDocuments(),
    ]);

    return res.json({
      total,
      counts: grouped.reduce((acc, row) => {
        acc[row._id] = row.count;
        return acc;
      }, {}),
      recent: recent.map((item) => ({
        id: item._id,
        moduleKey: item.moduleKey,
        createdAt: item.createdAt,
        summary:
          item.data?.Title ||
          item.data?.Faculty ||
          item.data?.Student ||
          item.data?.Subject ||
          item.data?.HolidayName ||
          item.data?.Programme ||
          item.data?.Notes ||
          "Record",
        ...item.data,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to load summary" });
  }
});

router.get(
  "/:moduleKey",
  param("moduleKey").trim().notEmpty().withMessage("moduleKey is required"),
  query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be 1-100"),
  query("q").optional().isString(),
  validate,
  async (req, res) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const q = String(req.query.q || "").trim();
      const filter = { moduleKey: req.params.moduleKey };

      if (q) {
        filter.$or = [
          { "data.Notes": { $regex: q, $options: "i" } },
          { "data.Faculty": { $regex: q, $options: "i" } },
          { "data.Student": { $regex: q, $options: "i" } },
          { "data.Title": { $regex: q, $options: "i" } },
          { "data.Subject": { $regex: q, $options: "i" } },
          { "data.Course": { $regex: q, $options: "i" } },
          { "data.Programme": { $regex: q, $options: "i" } },
          { "data.Institution": { $regex: q, $options: "i" } },
          { "data.School": { $regex: q, $options: "i" } },
          { "data.Department": { $regex: q, $options: "i" } },
          { "data.HolidayName": { $regex: q, $options: "i" } },
        ];
      }

      const [total, records] = await Promise.all([
        Record.countDocuments(filter),
        Record.find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
      ]);

      return res.json({
        total,
        page,
        limit,
        pages: Math.max(1, Math.ceil(total / limit)),
        records: records.map((item) => ({
          id: item._id,
          moduleKey: item.moduleKey,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ...item.data,
        })),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to load records" });
    }
  }
);

router.post(
  "/:moduleKey",
  param("moduleKey").trim().notEmpty().withMessage("moduleKey is required"),
  body().custom((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Invalid record payload");
    }
    return true;
  }),
  validate,
  async (req, res) => {
    try {
      const data = { ...(req.body || {}) };
      delete data.id;
      delete data._id;
      delete data.moduleKey;
      delete data.createdAt;
      delete data.updatedAt;

      if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Record data is required" });
      }

      const record = await Record.create({
        moduleKey: req.params.moduleKey,
        data,
        createdBy: req.user._id,
      });

      return res.status(201).json({
        record: {
          id: record._id,
          moduleKey: record.moduleKey,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          ...record.data,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to save record" });
    }
  }
);

router.put(
  "/:moduleKey/:id",
  param("moduleKey").trim().notEmpty().withMessage("moduleKey is required"),
  param("id").isMongoId().withMessage("Invalid record id"),
  validate,
  async (req, res) => {
    try {
      const data = { ...(req.body || {}) };
      delete data.id;
      delete data._id;
      delete data.moduleKey;
      delete data.createdAt;
      delete data.updatedAt;

      const record = await Record.findOneAndUpdate(
        { _id: req.params.id, moduleKey: req.params.moduleKey },
        { data },
        { new: true }
      );

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.json({
        record: {
          id: record._id,
          moduleKey: record.moduleKey,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          ...record.data,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to update record" });
    }
  }
);

router.delete(
  "/:moduleKey/:id",
  param("moduleKey").trim().notEmpty().withMessage("moduleKey is required"),
  param("id").isMongoId().withMessage("Invalid record id"),
  validate,
  async (req, res) => {
    try {
      const deleted = await Record.findOneAndDelete({
        _id: req.params.id,
        moduleKey: req.params.moduleKey,
      });

      if (!deleted) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.json({ message: "Record deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failed to delete record" });
    }
  }
);

export default router;
