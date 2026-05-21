"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ShoppingBag,
  Cpu, 
  Truck, 
  ShieldCheck, 
  CreditCard,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/your_username";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: Readonly<ProductDetailsClientProps>) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [showTelegramNote, setShowTelegramNote] = useState(false);

  // Zoom state variables
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Thumbnail image views using scale overrides to create professional detailed shots
  const thumbnails = [
    { label: "Main View", style: "object-contain p-6 scale-100" },
    { label: "Close Up", style: "object-contain p-6 scale-[1.3] origin-center" },
    { label: "Angled Details", style: "object-contain p-6 scale-[1.4] origin-top" }
  ];

  const transformStyle = isZoomed
    ? `scale(1.8)`
    : activeImgIndex === 1
    ? `scale(1.3) translateY(10px)`
    : activeImgIndex === 2
    ? `scale(1.4) translateY(-10px)`
    : `scale(1)`;

  const specsList = product.specs && product.specs.length > 0 ? product.specs : [
    { label: "Model", value: product.name }
  ];

  const reviews = [
    {
      id: 1,
      author: "Dara S.",
      rating: 5,
      date: "May 12, 2026",
      text: "The audio quality is absolutely stunning for this price point! Extremely comfortable for long hours of gaming. Highly recommend 5Tech Store!"
    },
    {
      id: 2,
      author: "Sophea K.",
      rating: 4,
      date: "May 09, 2026",
      text: "Very lightweight and the mic quality is crystal clear. Delivery in Phnom Penh was super fast (less than 2 hours!)."
    },
    {
      id: 3,
      author: "Rithy N.",
      rating: 5,
      date: "April 28, 2026",
      text: "Excellent product! RGB lighting looks neat, and the 7.1 surround sound makes a huge difference in FPS games."
    }
  ];

  // Old price calculation for discounts
  const discountPercentage = 25;
  const oldPrice = product.price / (1 - discountPercentage / 100);

  return (
    <div className="relative min-h-screen pt-28 pb-16 lg:pt-36">
      {/* Premium Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.25]">
        <Particles 
          particleCount={60} 
          particleColors={["#39b54a", "#2e7d32", "#a5d6a7"]}
          particleBaseSize={80}
          speed={0.15}
          cameraDistance={25}
        />
      </div>

      <div className="page-shell relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs / Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-[#39b54a] transition-colors group bg-white/40 dark:bg-black/20 backdrop-blur-md border border-gray-100/50 px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to products
          </Link>
        </motion.div>

        {/* Main Product Layout Section */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* LEFT: Image Gallery (Grid column 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Main Stage Image with Zoom */}
            <div className="relative aspect-square overflow-hidden rounded-[32px] border border-gray-200/50 bg-white/70 backdrop-blur-md shadow-lg group">
              
              {/* Product Badge */}
              <div className="absolute left-5 top-5 z-20 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-[#39b54a] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                    Best Seller
                  </span>
                )}
                {product.trending && (
                  <span className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Trending
                  </span>
                )}
                {!product.featured && !product.trending && (
                  <span className="bg-[#84cc16] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Hover Zoom Interactive Wrapper */}
              <div 
                className="relative w-full h-full cursor-zoom-in overflow-hidden"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    transform: transformStyle,
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                  }}
                  className={cn(
                    "w-full h-full object-contain p-8 transition-transform duration-150 ease-out",
                    activeImgIndex === 1 && "scale-[1.3] origin-center",
                    activeImgIndex === 2 && "scale-[1.4] origin-top"
                  )}
                />
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-3 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIndex(idx)}
                  className={cn(
                    "relative aspect-square rounded-2xl border bg-white/60 backdrop-blur-md overflow-hidden transition-all duration-300 p-2",
                    activeImgIndex === idx 
                      ? "border-[#39b54a] ring-2 ring-[#39b54a]/20 scale-102 shadow-md" 
                      : "border-gray-200/50 hover:border-gray-300 hover:scale-101"
                  )}
                >
                  <img
                    src={product.image_url}
                    alt={`${product.name} thumbnail ${idx}`}
                    className={cn("w-full h-full object-contain", thumb.style)}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Information (Grid column 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Category */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                {product.category_name}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 p-4 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 w-fit">
                <span className="text-3xl sm:text-4xl font-black text-[#39b54a]">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Short description */}
              <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                {product.short_description || `Upgrade your experience with the high-performance ${product.name}. Engineered for premium comfort and unmatched fidelity.`}
              </p>

              {/* Availability Status */}
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                In Stock & Ready to Ship
              </div>
            </div>

            {/* Interactive Buy Section */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              
              {/* Description & Specifications Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Description & Features */}
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <h2 className="text-sm font-black tracking-tight text-gray-950 uppercase">
                    Product Description
                  </h2>
                  <p className="text-xs sm:text-sm">{product.description}</p>
                  {product.features && product.features.length > 0 && (
                    <div className="pt-2">
                      <h3 className="font-extrabold text-gray-950 text-[10px] uppercase tracking-wider mb-2">Core Features:</h3>
                      <ul className="space-y-1">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#39b54a]" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Specifications */}
                <div className="space-y-3">
                  <h2 className="text-sm font-black tracking-tight text-gray-950 uppercase">
                    Specifications
                  </h2>
                  <div className="grid gap-2">
                    {specsList.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-gray-250/30 rounded-xl px-3 py-1.5 shadow-xs">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                        <span className="text-xs font-semibold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Telegram Support CTA */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    setShowTelegramNote(true);
                    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
                  }}
                  className="w-full rounded-full h-12 text-sm font-bold bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-md shadow-[#0088cc]/10 transition-all duration-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Contact via Telegram
                </Button>
                
                <AnimatePresence>
                  {showTelegramNote && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-muted-foreground font-semibold bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5"
                    >
                      Interested? Screenshot this product and send it via Telegram for instant ordering.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>


        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-gray-100 space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-gray-950">Related products</h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">Complete your battle station with these recommended tech items.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((p) => (
                <Link 
                  key={p.id} 
                  href={`/products/${p.slug}`}
                  className="group relative rounded-[24px] border border-gray-200/40 bg-white/40 backdrop-blur-md p-3 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:shadow-emerald-500/2 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/30 mb-3 flex items-center justify-center p-4">
                    <img 
                      src={p.image_url} 
                      alt={p.name}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {p.category_name}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 mt-2 line-clamp-1 group-hover:text-[#39b54a] transition-colors">
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100/50">
                      <span className="text-sm font-black text-gray-900">${p.price}</span>
                      <span className="text-xs font-bold text-[#39b54a] group-hover:underline">
                        View details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
