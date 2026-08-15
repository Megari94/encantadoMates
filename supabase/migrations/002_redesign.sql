-- Encantado Mates — migración para el rediseño (categorías + testimonios)
-- Ejecutar en el SQL Editor de Supabase (proyecto ya provisionado con schema.sql)

-- 1) Categoría de producto, para poder filtrar el catálogo ------------------

alter table public.products
  add column if not exists category text not null default 'mate'
  check (category in ('mate', 'termo', 'bombilla', 'accesorio'));

-- 2) Testimonios de clientes --------------------------------------------------

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

-- 3) Un par de testimonios de ejemplo, para que la sección no arranque vacía
--    (los podés editar o borrar desde /admin una vez que entres)

insert into public.testimonials (customer_name, quote, rating)
values
  ('Valentina R.', 'El mate que compré es una obra de arte, se nota el trabajo a mano. Llegó rapidísimo.', 5),
  ('Federico G.', 'Le regalé un mate a mi papá y no lo suelta más. Excelente calidad y atención por WhatsApp.', 5)
on conflict do nothing;
