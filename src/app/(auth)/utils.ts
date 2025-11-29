import { Roles } from "@/lib/auth/permissions";
import { SearchParams } from "@/lib/ui/types";

export function getStartPageRedirectUrl(userRole: string | null | undefined) {
  if (!userRole) return "/role-selector";

  const roles = userRole.split(",");

  /* User only has a default user role */
  if (roles.length === 1 && roles[0] === Roles.user) {
    return "/role-selector";
  }

  if (
    roles.includes(Roles.shelterOwner) ||
    roles.includes(Roles.shelterAdmin)
  ) {
    return "/shelters-management";
  }

  if (roles.includes(Roles.admin)) {
    return "/dashboard";
  }

  return "/role-selector";
}

export function extractInvitationInfoFromSearchParams(
  invitationInfo: SearchParams
) {
  const params: {
    email?: string;
    invitationId?: string;
  } = {};

  if (invitationInfo.email && typeof invitationInfo.email === "string") {
    params.email = invitationInfo.email;
  }

  if (
    invitationInfo.invitationId &&
    typeof invitationInfo.invitationId === "string"
  ) {
    params.invitationId = invitationInfo.invitationId;
  }

  return params;
}
