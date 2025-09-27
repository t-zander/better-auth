"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  IoMenuOutline,
  IoPawSharp,
  IoPerson,
  IoStatsChart,
} from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const shelterAdminLinks = [
  {
    href: "/add-animal",
    label: "Add animal profile",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5-2 4-2 4 2 4 2" />
      </svg>
    ),
  },
  {
    href: "/add-shelter",
    label: "Add shelter",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V9h6v12" />
      </svg>
    ),
  },
  {
    href: "/create-event",
    label: "Create an event",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    href: "/add-payment-methods",
    label: "Add payment methods",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 11h.01" />
      </svg>
    ),
  },
];

const siteAdminLinks = [
  {
    href: "/statistics",
    label: "View statistics",
    icon: <IoStatsChart className="w-5 h-5 mr-2 text-blue-500" />,
  },
  {
    href: "/users",
    label: "Users",
    icon: <IoPerson className="w-5 h-5 mr-2 text-blue-500" />,
  },
  {
    href: "/shelters",
    label: "Shelters",
    icon: <IoPawSharp className="w-5 h-5 mr-2 text-blue-500" />,
  },
];

export function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCollapsed = searchParams?.get("sidebarCollapsed") === "true";

  const createToggleUrl = () => {
    const params = new URLSearchParams(searchParams);
    if (isCollapsed) {
      params.delete("sidebarCollapsed");
    } else {
      params.set("sidebarCollapsed", "true");
    }
    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ""}`;
  };

  const getLinksBasedOnRole = (role: string) => {
    if (role === "admin") {
      return siteAdminLinks;
    }

    return [];
  };

  return (
    <aside
      className={`fixed h-[calc(100vh-1rem)] top-2 left-2 bg-white p-5 rounded-2xl shadow-sm border flex flex-col z-30 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-[17rem]"
      } min-w-[5rem]`}
    >
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && <div className="flex-1" />}
        <Link
          href={createToggleUrl()}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <IoMenuOutline className="w-5 h-5" />
        </Link>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {getLinksBasedOnRole(role).map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className="flex items-center py-2 px-3 rounded-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-500 transition-colors group"
                title={isCollapsed ? link.label : undefined}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {link.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-2 transition-none">{link.label}</span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
}
