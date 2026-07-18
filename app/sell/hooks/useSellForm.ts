"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { defaultValues } from "../defaultValues";
import { sellFormSchema } from "../schema";

type SellFormValues = z.infer<typeof sellFormSchema>;

export function useSellForm() {
  return useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues,
    mode: "onBlur",
  });
}