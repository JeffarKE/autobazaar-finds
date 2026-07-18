export interface Vehicle {
  id: string;

  title: string;

  make: string;

  model: string;

  year: number;

  price: number;

  mileage: number;

  engine: string;

  transmission: "Automatic" | "Manual";

  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";

  bodyType: string;

  driveType: string;

  color: string;

  location: string;

  featured: boolean;

  verified: boolean;

  images: string[];

  description: string;

  seller: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    verified: boolean;
  };

  createdAt: string;
}