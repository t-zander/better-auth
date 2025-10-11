"use client";

import { Tabs } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function UsersTabs({
  currentTab,
  children,
}: {
  currentTab: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <Tabs
      defaultValue={currentTab ?? "allUsers"}
      onValueChange={(e) => {
        console.log("Tab changed", e);
        router.push(`/users?currentTab=${e}`);
      }}
    >
      {children}
    </Tabs>
  );
}
