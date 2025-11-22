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
