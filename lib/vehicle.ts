export type VehicleImage = {
  publicUrl: string;
  storagePath: string;

  // Present while the image only exists in the browser. It is uploaded later.
  file?: File;

  // Exactly one image should be marked as the listing cover image.
  isCover?: boolean;
};

export type Vehicle = {
  make: string;
  model: string;
  year: string;
  registrationNumber: string;
  vin: string;

  bodyType: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  engineSize: string;
  mileage: string;
  exteriorColor: string;
  interiorColor: string;
  condition: string;
  origin: string;
  history: string;
  seats: string;
  doors: string;
  horsepower: string;
  torque: string;
  groundClearance: string;

  price: string;
  location: string;
  status: "Draft" | "Live" | "Reserved" | "Sold" | "Archived";
  negotiable: boolean;
  featured: boolean;
  verified: boolean;
  publishImmediately: boolean;

  description: string;

  sellerName: string;
  phone: string;
  email: string;
  preferredContact: string;
  bestTime: string;

  images: VehicleImage[];
};

export const emptyVehicle: Vehicle = {
  make: "",
  model: "",
  year: "",
  registrationNumber: "",
  vin: "",

  bodyType: "",
  transmission: "",
  fuelType: "",
  driveType: "",
  engineSize: "",
  mileage: "",
  exteriorColor: "",
  interiorColor: "",
  condition: "",
  origin: "",
  history: "",
  seats: "",
  doors: "",
  horsepower: "",
  torque: "",
  groundClearance: "",

  price: "",
  location: "",
  status: "Live",
  negotiable: true,
  featured: false,
  verified: true,
  publishImmediately: true,

  description: "",

  sellerName: "Auto Bazaar Finds",
  phone: "+254741056053",
  email: "autobazaarfinds@gmail.com",
  preferredContact: "WhatsApp",
  bestTime: "Any time",

  images: [],
};
