import type { Vehicle } from "../types";
import VehicleCard from "./VehicleCard";

interface RelatedCarsProps {
  currentCar: Vehicle;
  cars: Vehicle[];
}

export default function RelatedCars({
  currentCar,
  cars,
}: RelatedCarsProps) {
  const relatedCars = cars
    .filter(
      (vehicle) =>
        vehicle.id !== currentCar.id &&
        (
          vehicle.make === currentCar.make ||
          vehicle.bodyType === currentCar.bodyType
        )
    )
    .slice(0, 3);

  if (relatedCars.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">
        Similar Vehicles
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedCars.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </section>
  );
}