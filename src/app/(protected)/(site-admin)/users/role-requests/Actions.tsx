"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { startTransition, useActionState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Spinner } from "../../../../../components/ui/spinner";
import { updateRequestStatus } from "../actions";

export function Actions({
  requestStatus,
  requestId,
}: {
  requestStatus: string;
  requestId: string;
}) {
  const [state, updateRoleRequestStatus, isPending] = useActionState(
    updateRequestStatus,
    null
  );

  if (requestStatus !== "pending") {
    return null;
  }

  const handleApprove = () => {
    startTransition(async () => {
      await updateRoleRequestStatus({
        id: requestId,
        status: "approved",
      });
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await updateRoleRequestStatus({
        id: requestId,
        status: "rejected",
      });
    });
  };

  return (
    <ButtonGroup>
      <Button
        size="sm"
        variant="outline"
        onClick={handleApprove}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : <IoCheckmark className="mr-1" />}
        Approve
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleReject}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : <IoClose className="mr-1" />}
        Reject
      </Button>
    </ButtonGroup>
  );
}
