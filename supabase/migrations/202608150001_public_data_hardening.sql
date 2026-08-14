-- Restrict anonymous access to public-safe listing fields and live images.

-- Bring older incremental schemas up to the current application shape.
alter table public.vehicles add column if not exists "registrationNumber" text;
alter table public.vehicles add column if not exists vin text;
alter table public.vehicles add column if not exists "exteriorColor" text;
alter table public.vehicles add column if not exists "interiorColor" text;
alter table public.vehicles add column if not exists seats text;
alter table public.vehicles add column if not exists doors text;
alter table public.vehicles add column if not exists horsepower text;
alter table public.vehicles add column if not exists torque text;
alter table public.vehicles add column if not exists "groundClearance" text;
alter table public.vehicles add column if not exists negotiable boolean not null default false;
alter table public.vehicles add column if not exists verified boolean not null default false;
alter table public.vehicles add column if not exists "publishImmediately" boolean not null default false;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'vehicles' and column_name = 'exterior_color'
  ) then
    execute 'update public.vehicles set "exteriorColor" = exterior_color where "exteriorColor" is null';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'vehicles' and column_name = 'interior_color'
  ) then
    execute 'update public.vehicles set "interiorColor" = interior_color where "interiorColor" is null';
  end if;
end;
$$;

drop policy if exists "Public can view live vehicles" on public.vehicles;

create or replace view public.public_vehicles
with (security_invoker = false, security_barrier = true)
as
select
  id,
  make,
  model,
  year,
  "bodyType",
  "fuelType",
  transmission,
  "driveType",
  "engineSize",
  mileage,
  "exteriorColor",
  price,
  location,
  featured,
  verified,
  description,
  created_at
from public.vehicles
where status = 'Live';

create or replace view public.public_vehicle_images
with (security_invoker = false, security_barrier = true)
as
select
  image.id,
  image.vehicle_id,
  image.image_url,
  image.storage_path,
  image.display_order,
  image.is_cover
from public.vehicle_images as image
join public.vehicles as vehicle on vehicle.id = image.vehicle_id
where vehicle.status = 'Live';

revoke all on public.vehicles from anon;
revoke all on public.vehicle_images from anon;
revoke all on public.public_vehicles from public;
revoke all on public.public_vehicle_images from public;
grant select on public.public_vehicles to anon, authenticated;
grant select on public.public_vehicle_images to anon, authenticated;

create or replace function public.can_view_vehicle_image(object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.vehicle_images as image
    join public.vehicles as vehicle on vehicle.id = image.vehicle_id
    where image.storage_path = object_name
      and vehicle.status = 'Live'
  );
$$;

update storage.buckets
set public = false
where id = 'vehicle-images';

drop policy if exists "Public can view vehicle images" on storage.objects;
drop policy if exists "Live vehicle images can be read" on storage.objects;
create policy "Live vehicle images can be read" on storage.objects
  for select using (
    bucket_id = 'vehicle-images'
    and (public.is_admin() or public.can_view_vehicle_image(name))
  );

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists vehicles_set_updated_at on public.vehicles;
create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function public.set_updated_at();
