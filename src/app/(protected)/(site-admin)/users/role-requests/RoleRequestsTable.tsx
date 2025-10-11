import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { findAllRoleRequests } from "@/lib/db/roleRequests";
import { Actions } from "./Actions";

function mapRoleToLabel(role: string) {
  switch (role) {
    case "shelterOwner":
      return "Shelter Owner";
    case "volunteer":
      return "Volunteer";
    default:
      return "Unknown Role";
  }
}

// TODO: Ability to approve or reject
export async function RoleRequestsTable() {
  const roleRequests = await findAllRoleRequests();

  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "pending":
      default:
        return "warning";
    }
  };

  return (
    <div>
      <div className="mb-6 py-1">
        <p className="text-base">
          Approve or reject user role requests submitted by users.
        </p>

        <p className="text-sm">
          For shelter owners, they should be approved only for the first time.
          After that they can start creating shelters.
        </p>
      </div>

      <Table className="bg-white rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roleRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user.name}</TableCell>
              <TableCell>{request.user.email}</TableCell>
              <TableCell>{mapRoleToLabel(request.role)}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeProps(request.status)}>
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="w-[200px]">
                <Actions
                  requestStatus={request.status}
                  requestId={request.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
