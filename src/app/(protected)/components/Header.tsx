import { SidebarTrigger } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";

export async function Header({ isSidebarShown }: { isSidebarShown: boolean }) {
  return (
    <header
      className={cn(
        "flex flex-row items-center pl-2 pr-8 py-4",
        isSidebarShown ? "justify-between" : "justify-end"
      )}
    >
      {isSidebarShown && <SidebarTrigger />}

      <div className="flex items-center gap-6">
        <Notifications />
        <UserMenu />
      </div>
    </header>
  );
}
