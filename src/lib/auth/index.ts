import * as schema from "@/lib/db/schemas/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import { db } from "../db/db";
import { ac, roles } from "./permissions";

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
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles,
    }),
    organization({
      allowUserToCreateOrganization: (user) => {
        console.log("user", user);

        return false; // Disable user-created organizations
      },
    }),
  ],
});
