import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { IoHeart, IoHome, IoImages, IoPaw, IoShield } from "react-icons/io5";

const roles = [
  {
    name: "Shelter Owner",
    description: "Manage shelters, staff, and have full administrative control",
    icon: IoHome,
    value: "shelterOwner",
  },
  {
    name: "Pet Owner",
    description: "Register and manage your pets, track adoption applications",
    icon: IoPaw,
    value: "petOwner",
  },
  {
    name: "Shelter Admin",
    description: "Assist in shelter management and administrative tasks",
    icon: IoShield,
    value: "shelterAdmin",
  },
  {
    name: "Shelter Content Creator",
    description: "Manage pet profiles, photos, and shelter content",
    icon: IoImages,
    value: "shelterContentCreator",
  },
  {
    name: "Volunteer",
    description: "Help with animal care, events, and shelter support",
    icon: IoHeart,
    value: "volunteer",
  },
];

export default async function RoleSelectorPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  async function updateUserRole(roleValue: string) {
    "use server";
    // Here you would update the user's role in the database
    console.log(`Updating role to: ${roleValue}`);
  }

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
        {roles.map((role) => (
          <Card
            key={role.value}
            className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-4">
                {role.icon && <role.icon size={64} />}
              </div>
              <h2 className="text-xl font-semibold mb-2">{role.name}</h2>
              <p className="text-gray-500 mb-6">{role.description}</p>
              <form action={updateUserRole.bind(null, role.value)}>
                <Button type="submit" variant="default" className="w-full">
                  Select
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
