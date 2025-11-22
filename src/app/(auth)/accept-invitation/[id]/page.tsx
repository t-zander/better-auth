/* 
  Extracts invitation id from the URL
  checks if user is already exists in the system or not
  If user exists, redirects to sign in page + additional query param for invitation id
  If user does not exist, redirects to sign up page + additional query param for invitation id
*/

import { verifyNextStepForInvitedUser } from "@/lib/db/invitations";
import { ErrorCodes } from "@/lib/errorCodes";
import { redirect, RedirectType } from "next/navigation";

export default async function AcceptInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const acceptInvitationPageParams = await params;
  let result:
    | { success: true; redirectUrl: string }
    | { success: false; errorCode: string }
    | null = null;

  try {
    const { action, email } = await verifyNextStepForInvitedUser(
      acceptInvitationPageParams.id
    );
    if (action === "sign-up") {
      const urlParams = new URLSearchParams({
        invitationId: acceptInvitationPageParams.id,
        email,
      });
      result = {
        success: true,
        redirectUrl: `/signup?${urlParams.toString()}`,
      };
    }
  } catch (err) {
    if (err instanceof Error) {
      result = { success: false, errorCode: err.message };
    } else {
      result = { success: false, errorCode: "UNKNOWN_ERROR" };
    }
  }

  function renderMessageBasedOnErrorCode(errorCode: string) {
    if (
      errorCode === ErrorCodes.InvitationInvalid ||
      errorCode === ErrorCodes.InvitationExpired
    ) {
      return <p>Your invitation is either invalid or has expired.</p>;
    }

    return <p>The invitation cannot be processed at this time.</p>;
  }

  if (!result) {
    return <div>Something went wrong...</div>;
  }

  if (result.success) {
    redirect(result.redirectUrl, RedirectType.replace);
  }

  return renderMessageBasedOnErrorCode(result.errorCode);
}
