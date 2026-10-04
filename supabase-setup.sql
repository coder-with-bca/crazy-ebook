-- Run once in Supabase SQL Editor after replacing the owner email below.
-- Use the same verified email in index.html's ADMIN_EMAIL setting.
-- Never use a service_role/secret key in the static site.

create table if not exists public.storefront_public (
  id integer primary key check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_store_private (
  id integer primary key check (id = 1),
  delivery_links jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.storefront_public enable row level security;
alter table public.admin_store_private enable row level security;

drop policy if exists "Public can read storefront" on public.storefront_public;
create policy "Public can read storefront"
  on public.storefront_public for select
  to anon, authenticated
  using (true);

drop policy if exists "Owner can insert storefront" on public.storefront_public;
create policy "Owner can insert storefront"
  on public.storefront_public for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com');

drop policy if exists "Owner can update storefront" on public.storefront_public;
create policy "Owner can update storefront"
  on public.storefront_public for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com')
  with check ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com');

drop policy if exists "Owner can read private delivery links" on public.admin_store_private;
create policy "Owner can read private delivery links"
  on public.admin_store_private for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com');

drop policy if exists "Owner can insert private delivery links" on public.admin_store_private;
create policy "Owner can insert private delivery links"
  on public.admin_store_private for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com');

drop policy if exists "Owner can update private delivery links" on public.admin_store_private;
create policy "Owner can update private delivery links"
  on public.admin_store_private for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com')
  with check ((auth.jwt() ->> 'email') = 'YOUR_OWNER_EMAIL@example.com');

grant select on public.storefront_public to anon, authenticated;
grant insert, update on public.storefront_public to authenticated;
grant select, insert, update on public.admin_store_private to authenticated;

