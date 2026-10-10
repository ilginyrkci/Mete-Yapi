"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  Tag,
  ArrowLeft
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");

  const subTotal = getTotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();

  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subTotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      toast.success(`${res.coupon.label} uygulandı!`);
      setCouponInput("");
    } else {
      toast.error(res.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-stone-100 dark:bg-lacivert-900 text-stone-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Alışveriş Sepetiniz Boş</h1>
        <p className="text-stone-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          Sepetinize henüz bir banyo, seramik veya armatür ürünü eklemediniz.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/30 transition-all"
        >
          Koleksiyonu Keşfet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Alışveriş Sepetim ({items.reduce((acc, i) => acc + i.quantity, 0)} Ürün)
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Seçtiğiniz ürünleri düzenleyebilir veya sipariş aşamasına geçebilirsiniz.
          </p>
        </div>

        <button
          onClick={() => {
            clearCart();
            toast.success("Sepet temizlendi");
          }}
          className="text-xs text-red-500 hover:text-red-700 font-semibold hover:underline"
        >
          Sepeti Temizle
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-lacivert-950/60 dark:to-blue-950/60 rounded-2xl border border-blue-100 dark:border-lacivert-800">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
            <Truck className="w-4 h-4 text-blue-600" />
            {remainingForFreeShipping === 0
              ? "Tebrikler! Ücretsiz Ahşap Paletli Kargo Kazandınız! 🎉"
              : `Ücretsiz Kargo için ${formatPrice(remainingForFreeShipping)} daha ekleyin`}
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-mono">
            {formatPrice(subTotal)} / {formatPrice(freeShippingThreshold)}
          </span>
        </div>
        <div className="w-full h-2 bg-stone-200 dark:bg-lacivert-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-lacivert-900/60 border border-stone-200 dark:border-lacivert-800 rounded-2xl shadow-sm gap-4"
            >
              <div className="flex items-center gap-4">
                <Link href={`/products/${product.id}`} className="shrink-0 relative aspect-square w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-lacivert-950">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Kategori: {product.category?.name || "Banyo Seramik"}
                  </p>
                  <span className="text-sm font-black text-lacivert-900 dark:text-blue-400 mt-1 block">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100 dark:border-lacivert-800">
                <div className="flex items-center border border-stone-300 dark:border-lacivert-700 rounded-xl overflow-hidden bg-stone-50 dark:bg-lacivert-950">
                  <button
                    onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-stone-200 dark:hover:bg-lacivert-800 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-bold text-xs min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-3 py-1.5 hover:bg-stone-200 dark:hover:bg-lacivert-800 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right sm:min-w-24">
                  <span className="text-xs text-stone-400 block font-medium">Toplam</span>
                  <span className="text-sm font-black text-stone-900 dark:text-white">
                    {formatPrice(Number(product.price) * quantity)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    removeItem(product.id);
                    toast.success("Ürün sepetten çıkarıldı");
                  }}
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                  title="Ürünü Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Alışverişe Devam Et
            </Link>
          </div>
        </div>

        {/* Cart Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-lacivert-800 pb-3">
              Sipariş Özeti
            </h2>

            {/* Coupon Box */}
            <div>
              {coupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                    ✓ {coupon.code} ({coupon.label})
                  </span>
                  <button onClick={removeCoupon} className="text-red-500 font-bold hover:underline">
                    Kaldır
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kupon Kodu (METE15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-50 dark:bg-lacivert-950 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-black dark:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Uygula
                  </button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-t border-stone-100 dark:border-lacivert-800 pt-3">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Ara Toplam:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(subTotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>İndirim Tutarı:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Kargo Tutarı:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">Ücretsiz Kargo</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-stone-900 dark:text-white pt-3 border-t border-stone-200 dark:border-lacivert-700">
                <span>Toplam Tutar:</span>
                <span className="text-xl text-blue-600 dark:text-blue-400">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-gradient-to-r from-lacivert-900 via-blue-700 to-blue-600 hover:from-lacivert-950 hover:to-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              Ödemeye Geç ({formatPrice(grandTotal)}) <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-3 bg-stone-50 dark:bg-lacivert-950/40 rounded-xl space-y-1 text-[11px] text-stone-500">
              <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Güvenli Ödeme
              </div>
              <p>3D Secure ve SSL ile korunan ödeme adımı.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
