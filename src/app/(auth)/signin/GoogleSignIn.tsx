"use client";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { authClient } from "@/lib/auth/client";
import { useSearchParams } from "next/navigation";
import { IoLogoGoogle } from "react-icons/io5";
import { toast } from "sonner";
import { GoogleSignOnFailed } from "../GoogleSignOnFailed";

export function GoogleSignIn() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type");
  const error = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/social-signon-success",
        errorCallbackURL: "/signin?type=google_auth",
      },
      {
        onError: () => {
          toast.error("Unable to sign in with Google. Please try again.");
        },
      }
    );
  };

  return (
    <>
      <ButtonWithIcon
        onClick={handleGoogleSignIn}
        className="w-full"
        icon={<IoLogoGoogle />}
      >
        Sign in with Google
      </ButtonWithIcon>
      {errorType === "google_auth" && error && (
        <GoogleSignOnFailed error={error} mode="signin" />
      )}
    </>
  );
}
