export type Car = {
  id: string;
  image: string;
  images: string[];
  make: string;
  model: string;
  year: number;
  fuel: string;
  transmission: string;
  price: number;
  engine: string;
  mileage: string;
  bodyType: string;
  driveType: string;
  condition: string;
  location: string;
  phone: string;
  description: string;
};

export const cars: Car[] = [
  {
    id: "1",
    image: "/images/toyota-corolla.jpg",
    images: [
      "/images/toyota-corolla.jpg",
    ],
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 1200000,
    engine: "1500cc",
    mileage: "85,000 km",
    bodyType: "Sedan",
    driveType: "Front Wheel Drive",
    condition: "Clean Used",
    location: "Nairobi",
    phone: "254712345678",
    description:
      "A clean and reliable Toyota Corolla suitable for daily commuting and family use.",
  },

  {
    id: "2",
    image: "/images/mazda-cx5.jpg",
    images: [
      "/images/mazda-cx5.jpg",
    ],
    make: "Mazda",
    model: "CX-5",
    year: 2019,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 2200000,
    engine: "2200cc SkyActiv",
    mileage: "70,000 km",
    bodyType: "SUV",
    driveType: "Front Wheel Drive",
    condition: "Foreign Used",
    location: "Nairobi",
    phone: "254712345678",
    description:
      "A stylish and fuel-efficient Mazda CX-5 SUV with premium comfort and modern features.",
  },

  {
    id: "3",
    image: "/images/subaru-forester.jpg",
    images: [
      "/images/subaru-forester-1.jpg",
      "/images/subaru-forester-2.jpg",
      "/images/subaru-forester-3.jpg",
      "/images/subaru-forester-4.jpg",
    ],
    make: "Subaru",
    model: "Forester",
    year: 2017,
    fuel: "Petrol",
    transmission: "Manual",
    price: 800000,
    engine: "2000cc Boxer Engine",
    mileage: "95,000 km",
    bodyType: "SUV",
    driveType: "AWD",
    condition: "Enthusiast Build",
    location: "Nairobi",
    phone: "254712345678",
    description:
      "A capable Subaru Forester with manual transmission, perfect for enthusiasts who enjoy performance and driving experience.",
  },
];