// Data file for cars used by the app. Export a named `cars` array.

export type Car = {
  id: string;
  image: string;
  make: string;
  model: string;
  year: number;
  fuel: string;
  transmission: string;
  price: number;
};

export const cars: Car[] = [
  {
    id: "1",
    image: "/images/toyota-corolla.jpg",
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 1200000,
  },
  {
    id: "2",
    image: "/images/mazda-cx5.jpg",
    make: "Mazda",
    model: "CX-5",
    year: 2019,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 2200000,
  },
  {
    id: "3",
    image: "/images/honda-fit.jpg",
    make: "Honda",
    model: "Fit",
    year: 2017,
    fuel: "Petrol",
    transmission: "Manual",
    price: 800000,
  },
];