import Link from "next/link";
import { AuthCard } from "../../../components/AuthCard";
import { EmailPasswordSignupForm } from "./EmailPasswordSignupForm";
import { GoogleSignUp } from "./GoogleSignUp";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  /* 
    When user is redirected to this page from invitation page
    These params will be used to:
    1. prefill email input field
    2. invitation id will be sent to backend to assign proper role for the user and add him as a member to organization
  */
  const invitationInfo = await searchParams;

  const getInvitationInfo = () => {
    if (
      invitationInfo.email &&
      typeof invitationInfo.email === "string" &&
      invitationInfo.invitationId &&
      typeof invitationInfo.invitationId === "string"
    ) {
      return {
        email: invitationInfo.email,
        invitationId: invitationInfo.invitationId,
      };
    }

    return {};
  };

  return (
    <AuthCard
      title="Sign Up"
      emailPasswordAuth={<EmailPasswordSignupForm {...getInvitationInfo()} />}
      socialSignOn={<GoogleSignUp />}
      footer={
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      }
    />
  );
}
