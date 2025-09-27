import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function ProtectedPagesLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: Promise<{ sidebarCollapsed?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signin");
  }

  const isSidebarCollapsed = (await searchParams)?.sidebarCollapsed === "true";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex flex-1 h-full">
        <AdminSidebar role={session.user.role ?? ""} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-20" : "ml-72"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
