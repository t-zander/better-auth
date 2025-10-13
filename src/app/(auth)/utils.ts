import { Role, Roles } from "@/lib/auth/permissions";

export function getStartPageRedirectUrl(userRole: Role | undefined) {
  if (!userRole || userRole === Roles.user) return "/role-selector";

  const roles = userRole.split(",");

  if (roles.includes(Roles.shelterOwner) || roles.includes(Roles.admin)) {
    return "/dashboard";
  }

  return "/role-selector";
}
