import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

export function ProductGrid({
  products
}: Readonly<{
  products: Product[];
}>) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
