"use client";

import { Button } from "@/components/ui/button";
import { IoBanOutline, IoMailOutline } from "react-icons/io5";

export function Actions({ canSendInvitation }: { canSendInvitation: boolean }) {
  return (
    <div className="flex items-center justify-end gap-2">
      {canSendInvitation && (
        <Button variant="ghost" size="icon">
          <IoMailOutline className="h-5 w-5" />
          <span className="sr-only">Send Invitation</span>
        </Button>
      )}
      <Button variant="ghost" size="icon">
        <IoBanOutline className="h-5 w-5 text-destructive" />
        <span className="sr-only">Deactivate Member</span>
      </Button>
    </div>
  );
}
