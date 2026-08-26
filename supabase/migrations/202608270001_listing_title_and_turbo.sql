-- Add the administrator-controlled public title and turbo flag.
alter table public.vehicles
  add column if not exists "listingTitle" text,
  add column if not exists turbo boolean not null default false;

-- Recreate the restricted public view so the new safe fields are available.
drop view if exists public.public_vehicles;

create view public.public_vehicles
with (security_invoker = false, security_barrier = true)
as
select
  id,
  "listingTitle",
  make,
  model,
  year,
  price,
  mileage,
  "fuelType",
  transmission,
  "driveType",
  "engineSize",
  "bodyType",
  "exteriorColor",
  "interiorColor",
  condition,
  description,
  location,
  featured,
  verified,
  turbo,
  created_at
from public.vehicles
where status = 'Live';

revoke all on public.public_vehicles from public;
grant select on public.public_vehicles to anon, authenticated;
