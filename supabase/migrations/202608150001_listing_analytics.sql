-- Privacy-conscious listing performance analytics for Auto Bazaar Finds.
-- Public visitors can record a small fixed set of events through a guarded
-- function. Only administrators can read the underlying analytics.

create table if not exists public.vehicle_analytics_events (
  id bigint generated always as identity primary key,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  event_type text not null check (event_type in ('page_view', 'whatsapp_click', 'share')),
  created_at timestamptz not null default now()
);

create index if not exists vehicle_analytics_vehicle_created_idx
  on public.vehicle_analytics_events(vehicle_id, created_at desc);

alter table public.vehicle_analytics_events enable row level security;

drop policy if exists "Admins view listing analytics" on public.vehicle_analytics_events;
create policy "Admins view listing analytics" on public.vehicle_analytics_events
  for select using (public.is_admin());

create or replace function public.track_vehicle_event(
  p_vehicle_id uuid,
  p_event_type text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_type not in ('page_view', 'whatsapp_click', 'share') then
    raise exception 'Unsupported analytics event';
  end if;

  if not exists (
    select 1 from public.vehicles
    where id = p_vehicle_id and status = 'Live'
  ) then
    return;
  end if;

  insert into public.vehicle_analytics_events(vehicle_id, event_type)
  values (p_vehicle_id, p_event_type);
end;
$$;

revoke all on function public.track_vehicle_event(uuid, text) from public;
grant execute on function public.track_vehicle_event(uuid, text) to anon, authenticated;

drop view if exists public.vehicle_analytics_summary;
create view public.vehicle_analytics_summary
with (security_invoker = true)
as
select
  vehicle_id,
  count(*) filter (where event_type = 'page_view')::bigint as total_views,
  count(*) filter (
    where event_type = 'page_view'
      and created_at >= now() - interval '7 days'
  )::bigint as views_7d,
  count(*) filter (where event_type = 'whatsapp_click')::bigint as whatsapp_clicks,
  count(*) filter (where event_type = 'share')::bigint as shares,
  max(created_at) as last_activity_at
from public.vehicle_analytics_events
group by vehicle_id;

revoke all on public.vehicle_analytics_summary from public;
grant select on public.vehicle_analytics_summary to authenticated;
