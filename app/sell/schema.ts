import { z } from "zod";

const transmissions = ["Automatic", "Manual"] as const;

const fuelTypes = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
  "Plug-in Hybrid",
] as const;

const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup",
  "Van",
  "Wagon",
  "Minivan",
  "Truck",
  "Bus",
  "Other",
] as const;

const driveTypes = [
  "2WD",
  "FWD",
  "RWD",
  "AWD",
  "4WD",
] as const;

const preferredContacts = [
  "Phone Call",
  "WhatsApp",
  "SMS",
  "Email",
] as const;

const bestTimes = [
  "Morning",
  "Afternoon",
  "Evening",
  "Anytime",
] as const;

export const sellFormSchema = z.object({
  make: z.string().min(1, "Vehicle make is required"),

  model: z.string().min(1, "Vehicle model is required"),

  year: z
    .string()
    .min(4, "Enter a valid year")
    .max(4, "Enter a valid year"),

  engineSize: z.string().min(1, "Engine size is required"),

  mileage: z.string().min(1, "Mileage is required"),

  price: z.string().min(1, "Price is required"),

  transmission: z.enum(transmissions),

  fuelType: z.enum(fuelTypes),

  bodyType: z.enum(bodyTypes),

  driveType: z.enum(driveTypes),

  sellerName: z.string().min(2, "Your name is required"),

  phone: z.string().min(10, "Enter a valid phone number"),

  email: z
    .string()
    .email("Enter a valid email address")
    .or(z.literal("")),

  location: z.string().min(2, "Location is required"),

  preferredContact: z.enum(preferredContacts),

  bestTime: z.enum(bestTimes),

  description: z
    .string()
    .min(30, "Description should be at least 30 characters"),

  photos: z
    .array(z.instanceof(File))
    .min(1, "Upload at least one photo"),

  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms before continuing.",
  }),
});

export type SellFormSchema = z.infer<typeof sellFormSchema>;