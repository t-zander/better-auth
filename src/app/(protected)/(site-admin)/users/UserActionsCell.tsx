"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoBan, IoPerson, IoRemove } from "react-icons/io5";

interface UserActionsCellProps {
  userId: string;
}

export function UserActionsCell({ userId }: UserActionsCellProps) {
  const handleBanUser = () => {
    // TODO: Implement ban user functionality
    console.log(`Ban user ${userId}`);
  };

  const handleDeactivateUser = () => {
    // TODO: Implement deactivate user functionality
    console.log(`Deactivate user ${userId}`);
  };

  const handleImpersonateUser = () => {
    // TODO: Implement impersonate user functionality
    console.log(`Impersonate user ${userId}`);
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBanUser}
              className="h-8 w-8 p-0"
            >
              <IoBan className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ban User</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeactivateUser}
              className="h-8 w-8 p-0"
            >
              <IoRemove className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate User</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImpersonateUser}
              className="h-8 w-8 p-0"
            >
              <IoPerson className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Impersonate User</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
