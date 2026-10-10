"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Layers, ShoppingBag, Users, ArrowLeft } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Genel Bakış", icon: Layers },
    { href: "/admin/products", label: "Ürün Yönetimi", icon: Package },
    { href: "/admin/stock", label: "Stok Takibi", icon: Layers },
    { href: "/admin/orders", label: "Siparişler", icon: ShoppingBag },
    { href: "/admin/users", label: "Kullanıcılar & Rol", icon: Users }
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="mb-8 px-4">
          <h2 className="text-xl font-bold text-amber-500">Admin Yönetim</h2>
          <p className="text-xs text-stone-400">Mete Ceramic Store</p>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-amber-600 text-white" : "hover:bg-stone-800 text-stone-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link href="/" className="flex items-center gap-2 px-4 py-3 text-stone-400 hover:text-white transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Mağazaya Dön
      </Link>
    </aside>
  );
}
