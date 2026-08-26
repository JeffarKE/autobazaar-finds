-- Remove permissive policies left by the original dashboard SQL snippets.
-- PostgreSQL combines permissive policies with OR, so these legacy policies
-- would otherwise bypass the newer administrator-only policies.

drop policy if exists "Allow public update on vehicles" on public.vehicles;
drop policy if exists "Allow public vehicle inserts" on public.vehicles;
drop policy if exists "Allow public vehicle reads" on public.vehicles;

drop policy if exists "Allow public vehicle image inserts" on public.vehicle_images;
drop policy if exists "Allow public vehicle image reads" on public.vehicle_images;

drop policy if exists "Anyone can upload vehicle images" on storage.objects;
drop policy if exists "Anyone can update vehicle images" on storage.objects;
drop policy if exists "Anyone can delete vehicle images" on storage.objects;

-- Anonymous visitors use the restricted public views and the guarded storage
-- read policy. Direct base-table access is never required.
revoke all on public.vehicles from anon;
revoke all on public.vehicle_images from anon;

-- Ensure the intended policies remain present after cleaning up legacy rules.
drop policy if exists "Admins manage vehicles" on public.vehicles;
create policy "Admins manage vehicles" on public.vehicles
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage vehicle images" on public.vehicle_images;
create policy "Admins manage vehicle images" on public.vehicle_images
  for all using (public.is_admin()) with check (public.is_admin());
