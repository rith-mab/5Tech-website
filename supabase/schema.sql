create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  category_id text not null references public.categories(id) on delete restrict,
  price numeric(10,2) not null default 0,
  short_description text not null,
  description text not null,
  image_url text not null,
  featured boolean not null default false,
  trending boolean not null default false,
  specs jsonb not null default '[]'::jsonb,
  features text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

insert into public.categories (id, name, slug, description)
values
  ('cat-mouse', 'Mouse', 'mouse', 'Precision mice for work and esports.'),
  ('cat-keyboard', 'Keyboard', 'keyboard', 'Mechanical and wireless keyboards with clean layouts.'),
  ('cat-monitor', 'Monitor', 'monitor', 'Color-rich and high refresh rate displays.'),
  ('cat-headphones', 'Headphones', 'headphones', 'Immersive audio for gaming and focus.'),
  ('cat-accessories', 'Computer Accessories', 'computer-accessories', 'Useful desk and device upgrades.'),
  ('cat-gaming', 'Gaming Accessories', 'gaming-accessories', 'Essentials that elevate performance.'),
  ('cat-gadgets', 'Tech Gadgets', 'tech-gadgets', 'Practical gadgets for modern setups.')
on conflict (id) do nothing;

alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "Public can view categories" on public.categories;
create policy "Public can view categories"
on public.categories for select
using (true);

drop policy if exists "Public can view products" on public.products;
create policy "Public can view products"
on public.products for select
using (true);

drop policy if exists "Service role manages categories" on public.categories;
create policy "Service role manages categories"
on public.categories for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Service role manages products" on public.products;
create policy "Service role manages products"
on public.products for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
