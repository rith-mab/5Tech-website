"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminCategoryList({
  categories
}: Readonly<{
  categories: Category[];
}>) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const removeCategory = async (id: string) => {
    if (!token) {
      setStatus("Enter the admin access token before deleting a category.");
      return;
    }

    setStatus("Deleting category...");
    const response = await fetch(`/api/categories?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json();
    setStatus(response.ok ? "Category deleted. Refresh the page to see the latest list." : result.error || "Unable to delete category.");
  };

  return (
    <div className="rounded-[28px] border bg-card p-6">
      <h2 className="text-lg font-semibold">Current categories</h2>
      <Input
        type="password"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        placeholder="Admin access token for delete"
        className="mt-4"
      />
      <div className="mt-4 space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-3 rounded-2xl bg-secondary/60 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => removeCategory(category.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
      {status ? <p className="mt-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
