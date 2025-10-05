import { SidebarTrigger } from "@/components/ui/sidebar";
import { IoNotificationsOutline } from "react-icons/io5";

import { cn } from "../../../lib/utils";
import { UserMenu } from "./UserMenu";

export function Header({ isSidebarShown }: { isSidebarShown: boolean }) {
  return (
    <header
      className={cn(
        "flex flex-row items-center pl-2 pr-8 py-4",
        isSidebarShown ? "justify-between" : "justify-end"
      )}
    >
      {isSidebarShown && <SidebarTrigger />}

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full transition-colors">
          <IoNotificationsOutline className="h-6 w-6 text-blue-500" />
          {/* Notification badge can be added here */}
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
