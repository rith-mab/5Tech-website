"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductActions({
  productId,
  productSlug
}: {
  productId: string;
  productSlug: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const token = window.prompt("Enter admin access token to delete this product:");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product deleted successfully.");
        router.refresh();
      } else {
        alert(result.error || "Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/products/${productSlug}`}
        target="_blank"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-colors shadow-sm"
        title="View Product"
      >
        <Eye className="h-4 w-4" />
      </Link>
      <Link
        href={`/admin/products?id=${productId}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
        title="Edit Product"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50"
        title="Delete Product"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
