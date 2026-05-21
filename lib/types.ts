export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_name: string;
  price: number;
  short_description: string;
  description: string;
  image_url: string;
  featured: boolean;
  trending: boolean;
  specs: Array<{ label: string; value: string }>;
  features: string[];
};

export type ProductPayload = Omit<Product, "category_name">;
