import { ShelterDetails } from "./ShelterDetails";
import { ShelterNavigationBar } from "./ShelterNavigationBar";
import { ShelterPets } from "./ShelterPets";

export function ShelterSidebar() {
  return (
    <div className="space-y-6">
      <ShelterDetails />
      <ShelterPets />
      <ShelterNavigationBar />
    </div>
  );
}
