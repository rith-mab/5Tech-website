"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Category, Product } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import { parsePriceSearch } from "@/lib/products";

export function SearchFilterBar({
  categories,
  products = []
}: Readonly<{
  categories: Category[];
  products?: Product[];
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryParam = searchParams.get("category") ?? "";
  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const activeSearch = searchParams.get("search") ?? "";
  const activePrice = searchParams.get("price") ?? "";

  const [query, setQuery] = useState(activeSearch);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [priceQuery, setPriceQuery] = useState(activePrice);
  const [showPriceSuggestions, setShowPriceSuggestions] = useState(false);
  const priceContainerRef = useRef<HTMLDivElement>(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  // Debounce search input changes to filter instantly as they type
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query !== activeSearch) {
        updateParam("search", query);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query, activeSearch]);

  // Sync state if URL changes externally
  useEffect(() => {
    if (activeSearch !== query) {
      setQuery(activeSearch);
    }
  }, [activeSearch]);

  // Debounce price input changes to filter budget instantly as they type
  useEffect(() => {
    const handler = setTimeout(() => {
      if (priceQuery !== activePrice) {
        updateParam("price", priceQuery);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [priceQuery, activePrice]);

  // Sync state if URL changes externally
  useEffect(() => {
    if (activePrice !== priceQuery) {
      setPriceQuery(activePrice);
    }
  }, [activePrice]);

  // Close suggestions and dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (priceContainerRef.current && !priceContainerRef.current.contains(event.target as Node)) {
        setShowPriceSuggestions(false);
      }
      if (categoryContainerRef.current && !categoryContainerRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
    // Force Next.js App Router cache bust
    router.refresh();
  };

  const suggestions = query.trim()
    ? products
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.category_name && product.category_name.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const parsedPrice = parsePriceSearch(priceQuery);
  const priceSuggestions = priceQuery.trim()
    ? products
        .filter((product) => {
          if (parsedPrice) {
            return parsedPrice.operator === "le"
              ? product.price <= parsedPrice.value
              : product.price >= parsedPrice.value;
          }
          return false;
        })
        .slice(0, 6)
    : [];

  return (
    <div className="space-y-4 rounded-[28px] border bg-card p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Text Search */}
        <div ref={containerRef} className="relative z-30">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products..."
              className="pl-11 pr-4 rounded-full"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateParam("search", query);
                  setShowSuggestions(false);
                }
              }}
            />
          </label>

          {/* Autocomplete Dropdown for Text Search */}
          {showSuggestions && query.trim() && (
            <div className="absolute left-0 right-0 z-50 mt-2 max-h-[340px] overflow-y-auto rounded-[24px] border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Suggestions
              </div>
              
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    updateParam("search", query);
                    setShowSuggestions(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                >
                  <Search className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Search for &ldquo;<span className="font-semibold">{query}</span>&rdquo;</span>
                </button>

                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setShowSuggestions(false);
                      router.push(`/products/${product.slug}`);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-emerald-50/70 hover:text-emerald-950 transition-colors group"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border bg-white">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate group-hover:text-emerald-700/80">
                        {product.category_name}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#84cc16] bg-[#84cc16]/10 px-2.5 py-1 rounded-full group-hover:bg-[#84cc16]/20 transition-colors">
                      ${product.price.toFixed(2)}
                    </span>
                  </button>
                ))}

                {suggestions.length === 0 && (
                  <div className="px-3 py-4 text-center text-sm text-gray-400">
                    No matching products found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Middle: Price Search */}
        <div ref={priceContainerRef} className="relative z-30">
          <label className="relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">$</span>
            <Input
              value={priceQuery}
              onChange={(event) => {
                setPriceQuery(event.target.value);
                setShowPriceSuggestions(true);
              }}
              onFocus={() => setShowPriceSuggestions(true)}
              placeholder="input your budget here..."
              className="pl-8 pr-4 rounded-full"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateParam("price", priceQuery);
                  setShowPriceSuggestions(false);
                }
              }}
            />
          </label>

          {/* Autocomplete Dropdown for Price Search */}
          {showPriceSuggestions && priceQuery.trim() && (
            <div className="absolute left-0 right-0 z-50 mt-2 max-h-[340px] overflow-y-auto rounded-[24px] border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Price Suggestions
              </div>
              
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    updateParam("price", priceQuery);
                    setShowPriceSuggestions(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                >
                  <Search className="h-4 w-4 shrink-0 text-emerald-500" />
                  {parsedPrice ? (
                    <span>
                      Show products with price{" "}
                      <span className="font-semibold">
                        {parsedPrice.operator === "le" ? "<=" : ">="} ${parsedPrice.value}
                      </span>
                    </span>
                  ) : (
                    <span>
                      Filter by price: &ldquo;<span className="font-semibold">{priceQuery}</span>&rdquo;
                    </span>
                  )}
                </button>

                {priceSuggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setShowPriceSuggestions(false);
                      router.push(`/products/${product.slug}`);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-emerald-50/70 hover:text-emerald-950 transition-colors group"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border bg-white">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate group-hover:text-emerald-700/80">
                        {product.category_name}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#84cc16] bg-[#84cc16]/10 px-2.5 py-1 rounded-full group-hover:bg-[#84cc16]/20 transition-colors">
                      ${product.price.toFixed(2)}
                    </span>
                  </button>
                ))}

                {priceSuggestions.length === 0 && (
                  <div className="px-3 py-4 text-center text-sm text-gray-400">
                    No products match this price filter.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Category Dropdown */}
        <div ref={categoryContainerRef} className="relative z-30">
          <button
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex w-full items-center justify-between rounded-full border border-input bg-background px-4 py-2 text-sm shadow-sm transition hover:bg-accent hover:text-accent-foreground h-10 w-full"
          >
            <span className="truncate text-gray-700">
              {selectedCategories.length > 0
                ? `${selectedCategories.join(", ")}`
                : "Filter by category"}
            </span>
            {showCategoryDropdown ? (
              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground ml-2" />
            )}
          </button>

          {showCategoryDropdown && (
            <div className="absolute left-0 right-0 z-50 mt-2 max-h-[300px] overflow-y-auto rounded-[24px] border border-gray-100 bg-white p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Reset to All option */}
              <button
                type="button"
                onClick={() => {
                  updateParam("category", "all");
                  setShowCategoryDropdown(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50/50 transition-colors font-semibold"
              >
                Clear all filters
              </button>

              <div className="h-px bg-gray-100 my-1.5" />

              <div className="space-y-1">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.name);
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        let nextCategories: string[];
                        if (isSelected) {
                          nextCategories = selectedCategories.filter((name) => name !== category.name);
                        } else {
                          nextCategories = [...selectedCategories, category.name];
                        }
                        updateParam("category", nextCategories.join(","));
                      }}
                      className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <div className={cn(
                        "h-4 w-4 shrink-0 rounded border flex items-center justify-center transition-colors",
                        isSelected 
                          ? "border-[#39b54a] bg-[#39b54a] text-white" 
                          : "border-gray-300 bg-white"
                      )}>
                        {isSelected && (
                          <Check className="h-3 w-3 stroke-[3]" />
                        )}
                      </div>
                      <span className={cn("flex-1 truncate", isSelected && "font-medium text-gray-900")}>
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
