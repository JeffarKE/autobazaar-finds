export type Transmission = "Automatic" | "Manual";

export type FuelType =
  | "Petrol"
  | "Diesel"
  | "Hybrid"
  | "Electric"
  | "Plug-in Hybrid";

export type BodyType =
  | "SUV"
  | "Sedan"
  | "Hatchback"
  | "Coupe"
  | "Convertible"
  | "Pickup"
  | "Van"
  | "Wagon"
  | "Minivan"
  | "Truck"
  | "Bus"
  | "Other";

export type DriveType =
  | "2WD"
  | "FWD"
  | "RWD"
  | "AWD"
  | "4WD";

export type PreferredContact =
  | "Phone Call"
  | "WhatsApp"
  | "SMS"
  | "Email";

export type BestTime =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Anytime";

export interface VehiclePhoto {
  id: string;

  file: File;

  preview: string;

  isCover: boolean;

  // Supabase public URL
  url?: string;

  // Storage object path
  storagePath?: string;

  // Upload state
  isUploading: boolean;

  uploadProgress: number;

  uploadError?: string;
}

export interface SellFormData {
  // Vehicle Information
  make: string;
  model: string;
  year: string;
  engineSize: string;
  mileage: string;
  price: string;

  transmission: Transmission;
  fuelType: FuelType;
  bodyType: BodyType;
  driveType: DriveType;

  // Seller Information
  sellerName: string;
  phone: string;
  email: string;
  location: string;
  preferredContact: PreferredContact;
  bestTime: BestTime;

  // Listing
  description: string;

  // Images
  photos: File[];

  // Agreement
  agreeToTerms: boolean;
}