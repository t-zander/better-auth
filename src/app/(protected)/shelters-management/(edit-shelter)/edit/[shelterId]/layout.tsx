import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { ShelterSidebar } from "./_components/ShelterSidebar";

export default async function ShelterEditLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ shelterId: string }>;
}) {
  const { shelterId } = await params;

  const { success: canEdit } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      organizationId: shelterId,
      permissions: {
        shelter: ["update"], // This must match the structure in your access control
      },
    },
  });

  if (!canEdit) {
    return <div>You do not have permission to edit this shelter.</div>;
  }

  return (
    <div className="flex gap-10">
      <aside className="w-[320px] flex-shrink-0">
        <ShelterSidebar shelterId={shelterId} />
      </aside>
      <main className="flex-grow overflow-y-auto h-[calc(100vh-7rem)]">
        {children}
      </main>
    </div>
  );
}
