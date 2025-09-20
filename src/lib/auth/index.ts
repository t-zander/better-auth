import * as schema from "@/lib/db/schemas/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "consent",
      enabled: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    schema,
  }),
});
