import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { UserActionsCell } from "./UserActionsCell";

// Mock data - will be replaced with real API data later
export const mockUsers = [
  {
    id: "1",
    email: "john.doe@example.com",
    roles: ["shelter_admin"],
    permissions: ["manage_animals", "view_adoption_requests"],
    shelters: [{ name: "Happy Paws Shelter", slug: "happy-paws-shelter" }],
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    roles: ["shelter_owner"],
    permissions: [
      "manage_animals",
      "approve_adoptions",
      "manage_shelter_admins",
    ],
    shelters: [{ name: "City Animal Rescue", slug: "city-animal-rescue" }],
  },
  {
    id: "3",
    email: "bob.wilson@example.com",
    roles: ["user"],
    permissions: [],
    shelters: [],
  },
  {
    id: "4",
    email: "alice.johnson@example.com",
    roles: ["shelter_admin", "moderator"],
    permissions: ["manage_animals", "moderate_content"],
    shelters: [
      { name: "Rescue Friends", slug: "rescue-friends" },
      { name: "Pet Haven", slug: "pet-haven" },
    ],
  },
  {
    id: "5",
    email: "mike.davis@example.com",
    roles: ["user"],
    permissions: [],
    shelters: [],
  },
];

export function AllUsersTable({ users }: { users: typeof mockUsers }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm">
          Manage all users, their roles, permissions, and shelter associations.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Email</TableHead>
              <TableHead>User Roles</TableHead>
              <TableHead>User Permissions</TableHead>
              <TableHead>Shelters</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {user.permissions.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 2).map((permission) => (
                          <Badge key={permission} variant="outline">
                            {permission.replace("_", " ")}
                          </Badge>
                        ))}
                        {user.permissions.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="text-muted-foreground"
                          >
                            +{user.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No permissions
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {user.shelters.length > 0 ? (
                      user.shelters.map((shelter) => (
                        <Link
                          key={shelter.slug}
                          href={`/shelters?shelterSlug=${shelter.slug}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm w-fit"
                        >
                          {shelter.name}
                        </Link>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No shelters
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <UserActionsCell userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
