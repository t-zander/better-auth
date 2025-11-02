"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoAdd, IoEye } from "react-icons/io5";
import { getBasePath } from "../_utils/urlUtils";

export function ShelterPets() {
  const { shelterId } = useParams<{ shelterId: string }>();
  const basePath = getBasePath(shelterId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          My pets
          <div className="flex space-x-1">
            <Button asChild variant="ghost" size="sm">
              <Link href={`${basePath}`}>
                <IoEye />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link href={`${basePath}/pets/add`}>
                <IoAdd />
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>You have 6 pets to adopt</p>
      </CardContent>
    </Card>
  );
}
