"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AnimatedList } from "@/components/ui/animated-list";

export function AdminProductList({
  products
}: Readonly<{
  products: Product[];
}>) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const removeProduct = async (id: string) => {
    if (!token) {
      setStatus("Enter the admin access token before deleting a product.");
      return;
    }

    setStatus("Deleting product...");
    const response = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (response.ok) {
      setStatus("Product deleted successfully.");
      router.refresh();
    } else {
      setStatus(result.error || "Unable to delete product.");
    }
  };

  return (
    <div className="rounded-[28px] border bg-card p-6">
      <h2 className="text-lg font-semibold">Current products</h2>
      <Input
        type="password"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        placeholder="Admin access token for delete"
        className="mt-4"
      />
      
      <div className="mt-4">
        <AnimatedList
          items={products}
          onItemSelect={(product) => {
            router.push(`/admin/products?id=${product.id}`);
          }}
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProduct(product.id);
                }}
                className={isSelected ? "bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" : ""}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </div>
      {status ? <p className="mt-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
