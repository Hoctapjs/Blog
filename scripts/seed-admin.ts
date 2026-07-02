import { config } from "dotenv";
config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment");
  }

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin user ${email} already exists.`);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, name: "Jess", role: "admin" });

  console.log(`Admin user ${email} created.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
