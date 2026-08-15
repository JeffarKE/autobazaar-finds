"use client";

import { supabase } from "@/lib/supabase";

export type ListingEvent = "page_view" | "whatsapp_click" | "share";

export async function trackListingEvent(vehicleId: string, eventType: ListingEvent) {
  if (vehicleId.startsWith("1000000")) return;

  const { error } = await supabase.rpc("track_vehicle_event", {
    p_vehicle_id: vehicleId,
    p_event_type: eventType,
  });

  if (error && process.env.NODE_ENV === "development") {
    console.warn("Listing analytics event was not recorded:", error.message);
  }
}
