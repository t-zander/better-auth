import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const shouldShowSidebar = (roles: string[]) => {
  if (roles.length === 1 && roles[0] === "user") {
    return false;
  }

  return true;
};

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.role) {
    redirect("/signin");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const isSidebarShown = shouldShowSidebar(session.user.role.split(","));

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {isSidebarShown && <Sidebar role={session.user.role} />}
      <main className="flex flex-1 flex-col h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Header isSidebarShown={isSidebarShown} />
        </Suspense>
        <div className="flex-1 h-full px-6 py-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
