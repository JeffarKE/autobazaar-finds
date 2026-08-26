-- Keep vehicle creation quick: every listing detail is optional at creation.
-- Existing listings retain their data; this only removes database-level blockers.
alter table public.vehicles
  alter column make drop not null,
  alter column model drop not null,
  alter column year drop not null,
  alter column "bodyType" drop not null,
  alter column "fuelType" drop not null,
  alter column transmission drop not null,
  alter column "driveType" drop not null,
  alter column "engineSize" drop not null,
  alter column mileage drop not null,
  alter column price drop not null,
  alter column location drop not null,
  alter column description drop not null,
  alter column "sellerName" drop not null,
  alter column phone drop not null;
