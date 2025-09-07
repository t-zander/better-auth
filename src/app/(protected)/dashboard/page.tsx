import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      Successfully authenticated! <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
