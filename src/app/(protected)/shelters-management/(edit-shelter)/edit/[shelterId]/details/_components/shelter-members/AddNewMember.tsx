"use client";

import { Button } from "@/components/ui/button";
import { IoPersonAddOutline } from "react-icons/io5";

export function AddNewMember() {
  return (
    <div className="p-4 border rounded-md border-dashed border-gray-300 dark:border-gray-600">
      <Button>
        <IoPersonAddOutline className="mr-2 h-4 w-4" />
        Add New Member
      </Button>
    </div>
  );
}
