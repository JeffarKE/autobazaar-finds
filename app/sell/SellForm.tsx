"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { useSellForm } from "./hooks/useSellForm";
import { submitListing } from "./services/submitListing";
import { SellFormData } from "./types";

import Intro from "./components/Intro";
import VehicleDetails from "./components/VehicleDetails";
import SellerDetails from "./components/SellerDetails";
import VehiclePhotos from "./components/VehiclePhotos";
import VehicleDescription from "./components/VehicleDescription";
import ReviewProcess from "./components/ReviewProcess";
import SubmitSection from "./components/SubmitSection";

export default function SellForm() {
  const form = useSellForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SellFormData) => {
    try {
      setIsSubmitting(true);

      await submitListing(data);

      alert("🎉 Vehicle submitted successfully!");

      form.reset();
    } catch (error) {
      console.error(error);

      alert("Something went wrong while submitting the listing.");
    } finally {
      setIsSubmitting(false);
    }
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

        <SubmitSection isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}