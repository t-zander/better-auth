import { auth } from "@/lib/auth";
import { Role, Roles } from "@/lib/auth/permissions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getStartPageRedirectUrl } from "../utils";

export default async function SocialSignOnSuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.role && session.user.role in Roles) {
    redirect(getStartPageRedirectUrl(session.user.role as Role));
  } else {
    redirect("/signin");
  }
}
