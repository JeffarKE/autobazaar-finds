"use client";

import { Search } from "lucide-react";

import Container from "@/app/components/design-system/Container";
import Section from "@/app/components/design-system/Section";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MarketplaceHero() {
  return (
    <Section className="bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            Kenya's Premium Vehicle Marketplace
          </span>

          <h1 className="mt-8 text-5xl font-black tracking-tight md:text-6xl">
            Find Your
            <br />
            Next Vehicle.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Browse trusted listings from verified sellers across Kenya.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl gap-3">
            <Input
              placeholder="Search by make, model or keyword..."
              className="h-12"
            />

            <Button size="lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}