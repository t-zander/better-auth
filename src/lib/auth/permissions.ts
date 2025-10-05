import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  shelter: ["create", "update", "delete"],
  animal: ["create", "update", "delete"],
  animalProfile: ["create", "update", "delete"],
  posts: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const shelterOwner = ac.newRole({
  shelter: ["create", "update", "delete"],
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

export const volunteer = ac.newRole({});

export const roles = {
  shelterOwner,
  shelterAdmin,
  shelterContentCreator,
  petOwner,
  volunteer,
};
