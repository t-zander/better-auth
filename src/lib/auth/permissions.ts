import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  shelter: ["create", "update", "delete"],
  shelterMembers: ["add", "remove", "invite", "approvePendingRequests", "view"],
  animal: ["create", "update", "delete"],
  animalProfile: ["create", "update", "delete"],
  posts: ["create", "update", "delete"],
  activities: ["create", "update", "delete", "help"],
} as const;

export const ac = createAccessControl(statement);

export const shelterOwner = ac.newRole({
  shelter: ["create", "update", "delete"],
  shelterMembers: ["add", "remove", "invite", "approvePendingRequests", "view"],
});

export const shelterAdmin = ac.newRole({
  shelter: ["update"],
  animalProfile: ["create", "update", "delete"],
});

export const petOwner = ac.newRole({
  animal: ["create", "update", "delete"],
  animalProfile: ["create", "update", "delete"],
});

export const shelterContentCreator = ac.newRole({
  animalProfile: ["update", "delete"],
});

export const volunteer = ac.newRole({
  activities: ["create", "update", "delete", "help"],
});

export const admin = ac.newRole(adminAc.statements);

export const roles = {
  shelterOwner,
  shelterAdmin,
  shelterContentCreator,
  petOwner,
  volunteer,
  admin,
};

export type Role = keyof typeof roles | "user";
const ootbRole = { user: "user" };

function getAllRolesEnum() {
  return Object.keys(roles).reduce(
    (acc, role) => {
      acc[role as Role] = role as Role;
      return acc;
    },
    { ...ootbRole } as Record<Role, Role>
  );
}

export const Roles = getAllRolesEnum();
