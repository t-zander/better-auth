import {
  adminClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.REACT_APP_AUTH_BASE_URL || "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles,
    }),
    organizationClient({
      schema: inferOrgAdditionalFields(),
    }),
  ],
});
