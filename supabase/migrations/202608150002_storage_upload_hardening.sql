-- Limit the private vehicle photo bucket to expected image types and sizes.

update storage.buckets
set
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
  ]
where id = 'vehicle-images';

drop policy if exists "Admins upload vehicle images" on storage.objects;
create policy "Admins upload vehicle images" on storage.objects
  for insert with check (
    bucket_id = 'vehicle-images'
    and public.is_admin()
    and name like 'vehicles/%'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'heic', 'heif')
  );
