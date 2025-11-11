import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { Roles } from "@/lib/auth/permissions";
import { IoPersonAddOutline } from "react-icons/io5";
import { Actions } from "./Actions";

const roleToUserFriendlyName: Record<string, string> = {
  shelterOwner: "Shelter owner",
  shelterAdmin: "Shelter admin",
};
export type FullOrganization = NonNullable<
  Awaited<ReturnType<typeof auth.api.getFullOrganization>>
>;

export function ShelterMembersTable({
  members,
}: {
  members: FullOrganization["members"];
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <IoPersonAddOutline className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const roles = member.role.split(",");

            return (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.user.image ?? undefined} />
                      <AvatarFallback>
                        {member.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {roles.map((role) => (
                    <Badge variant="outline" key={role}>
                      {
                        roleToUserFriendlyName[
                          role as keyof typeof roleToUserFriendlyName
                        ]
                      }
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <Actions
                    canSendInvitation={!roles.includes(Roles.shelterOwner)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
