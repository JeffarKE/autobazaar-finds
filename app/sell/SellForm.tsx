"use client";

import Intro from "./components/Intro";
import VehicleDetails from "./components/VehicleDetails";
import SellerDetails from "./components/SellerDetails";
import VehiclePhotos from "./components/VehiclePhotos";
import VehicleDescription from "./components/VehicleDescription";
import ReviewProcess from "./components/ReviewProcess";
import SubmitSection from "./components/SubmitSection";

export default function SellForm() {
  return (
    <form className="mx-auto max-w-6xl space-y-8">
      <Intro />

      <VehicleDetails />

      <SellerDetails />

      <VehiclePhotos />

      <VehicleDescription />

      <ReviewProcess />

      <SubmitSection />
    </form>
  );
}