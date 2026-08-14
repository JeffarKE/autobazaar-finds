"use client";

import { useEffect, useState } from "react";

import Description from "./components/Description";
import LivePreview from "./components/LivePreview";
import Pricing from "./components/Pricing";
import PublishBar from "./components/PublishBar";
import SellerInformation from "./components/SellerInformation";
import UploadPhotos from "./components/UploadPhotos";
import VehicleInformation from "./components/VehicleInformation";
import VehicleSpecifications from "./components/VehicleSpecifications";

import { publishVehicle } from "./services/publishVehicle";
import { updateVehicle } from "./services/updateVehicle";

import { emptyVehicle, Vehicle } from "@/lib/vehicle";
import { supabase } from "@/lib/supabase";

const DRAFT_KEY = "autobazaar-admin-listing-draft";

type VehicleRow = Partial<Record<keyof Vehicle, unknown>> & {
  id: string | number;
};

type VehicleImageRow = {
  image_url: string | null;
  storage_path: string | null;
  is_cover: boolean | null;
  display_order: number | null;
};

function getInitialVehicle(): Vehicle {
  if (typeof window === "undefined") {
    return emptyVehicle;
  }

  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);

    if (!stored) {
      return emptyVehicle;
    }

    const saved = JSON.parse(stored) as Partial<Vehicle>;

    return {
      ...emptyVehicle,
      ...saved,
      images: Array.isArray(saved.images) ? saved.images : [],
    };
  } catch {
    return emptyVehicle;
  }
}

function serializableDraft(vehicle: Vehicle): Vehicle {
  return {
    ...vehicle,

    // Browser File objects and blob URLs cannot survive a page reload.
    images: vehicle.images
      .filter((image) => Boolean(image.storagePath))
      .map(({ publicUrl, storagePath, isCover }) => ({
        publicUrl,
        storagePath,
        isCover,
      })),
  };
}

function stringValue(value: unknown): string {
  return value === null || value === undefined ? "" : String(value);
}

export default function ListingPage() {
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notice, setNotice] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializePage() {
      const params = new URLSearchParams(window.location.search);
      const editId = params.get("edit");

      /*
       * No ?edit=... means this is a new listing.
       */
      if (!editId) {
        setVehicle(getInitialVehicle());
        return;
      }

      setEditVehicleId(editId);
      setIsLoadingEdit(true);
      setNotice("Loading vehicle...");

      try {
        /*
         * Load vehicle itself.
         */
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", editId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error("Vehicle could not be found.");
        }

        const vehicleRow = data as VehicleRow;

        /*
         * Load all photos belonging to this vehicle.
         *
         * They are already ordered by display_order so the order
         * stored in Supabase is preserved.
         */
        const { data: imageData, error: imageError } = await supabase
          .from("vehicle_images")
          .select(
            "image_url, storage_path, is_cover, display_order"
          )
          .eq("vehicle_id", editId)
          .order("display_order", { ascending: true });

        if (imageError) {
          throw new Error(imageError.message);
        }

        const imageRows =
          (imageData as VehicleImageRow[] | null) ?? [];

        /*
         * ---------------------------------------------------------
         * IMPORTANT IMAGE/COVER NORMALIZATION
         * ---------------------------------------------------------
         *
         * Supabase should contain only one is_cover = true.
         *
         * However, if an older listing already has:
         *
         * photo 1 -> is_cover = true
         * photo 2 -> is_cover = true
         *
         * we don't want both photos to appear as covers in the editor.
         *
         * We therefore:
         *
         * 1. Find the FIRST database image marked as cover.
         * 2. If none exists, use the first image.
         * 3. Force every other image to isCover = false.
         *
         * The updateVehicle service will perform the same
         * normalization when Save Changes is clicked.
         * ---------------------------------------------------------
         */

        const validImages = imageRows.filter(
          (image) => Boolean(image.image_url)
        );

        const storedPaths = validImages
          .map((image) => image.storage_path)
          .filter((path): path is string => Boolean(path));

        const signedImageUrls = new Map<string, string>();

        if (storedPaths.length > 0) {
          const { data: signedData, error: signedError } =
            await supabase.storage
              .from("vehicle-images")
              .createSignedUrls(storedPaths, 3600);

          if (signedError) {
            throw new Error(signedError.message);
          }

          (signedData ?? []).forEach((item) => {
            if (item.path && item.signedUrl) {
              signedImageUrls.set(item.path, item.signedUrl);
            }
          });
        }

        const databaseCoverIndex = validImages.findIndex(
          (image) => image.is_cover === true
        );

        const coverIndex =
          databaseCoverIndex >= 0
            ? databaseCoverIndex
            : validImages.length > 0
              ? 0
              : -1;

        const normalizedImages = validImages.map(
          (image, index) => ({
            publicUrl:
              (image.storage_path
                ? signedImageUrls.get(image.storage_path)
                : undefined) ?? (image.image_url as string),
            storagePath: image.storage_path ?? "",

            /*
             * Exactly ONE image can be true.
             */
            isCover: index === coverIndex,
          })
        );

        /*
         * Build the complete vehicle object.
         */
        const loadedVehicle: Vehicle = {
          ...emptyVehicle,

          make: stringValue(vehicleRow.make),
          model: stringValue(vehicleRow.model),
          year: stringValue(vehicleRow.year),

          registrationNumber: stringValue(
            vehicleRow.registrationNumber
          ),

          vin: stringValue(vehicleRow.vin),

          bodyType: stringValue(vehicleRow.bodyType),
          transmission: stringValue(vehicleRow.transmission),
          fuelType: stringValue(vehicleRow.fuelType),
          driveType: stringValue(vehicleRow.driveType),
          engineSize: stringValue(vehicleRow.engineSize),
          mileage: stringValue(vehicleRow.mileage),

          exteriorColor: stringValue(
            vehicleRow.exteriorColor
          ),

          interiorColor: stringValue(
            vehicleRow.interiorColor
          ),

          condition: stringValue(vehicleRow.condition),
          seats: stringValue(vehicleRow.seats),
          doors: stringValue(vehicleRow.doors),
          horsepower: stringValue(vehicleRow.horsepower),
          torque: stringValue(vehicleRow.torque),
          groundClearance: stringValue(
            vehicleRow.groundClearance
          ),

          price: stringValue(vehicleRow.price),
          location: stringValue(vehicleRow.location),

          status:
            vehicleRow.status === "Live" ||
            vehicleRow.status === "Reserved" ||
            vehicleRow.status === "Sold" ||
            vehicleRow.status === "Archived"
              ? vehicleRow.status
              : "Draft",

          negotiable: Boolean(vehicleRow.negotiable),
          featured: Boolean(vehicleRow.featured),
          verified: Boolean(vehicleRow.verified),
          publishImmediately: Boolean(
            vehicleRow.publishImmediately
          ),

          description: stringValue(vehicleRow.description),

          sellerName: stringValue(vehicleRow.sellerName),
          phone: stringValue(vehicleRow.phone),
          email: stringValue(vehicleRow.email),
          preferredContact: stringValue(
            vehicleRow.preferredContact
          ),
          bestTime: stringValue(vehicleRow.bestTime),

          /*
           * Use the normalized image array here.
           */
          images: normalizedImages,
        };

        if (!cancelled) {
          setVehicle(loadedVehicle);
          setNotice("Vehicle loaded for editing.");
        }
      } catch (error) {
        if (!cancelled) {
          setVehicle(emptyVehicle);

          setNotice(
            error instanceof Error
              ? error.message
              : "Unable to load this vehicle."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingEdit(false);
        }
      }
    }

    initializePage();

    return () => {
      cancelled = true;
    };
  }, []);

  function saveDraft() {
    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify(serializableDraft(vehicle))
    );

    setNotice(
      "Draft saved on this device. Local photos must be selected again after a refresh."
    );
  }

  function previewListing() {
    document
      .getElementById("listing-live-preview")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function clearListing() {
    if (
      !window.confirm(
        "Clear every field and selected local photo from this listing?"
      )
    ) {
      return;
    }

    vehicle.images.forEach((image) => {
      if (
        image.file &&
        image.publicUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(image.publicUrl);
      }
    });

    window.localStorage.removeItem(DRAFT_KEY);

    setVehicle(emptyVehicle);
    setNotice("Listing cleared.");
  }

  async function publishListing() {
    setIsPublishing(true);
    setNotice("");

    try {
      /*
       * EDIT EXISTING VEHICLE
       */
      if (editVehicleId) {
        await updateVehicle(editVehicleId, vehicle);

        window.localStorage.removeItem(DRAFT_KEY);

        setNotice(
          "Vehicle updated successfully. The changes have been saved to Supabase."
        );
      }

      /*
       * CREATE NEW VEHICLE
       */
      else {
        await publishVehicle(vehicle);

        window.localStorage.removeItem(DRAFT_KEY);

        setNotice(
          "Vehicle published successfully. You can now add another listing or view it in Supabase."
        );
      }
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : editVehicleId
            ? "Saving changes failed. Please try again."
            : "Publishing failed. Please try again."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  const pageTitle = editVehicleId
    ? "Edit Vehicle Listing"
    : "Create Vehicle Listing";

  const pageDescription = editVehicleId
    ? "Update the vehicle information below. Your existing photos and listing details have been loaded from Supabase."
    : "Add a new vehicle to your inventory. Complete the information below and publish when you are ready.";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {pageTitle}
          </h1>

          <p className="mt-2 text-gray-500">
            {pageDescription}
          </p>

          {notice && (
            <p
              className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
              role="status"
            >
              {notice}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {editVehicleId && isLoadingEdit ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">
              Loading vehicle...
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Getting the listing details and photos from Supabase.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
            {/* Listing Form */}
            <form
              className="space-y-8"
              onSubmit={(event) =>
                event.preventDefault()
              }
            >
              <UploadPhotos
                vehicle={vehicle}
                setVehicleAction={setVehicle}
              />

              <VehicleInformation
                vehicle={vehicle}
                setVehicle={setVehicle}
              />

              <VehicleSpecifications
                vehicle={vehicle}
                setVehicle={setVehicle}
              />

              <Pricing
                vehicle={vehicle}
                setVehicleAction={setVehicle}
              />

              <Description
                vehicle={vehicle}
                setVehicle={setVehicle}
              />

              <SellerInformation
                vehicle={vehicle}
                setVehicle={setVehicle}
              />
            </form>

            {/* Sidebar */}
            <aside
              id="listing-live-preview"
              className="space-y-6"
            >
              <PublishBar
                isEditing={Boolean(editVehicleId)}
                isPublishing={isPublishing}
                onSaveDraftAction={saveDraft}
                onPreviewAction={previewListing}
                onPublishAction={publishListing}
                onDeleteAction={clearListing}
              />

              <LivePreview vehicle={vehicle} />
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
