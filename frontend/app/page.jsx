"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { initialProducts } from "@/lib/products-data";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Droplets,
  Layers,
  Box,
  Compass,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchApi("/products?limit=60")
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const lacivertProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes("lacivert") ||
      p.title?.toLowerCase().includes("mavi") ||
      p.description?.toLowerCase().includes("lacivert")
  );

  const categories = [
    {
      title: "Kalebodur & Seramik",
      desc: "Mermer desenli porselen karolar",
      href: "/products?category=kalebodur",
      icon: Layers,
      color: "from-blue-600 to-indigo-800"
    },
    {
      title: "Duşakabin Sistemleri",
      desc: "Temperli cam & lüks profiller",
      href: "/products?category=dusakabin",
      icon: Droplets,
      color: "from-sky-600 to-blue-700"
    },
    {
      title: "Banyo Dolapları",
      desc: "Safir lacivert & aynalı takımlar",
      href: "/products?category=banyo-dolaplari",
      icon: Box,
      color: "from-indigo-700 to-blue-900"
    },
    {
      title: "Musluk & Batarya",
      desc: "Şelale akışlı gold & siyah musluklar",
      href: "/products?category=musluk-batarya",
      icon: Compass,
      color: "from-amber-600 to-orange-700"
    },
    {
      title: "Tuvalet & Klozet",
      desc: "Kanalsız hijyenik asma klozetler",
      href: "/products?category=klozet-tuvalet",
      icon: CheckCircle2,
      color: "from-slate-700 to-slate-900"
    },
    {
      title: "Seramik Lavabolar",
      desc: "Tezgah üstü çanak & mat modeller",
      href: "/products?category=seramik-lavabo",
      icon: Sparkles,
      color: "from-teal-600 to-cyan-800"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lacivert-950 via-lacivert-900 to-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-lacivert-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/15 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30 backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              2026 Trend: Safir Lacivert & Mermer Banyo Koleksiyonu
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Banyonuzda Lüks Dokunuş: <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-200 bg-clip-text text-transparent">
                Kalebodur, Duşakabin & Dolaplar
              </span>
            </h1>

            <p className="mt-6 text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Mete Banyo & Seramik ile derin safir lacivert tonlarını, doğal mermer damarlı kalebodurları, sessiz sürgülü duşakabinleri ve kaliteli armatürleri keşfedin.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2"
              >
                Tüm Koleksiyonu İncele <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?color=lacivert"
                className="px-7 py-3.5 bg-lacivert-800/80 hover:bg-lacivert-800 text-blue-200 font-semibold rounded-xl border border-blue-400/30 backdrop-blur-sm transition-all"
              >
                🌊 Lacivert Serisini Gör
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-lacivert-800/60 max-w-lg">
              <div>
                <span className="text-2xl font-black text-white">1. Sınıf</span>
                <p className="text-xs text-stone-400 mt-1">Porselen & Seramik</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">%100 Nem</span>
                <p className="text-xs text-stone-400 mt-1">Dirençli Lake Gövde</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">6 Yıl</span>
                <p className="text-xs text-stone-400 mt-1">Gövde & Parça Garantisi</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-lacivert-700/50 group">
              <img
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Lacivert Banyo Dolabı ve Seramik"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lacivert-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="bg-lacivert-900/90 backdrop-blur-md p-4 rounded-2xl border border-blue-400/20 text-white w-full">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Öne Çıkan Ürün</span>
                  <p className="font-bold text-sm mt-0.5">Safir Lacivert 80 cm MDF Aynalı Asma Banyo Dolabı Takımı</p>
                  <p className="text-amber-400 font-black text-base mt-1">7.950,00 ₺</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Cards */}
      <section className="py-14 bg-stone-100 dark:bg-lacivert-950/60 border-b border-stone-200 dark:border-lacivert-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                Kategorilere Göre Keşfedin
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Banyonuz için aradığınız tüm mimari yapı ve mobilya çözümleri.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="group p-5 bg-white dark:bg-lacivert-900/70 border border-stone-200 dark:border-lacivert-800/80 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIAL NAVY BLUE SHOWCASE SECTION */}
      <section className="py-16 bg-gradient-to-br from-lacivert-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-lg border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Özel Seri
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
                Safir Lacivert Koleksiyonu
              </h2>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Banyo dolaplarından mermer desenli kalebodurlara, musluklardan asma klozetlere kadar banyonuza asil bir hava katan özel lacivert serisi.
              </p>
            </div>
            <Link
              href="/products?color=lacivert"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              Tüm Lacivert Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lacivertProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ÜRÜNLERİMİZ TEST & VİTRİN BÖLÜMÜ */}
      <section id="urunlerimiz" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-lacivert-800 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Test & Vitrin Bölümü
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Ürünlerimiz ({(() => {
                const list = selectedCategory === "all"
                  ? (showAll ? products : products.slice(0, 10))
                  : products.filter((p) => {
                      const slug = p.category?.slug || p.categorySlug || "";
                      const id = p.category?.id || p.categoryId || "";
                      return slug === selectedCategory || id === selectedCategory || id === `cat-${selectedCategory}`;
                    });
                return list.length;
              })()} Ürün)
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              {selectedCategory === "all" && !showAll
                ? "Test amacıyla listelenen 10 adet öne çıkan banyo & seramik modeli."
                : selectedCategory !== "all"
                ? "Seçili kategoriye ait 10 model listeleniyor."
                : "Tüm 60 model listeleniyor."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setShowAll(false); setSelectedCategory("all"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !showAll && selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-stone-200 dark:bg-lacivert-900 text-stone-700 dark:text-stone-300 hover:bg-stone-300"
              }`}
            >
              🎯 10 Test Ürünü
            </button>
            <button
              onClick={() => { setShowAll(true); setSelectedCategory("all"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                showAll && selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-stone-200 dark:bg-lacivert-900 text-stone-700 dark:text-stone-300 hover:bg-stone-300"
              }`}
            >
              Tüm 60 Ürün
            </button>
            <Link
              href="/products"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 text-xs ml-2"
            >
              Tüm Kataloğu Gör <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs">
          <button
            onClick={() => { setSelectedCategory("all"); setShowAll(false); }}
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all" && !showAll
                ? "bg-lacivert-900 text-white dark:bg-blue-600"
                : "bg-stone-100 dark:bg-lacivert-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Öne Çıkanlar (10 Ürün)
          </button>
          {[
            { id: "kalebodur", label: "Kalebodur & Seramik (10)" },
            { id: "dusakabin", label: "Duşakabin Sistemleri (10)" },
            { id: "banyo-dolaplari", label: "Banyo Dolapları (10)" },
            { id: "musluk-batarya", label: "Musluk & Batarya (10)" },
            { id: "klozet-tuvalet", label: "Klozet & Tuvalet (10)" },
            { id: "seramik-lavabo", label: "Seramik Lavabo (10)" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setShowAll(false); }}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-lacivert-900 text-white dark:bg-blue-600"
                  : "bg-stone-100 dark:bg-lacivert-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(selectedCategory === "all"
              ? (showAll ? products : products.slice(0, 10))
              : products.filter((p) => {
                  const slug = p.category?.slug || p.categorySlug || "";
                  const id = p.category?.id || p.categoryId || "";
                  return slug === selectedCategory || id === selectedCategory || id === `cat-${selectedCategory}`;
                })
            ).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-white dark:bg-lacivert-900/40 border-t border-stone-200 dark:border-lacivert-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-2xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Garantili & 1. Kalite</h3>
              <p className="text-stone-500 text-xs mt-0.5">Tüm seramik ve duşakabin ürünlerinde fabrika garantisi.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-2xl">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Kırılmaya Karşı Güvence</h3>
              <p className="text-stone-500 text-xs mt-0.5">Ahşap paletli ve köpük korumalı özel nakliye ambalajı.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Mimari Tasarım Desteği</h3>
              <p className="text-stone-500 text-xs mt-0.5">Banyonuzun ölçülerine uygun dolap ve kabin danışmanlığı.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
