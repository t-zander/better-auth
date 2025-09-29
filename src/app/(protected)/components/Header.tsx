import { SidebarTrigger } from "@/components/ui/sidebar";
import { IoNotificationsOutline } from "react-icons/io5";

import { UserMenu } from "./UserMenu";

export function AdminHeader() {
  return (
    <header className="flex flex-row justify-between items-center pl-2 pr-8 py-4">
      <SidebarTrigger />

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
