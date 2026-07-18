"use client";

import { FormProvider } from "react-hook-form";

import { useSellForm } from "./hooks/useSellForm";

import Intro from "./components/Intro";
import VehicleDetails from "./components/VehicleDetails";
import SellerDetails from "./components/SellerDetails";
import VehiclePhotos from "./components/VehiclePhotos";
import VehicleDescription from "./components/VehicleDescription";
import ReviewProcess from "./components/ReviewProcess";
import SubmitSection from "./components/SubmitSection";

export default function SellForm() {
  const form = useSellForm();

  const onSubmit = (data: any) => {
    console.log("Sell Form Submitted:", data);

    // Later:
    // - Upload images
    // - Send data to API
    // - Save to database
    // - Redirect to success page
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-6xl space-y-8"
      >
        <Intro />

        <VehicleDetails />

        <SellerDetails />

        <VehiclePhotos />

        <VehicleDescription />

        <ReviewProcess />

        <SubmitSection />
      </form>
    </FormProvider>
  );
}