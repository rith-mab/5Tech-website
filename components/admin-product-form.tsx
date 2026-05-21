"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";

function generateId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15);
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function AdminProductForm({
  product,
  categories
}: Readonly<{
  product?: Product;
  categories: Array<{ id: string; name: string }>;
}>) {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [tokenStatus, setTokenStatus] = useState<"idle" | "verifying" | "valid" | "invalid">("idle");

  // Controlled Form States
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  // Dropdown States
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategoryName = categories.find(c => c.id === selectedCategoryId)?.name ?? "Select category";

  // Sync state values when product prop changes (Edit/Add switch)
  useEffect(() => {
    setId(product?.id || generateId());
    setName(product?.name ?? "");
    setSlug(product?.slug ?? "");
    setSelectedCategoryId(product?.category_id ?? "");
    setPrice(product?.price ? String(product.price) : "");
    setImageUrl(product?.image_url ?? "");
    setDescription(product?.description ?? "");
    setFeatured(product?.featured ?? false);
    setTrending(product?.trending ?? false);
    setSpecs(product?.specs ?? []);
    setFeatures(product?.features ?? []);
    setNewFeature("");
  }, [product]);

  // Real-time server-side Token Verification
  useEffect(() => {
    if (!adminToken) {
      setTokenStatus("idle");
      return;
    }

    setTokenStatus("verifying");
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        if (response.ok) {
          setTokenStatus("valid");
        } else {
          setTokenStatus("invalid");
        }
      } catch {
        setTokenStatus("invalid");
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [adminToken]);

  const generateAutoDescription = () => {
    if (!name) {
      setStatus("Please enter the product name first to generate a description.");
      return;
    }
    const categoryName = categories.find(c => c.id === selectedCategoryId)?.name || "general accessories";
    const templates = [
      `High-quality ${name} designed for optimal performance. An essential choice for ${categoryName} enthusiasts seeking reliability, style, and great value.`,
      `Premium ${name} built with top-tier materials. Fits perfectly in any modern setup and delivers exceptional durability for your daily ${categoryName} needs.`,
      `Upgrade your workflow with this high-performance ${name}. Crafted for maximum efficiency, sleek aesthetics, and seamless compatibility.`
    ];
    const index = name.length % templates.length;
    setDescription(templates[index]);
    setStatus("Description auto-generated!");
  };

  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
    if (tokenStatus !== "valid") {
      setStatus("Please enter a valid Admin Access Token first.");
      return;
    }
    setImageUploading(true);
    setStatus("Uploading image...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: formData
      });
      const result = await response.json();
      if (response.ok && result.url) {
        setImageUrl(result.url);
        setStatus("Image uploaded.");
      } else {
        setStatus(result.error || "Image upload failed.");
      }
    } catch {
      setStatus("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const clearForm = () => {
    setId(generateId());
    setName("");
    setSlug("");
    setSelectedCategoryId("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setFeatured(false);
    setTrending(false);
    setSpecs([]);
    setFeatures([]);
    setNewFeature("");
    if (product) {
      router.push("/admin/products");
    }
  };

  return (
    <form
      className="space-y-4 rounded-[28px] border bg-card p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        if (tokenStatus !== "valid") {
          setStatus("Please enter a valid Admin Access Token first.");
          return;
        }
        if (!selectedCategoryId) {
          setStatus("Please select a category.");
          return;
        }
        setStatus("Saving...");
        
        const payload = {
          id: id,
          name: name,
          slug: slug,
          category_id: selectedCategoryId,
          price: Number(price || 0),
          short_description: product?.short_description || description.slice(0, 150),
          description: description,
          image_url: imageUrl,
          featured: featured,
          trending: trending,
          specs: specs,
          features: features
        };

        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok) {
          setStatus("Saved successfully.");
          clearForm();
          router.refresh();
        } else {
          const errorMessage = typeof result.error === 'string' ? result.error : JSON.stringify(result.error);
          setStatus(errorMessage || "Unable to save product.");
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      {/* Admin Access Token - Filled First */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-500">Admin Access Token</label>
          {tokenStatus === "verifying" && (
            <span className="text-xs text-gray-400 animate-pulse">Checking token...</span>
          )}
          {tokenStatus === "valid" && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              ● Verified
            </span>
          )}
          {tokenStatus === "invalid" && (
            <span className="text-xs font-semibold text-red-500">
              ● Invalid Token
            </span>
          )}
        </div>
        <Input
          name="admin_token"
          type="password"
          value={adminToken}
          onChange={(event) => setAdminToken(event.target.value)}
          placeholder="Enter Admin Access Token first to unlock uploading and saving..."
          required
          className={`transition-all duration-200 ${
            tokenStatus === "valid"
              ? "border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50/10"
              : tokenStatus === "invalid"
              ? "border-red-500 focus-visible:ring-red-500 bg-red-50/10"
              : ""
          }`}
        />
        
        {/* Verification Alert Banner */}
        {tokenStatus === "valid" && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5 text-emerald-600 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-medium">Admin Access Token verified! You can now upload images and save products.</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          name="name"
          value={name}
          onChange={(event) => {
            const val = event.target.value;
            setName(val);
            if (!product) {
              setSlug(slugify(val));
            }
          }}
          placeholder="Product name"
          required
        />
        <Input
          name="slug"
          value={slug}
          onChange={(event) => setSlug(slugify(event.target.value))}
          placeholder="Slug"
          required
        />
        
        {/* Custom Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-full items-center justify-between rounded-full border bg-background px-4 text-sm hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <span className={selectedCategoryId ? "text-gray-900" : "text-gray-400"}>
              {selectedCategoryName}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <>
              {/* Backdrop to close dropdown on click outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              
              <div className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-auto rounded-[20px] border border-gray-100 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId("");
                    setIsOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50 hover:text-emerald-700 transition-colors"
                >
                  Select category
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setIsOpen(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategoryId === category.id
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </>
          )}
          <input type="hidden" name="category_id" value={selectedCategoryId} />
        </div>

        <Input
          name="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Price"
          required
        />
        <Input name="image_url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Image URL" />
      </div>

      {/* Drag & Drop / Image Preview Container */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Product Image</label>
        
        {imageUrl ? (
          /* Preview Box */
          <div className="relative aspect-square w-full max-w-[240px] mx-auto overflow-hidden rounded-[24px] border bg-white shadow-md">
            <img src={imageUrl} alt="Uploaded product preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors text-base font-bold"
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          /* Drag & Drop Area */
          <div className="flex flex-col items-center gap-3">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
              className={`relative flex aspect-square w-full max-w-[240px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed p-6 text-center transition-all duration-200 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50 scale-[1.02]"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#84cc16] text-[#84cc16]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">Drag files to upload</p>
              </div>
            </div>
            
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (file) {
                  await uploadFile(file);
                }
              }}
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-input")?.click()}
              className="rounded-xl bg-[#84cc16] hover:bg-[#65a30d] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              Choose File
            </button>
          </div>
        )}
        
        {imageUploading ? (
          <p className="text-center text-xs text-muted-foreground animate-pulse">
            Uploading to Supabase Storage...
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-500">Product description</label>
          <button
            type="button"
            onClick={generateAutoDescription}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
          >
            ✨ Auto Generate
          </button>
        </div>
        <Textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Product description"
          required
          rows={3}
        />
      </div>

      {/* Specifications Section */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-500">Specifications (Key-Value)</label>
          <button
            type="button"
            onClick={() => setSpecs([...specs, { label: "", value: "" }])}
            className="text-xs font-semibold text-[#39b54a] hover:underline flex items-center gap-1"
          >
            + Add Spec Row
          </button>
        </div>
        
        {specs.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No specifications added yet. Will show default Model name only.</p>
        ) : (
          <div className="space-y-2">
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Label (e.g. Weight)"
                  value={spec.label}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index] = { ...newSpecs[index], label: e.target.value };
                    setSpecs(newSpecs);
                  }}
                  className="flex-1 h-9 rounded-xl"
                />
                <Input
                  placeholder="Value (e.g. 240g)"
                  value={spec.value}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index] = { ...newSpecs[index], value: e.target.value };
                    setSpecs(newSpecs);
                  }}
                  className="flex-1 h-9 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSpecs(specs.filter((_, i) => i !== index));
                  }}
                  className="p-1 text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Core Features Section */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="text-sm font-semibold text-gray-500">Core Features</label>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add a key feature (e.g. Noise Cancelling)..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (newFeature.trim()) {
                  setFeatures([...features, newFeature.trim()]);
                  setNewFeature("");
                }
              }
            }}
            className="h-9 rounded-xl"
          />
          <button
            type="button"
            onClick={() => {
              if (newFeature.trim()) {
                setFeatures([...features, newFeature.trim()]);
                setNewFeature("");
              }
            }}
            className="rounded-full bg-[#39b54a] text-white px-4 hover:bg-emerald-600 text-xs font-semibold h-9"
          >
            Add
          </button>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {features.map((feat, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700"
              >
                {feat}
                <button
                  type="button"
                  onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                  className="hover:text-red-600 font-black text-sm shrink-0"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2 text-sm">
          <input
            name="featured"
            type="checkbox"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="trending"
            type="checkbox"
            checked={trending}
            onChange={(event) => setTrending(event.target.checked)}
          />
          Trending
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit">Save Product</Button>
        <button
          type="button"
          onClick={clearForm}
          className="rounded-full border px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
