"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoNotificationsOutline } from "react-icons/io5";

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative p-2 rounded-full transition-colors"
          variant="ghost"
        >
          <IoNotificationsOutline className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-100">
        <h2>Notifications</h2>
        <p>No new notifications</p>
      </PopoverContent>
    </Popover>
  );
}
