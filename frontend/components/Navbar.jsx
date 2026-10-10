"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Layers,
  Droplets,
  Wrench,
  Grid3X3,
  Home,
  Info,
  PhoneCall,
  LogIn,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const categories = [
    {
      name: "Kalebodur & Seramik",
      slug: "kalebodur",
      icon: "🏛️",
      desc: "60x120 Mermer desenli & Safir lacivert zemin seramikleri"
    },
    {
      name: "Duşakabin Sistemleri",
      slug: "dusakabin",
      icon: "🚿",
      desc: "Temperli cam, siyah/gold profil & oval/kare modeller"
    },
    {
      name: "Banyo Dolapları",
      slug: "banyo-dolaplari",
      icon: "🗄️",
      desc: "Safir Lacivert lake, mermer tezgahlı & LED aynalı dolaplar"
    },
    {
      name: "Musluk & Bataryalar",
      slug: "musluk-batarya",
      icon: "🚰",
      desc: "Şelale akışlı, pirinç gövdeli & mat siyah/gold bataryalar"
    },
    {
      name: "Tuvalet & Klozet",
      slug: "klozet-tuvalet",
      icon: "🚽",
      desc: "Rimless kanalsız asma klozetler & akıllı taharet sistemleri"
    },
    {
      name: "Seramik Lavabolar",
      slug: "seramik-lavabo",
      icon: "🪞",
      desc: "Tezgah üstü çanak lavabolar & mat lacivert/antrasit tasarımlar"
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-lacivert-950/95 backdrop-blur-md border-b border-stone-200 dark:border-lacivert-900 shadow-sm transition-colors">
      {/* Top Bar with Promo & Fast Contact */}
      <div className="bg-gradient-to-r from-lacivert-950 via-lacivert-900 to-slate-900 text-white text-xs py-2 px-4 border-b border-lacivert-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-medium text-stone-200 hidden sm:inline">
              2026 Koleksiyonu:
            </span>
            <span className="font-semibold text-white">
              Safir Lacivert Banyo Dolapları & Mermer Desen Seramiklerde %15 Lansman İndirimi!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-300">
            <Link
              href="/contact"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>0850 302 45 45</span>
            </Link>
            <span className="text-lacivert-700">|</span>
            <span className="text-stone-300 font-medium">Hızlı Teslimat & Paletli Kargo</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 py-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lacivert-900 via-lacivert-700 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:shadow-blue-500/20 group-hover:scale-105 transition-all">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-lacivert-900 to-lacivert-600 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                METE
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-lacivert-800 dark:bg-lacivert-800 dark:text-blue-300 border border-blue-200 dark:border-lacivert-700">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 -mt-1 tracking-wider uppercase">
              Banyo & Seramik
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-medium text-sm">
          {/* Ürünlerimiz Mega Dropdown */}
          <div className="relative" ref={dropdownRef} onMouseLeave={() => setDropdownOpen(false)}>
            <div className="flex items-center">
              <Link
                href="/products"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  dropdownOpen || pathname.startsWith("/products")
                    ? "text-lacivert-700 bg-lacivert-50 dark:text-blue-400 dark:bg-lacivert-900/60"
                    : "text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40"
                }`}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <Grid3X3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Ürünlerimiz</span>
              </Link>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="p-1 -ml-1 text-stone-400 hover:text-blue-600 focus:outline-none"
                aria-label="Kategorileri Göster"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-blue-600" : "text-stone-400"
                  }`}
                />
              </button>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute left-0 top-full mt-1.5 w-[540px] bg-white dark:bg-lacivert-950 border border-stone-200 dark:border-lacivert-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="col-span-2 pb-2 mb-1 border-b border-stone-100 dark:border-lacivert-900 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Kategori Seçimi (Her Kategoride 10 Çeşit)
                  </span>
                  <Link
                    href="/products"
                    onClick={() => setDropdownOpen(false)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    Tümünü Gör (60 Ürün)
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-lacivert-900/70 border border-transparent hover:border-stone-200 dark:hover:border-lacivert-800 transition-all group"
                  >
                    <span className="text-2xl p-2 rounded-lg bg-stone-100 dark:bg-lacivert-900 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cat.name}
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                  </Link>
                ))}

                <div className="col-span-2 pt-2 mt-1 border-t border-stone-100 dark:border-lacivert-900 bg-gradient-to-r from-lacivert-900 to-blue-900 text-white rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-semibold">Özel Safir Lacivert Koleksiyonu</span>
                  </div>
                  <Link
                    href="/products?color=lacivert"
                    onClick={() => setDropdownOpen(false)}
                    className="text-xs font-bold bg-white text-lacivert-900 px-3 py-1 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    Filtrele
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Direct Category Shortcuts for fast access */}
          <Link
            href="/products?category=kalebodur"
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === "/products" && typeof window !== "undefined" && window.location.search.includes("kalebodur")
                ? "text-blue-600 font-bold bg-blue-50 dark:bg-lacivert-900/60"
                : "text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40"
            }`}
          >
            Kalebodur
          </Link>

          <Link
            href="/products?category=dusakabin"
            className="px-3 py-2 rounded-lg text-sm text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40 transition-colors"
          >
            Duşakabin
          </Link>

          <Link
            href="/products?category=banyo-dolaplari"
            className="px-3 py-2 rounded-lg text-sm text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40 transition-colors"
          >
            Banyo Dolapları
          </Link>

          {/* Hakkımızda Link */}
          <Link
            href="/about"
            className={`px-3 py-2 rounded-lg text-sm transition-colors font-medium ${
              pathname === "/about"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-lacivert-900/60"
                : "text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40"
            }`}
          >
            Hakkımızda
          </Link>

          {/* İletişim Link */}
          <Link
            href="/contact"
            className={`px-3 py-2 rounded-lg text-sm transition-colors font-medium ${
              pathname === "/contact"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-lacivert-900/60"
                : "text-stone-700 dark:text-stone-200 hover:text-lacivert-600 hover:bg-stone-50 dark:hover:bg-lacivert-900/40"
            }`}
          >
            İletişim
          </Link>
        </nav>

        {/* Right Side Action Items */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <ThemeToggle />

          {/* Favoriler Icon */}
          <Link
            href="/favorites"
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-red-500 rounded-xl hover:bg-stone-100 dark:hover:bg-lacivert-900 transition-colors"
            title="Favorilerim"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Sepet Icon with Counter Badge */}
          <Link
            href="/cart"
            className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-stone-100 dark:hover:bg-lacivert-900 transition-colors"
            title="Sepetim"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication & Profile State */}
          {user ? (
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-stone-200 dark:border-lacivert-800">
              {(user.role === "ADMIN" || user.role === "EMPLOYEE") && (
                <Link
                  href="/admin"
                  className="px-2.5 py-1.5 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-lacivert-900 hover:bg-blue-100 rounded-lg flex items-center gap-1 font-bold text-xs border border-blue-200 dark:border-lacivert-700 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Yönetim</span>
                </Link>
              )}

              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-lacivert-900 text-stone-800 dark:text-stone-200 transition-colors"
                title="Profilim"
              >
                <div className="w-7 h-7 rounded-full bg-lacivert-800 text-white flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-xs font-semibold max-w-[90px] truncate hidden md:inline">
                  {user.name || "Kullanıcı"}
                </span>
              </Link>

              <button
                onClick={logout}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-stone-200 dark:border-lacivert-800">
              <Link
                href="/login"
                className="px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-lacivert-700 text-xs font-bold rounded-lg hover:bg-stone-100 dark:hover:bg-lacivert-900 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-stone-500" />
                <span>Giriş Yap</span>
              </Link>

              <Link
                href="/register"
                className="px-3.5 py-2 bg-gradient-to-r from-lacivert-900 to-blue-700 hover:from-lacivert-950 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Kayıt Ol</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-lacivert-900 rounded-xl lg:hidden focus:outline-none"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-lacivert-800 bg-white dark:bg-lacivert-950 px-4 pt-4 pb-8 space-y-6 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Auth Bar */}
          <div className="p-3 bg-stone-50 dark:bg-lacivert-900/60 rounded-2xl border border-stone-200 dark:border-lacivert-800">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lacivert-800 text-white flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-white">
                      {user.name || "Kullanıcı"}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(user.role === "ADMIN" || user.role === "EMPLOYEE") && (
                    <Link
                      href="/admin"
                      className="p-2 text-blue-600 bg-blue-100 dark:bg-lacivert-800 rounded-lg text-xs font-bold"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg"
                    title="Çıkış"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="w-full py-2.5 text-center text-xs font-bold text-stone-800 dark:text-stone-100 bg-white dark:bg-lacivert-800 border border-stone-200 dark:border-lacivert-700 rounded-xl"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          {/* Categories in Mobile */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Ürün Kategorileri
              </span>
              <Link
                href="/products"
                className="text-xs font-bold text-blue-600 dark:text-blue-400"
              >
                Tümünü Gör (60 Ürün) &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-lacivert-900/50 border border-stone-200/80 dark:border-lacivert-800/80 hover:border-blue-500 transition-colors"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-white">
                      {cat.name}
                    </p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">
                      10 Model & Çeşit
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* General Navigation Links */}
          <div className="space-y-1 pt-2 border-t border-stone-100 dark:border-lacivert-900">
            <Link
              href="/products?color=lacivert"
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-900/10 to-indigo-900/10 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Safir Lacivert Koleksiyonu</span>
              </div>
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                Yeni
              </span>
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-3 p-3 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-lacivert-900 text-sm font-semibold transition-colors"
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>Hakkımızda & Fabrika</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 p-3 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-lacivert-900 text-sm font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-stone-400" />
              <span>İletişim & Showroom</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
