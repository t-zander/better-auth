"use client";

import {
  ShelterDetailsForm,
  ShelterDetailsFormValues,
} from "./ShelterDetailsForm";

export function ShelterDetails({
  shelterDetails,
}: {
  shelterDetails: ShelterDetailsFormValues;
}) {
  return (
    <ShelterDetailsForm
      initialValues={shelterDetails}
      isSubmitting={false}
      onSubmit={() => {}}
    />
  );
}
