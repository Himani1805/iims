import mongoose from "mongoose";

const masterDataSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Institution",
        "School",
        "Department",
        "AcademicYear",
        "ProgrammeType",
        "Programme",
        "Semester",
        "Section",
      ],
      index: true,
    },
    name: { type: String, required: true, trim: true },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

masterDataSchema.index({ type: 1, name: 1 }, { unique: true });

export const MasterData = mongoose.model("MasterData", masterDataSchema);
