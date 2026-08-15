"use client";

import { useEffect } from "react";
import { trackListingEvent } from "../analytics";

export default function ListingViewTracker({ vehicleId }: { vehicleId: string }) {
  useEffect(() => {
    const key = `abf-viewed-${vehicleId}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    void trackListingEvent(vehicleId, "page_view");
  }, [vehicleId]);

  return null;
}
