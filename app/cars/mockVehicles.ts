import type { Vehicle } from "./types";

const seller = {
  id: "preview-seller",
  name: "Auto Bazaar Finds",
  phone: "+254741056053",
  avatar: "/avatars/avatar-placeholder.png.png",
  verified: true,
};

export const mockVehicles: Vehicle[] = [
  {
    id: "10000001-0000-4000-8000-000000000001", title: "2018 Toyota Land Cruiser Prado TX", make: "Toyota", model: "Land Cruiser Prado TX", year: 2018,
    price: 6750000, mileage: 78000, engine: "2.8L", transmission: "Automatic", fuel: "Diesel", bodyType: "SUV", driveType: "4WD", color: "Pearl White", location: "Nairobi",
    featured: true, verified: true, images: ["/cars/prado.jpg", "/images/subaru-forester-1.jpg", "/images/subaru-forester-2.jpg", "/images/subaru-forester-3.jpg", "/images/subaru-forester-4.jpg"],
    description: "Preview listing for layout testing.", seller, createdAt: "2026-08-14T09:00:00.000Z",
  },
  {
    id: "10000002-0000-4000-8000-000000000002", title: "2017 Mazda CX-5 XD", make: "Mazda", model: "CX-5 XD", year: 2017,
    price: 2850000, mileage: 91000, engine: "2.2L", transmission: "Automatic", fuel: "Diesel", bodyType: "SUV", driveType: "AWD", color: "Soul Red", location: "Mombasa",
    featured: true, verified: true, images: ["/cars/cx5.jpg", "/images/mazda-cx5.jpg", "/cars/cx5.jpg", "/images/mazda-cx5.jpg", "/cars/cx5.jpg"],
    description: "Preview listing for layout testing.", seller, createdAt: "2026-08-13T09:00:00.000Z",
  },
  {
    id: "10000003-0000-4000-8000-000000000003", title: "2016 Subaru Forester XT", make: "Subaru", model: "Forester XT", year: 2016,
    price: 2450000, mileage: 104000, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Petrol", bodyType: "SUV", driveType: "AWD", color: "Black", location: "Kiambu",
    featured: true, verified: true, images: ["/cars/forester.jpg", "/images/subaru-forester.jpg", "/images/subaru-forester-1.jpg", "/images/subaru-forester-2.jpg", "/images/subaru-forester-3.jpg"],
    description: "Preview listing for layout testing.", seller, createdAt: "2026-08-12T09:00:00.000Z",
  },
  {
    id: "10000004-0000-4000-8000-000000000004", title: "2019 Toyota Corolla Axio Hybrid", make: "Toyota", model: "Corolla Axio", year: 2019,
    price: 1950000, mileage: 68000, engine: "1.5L", transmission: "Automatic", fuel: "Hybrid", bodyType: "Sedan", driveType: "2WD", color: "Silver", location: "Nairobi",
    featured: false, verified: true, images: ["/cars/corolla.jpg"], description: "Preview listing for layout testing.", seller, createdAt: "2026-08-11T09:00:00.000Z",
  },
  {
    id: "10000005-0000-4000-8000-000000000005", title: "2015 Volkswagen Golf GTI", make: "Volkswagen", model: "Golf GTI", year: 2015,
    price: 2250000, mileage: 86000, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Petrol", bodyType: "Hatchback", driveType: "2WD", color: "White", location: "Nakuru",
    featured: false, verified: true, images: ["/cars/golf.jpg"], description: "Preview listing for layout testing.", seller, createdAt: "2026-08-10T09:00:00.000Z",
  },
  {
    id: "10000006-0000-4000-8000-000000000006", title: "2020 Mazda CX-5 Skyactiv", make: "Mazda", model: "CX-5 Skyactiv", year: 2020,
    price: 3650000, mileage: 54000, engine: "2.0L", transmission: "Automatic", fuel: "Petrol", bodyType: "SUV", driveType: "2WD", color: "Grey", location: "Nairobi",
    featured: false, verified: true, images: ["/images/mazda-cx5.jpg"], description: "Preview listing for layout testing.", seller, createdAt: "2026-08-09T09:00:00.000Z",
  },
  {
    id: "10000007-0000-4000-8000-000000000007", title: "2014 Subaru Forester SJ5", make: "Subaru", model: "Forester SJ5", year: 2014,
    price: 1780000, mileage: 122000, engine: "2.0L", transmission: "Automatic", fuel: "Petrol", bodyType: "SUV", driveType: "AWD", color: "Blue", location: "Kisumu",
    featured: false, verified: true, images: ["/images/subaru-forester-2.jpg"], description: "Preview listing for layout testing.", seller, createdAt: "2026-08-08T09:00:00.000Z",
  },
];
