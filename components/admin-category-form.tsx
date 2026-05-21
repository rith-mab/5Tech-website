"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AdminCategoryForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      className="space-y-4 rounded-[28px] border bg-card p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("Saving category...");
        const formData = new FormData(event.currentTarget);
        const payload = {
          id: String(formData.get("id") || ""),
          name: String(formData.get("name") || ""),
          slug: String(formData.get("slug") || ""),
          description: String(formData.get("description") || "")
        };

        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${formData.get("admin_token")}`
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        const errorMessage = typeof result.error === 'string' ? result.error : JSON.stringify(result.error);
        setStatus(response.ok ? "Category saved." : errorMessage || "Unable to save category.");
      }}
    >
      <h2 className="text-lg font-semibold">Manage category</h2>
      <Input name="id" placeholder="Category ID" />
      <Input name="name" placeholder="Category name" />
      <Input name="slug" placeholder="Category slug" />
      <Textarea name="description" placeholder="Category description" />
      <Input name="admin_token" type="password" placeholder="Admin access token" />
      <Button type="submit">Save Category</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
