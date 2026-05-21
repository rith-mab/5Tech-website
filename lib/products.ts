import { categories, products } from "@/lib/data/sample-products";
import { Product, ProductPayload } from "@/lib/types";
import { createServerSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/server";

type QueryOptions = {
  category?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  price?: string;
};

export function parsePriceFilter(search: string): { operator: "le" | "ge"; value: number } | null {
  const clean = search.toLowerCase().trim();

  const hasLessOrEqual = clean.includes("<=");
  const hasGreaterOrEqual = clean.includes(">=");
  const hasLess = clean.includes("<");
  const hasGreater = clean.includes(">");
  const hasDollar = clean.includes("$");

  if (!hasLessOrEqual && !hasGreaterOrEqual && !hasLess && !hasGreater && !hasDollar) {
    return null;
  }

  let operator: "le" | "ge" = "le"; // default to <= for budget
  if (hasGreaterOrEqual || hasGreater) {
    operator = "ge";
  } else if (hasLessOrEqual || hasLess) {
    operator = "le";
  }

  const match = clean.match(/\d+(?:\.\d+)?/);
  if (match) {
    const value = parseFloat(match[0]);
    if (!isNaN(value)) {
      return { operator, value };
    }
  }

  return null;
}

export function parsePriceSearch(input: string): { operator: "le" | "ge"; value: number } | null {
  const clean = input.toLowerCase().trim();
  if (!clean) return null;

  const hasLessOrEqual = clean.includes("<=");
  const hasGreaterOrEqual = clean.includes(">=");
  const hasLess = clean.includes("<");
  const hasGreater = clean.includes(">");

  let operator: "le" | "ge" = "le"; // default to <= for budget
  if (hasGreaterOrEqual || hasGreater) {
    operator = "ge";
  } else if (hasLessOrEqual || hasLess) {
    operator = "le";
  }

  const match = clean.match(/\d+(?:\.\d+)?/);
  if (match) {
    const value = parseFloat(match[0]);
    if (!isNaN(value)) {
      return { operator, value };
    }
  }

  return null;
}

function matches(product: Product, options: QueryOptions) {
  const search = options.search?.toLowerCase().trim();
  let matchesSearch = true;

  if (search) {
    const priceFilter = parsePriceFilter(search);
    if (priceFilter) {
      matchesSearch = priceFilter.operator === "le"
        ? product.price <= priceFilter.value
        : product.price >= priceFilter.value;
    } else {
      matchesSearch = product.name.toLowerCase().includes(search)
        || product.short_description.toLowerCase().includes(search)
        || product.category_name.toLowerCase().includes(search);
    }
  }

  let matchesPrice = true;
  if (options.price) {
    const priceFilter = parsePriceSearch(options.price);
    if (priceFilter) {
      matchesPrice = priceFilter.operator === "le"
        ? product.price <= priceFilter.value
        : product.price >= priceFilter.value;
    }
  }

  const matchesCategory = !options.category || options.category === "all" || options.category.split(",").includes(product.category_name);
  const matchesFeatured = options.featured === undefined || product.featured === options.featured;
  const matchesTrending = options.trending === undefined || product.trending === options.trending;
  return matchesSearch && matchesPrice && matchesCategory && matchesFeatured && matchesTrending;
}

let cachedProducts: Product[] | null = null;
let lastFetchedProducts = 0;

let cachedCategories: any[] | null = null;
let lastFetchedCategories = 0;

const CACHE_TTL = 15000; // 15 seconds cache

async function fetchAllProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts && (now - lastFetchedProducts < CACHE_TTL)) {
    return cachedProducts;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return products;
  }

  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,category_id,price,short_description,description,image_url,featured,trending,specs,features,categories(name)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return products;
  }

  cachedProducts = data.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    category_id: item.category_id,
    category_name: (item.categories as { name?: string } | null)?.name ?? "Uncategorized",
    price: item.price,
    short_description: item.short_description,
    description: item.description,
    image_url: item.image_url,
    featured: item.featured,
    trending: item.trending,
    specs: Array.isArray(item.specs) ? item.specs : [],
    features: Array.isArray(item.features) ? item.features : []
  })) satisfies Product[];

  lastFetchedProducts = now;
  return cachedProducts;
}

async function fetchAllCategories() {
  const now = Date.now();
  if (cachedCategories && (now - lastFetchedCategories < CACHE_TTL)) {
    return cachedCategories;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return categories;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description")
    .order("name", { ascending: true });

  if (error || !data) {
    return categories;
  }

  cachedCategories = data;
  lastFetchedCategories = now;
  return cachedCategories;
}

export async function getProducts(options: QueryOptions = {}) {
  const allProducts = await fetchAllProducts();
  return allProducts.filter((product) => matches(product, options));
}

export async function getProductBySlug(slug: string) {
  const allProducts = await getProducts();
  return allProducts.find((item) => item.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 3) {
  const allProducts = await getProducts();
  const sameCategoryProducts = allProducts.filter(
    (item) => item.category_id === product.category_id && item.id !== product.id
  );
  
  if (sameCategoryProducts.length >= limit) {
    return sameCategoryProducts.slice(0, limit);
  }
  
  const otherProducts = allProducts.filter(
    (item) => item.category_id !== product.category_id && item.id !== product.id
  );
  
  const combined = [...sameCategoryProducts, ...otherProducts];
  return combined.slice(0, limit);
}

export async function getCategories() {
  return fetchAllCategories();
}

export async function saveProduct(payload: ProductPayload) {
  cachedProducts = null;
  cachedCategories = null;
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return { ok: false, error: "Supabase service role key is missing." };
  }

  const { error } = await supabase.from("products").upsert(payload, { onConflict: "id" });
  return { ok: !error, error: error?.message };
}

export async function deleteProduct(id: string) {
  cachedProducts = null;
  cachedCategories = null;
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return { ok: false, error: "Supabase service role key is missing." };
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  return { ok: !error, error: error?.message };
}
