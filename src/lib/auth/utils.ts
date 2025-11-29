import { Role, Roles } from "./permissions";

export function formatRole(role: Role) {
  switch (role) {
    case Roles.admin:
      return "Site Admin";
    case Roles.shelterAdmin:
      return "Shelter Admin";
    case Roles.volunteer:
      return "Volunteer";
    default:
      return "User";
  }
}

/**
 * by default, user can have multiple roles separated by commas
 *  */
export const getUserRoles = (role: string): string[] => {
  return role.split(",");
};

/**
 * by default, user can have multiple roles separated by commas
 * @returns boolean indicating if user has the expected role
 */
export const hasRole = (
  currentUserRoles: string | undefined,
  expectedRole: Role
) => {
  if (!currentUserRoles) {
    return false;
  }

  const rolesList = getUserRoles(currentUserRoles);

  return rolesList.includes(expectedRole);
};
