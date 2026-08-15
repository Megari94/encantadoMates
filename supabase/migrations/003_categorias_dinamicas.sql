-- Encantado Mates — categorías administrables
-- Ejecutar en Supabase > SQL Editor después de schema.sql.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.categories (name, slug, sort_order)
values
  ('Mates', 'mate', 10),
  ('Termos', 'termo', 20),
  ('Bombillas', 'bombilla', 30),
  ('Accesorios', 'accesorio', 40)
on conflict (slug) do update set name = excluded.name;

alter table public.products
  add column if not exists category text not null default 'mate';

alter table public.products drop constraint if exists products_category_check;
alter table public.products drop constraint if exists products_category_fkey;
alter table public.products
  add constraint products_category_fkey
  foreign key (category) references public.categories(slug)
  on update cascade on delete restrict;

alter table public.categories enable row level security;

drop policy if exists "Categorías visibles" on public.categories;
create policy "Categorías visibles"
  on public.categories for select
  using (active or public.is_admin());

drop policy if exists "Admins crean categorías" on public.categories;
create policy "Admins crean categorías"
  on public.categories for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Admins actualizan categorías" on public.categories;
create policy "Admins actualizan categorías"
  on public.categories for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins eliminan categorías" on public.categories;
create policy "Admins eliminan categorías"
  on public.categories for delete to authenticated
  using (public.is_admin());

-- Después de ejecutar esta migración, asigná el rol únicamente a tu usuario:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'TU_EMAIL_DE_ADMIN';
