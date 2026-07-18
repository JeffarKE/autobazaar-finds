import { SellFormData } from "./types";

export const defaultValues: SellFormData = {
  make: "",
  model: "",
  year: "",
  engineSize: "",
  mileage: "",
  price: "",

  transmission: "Automatic",
  fuelType: "Petrol",
  bodyType: "SUV",
  driveType: "2WD",

  sellerName: "",
  phone: "",
  email: "",
  location: "",
  preferredContact: "Phone Call",
  bestTime: "Anytime",

  description: "",

  photos: [],

  agreeToTerms: false,
};