import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),

  model: z.string().min(1, "Model is required"),

  year: z.coerce
    .number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear() + 1, "Invalid year"),

  price: z.coerce.number().min(1, "Price is required"),

  mileage: z.coerce.number().min(0, "Mileage cannot be negative"),

  fuelType: z.string().min(1, "Fuel type is required"),

  transmission: z.string().min(1, "Transmission is required"),

  driveType: z.string().min(1, "Drive type is required"),

  engineSize: z.string().min(1, "Engine size is required"),

  exterior_color: z.string().optional(),

  interior_color: z.string().optional(),

  condition: z.string().min(1, "Condition is required"),

  description: z.string().optional(),

  sellerName: z.string().min(1, "Seller name is required"),

  phone: z.string().min(1, "Phone number is required"),

  email: z.email("Enter a valid email address"),

  bodyType: z.string().optional(),

  location: z.string().optional(),

  preferredContact: z.string().optional(),

  bestTime: z.string().optional(),

  featured: z.boolean().default(false),

  status: z.string().default("draft"),
});

export type VehicleFormInput = z.input<typeof vehicleSchema>;

export type VehicleFormData = z.output<typeof vehicleSchema>;