"use client";

import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { authClient } from "@/lib/auth/client";
import { useSearchParams } from "next/navigation";
import { IoLogoGoogle } from "react-icons/io5";
import { toast } from "sonner";
import { GoogleSignOnFailed } from "../GoogleSignOnFailed";

interface GoogleSignUpProps {
  invitationId?: string;
}

export function GoogleSignUp({ invitationId }: GoogleSignUpProps) {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type");
  const error = searchParams.get("error");
  const encodedInvitationParams = invitationId
    ? new URLSearchParams({
        invitationId,
      })
    : null;

  const handleGoogleSignUp = async () => {
    authClient.signIn.social(
      {
        provider: "google",
        /* 
        If invitationId is present it will be included in the callbackURL as a query param
        So after successful social sign on user can be redirected to proper flow (accept invitation)
        */
        callbackURL: encodedInvitationParams
          ? `/social-signon-success?${encodedInvitationParams.toString()}`
          : "/social-signon-success",
        errorCallbackURL: "/signup?type=google_auth",
      },
      {
        onError: () => {
          toast.error("Unable to sign up with Google. Please try again.");
        },
      }
    );
  };

  return (
    <>
      <ButtonWithIcon
        onClick={handleGoogleSignUp}
        className="w-full"
        icon={<IoLogoGoogle />}
      >
        Sign up with Google
      </ButtonWithIcon>
      {errorType === "google_auth" && error && (
        <GoogleSignOnFailed error={error} mode="signup" />
      )}
    </>
  );
}
