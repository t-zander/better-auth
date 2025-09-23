import "dotenv/config";
import { eq } from "drizzle-orm";
import { auth } from "../../auth";
import { db } from "../db";
import * as schema from "../schemas/auth-schema";

export async function seed() {
  console.log("🌱 Checking for super admin user...");

  // Get super admin email from environment
  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error(
      "❌ SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD is not set in environment variables"
    );
    return;
  }

  // Check if super admin exists
  const existingAdmin = await db.query.user.findFirst({
    where: eq(schema.user.email, adminEmail),
  });

  if (existingAdmin) {
    console.log("✅ Super admin already exists");
    return;
  }

  // Create super admin if doesn't exist
  try {
    // Create the user with the admin plugin
    await auth.api.createUser({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Site Super Admin",
        role: "admin",
      },
    });

    console.log("✅ Created super admin user:", adminEmail);
  } catch (error) {
    console.error("❌ Failed to create super admin:", error);
  }
}

seed();
