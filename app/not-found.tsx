import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">404</p>
      <h1 className="text-4xl font-semibold">Product or page not found</h1>
      <p className="max-w-xl text-muted-foreground">
        The link may be outdated, or this product is no longer available in the current catalog.
      </p>
      <Button asChild>
        <Link href="/products">Return to products</Link>
      </Button>
    </div>
  );
}
