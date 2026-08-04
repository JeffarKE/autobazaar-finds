export type VehicleImage = {
  publicUrl: string;
  storagePath: string;
};

export type Vehicle = {
  /* ---------- Basic Information ---------- */
  make: string;
  model: string;
  year: string;
  registrationNumber: string;
  vin: string;

  /* ---------- Specifications ---------- */
  bodyType: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  engineSize: string;
  mileage: string;
  exteriorColor: string;
  interiorColor: string;
  condition: string;

  seats: string;
  doors: string;
  horsepower: string;
  torque: string;
  groundClearance: string;

  /* ---------- Pricing ---------- */
  price: string;
  location: string;
  status: "Draft" | "Live" | "Reserved" | "Sold" | "Archived";

  negotiable: boolean;
  featured: boolean;
  verified: boolean;
  publishImmediately: boolean;

  /* ---------- Description ---------- */
  description: string;

  /* ---------- Seller ---------- */
  sellerName: string;
  phone: string;
  email: string;
  preferredContact: string;
  bestTime: string;

  /* ---------- Images ---------- */
  images: VehicleImage[];
};

export const emptyVehicle: Vehicle = {
  /* ---------- Basic Information ---------- */
  make: "",
  model: "",
  year: "",
  registrationNumber: "",
  vin: "",

  /* ---------- Specifications ---------- */
  bodyType: "",
  transmission: "",
  fuelType: "",
  driveType: "",
  engineSize: "",
  mileage: "",
  exteriorColor: "",
  interiorColor: "",
  condition: "",

  seats: "",
  doors: "",
  horsepower: "",
  torque: "",
  groundClearance: "",

  /* ---------- Pricing ---------- */
  price: "",
  location: "",
  status: "Draft",

  negotiable: true,
  featured: false,
  verified: false,
  publishImmediately: false,

  /* ---------- Description ---------- */
  description: "",

  /* ---------- Seller ---------- */
  sellerName: "",
  phone: "",
  email: "",
  preferredContact: "",
  bestTime: "",

  /* ---------- Images ---------- */
  images: [],
};