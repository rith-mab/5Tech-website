import { z } from "zod";

export const specSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1)
});

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().min(2),
  category_id: z.string().min(1),
  price: z.number().nonnegative(),
  short_description: z.string().min(4),
  description: z.string().min(10),
  image_url: z.string().url(),
  featured: z.boolean(),
  trending: z.boolean(),
  specs: z.array(specSchema),
  features: z.array(z.string().min(1))
});

export const categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(4)
});
