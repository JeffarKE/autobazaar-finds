"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart3, ChevronDown, Eye, Loader2, MessageCircle, Send, Share2, Sparkles } from "lucide-react";

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

type ListingAnalytics = {
  totalViews: number;
  views7d: number;
  whatsappClicks: number;
  shares: number;
};

const emptyAnalytics: ListingAnalytics = { totalViews: 0, views7d: 0, whatsappClicks: 0, shares: 0 };

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
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notice, setNotice] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<ListingAnalytics>(emptyAnalytics);

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

        const { data: analyticsData } = await supabase
          .from("vehicle_analytics_summary")
          .select("total_views, views_7d, whatsapp_clicks, shares")
          .eq("vehicle_id", editId)
          .maybeSingle();

        if (!cancelled && analyticsData) {
          setAnalytics({
            totalViews: Number(analyticsData.total_views) || 0,
            views7d: Number(analyticsData.views_7d) || 0,
            whatsappClicks: Number(analyticsData.whatsapp_clicks) || 0,
            shares: Number(analyticsData.shares) || 0,
          });
        }

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
        router.push("/admin/inventory");
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

  const essentials = [
    vehicle.images.length > 0,
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.mileage,
    vehicle.price,
    vehicle.location,
    vehicle.bodyType,
    vehicle.fuelType,
    vehicle.transmission,
    vehicle.driveType,
    vehicle.engineSize,
    vehicle.description,
  ];
  const completedEssentials = essentials.filter(Boolean).length;
  const completion = Math.round((completedEssentials / essentials.length) * 100);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/admin/inventory" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-white transition hover:bg-gray-50" aria-label="Back to inventory">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-600">Quick listing</p>
              <h1 className="truncate text-xl font-black tracking-tight text-gray-950 sm:text-2xl">{pageTitle}</h1>
            </div>
          </div>
          <div className="hidden min-w-48 sm:block">
            <div className="flex justify-between text-xs font-semibold text-gray-500"><span>Ready to publish</span><span>{completion}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${completion}%` }} /></div>
          </div>

          {notice && (
            <p
              className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-gray-800 bg-gray-950 px-5 py-4 text-sm text-white shadow-2xl"
              role="status"
            >
              {notice}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 sm:py-8">
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
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
            <form
              className="space-y-5"
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

              <Pricing
                vehicle={vehicle}
                setVehicleAction={setVehicle}
              />

              <Description
                vehicle={vehicle}
                setVehicle={setVehicle}
              />

              <details open className="group overflow-hidden rounded-3xl border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8">
                  <div><p className="font-bold text-gray-950">More vehicle details</p><p className="mt-1 text-sm text-gray-500">Body, transmission, fuel, drivetrain and optional specifications</p></div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
                </summary>
                <div className="border-t"><VehicleSpecifications vehicle={vehicle} setVehicle={setVehicle} /></div>
              </details>

              <details className="group overflow-hidden rounded-3xl border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8">
                  <div><p className="font-bold text-gray-950">Owner or showroom record</p><p className="mt-1 text-sm text-gray-500">Optional internal details. Buyers always contact Auto Bazaar Finds.</p></div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
                </summary>
                <div className="border-t"><SellerInformation vehicle={vehicle} setVehicle={setVehicle} /></div>
              </details>
            </form>

            <aside
              id="listing-live-preview"
              className="space-y-5 xl:sticky xl:top-28 xl:self-start"
            >
              {editVehicleId && (
                <section className="rounded-3xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-green-600" /><h2 className="font-black text-gray-950">Listing performance</h2></div>
                  <p className="mt-1 text-sm text-gray-500">How buyers are responding to this car.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <AnalyticsMetric icon={Eye} label="Total views" value={analytics.totalViews} />
                    <AnalyticsMetric icon={Eye} label="Last 7 days" value={analytics.views7d} />
                    <AnalyticsMetric icon={MessageCircle} label="WhatsApp" value={analytics.whatsappClicks} />
                    <AnalyticsMetric icon={Share2} label="Shares" value={analytics.shares} />
                  </div>
                  {analytics.totalViews > 0 && (
                    <p className="mt-4 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-800">
                      {analytics.whatsappClicks > 0
                        ? `${Math.round((analytics.whatsappClicks / analytics.totalViews) * 100)}% of views led to a WhatsApp enquiry.`
                        : "No WhatsApp enquiries yet. Review the price, cover photo and description if views keep rising."}
                    </p>
                  )}
                </section>
              )}
              <div className="rounded-3xl bg-gradient-to-br from-gray-950 to-green-950 p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 text-green-300"><Sparkles className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Fast flow</span></div>
                <p className="mt-3 text-xl font-bold">Add photos, fill the essentials, publish.</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">Auto Bazaar Finds contact details and the safest listing defaults are already applied.</p>
              </div>
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

      {!isLoadingEdit && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur xl:hidden">
          <div className="mx-auto flex max-w-7xl gap-3">
            <button type="button" onClick={saveDraft} disabled={isPublishing} className="rounded-xl border px-5 py-3 text-sm font-bold disabled:opacity-50">
              Save draft
            </button>
            <button type="button" onClick={publishListing} disabled={isPublishing} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 disabled:bg-gray-400">
              {isPublishing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              {isPublishing ? "Publishing..." : editVehicleId ? "Save changes" : "Publish vehicle"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function AnalyticsMetric({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3">
      <Icon className="h-4 w-4 text-gray-500" />
      <p className="mt-2 text-2xl font-black text-gray-950">{value.toLocaleString("en-KE")}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
