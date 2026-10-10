"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Sparkles, Check, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useFavoriteStore } from "@/store/favorite-store";
import toast from "react-hot-toast";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80";

export function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.image || FALLBACK_IMAGE);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(product.id);

  const isLacivert =
    product.title?.toLowerCase().includes("lacivert") ||
    product.title?.toLowerCase().includes("mavi") ||
    product.description?.toLowerCase().includes("lacivert");

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
    toast.success(`${product.title.slice(0, 28)}... sepete eklendi!`, {
      icon: "🛒"
    });
  };

  return (
    <div className="group bg-white dark:bg-lacivert-900/60 border border-stone-200 dark:border-lacivert-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-lacivert-950">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          unoptimized
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {isLacivert && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-lacivert-900/90 text-blue-200 text-xs font-bold rounded-md shadow-md border border-blue-400/30 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-blue-300" /> Lacivert Seri
            </span>
          )}
          {product.category?.name && (
            <span className="inline-block px-2.5 py-0.5 bg-black/70 text-white text-[11px] font-medium rounded backdrop-blur-sm">
              {product.category.name}
            </span>
          )}
          {product.stock && (
            <span className="inline-block px-2 py-0.5 bg-emerald-600/90 text-white text-[10px] font-semibold rounded backdrop-blur-sm">
              Stokta: {product.stock} Adet
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
            toast(isFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi ❤️", { duration: 1500 });
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-lacivert-950/90 rounded-full text-stone-700 dark:text-stone-300 hover:text-red-500 hover:scale-110 shadow transition-all z-10"
          title="Favorilere Ekle"
          aria-label="Favorilere Ekle"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-stone-700 dark:text-stone-300">4.9</span>
            <span className="text-stone-400 text-[11px]">(1. Kalite)</span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-lacivert-800/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-400 font-medium block">Fiyat</span>
            <span className="text-lg font-extrabold text-lacivert-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 ${
              addedAnimation
                ? "bg-emerald-600 text-white"
                : "bg-lacivert-800 hover:bg-lacivert-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Eklendi
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Sepete Ekle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
