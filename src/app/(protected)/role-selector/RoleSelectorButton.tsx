"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateUserRoleAction } from "./actions";

export function RoleSelectorButton({ role }: { role: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={pending}
      onClick={async () => {
        startTransition(async () => {
          const result = await updateUserRoleAction(role);
          if (result?.success) {
            toast.success(result.message);
          } else {
            toast.error(result?.message || "Failed to update role");
          }
        });
      }}
    >
      {pending ? <Spinner /> : "Select"}
    </Button>
  );
}
