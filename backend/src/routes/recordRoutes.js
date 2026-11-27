import express from "express";
import { Record } from "../models/Record.js";
import { adminOnly, protect } from "../middleware/auth.js";

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

router.get("/:moduleKey", async (req, res) => {
  try {
    const records = await Record.find({ moduleKey: req.params.moduleKey })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
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
});

router.post("/:moduleKey", async (req, res) => {
  try {
    const data = { ...(req.body || {}) };
    delete data.id;
    delete data._id;
    delete data.moduleKey;
    delete data.createdAt;
    delete data.updatedAt;

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
});

router.put("/:moduleKey/:id", async (req, res) => {
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
});

router.delete("/:moduleKey/:id", async (req, res) => {
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
});

export default router;
