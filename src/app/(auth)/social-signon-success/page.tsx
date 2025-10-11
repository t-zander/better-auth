import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSignUpRedirectUrl } from "../utils";

export default async function SocialSignOnSuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && typeof session.user.role === "string") {
    // TODO: later we will redirect based on user role and permissions
    // For now, we just redirect to dashboard
    redirect(getSignUpRedirectUrl(session.user.role));
  } else {
    redirect("/signin");
  }
}
