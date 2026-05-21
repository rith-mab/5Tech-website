import { EmptyState } from "@/components/empty-state";
import { PaginationControls } from "@/components/pagination-controls";
import { ProductGrid } from "@/components/product-grid";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { SectionHeading } from "@/components/section-heading";
import { getCategories, getProducts } from "@/lib/products";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 15;

export default async function ProductsPage({
  searchParams
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const price = typeof params.price === "string" ? params.price : undefined;
  const page = Number(typeof params.page === "string" ? params.page : "1") || 1;

  try {
    const fs = require("fs");
    const logMsg = `[${new Date().toISOString()}] PAGE REQUEST: category=${category}, search=${search}, price=${price}, page=${page}\n`;
    fs.appendFileSync("d:/5tech website/debug.log", logMsg);
  } catch (e) {}

  const [products, categories, allProducts] = await Promise.all([
    getProducts({ category, search, price }),
    getCategories(),
    getProducts()
  ]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const query = new URLSearchParams();

  if (category) query.set("category", category);
  if (search) query.set("search", search);
  if (price) query.set("price", price);

  return (
    <div className="page-shell space-y-8 pt-32 pb-12 lg:pt-40">

      <SearchFilterBar categories={categories} products={allProducts} />
      {visibleProducts.length > 0 ? <ProductGrid products={visibleProducts} /> : <EmptyState title="No products found" description="Try another keyword or switch to a different category." />}
      <PaginationControls currentPage={currentPage} totalPages={totalPages} basePath="/products" params={query} />
    </div>
  );
}
