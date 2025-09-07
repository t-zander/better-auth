import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex flex-1 h-full">
        <AdminSidebar />
        <main className="flex-1 p-4 ml-72">{children}</main>
      </div>
    </div>
  );
}
