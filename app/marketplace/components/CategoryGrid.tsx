import {
  Car,
  Bike,
  Truck,
  Ship,
  Plane,
  Tractor,
} from "lucide-react";

import Container from "@/app/components/design-system/Container";
import Section from "@/app/components/design-system/Section";
import Heading from "@/app/components/design-system/Heading";

import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const categories = [
    {
      title: "Cars",
      description: "Sedans, SUVs, hatchbacks and more",
      href: "/marketplace/cars",
      icon: <Car className="h-6 w-6" />,
    },
    {
      title: "Motorcycles",
      description: "Sport bikes, cruisers and scooters",
      href: "/marketplace/motorcycles",
      icon: <Bike className="h-6 w-6" />,
    },
    {
      title: "Trucks",
      description: "Commercial and heavy-duty trucks",
      href: "/marketplace/trucks",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      title: "Boats",
      description: "Fishing boats, yachts and more",
      href: "/marketplace/boats",
      icon: <Ship className="h-6 w-6" />,
    },
    {
      title: "Aircraft",
      description: "Private and commercial aircraft",
      href: "/marketplace/aircraft",
      icon: <Plane className="h-6 w-6" />,
    },
    {
      title: "Machinery",
      description: "Construction and farm equipment",
      href: "/marketplace/machinery",
      icon: <Tractor className="h-6 w-6" />,
    },
  ];

  return (
    <Section>
      <Container>
        <Heading
          title="Browse Categories"
          subtitle="Explore vehicles and equipment across multiple categories."
          centered
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
              icon={category.icon}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}