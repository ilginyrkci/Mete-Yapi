import { create } from "zustand";
import { fetchApi } from "@/lib/api";

export const useFavoriteStore = create((set, get) => ({
  favorites: [],

  fetchFavorites: async () => {
    try {
      const data = await fetchApi("/favorites");
      set({ favorites: data.map((f) => f.productId) });
    } catch {}
  },

  toggleFavorite: async (productId) => {
    try {
      const res = await fetchApi("/favorites", {
        method: "POST",
        body: JSON.stringify({ productId })
      });

      const current = get().favorites;
      if (res.favorited) {
        set({ favorites: [...current, productId] });
      } else {
        set({ favorites: current.filter((id) => id !== productId) });
      }
    } catch {}
  }
}));
