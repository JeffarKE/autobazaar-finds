import { notFound, permanentRedirect } from "next/navigation";
import { getPublicVehicles } from "../../cars/services/getPublicVehicles";
import { mockVehicles } from "../../cars/mockVehicles";
import { getListingCode } from "../../cars/listingLinks";

export const dynamic = "force-dynamic";

export default async function ShortListingPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  if (!/^[a-f0-9]{8}$/i.test(code)) notFound();

  const vehicles = process.env.NODE_ENV === "development"
    ? mockVehicles
    : await getPublicVehicles();
  const matches = vehicles.filter((vehicle) => getListingCode(vehicle.id) === code.toUpperCase());

  if (matches.length !== 1) notFound();
  permanentRedirect(`/cars/${matches[0].id}`);
}
