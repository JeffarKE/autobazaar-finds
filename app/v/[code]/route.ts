import { getPublicVehicles } from "../../cars/services/getPublicVehicles";
import { mockVehicles } from "../../cars/mockVehicles";
import { getListingCode } from "../../cars/listingLinks";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!/^[a-f0-9]{8}$/i.test(code)) {
    return new Response("Listing not found", { status: 404 });
  }

  const vehicles = process.env.NODE_ENV === "development"
    ? mockVehicles
    : await getPublicVehicles();
  const matches = vehicles.filter(
    (vehicle) => getListingCode(vehicle.id) === code.toUpperCase()
  );

  if (matches.length !== 1) {
    return new Response("Listing not found", { status: 404 });
  }

  return Response.redirect(
    new URL(`/cars/${matches[0].id}`, request.url),
    308
  );
}
