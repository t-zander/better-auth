export function getSignUpRedirectUrl(userRole: string) {
  const roles = userRole.split(",");

  if (roles.includes("shelterOwner") || roles.includes("admin")) {
    return "/dashboard";
  }

  return "/role-selector";
}
