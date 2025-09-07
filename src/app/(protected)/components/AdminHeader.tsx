import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";

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
        <span className="inline-block w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl shadow ml-2">
          SA
        </span>
      </div>
    </header>
  );
}
