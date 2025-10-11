# Copilot Instructions for better-auth-exploration

## Project Overview

- This is a Next.js project using the App Router, bootstrapped with `create-next-app`.
- Core authentication logic is in `src/lib/auth.ts` and database schemas are in `src/lib/db/schemas/`.
- Uses Drizzle ORM for database access and schema management (`drizzle-orm`, `drizzle-kit`).
- Authentication is managed via the `better-auth` library and CLI.

## Key Workflows

- **Development:** Use `bun dev` (or `npm/yarn/pnpm dev`) to start the local server.
- **Build:** Use `bun build` (or `npm/yarn/pnpm build`).
- **Database Migrations:**
  - Use `drizzle-kit push` to apply schema changes.
  - Drizzle config: `drizzle.config.ts`.
- **Auth Schema Generation:**
  - Run `bunx --bun @better-auth/cli@1.3.4 generate --config src/lib/auth.ts --output ./src/lib/db/schemas/auth-schema.ts` to generate/update auth schema.

## Project Structure & Patterns

- **App Directory:**
  - `src/app/` contains Next.js app entrypoints, layout, and global styles.
- **Database:**
  - `src/lib/db/schemas/` holds all Drizzle ORM schema definitions.
  - `src/lib/db/db.ts` is the main DB connection file.
- **Auth:**
  - `src/lib/auth.ts` is the main entry for authentication logic/config.
  -
- **Utilities:**
  - `src/lib/utils.ts` for shared helpers.

## Conventions

- Use TypeScript throughout (`.ts`, `.tsx`).
- Place all new database schemas in `src/lib/db/schemas/`.
- Keep authentication logic isolated in `src/lib/auth.ts`.
- Use Bun for scripts and dev server, but npm/yarn/pnpm are also supported.
- **Export Style:** Always use named exports for components and functions. Only use `export default function` for files named `page.tsx` or `layout.tsx`. For other components, use `export function <ComponentName>() { ... }`.
- prefer icons from react-icons/io-5 (Ionicons) for consistency.

## External Integrations

- **Better Auth:**
  - Managed via `@better-auth/cli` and `better-auth` package.
  - Auth schema is generated from `src/lib/auth.ts` config.
  - See the LLMs list at: [https://www.better-auth.com/llms.txt](https://www.better-auth.com/llms.txt)
- **Drizzle ORM:**
  - Used for all database access and migrations.

## Examples

- To generate the auth schema:
  ```sh
  bunx --bun @better-auth/cli@1.3.4 generate --config src/lib/auth.ts --output ./src/lib/db/schemas/auth-schema.ts
  ```
- To run the dev server:
  ```sh
  bun dev
  ```

## References

- See `README.md` for Next.js basics.
- See `drizzle.config.ts` for Drizzle ORM setup.
- See `package.json` scripts for all available commands.

---

If you are unsure about a workflow or convention, check the referenced files or ask for clarification.
