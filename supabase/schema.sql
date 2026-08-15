-- Encantado Mates — esquema de Supabase
-- Ejecutar en el SQL Editor del proyecto (Supabase Dashboard > SQL Editor > New query)

-- 1) Tabla de productos ------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric(10, 2) not null default 0 check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  category text not null default 'mate' check (category in ('mate', 'termo', 'bombilla', 'accesorio')),
  image_url text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Mantiene updated_at al día en cada edición
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- 2) Row Level Security -------------------------------------------------------

alter table public.products enable row level security;

-- Cualquiera puede leer el catálogo (vista cliente, sin login)
drop policy if exists "Productos visibles para todos" on public.products;
create policy "Productos visibles para todos"
  on public.products for select
  using (true);

-- Solo usuarios autenticados (admin) pueden crear/editar/borrar productos
drop policy if exists "Solo admins escriben productos" on public.products;
create policy "Solo admins escriben productos"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Solo admins actualizan productos" on public.products;
create policy "Solo admins actualizan productos"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Solo admins borran productos" on public.products;
create policy "Solo admins borran productos"
  on public.products for delete
  to authenticated
  using (true);

-- 3) Storage: bucket público para fotos de producto ---------------------------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Fotos de producto visibles para todos" on storage.objects;
create policy "Fotos de producto visibles para todos"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Solo admins suben fotos" on storage.objects;
create policy "Solo admins suben fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Solo admins actualizan fotos" on storage.objects;
create policy "Solo admins actualizan fotos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Solo admins borran fotos" on storage.objects;
create policy "Solo admins borran fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 4) Testimonios de clientes --------------------------------------------------

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

drop policy if exists "Testimonios visibles para todos" on public.testimonials;
create policy "Testimonios visibles para todos"
  on public.testimonials for select
  using (true);

drop policy if exists "Solo admins escriben testimonios" on public.testimonials;
create policy "Solo admins escriben testimonios"
  on public.testimonials for insert
  to authenticated
  with check (true);

drop policy if exists "Solo admins actualizan testimonios" on public.testimonials;
create policy "Solo admins actualizan testimonios"
  on public.testimonials for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Solo admins borran testimonios" on public.testimonials;
create policy "Solo admins borran testimonios"
  on public.testimonials for delete
  to authenticated
  using (true);

-- 5) Usuario admin -------------------------------------------------------------
-- Creá el usuario admin desde Authentication > Users > Add user en el dashboard
-- de Supabase (con email + contraseña). No hace falta ninguna tabla extra: el
-- login del panel /admin usa Supabase Auth directamente contra ese usuario.
