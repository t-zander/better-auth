import { AuthCard } from "@/components/AuthCard";
import Link from "next/link";
import { EmailPasswordSigninForm } from "./EmailPasswordSigninForm";
import { GoogleSignIn } from "./GoogleSignIn";

export default async function SignInPage() {
  return (
    <AuthCard
      title="Sign In"
      emailPasswordAuth={<EmailPasswordSigninForm />}
      socialSignOn={<GoogleSignIn />}
      footer={
        <p className="text-sm text-gray-600">
          Do not have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      }
    />
  );
}
