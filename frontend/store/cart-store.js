import { create } from "zustand";

const VALID_COUPONS = {
  METE10: { rate: 0.1, label: "%10 Tanışma İndirimi" },
  METE15: { rate: 0.15, label: "%15 Özel Koleksiyon İndirimi" },
  LACIVERT20: { rate: 0.2, label: "%20 Safir Lacivert Lansman İndirimi" }
};

export const useCartStore = create((set, get) => ({
  items: [],
  coupon: null,

  addItem: (product, quantity = 1) => {
    const current = get().items;
    const existing = current.find((i) => i.product.id === product.id);

    if (existing) {
      set({
        items: current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      });
    } else {
      set({ items: [...current, { product, quantity }] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    });
  },

  clearCart: () => set({ items: [], coupon: null }),

  applyCoupon: (code) => {
    const upper = (code || "").trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      const couponData = { code: upper, ...VALID_COUPONS[upper] };
      set({ coupon: couponData });
      return { success: true, coupon: couponData };
    }
    return { success: false, message: "Geçersiz indirim kuponu" };
  },

  removeCoupon: () => set({ coupon: null }),

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const total = get().getTotal();
    const coupon = get().coupon;
    if (!coupon) return 0;
    return total * coupon.rate;
  },

  getShippingFee: () => {
    const total = get().getTotal();
    if (total === 0 || total >= 2000) return 0;
    return 150.0;
  },

  getGrandTotal: () => {
    const total = get().getTotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingFee();
    return Math.max(0, total - discount + shipping);
  }
}));
