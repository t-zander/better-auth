"use client";

import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { authClient } from "@/lib/auth/client";
import { useSearchParams } from "next/navigation";
import { IoLogoGoogle } from "react-icons/io5";
import { toast } from "sonner";
import { GoogleSignOnFailed } from "../GoogleSignOnFailed";

export function GoogleSignUp() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type");
  const error = searchParams.get("error");

  const handleGoogleSignUp = async () => {
    authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/social-signon-success",
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
