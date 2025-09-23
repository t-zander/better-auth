import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <div>
      Successfully authenticated! <pre>{session?.user?.email}</pre>
      <p>User Role: {session?.user?.role}</p>
    </div>
  );
}
