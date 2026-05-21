import { getCategories, getProducts } from "@/lib/products";
import { Wallet, CreditCard, DollarSign, Activity, ChevronUp } from "lucide-react";
import Image from "next/image";
import SpotlightCard from "@/components/ui/spotlight-card";
import Link from "next/link";
import { RecentProductsList } from "@/components/admin/recent-products-list";

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good Morning, Admin ✨</h1>
        <p className="text-sm text-gray-500 mt-1">Here's an overview of your store's health and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <SpotlightCard className="rounded-2xl bg-white p-5 border shadow-sm" spotlightColor="rgba(16, 185, 129, 0.15)">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
              <ChevronUp className="h-3 w-3" />
            </div>
            <span>+12% from last month</span>
          </div>
        </SpotlightCard>

        {/* Card 2 */}
        <SpotlightCard className="rounded-2xl bg-white p-5 border shadow-sm" spotlightColor="rgba(16, 185, 129, 0.15)">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <h3 className="text-2xl font-bold text-gray-900">{categories.length}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-medium">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-50">
              <ChevronUp className="h-3 w-3" />
            </div>
            <span>Active categories</span>
          </div>
        </SpotlightCard>

        {/* Card 3 */}
        <SpotlightCard className="rounded-2xl bg-white p-5 border shadow-sm" spotlightColor="rgba(16, 185, 129, 0.15)">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <h3 className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
              <ChevronUp className="h-3 w-3" />
            </div>
            <span>Inventory value</span>
          </div>
        </SpotlightCard>

        {/* Card 4 */}
        <SpotlightCard className="rounded-2xl bg-white p-5 border shadow-sm" spotlightColor="rgba(16, 185, 129, 0.15)">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Price</p>
              <h3 className="text-2xl font-bold text-gray-900">${(products.length ? totalValue / products.length : 0).toFixed(2)}</h3>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <SpotlightCard className="rounded-2xl border bg-white p-6 shadow-sm" spotlightColor="rgba(16, 185, 129, 0.1)">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
          <Link href="/admin/products" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            View All
          </Link>
        </div>
        
        <div className="mt-4">
          <RecentProductsList products={products.slice(0, 5)} />
          {products.length === 0 && (
            <p className="text-center py-8 text-sm text-gray-500">No products found.</p>
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}
