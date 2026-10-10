"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchApi("/favorites")
      .then(setFavorites)
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Favori Ürünlerim</h1>
      {favorites.length === 0 ? (
        <p className="text-stone-500">Henüz favorilere eklenmiş bir ürün bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((f) => (
            <ProductCard key={f.id} product={f.product} />
          ))}
        </div>
      )}
    </div>
  );
}
