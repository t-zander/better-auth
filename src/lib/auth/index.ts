import * as schema from "@/lib/db/schemas/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import { db } from "../db/db";
import { ac, Roles, roles } from "./permissions";

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
      schema: {
        organization: {
          additionalFields: {
            address: {
              type: "string",
              required: false,
            },
            description: {
              type: "string",
              required: false,
            },
            phone: {
              type: "string",
              required: false,
            },
          },
        },
      },
      ac,
      roles,
      organizationHooks: {
        beforeAddMember: async ({ member }) => {
          return {
            data: {
              ...member,
              role: member.role === "owner" ? Roles.shelterOwner : member.role,
            },
          };
        },
      },
      /* Only shelter owner can create a shelter */
      allowUserToCreateOrganization: async (user) => {
        const roles = user?.role?.split(",") || [];

        if (!roles.includes(Roles.shelterOwner)) return false;

        return true;
      },
    }),
  ],
});
