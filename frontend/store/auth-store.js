import { create } from "zustand";
import { fetchApi } from "@/lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: true,

  setAuth: (user, token) => {
    if (token) localStorage.setItem("token", token);
    set({ user, token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isLoading: false });
  },

  fetchMe: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null, token: null, isLoading: false });
      return;
    }
    try {
      const data = await fetchApi("/me");
      set({ user: data.user, isLoading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoading: false });
    }
  }
}));
