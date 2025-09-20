import Link from "next/link";
import { AuthCard } from "../../../components/AuthCard";
import { EmailPasswordSignupForm } from "./EmailPasswordSignupForm";
import { GoogleSignUp } from "./GoogleSignUp";

export default function SignUpPage() {
  return (
    <AuthCard
      title="Sign Up"
      emailPasswordAuth={<EmailPasswordSignupForm />}
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
