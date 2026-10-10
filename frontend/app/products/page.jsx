"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import {
  Search,
  Sparkles,
  Filter,
  SlidersHorizontal,
  X,
  Layers,
  Droplets,
  Box,
  Compass,
  CheckCircle2,
  RotateCcw,
  Tag
} from "lucide-react";
import { initialProducts } from "@/lib/products-data";

// Helper to safely match product category
function matchProductCategory(product, targetCat) {
  if (!targetCat || targetCat === "all") return true;
  if (targetCat === "test-10") return true; // Handled separately
  const slug = product.category?.slug || product.categorySlug || "";
  const id = product.category?.id || product.categoryId || "";
  return (
    slug === targetCat ||
    id === targetCat ||
    id === `cat-${targetCat}` ||
    slug.includes(targetCat)
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Fetch all products from API on mount
  useEffect(() => {
    fetchApi("/products?limit=100")
      .then((data) => {
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Sync initial state from URL search params
  useEffect(() => {
    const cat = searchParams.get("category");
    const col = searchParams.get("color");
    const q = searchParams.get("search");
    if (cat) setSelectedCategory(cat);
    if (col) setSelectedColor(col);
    if (q) setSearch(q);
  }, [searchParams]);

  // Sync state back to URL query parameters safely
  const updateUrlParams = (newCat, newColor, newSearch) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!newCat || newCat === "all") {
      params.delete("category");
    } else {
      params.set("category", newCat);
    }
    if (!newColor || newColor === "all") {
      params.delete("color");
    } else {
      params.set("color", newColor);
    }
    if (!newSearch) {
      params.delete("search");
    } else {
      params.set("search", newSearch);
    }
    const query = params.toString();
    const newUrl = query ? `/products?${query}` : "/products";
    window.history.replaceState(null, "", newUrl);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    updateUrlParams(catId, selectedColor, search);
  };

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
    updateUrlParams(selectedCategory, colorId, search);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    updateUrlParams(selectedCategory, selectedColor, val);
  };

  const handleClearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedColor("all");
    setPriceRange("all");
    setSearch("");
    setSortBy("default");
    updateUrlParams("all", "all", "");
  };

  const categories = [
    { id: "all", label: "Tüm Ürünler", count: 60 },
    { id: "test-10", label: "🎯 10 Test Ürünü", count: 10, highlight: true },
    { id: "kalebodur", label: "Kalebodur & Seramik", count: 10 },
    { id: "dusakabin", label: "Duşakabin", count: 10 },
    { id: "banyo-dolaplari", label: "Banyo Dolapları", count: 10 },
    { id: "musluk-batarya", label: "Musluk & Batarya", count: 10 },
    { id: "klozet-tuvalet", label: "Klozet & Tuvalet", count: 10 },
    { id: "seramik-lavabo", label: "Seramik Lavabo", count: 10 }
  ];

  const colors = [
    { id: "all", label: "Tüm Renkler" },
    { id: "lacivert", label: "🌊 Safir Lacivert", highlight: true },
    { id: "siyah", label: "Mat Siyah & Antrasit" },
    { id: "gold", label: "Gold & Pirinç" },
    { id: "beyaz", label: "Beyaz & Krom" }
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Special: 10 Test Products Pick (one or two from each category)
    if (selectedCategory === "test-10") {
      result = [
        result.find((p) => matchProductCategory(p, "kalebodur")),
        result.find((p) => p.id === "prod-2" || p.id === "prod-4"),
        result.find((p) => matchProductCategory(p, "dusakabin")),
        result.find((p) => p.id === "prod-12" || p.id === "prod-13"),
        result.find((p) => matchProductCategory(p, "banyo-dolaplari")),
        result.find((p) => p.id === "prod-22" || p.id === "prod-25"),
        result.find((p) => matchProductCategory(p, "musluk-batarya")),
        result.find((p) => p.id === "prod-32" || p.id === "prod-34"),
        result.find((p) => matchProductCategory(p, "klozet-tuvalet")),
        result.find((p) => matchProductCategory(p, "seramik-lavabo"))
      ].filter(Boolean);

      // If somehow less than 10, take top 10
      if (result.length < 10) {
        result = products.slice(0, 10);
      }
    } else if (selectedCategory !== "all") {
      result = result.filter((p) => matchProductCategory(p, selectedCategory));
    }

    // Color filter
    if (selectedColor === "lacivert") {
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes("lacivert") ||
          p.title?.toLowerCase().includes("mavi") ||
          p.description?.toLowerCase().includes("lacivert")
      );
    } else if (selectedColor === "siyah") {
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes("siyah") ||
          p.title?.toLowerCase().includes("antrasit") ||
          p.description?.toLowerCase().includes("siyah")
      );
    } else if (selectedColor === "gold") {
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes("altın") ||
          p.title?.toLowerCase().includes("gold") ||
          p.description?.toLowerCase().includes("altın")
      );
    } else if (selectedColor === "beyaz") {
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes("beyaz") ||
          p.title?.toLowerCase().includes("krom") ||
          p.description?.toLowerCase().includes("beyaz")
      );
    }

    // Price range filter
    if (priceRange === "under-2500") {
      result = result.filter((p) => Number(p.price) < 2500);
    } else if (priceRange === "2500-5000") {
      result = result.filter((p) => Number(p.price) >= 2500 && Number(p.price) <= 5000);
    } else if (priceRange === "over-5000") {
      result = result.filter((p) => Number(p.price) > 5000);
    }

    // Search query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    }

    return result;
  }, [products, selectedCategory, selectedColor, priceRange, search, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedColor !== "all" ||
    priceRange !== "all" ||
    Boolean(search.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-lacivert-950 via-lacivert-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-8 shadow-xl border border-lacivert-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-lg border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Mimari Koleksiyon
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-400/30">
              6 Kategori • 60 Ürün
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ürünlerimiz - Banyo & Seramik Kataloğu
          </h1>

          <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Kalebodur, duşakabin, banyo dolapları, musluk batarya, klozet ve tezgah üstü seramik lavabolar. Her kategoride test edilmiş 1. sınıf mimari modeller.
          </p>

          {/* Quick Shortcuts */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              onClick={() => handleCategorySelect("test-10")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                selectedCategory === "test-10"
                  ? "bg-amber-400 text-stone-950 font-black ring-2 ring-amber-300"
                  : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30"
              }`}
            >
              🎯 Test İçin 10 Seçkin Ürün
            </button>
            <button
              onClick={() => handleColorSelect("lacivert")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedColor === "lacivert"
                  ? "bg-blue-600 text-white ring-2 ring-blue-400"
                  : "bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-400/30"
              }`}
            >
              🌊 Safir Lacivert Koleksiyonu (Tümü)
            </button>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="space-y-4 mb-8">
        {/* Search, Price & Sort Controls Bar */}
        <div className="bg-white dark:bg-lacivert-900/60 p-4 rounded-2xl border border-stone-200 dark:border-lacivert-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Ürün adı, kod, doku veya kategori ara..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Price Range Filter & Sorting */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 focus:outline-none"
            >
              <option value="all">Fiyat Aralığı: Tümü</option>
              <option value="under-2500">2.500 ₺ Altı</option>
              <option value="2500-5000">2.500 ₺ - 5.000 ₺</option>
              <option value="over-5000">5.000 ₺ ve Üzeri</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 focus:outline-none"
            >
              <option value="default">Sıralama: Önerilen</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="name-asc">Ürün Adı: A-Z</option>
            </select>

            <span className="text-xs text-stone-500 font-bold whitespace-nowrap px-2">
              {filteredProducts.length} Ürün
            </span>
          </div>
        </div>

        {/* Category Pills (with counts) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? cat.highlight
                      ? "bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300"
                      : "bg-lacivert-900 text-white shadow-md dark:bg-blue-600"
                    : cat.highlight
                    ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                    : "bg-white dark:bg-lacivert-900/60 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-lacivert-800 hover:bg-stone-50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-stone-200 dark:bg-lacivert-800 text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Color Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 pl-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Renk:
          </span>
          {colors.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? color.highlight
                      ? "bg-blue-600 text-white ring-2 ring-blue-400"
                      : "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                    : color.highlight
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                    : "bg-stone-100 dark:bg-lacivert-950/60 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
                }`}
              >
                {color.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-lacivert-800 text-xs">
            <span className="text-stone-400 font-medium">Aktif Filtreler:</span>

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-lg font-semibold">
                Kategori: {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}
                <button onClick={() => handleCategorySelect("all")} className="hover:text-blue-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedColor !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-lg font-semibold">
                Renk: {colors.find((c) => c.id === selectedColor)?.label || selectedColor}
                <button onClick={() => handleColorSelect("all")} className="hover:text-indigo-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {priceRange !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-lg font-semibold">
                Fiyat: {priceRange === "under-2500" ? "2.500 ₺ Altı" : priceRange === "2500-5000" ? "2.500 - 5.000 ₺" : "5.000 ₺ ve Üzeri"}
                <button onClick={() => setPriceRange("all")} className="hover:text-amber-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg font-semibold">
                Arama: &quot;{search}&quot;
                <button onClick={() => handleSearchChange("")} className="hover:text-stone-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearAllFilters}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Tümünü Temizle
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-96 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-lacivert-900/40 rounded-3xl border border-stone-200 dark:border-lacivert-800 p-8 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            Seçilen Filtreye Uygun Ürün Bulunamadı
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">
            {selectedColor !== "all"
              ? `"${colors.find((c) => c.id === selectedColor)?.label}" renginde bu kategoride ürün olmayabilir.`
              : "Lütfen arama teriminizi değiştirin veya filtreleri temizleyin."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleClearAllFilters}
              className="px-6 py-2.5 bg-lacivert-800 text-white text-xs font-bold rounded-xl hover:bg-lacivert-900 transition-colors shadow-md"
            >
              Tüm Filtreleri Sıfırla (60 Ürünü Göster)
            </button>
            <button
              onClick={() => handleCategorySelect("test-10")}
              className="px-6 py-2.5 bg-amber-500 text-stone-950 text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-md"
            >
              🎯 10 Test Ürününü Göster
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-40 bg-lacivert-900 rounded-3xl animate-pulse mb-8" />
      <div className="h-14 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse mb-4" />
      <div className="flex gap-2 mb-8">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-9 w-28 bg-stone-200 dark:bg-stone-800 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
