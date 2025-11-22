import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function Invites({ shelterId }: { shelterId: string }) {
  const data = await auth.api.listInvitations({
    headers: await headers(),
    query: {
      organizationId: shelterId,
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2}>No invites...</TableCell>
          </TableRow>
        ) : (
          data?.map((invite: { email: string; status: string; id: string }) => (
            <TableRow key={invite.id}>
              <TableCell>{invite.email}</TableCell>
              <TableCell>{invite.status}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
