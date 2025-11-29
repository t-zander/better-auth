import { auth } from "@/lib/auth";
import { updateUserRole } from "@/lib/db/user";
import { SearchParams } from "@/lib/ui/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  extractInvitationInfoFromSearchParams,
  getStartPageRedirectUrl,
} from "../utils";

export default async function SocialSignOnSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const invitationInfoParams = extractInvitationInfoFromSearchParams(
    await searchParams
  );

  // User used single sign on and came from an invite
  // ensure db is updated accordingly and redirect to proper page
  if (invitationInfoParams.invitationId) {
    const data = await auth.api.acceptInvitation({
      headers: await headers(),
      body: {
        invitationId: invitationInfoParams.invitationId,
      },
    });

    if (data) {
      await updateUserRole({
        role: data.invitation.role,
        userId: data.member.userId,
      });
      redirect(getStartPageRedirectUrl(data.invitation.role));
    }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !!session.user.role) {
    redirect(getStartPageRedirectUrl(session.user.role));
  } else {
    redirect("/signin");
  }
}
