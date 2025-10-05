"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { IoLogOut, IoPerson } from "react-icons/io5";

export const UserMenu = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full h-8 w-8">
          <Avatar className="h-8 w-8">
            {session?.user?.image && (
              <AvatarImage src={session?.user?.image} alt="User avatar" />
            )}
            <AvatarFallback>
              {(
                session?.user?.name?.slice(0, 1) ??
                session?.user?.email?.slice(0, 1) ??
                "AU"
              ).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={async () => {
            // TODO
          }}
        >
          <IoPerson />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/");
                },
              },
            });
          }}
        >
          <IoLogOut />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
