"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Grid, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Grid },
  ];

  return (
    <aside className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center w-full px-2">
          <img src="/logos/logo-wide.png" alt="5Tech Admin Logo" className="h-10 w-auto object-contain" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-4 space-y-1">
        <p className="px-2 text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">Menu</p>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-emerald-50 text-emerald-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Back to Store
        </Link>
      </div>
    </aside>
  );
}
