import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGO_URI);

  const email = "himani@hsacademic.com";
  const existing = await User.findOne({ email });

  if (existing) {
    existing.name = "Himani Sharma";
    existing.role = "admin";
    existing.password = "admin123";
    await existing.save();
    console.log("Admin updated:", email, "/ admin123");
  } else {
    await User.create({
      name: "Himani Sharma",
      email,
      password: "admin123",
      role: "admin",
    });
    console.log("Admin created:", email, "/ admin123");
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
