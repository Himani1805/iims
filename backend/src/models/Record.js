import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    moduleKey: { type: String, required: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

recordSchema.index({ moduleKey: 1, createdAt: -1 });

export const Record = mongoose.model("Record", recordSchema);
