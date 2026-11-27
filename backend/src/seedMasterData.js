import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { MasterData } from "./models/MasterData.js";

dotenv.config();

const seed = [
  ...["Himani Institute of Management Studies", "HS Learning Center"].map((name) => ({
    type: "Institution",
    name,
  })),
  ...[
    "School of Business & Management",
    "School of Computing & IT",
    "School of Design & Media",
    "School of Law & Public Policy",
    "School of Humanities",
    "School of Health Sciences",
    "School of Basic Sciences",
    "School of Education",
  ].map((name) => ({ type: "School", name })),
  ...["Management", "IT", "HR", "Admin", "Faculty", "Finance"].map((name) => ({
    type: "Department",
    name,
  })),
  ...["2024 - 25", "2025 - 26", "2026 - 27", "2027 - 28"].map((name) => ({
    type: "AcademicYear",
    name,
  })),
  ...["General Programme", "Special Programme"].map((name) => ({
    type: "ProgrammeType",
    name,
  })),
  ...[
    "Master of Business Administration",
    "Master of Commerce",
    "Bachelor of Business Administration",
    "Bachelor of Commerce (Hons)",
    "Bachelor of Computer Applications",
    "Master of Computer Applications",
    "Bachelor of Arts (Hons) Applied Economics",
    "Executive Master of Business Administration",
  ].map((name) => ({ type: "Programme", name })),
  ...[
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ].map((name) => ({ type: "Semester", name })),
  ...["A", "B", "C", "D", "E", "F", "G", "H"].map((name) => ({ type: "Section", name })),
];

async function run() {
  await connectDB(process.env.MONGO_URI);
  for (const item of seed) {
    await MasterData.updateOne(
      { type: item.type, name: item.name },
      { $set: { type: item.type, name: item.name, isActive: true, meta: {} } },
      { upsert: true }
    );
  }
  console.log(`Master data upserted: ${seed.length} items`);
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
