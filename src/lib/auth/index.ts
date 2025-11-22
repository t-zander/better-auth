import { db } from "@/lib/db/db";
import * as schema from "@/lib/db/schemas/auth-schema";
import { sendEmail } from "@/lib/email/sendEmail";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import { updateUserRole } from "../db/user";
import { ac, Role, Roles, roles } from "./permissions";
import { formatRole } from "./utils";

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
      requireEmailVerificationOnInvitation: false,
      sendInvitationEmail: async (data) => {
        const inviteLink = `${process.env.WEBSITE_BASE_URL}/accept-invitation/${data.id}`;

        const result = await sendEmail(
          "You are invited to join a shelter",
          "InviteShelterAdmin",
          {
            inviteLink,
            inviterName: data.inviter.user.name ?? "",
            organizationName: data.organization.name,
            formattedRole: formatRole(data.role as Role),
          },
          {
            // temporary just to test. should be dynamic in production
            to: [process.env.RESEND_TO_EMAIL as string],
          }
        );
        console.log("sendInvitationEmail result:", result);

        if (result.error) {
          throw new Error("Failed to send invitation email");
        }
      },
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
        afterAcceptInvitation: async (data) => {
          try {
            // Update user role in the database after user accepted invitation
            await updateUserRole({
              userId: data.member.userId,
              role: data.member.role,
            });
          } catch (error) {
            console.log("Error in afterAcceptInvitation hook:", error);
          }
        },
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
