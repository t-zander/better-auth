"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getBasePath } from "../_utils/urlUtils";

const navLinks = [
  {
    href: `/messages`,
    label: "Messages",
    description: "See new messages",
  },
  {
    href: `/requests`,
    label: "Requests",
    description: "See new requests and requests history",
  },
  {
    href: `/account`,
    label: "Account",
    description: "Update your profile & account settings",
  },
  {
    href: `/reviews`,
    label: "Reviews",
    description: "See reviews about your shelter",
  },
];

export function ShelterNavigationBar() {
  const pathname = usePathname();
  const { shelterId } = useParams<{ shelterId: string }>();
  const basePath = getBasePath(shelterId);

  return (
    <Card>
      <CardContent className="p-2">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={`${basePath}${link.href}`}
              className={cn(
                "block rounded-md p-3",
                pathname.startsWith(`${basePath}${link.href}`)
                  ? "bg-muted"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="text-lg font-semibold">{link.label}</div>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
