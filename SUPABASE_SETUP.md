# Supabase Setup For 5Tech Store

This project will work with seed data immediately, but for the real admin dashboard and product storage you need to create a few things in Supabase.

## What to create in Supabase

### 1. Create a new Supabase project

After the project is created, copy:

- `Project URL`
- `anon public key`
- `service_role key`

Put them in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_ACCESS_TOKEN=your_custom_secret_token
```

### 2. Create database tables

Open `SQL Editor` in Supabase and run:

- [supabase/schema.sql](./supabase/schema.sql)

This creates:

- `categories`
- `products`
- RLS policies
- update timestamp trigger

### 3. Create the storage bucket

In Supabase, go to `Storage`, then either:

- Create a bucket named `product-images` manually and mark it `Public`

or run:

- [supabase/storage.sql](./supabase/storage.sql)

### 4. Seed products

The SQL file already seeds categories. For products, you can:

- add them from the admin page after connecting Supabase
- or import them manually in Table Editor

### 5. Optional authentication

This project does not require customer login. The admin side is protected by `ADMIN_ACCESS_TOKEN` through API routes.

If you want real admin login later, you can add:

- Supabase Auth
- a dedicated `profiles` or `admins` table
- route protection with middleware

## Recommended Supabase structure

### Table: `categories`

- `id` text primary key
- `name` text unique
- `slug` text unique
- `description` text

### Table: `products`

- `id` text primary key
- `name` text
- `slug` text unique
- `category_id` text foreign key to `categories.id`
- `price` numeric
- `short_description` text
- `description` text
- `image_url` text
- `featured` boolean
- `trending` boolean
- `specs` jsonb
- `features` text[]
- `created_at` timestamptz
- `updated_at` timestamptz

### Storage Bucket

- Bucket name: `product-images`
- Public: `true`

## Khmer summary

នៅក្នុង Supabase អ្នកត្រូវបង្កើត 4 ចំណុចសំខាន់ៗ៖

1. Project ថ្មីមួយ
2. Table `categories`
3. Table `products`
4. Storage bucket `product-images`

បន្ទាប់មកយក key ទាំងនេះមកដាក់ក្នុង `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

បើអ្នកចង់ ខ្ញុំអាចបន្តជួយអ្នកជំហានបន្ទាប់បានទៀត:

1. ប្រាប់របៀបចុចបង្កើត Supabase ម្តងមួយជំហាន
2. រៀប sample product data សម្រាប់ import
3. រៀប Vercel deploy steps
