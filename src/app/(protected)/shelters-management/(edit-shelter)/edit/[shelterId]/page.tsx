export default async function EditShelterPage({
  params,
}: {
  params: Promise<{ shelterId: string }>;
}) {
  const { shelterId } = await params;

  return <div>Edit Shelter Page: {shelterId}</div>;
}
