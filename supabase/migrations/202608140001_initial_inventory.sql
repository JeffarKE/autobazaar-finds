-- Auto Bazaar Finds inventory schema and access policies.
-- Run this in a new Supabase project, then assign the first administrator
-- using the statement at the bottom of this file.

create extension if not exists pgcrypto;

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year integer not null check (year between 1900 and 2100),
  "registrationNumber" text,
  vin text,
  "bodyType" text not null,
  "fuelType" text not null,
  transmission text not null,
  "driveType" text not null,
  "engineSize" text not null,
  mileage bigint not null check (mileage >= 0),
  "exteriorColor" text,
  "interiorColor" text,
  condition text,
  seats text,
  doors text,
  horsepower text,
  torque text,
  "groundClearance" text,
  price bigint not null check (price >= 0),
  location text not null,
  status text not null default 'Draft' check (status in ('Draft', 'Live', 'Reserved', 'Sold', 'Archived')),
  negotiable boolean not null default false,
  featured boolean not null default false,
  verified boolean not null default false,
  "publishImmediately" boolean not null default false,
  description text not null,
  "sellerName" text not null,
  phone text not null,
  email text,
  "preferredContact" text,
  "bestTime" text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  image_url text not null,
  storage_path text not null unique,
  display_order integer not null default 0 check (display_order >= 0),
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists vehicles_public_listing_idx
  on public.vehicles(status, created_at desc);
create index if not exists vehicle_images_vehicle_order_idx
  on public.vehicle_images(vehicle_id, display_order);

-- Older listings may have more than one image marked as the cover. Keep the
-- first ordered cover and normalize the rest before enforcing uniqueness.
with ranked_covers as (
  select
    id,
    row_number() over (
      partition by vehicle_id
      order by display_order, created_at, id
    ) as cover_rank
  from public.vehicle_images
  where is_cover = true
)
update public.vehicle_images as image
set is_cover = false
from ranked_covers
where image.id = ranked_covers.id
  and ranked_covers.cover_rank > 1;

create unique index if not exists one_cover_per_vehicle_idx
  on public.vehicle_images(vehicle_id) where is_cover;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;

drop policy if exists "Public can view live vehicles" on public.vehicles;
create policy "Public can view live vehicles" on public.vehicles
  for select using (status = 'Live' or public.is_admin());

drop policy if exists "Admins manage vehicles" on public.vehicles;
create policy "Admins manage vehicles" on public.vehicles
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can view live vehicle images" on public.vehicle_images;
create policy "Public can view live vehicle images" on public.vehicle_images
  for select using (
    public.is_admin() or exists (
      select 1 from public.vehicles
      where vehicles.id = vehicle_images.vehicle_id and vehicles.status = 'Live'
    )
  );

drop policy if exists "Admins manage vehicle images" on public.vehicle_images;
create policy "Admins manage vehicle images" on public.vehicle_images
  for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view vehicle images" on storage.objects;
create policy "Public can view vehicle images" on storage.objects
  for select using (bucket_id = 'vehicle-images');

drop policy if exists "Admins upload vehicle images" on storage.objects;
create policy "Admins upload vehicle images" on storage.objects
  for insert with check (bucket_id = 'vehicle-images' and public.is_admin());

drop policy if exists "Admins update vehicle images" on storage.objects;
create policy "Admins update vehicle images" on storage.objects
  for update using (bucket_id = 'vehicle-images' and public.is_admin());

drop policy if exists "Admins delete vehicle images" on storage.objects;
create policy "Admins delete vehicle images" on storage.objects
  for delete using (bucket_id = 'vehicle-images' and public.is_admin());

-- After creating an administrator in Authentication > Users, run this once
-- with their email and ask them to sign out and back in:
-- update auth.users
-- set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
-- where email = 'admin@example.com';
