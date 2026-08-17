import { getPublicVehicleById } from "@/app/cars/services/getPublicVehicles";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  const { id, index: rawIndex } = await params;
  const index = Number(rawIndex);

  if (
    !UUID_PATTERN.test(id) ||
    !Number.isInteger(index) ||
    index < 0 ||
    index > 50
  ) {
    return new Response("Image not found", { status: 404 });
  }

  const vehicle = await getPublicVehicleById(id);
  const source = vehicle?.images[index];

  if (!source) {
    return new Response("Image not found", { status: 404 });
  }

  const destination = new URL(source, request.url);
  if (destination.protocol !== "https:" && destination.protocol !== "http:") {
    return new Response("Image not found", { status: 404 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: destination.toString(),
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
