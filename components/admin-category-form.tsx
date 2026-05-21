"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Helper to generate clean slugs from text (supporting English & Unicode/Khmer)
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // Keep Unicode letters/numbers, spaces, and hyphens
    .replace(/[\s_-]+/g, "-")          // Replace spaces, underscores, and consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, "");          // Trim hyphens from start/end
};

export function AdminCategoryForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [id, setId] = useState("");
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [isManualId, setIsManualId] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    
    // Auto-generate slug and ID if they haven't been manually edited
    const computedSlug = slugify(val);
    if (!isManualSlug) {
      setSlug(computedSlug);
    }
    if (!isManualId) {
      setId(computedSlug ? `cat-${computedSlug}` : "");
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSlug(val);
    setIsManualSlug(true);
    
    // Auto-link ID to slug if ID is not manually edited
    if (!isManualId) {
      setId(val ? `cat-${val}` : "");
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setIsManualId(true);
  };

  return (
    <form
      className="space-y-4 rounded-[28px] border bg-card p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("Saving category...");
        const formData = new FormData(event.currentTarget);
        const payload = {
          id: id.trim(),
          name: name.trim(),
          slug: slug.trim(),
          description: String(formData.get("description") || "")
        };

        if (!payload.name) {
          setStatus("Category name is required.");
          return;
        }
        if (!payload.slug) {
          setStatus("Category slug is required.");
          return;
        }
        if (!payload.id) {
          setStatus("Category ID is required.");
          return;
        }

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
        
        if (response.ok) {
          setStatus("Category saved successfully!");
          // Reset states
          setName("");
          setSlug("");
          setId("");
          setIsManualSlug(false);
          setIsManualId(false);
          event.currentTarget.reset();
          // Instantly refresh the parent Server Component's list
          router.refresh();
        } else {
          setStatus(errorMessage || "Unable to save category.");
        }
      }}
    >
      <h2 className="text-lg font-semibold mb-2">Manage category</h2>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Category name
        </label>
        <Input 
          name="name" 
          value={name} 
          onChange={handleNameChange} 
          placeholder="e.g., Computer Accessories" 
          required
        />
      </div>
      
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Category slug (Auto-generated)
        </label>
        <Input 
          name="slug" 
          value={slug} 
          onChange={handleSlugChange} 
          placeholder="e.g., computer-accessories" 
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Category ID (Auto-generated)
        </label>
        <Input 
          name="id" 
          value={id} 
          onChange={handleIdChange} 
          placeholder="e.g., cat-computer-accessories" 
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Category description
        </label>
        <Textarea 
          name="description" 
          placeholder="Description of the category..." 
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Admin access token
        </label>
        <Input 
          name="admin_token" 
          type="password" 
          placeholder="Enter admin access token" 
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-6 transition-all hover:shadow-lg shadow-emerald-700/20"
      >
        Save Category
      </Button>

      {status ? (
        <p className="text-sm font-medium text-center text-emerald-600 dark:text-emerald-400 mt-2">
          {status}
        </p>
      ) : null}
    </form>
  );
}
