import { Roles } from "@/lib/auth/permissions";
import { getUserShelters } from "../dataFetchers";
import { SheltersList } from "./SheltersList";

export async function AdministratingShelters() {
  const data = await getUserShelters(Roles.shelterAdmin);

  if (!data.success) {
    return <div>Error loading shelters: {data.error}</div>;
  }

  return <SheltersList shelters={data.shelters} />;
}
