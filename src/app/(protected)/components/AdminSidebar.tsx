import Link from "next/link";

const links = [
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

export function AdminSidebar() {
  return (
    <aside className="fixed h-[calc(100vh-2rem)] top-2 left-2  w-[17rem] min-w-[15rem] bg-white p-5 rounded-2xl shadow-sm border flex flex-col z-30">
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center py-2 px-3 rounded-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
          >
            {link.icon}
            <span className="group-hover:underline">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
