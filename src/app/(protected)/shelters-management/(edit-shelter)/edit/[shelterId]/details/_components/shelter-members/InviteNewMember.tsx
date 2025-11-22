"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/client";
import { useParams } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import { toast } from "sonner";
import { FormValues, InviteNewMemberDialog } from "./InviteNewMemberDialog";

export function InviteNewMember() {
  const { shelterId } = useParams<{ shelterId: string }>();
  const canInviteNewMembers = authClient.organization.checkRolePermission({
    permissions: {
      invitation: ["create"],
    },
    role: "shelterOwner",
  });

  async function onSubmit({ email, role }: FormValues) {
    try {
      const result = await authClient.organization.inviteMember({
        email,
        role,
        organizationId: shelterId,
        resend: true,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("Invite sent successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send invite");
      } else {
        toast.error("Failed to send invite");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {canInviteNewMembers && (
          <Button>
            <IoPersonAddOutline className="mr-2 h-4 w-4" />
            Invite new member
          </Button>
        )}
      </DialogTrigger>
      <InviteNewMemberDialog onSubmit={onSubmit} />
    </Dialog>
  );
}
