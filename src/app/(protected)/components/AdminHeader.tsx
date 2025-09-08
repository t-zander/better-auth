import { BellIcon } from "@heroicons/react/24/outline";
import { UserMenu } from "./UserMenu";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 ">
      <div />
      <div className="flex items-center gap-6">
        {/* <Link
          href="/profile"
          className="text-base font-semibold text-gray-700 hover:underline hover:text-blue-700 transition-colors"
        >
          Profile Settings
        </Link> */}
        <button className="relative p-2 rounded-full transition-colors">
          <BellIcon className="h-6 w-6 text-blue-500" />
          {/* Notification badge can be added here */}
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
