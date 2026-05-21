insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Service role manages product images"
on storage.objects for all
using (bucket_id = 'product-images' and auth.role() = 'service_role')
with check (bucket_id = 'product-images' and auth.role() = 'service_role');
