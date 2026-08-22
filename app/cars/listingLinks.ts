import type { Vehicle } from "./types";

export function getListingCode(vehicleId: string) {
  return vehicleId.replaceAll("-", "").slice(0, 8).toUpperCase();
}

export function getShortListingPath(vehicleId: string) {
  return `/v/${getListingCode(vehicleId)}`;
}

export function getShortListingUrl(vehicleId: string, siteUrl: string) {
  return `${siteUrl.replace(/\/$/, "")}${getShortListingPath(vehicleId)}`;
}

export type ListingEnquiryIntent = "availability" | "viewing";

export function getWhatsAppListingMessage(
  vehicle: Vehicle,
  siteUrl: string,
  intent: ListingEnquiryIntent = "viewing"
) {
  const reference = `ABF-${getListingCode(vehicle.id)}`;
  const opening = intent === "availability"
    ? `Hello, is the ${vehicle.title} still available?`
    : `Hello, I would like to arrange a viewing for the ${vehicle.title}.`;

  return [
    opening,
    "",
    `Ref: ${reference}`,
    getShortListingUrl(vehicle.id, siteUrl),
  ].join("\n");
}
