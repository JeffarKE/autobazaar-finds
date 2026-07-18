import { z } from "zod";

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

  transmission: z.string(),

  fuelType: z.string(),

  bodyType: z.string(),

  driveType: z.string(),

  sellerName: z.string().min(2, "Your name is required"),

  phone: z.string().min(10, "Enter a valid phone number"),

  email: z
    .string()
    .email("Enter a valid email address")
    .or(z.literal("")),

  location: z.string().min(2, "Location is required"),

  preferredContact: z.string(),

  bestTime: z.string(),

  description: z
    .string()
    .min(30, "Description should be at least 30 characters"),

  photos: z.array(z.instanceof(File)).min(1, "Upload at least one photo"),

  agreeToTerms: z
    .boolean()
    .refine((value) => value === true, {
      message: "You must accept the terms before continuing.",
    }),
});

export type SellFormSchema = z.infer<typeof sellFormSchema>;