import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Role, Roles } from "@/lib/auth/permissions";
import { findUserRoleUpdateRequests } from "@/lib/db/user";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  IoAlarmOutline,
  IoCheckmark,
  IoCloseSharp,
  IoHeart,
  IoHome,
  IoImages,
  IoPaw,
  IoShield,
} from "react-icons/io5";
import { RoleSelectorButton } from "./RoleSelectorButton";

const roles = [
  {
    name: "Shelter Owner",
    description: "Manage shelters, staff, and have full administrative control",
    icon: IoHome,
    value: Roles.shelterOwner,
  },
  {
    name: "Pet Owner",
    description: "Register and manage your pets, track adoption applications",
    icon: IoPaw,
    value: Roles.petOwner,
  },
  {
    name: "Shelter Admin",
    description: "Assist in shelter management and administrative tasks",
    icon: IoShield,
    value: Roles.shelterAdmin,
  },
  {
    name: "Shelter Content Creator",
    description: "Manage pet profiles, photos, and shelter content",
    icon: IoImages,
    value: Roles.shelterContentCreator,
  },
  {
    name: "Volunteer",
    description: "Help with animal care, events, and shelter support",
    icon: IoHeart,
    value: Roles.volunteer,
  },
];

export default async function RoleSelectorPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userRolesRequests = await findUserRoleUpdateRequests({
    userId: session.user.id,
  });

  if (!session) {
    redirect("/signin");
  }

  const renderActionBasedOnRequestStatus = (
    requestForGivenRole: (typeof userRolesRequests)[0] | undefined,
    roleValue: Role
  ) => {
    if (!requestForGivenRole) {
      return <RoleSelectorButton role={roleValue} />;
    }

    if (requestForGivenRole.status === "pending") {
      return (
        <p className="text-yellow-500 flex gap-2">
          <IoAlarmOutline size={24} />
          <span>Request Pending Approval</span>
        </p>
      );
    }

    if (requestForGivenRole.status === "approved") {
      return (
        <p className="text-green-500 flex gap-2">
          <IoCheckmark size={24} />
          <span>Request Approved</span>
        </p>
      );
    }

    if (requestForGivenRole.status === "rejected") {
      return (
        <p className="text-red-500 flex gap-2">
          <IoCloseSharp size={24} />
          <span>Request Rejected. Contact Admin to Appeal.</span>
        </p>
      );
    }

    return <RoleSelectorButton role={roleValue} />;
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Choose Your Role
        </h1>
        <p className="text-gray-500 text-center">
          Select the role that best describes how you&apos;ll use our platform
        </p>
        <p className="text-gray-500 text-center">
          You can change this or select additional roles later in your profile
          settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const requestForGivenRole = userRolesRequests.find(
            (userRolesRequest) => role.value === userRolesRequest.role
          );

          return (
            <Card
              key={role.value}
              className={cn(
                !requestForGivenRole &&
                  "hover:shadow-lg hover:border-primary cursor-pointer transition-all duration-200 flex flex-col"
              )}
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="text-4xl mb-4">
                  {role.icon && <role.icon size={64} />}
                </div>
                <h2 className="text-xl font-semibold mb-2">{role.name}</h2>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-500 mb-6">{role.description}</p>
              </CardContent>

              <CardFooter>
                {renderActionBasedOnRequestStatus(
                  requestForGivenRole,
                  role.value
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
