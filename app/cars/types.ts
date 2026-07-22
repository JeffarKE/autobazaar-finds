export interface Seller {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  verified: boolean;
}

export type Transmission = "Automatic" | "Manual";

export type FuelType =
  | "Petrol"
  | "Diesel"
  | "Hybrid"
  | "Electric";

export interface Vehicle {
  id: string;

  title: string;

  make: string;
  model: string;
  year: number;

  price: number;
  mileage: number;

  engine: string;

  transmission: Transmission;

  fuel: FuelType;

  bodyType: string;
  driveType: string;

  color: string;

  location: string;

  featured: boolean;
  verified: boolean;

  images: string[];

  description: string;

  seller: Seller;

  createdAt: string;
}