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

export function getWhatsAppListingMessage(vehicle: Vehicle, siteUrl: string) {
  const price = new Intl.NumberFormat("en-KE").format(vehicle.price);
  const reference = `ABF-${getListingCode(vehicle.id)}`;

  return [
    "Hi Auto Bazaar Finds, I'd like to arrange a viewing for this car:",
    "",
    `*${vehicle.title}*`,
    `Price: KSh ${price}`,
    `Location: ${vehicle.location}`,
    `Ref: ${reference}`,
    "",
    getShortListingUrl(vehicle.id, siteUrl),
    "",
    "I'm interested in this car and would like to arrange a viewing. Kindly get back to me so we can confirm the time and location.",
  ].join("\n");
}
