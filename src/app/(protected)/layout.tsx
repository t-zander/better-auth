import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AdminHeader } from "./components/Header";
import { ProtectedPagesSidebar } from "./components/Sidebar";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signin");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ProtectedPagesSidebar role={session.user.role ?? ""} />
      <main className="flex flex-1 flex-col h-full">
        <AdminHeader />
        <div className="flex-1 h-full px-6 py-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
