"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { AnimatedList } from "@/components/ui/animated-list";
import { ProductActions } from "@/components/admin/product-actions";

export function RecentProductsList({
  products
}: {
  products: Product[];
}) {
  return (
    <AnimatedList
      items={products}
      renderItem={(product, index, isSelected) => (
        <div
          className={`flex flex-col gap-3 rounded-2xl p-4 md:flex-row md:items-center md:justify-between transition-all duration-200 border ${
            isSelected
              ? "bg-emerald-50/70 border-emerald-200/60 shadow-sm"
              : "bg-secondary/60 border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.image_url}
                alt={product.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className={`font-medium transition-colors ${isSelected ? "text-emerald-900" : "text-gray-900"}`}>
                {product.name}
              </p>
              <p className={`text-sm transition-colors ${isSelected ? "text-emerald-700/80" : "text-muted-foreground"}`}>
                {product.category_name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <span className={`font-semibold transition-colors ${isSelected ? "text-emerald-900" : "text-gray-900"}`}>
              ${product.price.toFixed(2)}
            </span>
            <ProductActions productId={product.id} productSlug={product.slug} />
          </div>
        </div>
      )}
    />
  );
}
