"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoCreateOutline, IoLocationOutline, IoPeople } from "react-icons/io5";
import { getBasePath } from "../_utils/urlUtils";

export function ShelterDetails({
  name,
  shelterOwnersAmount,
  shelterAdminsAmount,
}: {
  name: string;
  shelterOwnersAmount: number;
  shelterAdminsAmount: number;
}) {
  const { shelterId } = useParams<{ shelterId: string }>();
  const basePath = getBasePath(shelterId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Shelter details
          </CardTitle>
          <Link href={`${basePath}/details`}>
            <IoCreateOutline className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="Shelter" />
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <IoLocationOutline />
            <span>Brussels, Belgium</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <IoPeople />
            <span>{shelterOwnersAmount} owner(s)</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <IoPeople />
            <span>{shelterAdminsAmount} admin(s)</span>
          </div>
          <Badge className="mt-1 w-fit bg-green-100 text-green-800">
            Active shelter
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
