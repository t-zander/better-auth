import {
  Sidebar as SCSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IoHome, IoPawSharp, IoPerson, IoStatsChart } from "react-icons/io5";
import { Roles } from "../../../lib/auth/permissions";

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

const sheltersLink = {
  href: "/shelters-management",
  label: "Shelters",
  icon: IoHome,
};

const adminLinks = [
  {
    href: "/statistics",
    label: "View statistics",
    icon: IoStatsChart,
  },
  {
    href: "/users",
    label: "Users",
    icon: IoPerson,
  },
  sheltersLink,
];

const animalsLink = {
  href: "/animals",
  label: "Animals",
  icon: IoPawSharp,
};

export function Sidebar({ role }: { role: string }) {
  const getLinksBasedOnRole = (role: string) => {
    const roles = role.split(",");

    const links = [];

    if (roles.includes(Roles.admin)) {
      links.push(...adminLinks);
    }

    if (roles.includes(Roles.shelterOwner)) {
      links.push(sheltersLink);
    }

    return links;
  };

  const navItems = getLinksBasedOnRole(role);

  return (
    <SCSidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {navItems.map((navItem) => (
            <SidebarMenuItem key={navItem.label}>
              <SidebarMenuButton asChild>
                <Link href={navItem.href}>
                  <navItem.icon className="text-blue-400" />
                  <span>{navItem.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </SCSidebar>
  );
}
