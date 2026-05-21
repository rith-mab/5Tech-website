import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product
}: Readonly<{
  product: Product;
}>) {
  return (
    <article className="group overflow-hidden rounded-[24px] border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge className="text-[10px] px-2 py-0.5">{product.category_name}</Badge>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold truncate">{product.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.short_description}</p>
          </div>
          <p className="text-sm font-semibold text-primary shrink-0">{formatPrice(product.price)}</p>
        </div>
        <Button asChild variant="ghost" className="h-auto px-0 text-primary text-xs">
          <Link href={`/products/${product.slug}`} className="gap-1">
            View details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
