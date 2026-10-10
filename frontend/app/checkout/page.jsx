"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";
import { fetchApi } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CreditCard,
  Building,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Tag,
  AlertCircle,
  HelpCircle,
  RefreshCw
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getTotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCartStore();

  // Form State
  const [formData, setFormData] = useState({
    name: "Habibe Yılğın",
    email: "yilginhabibe@gmail.com",
    phone: "0532 555 44 33",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Bağdat Caddesi No: 142 Daire: 8",
    note: "Kırılabilir seramik ürün, lütfen paletli taşıyınız."
  });

  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" | "bank" | "cod"
  const [couponCode, setCouponCode] = useState("");
  const [installment, setInstallment] = useState(1);

  // Card State
  const [cardData, setCardData] = useState({
    number: "4543 6012 3456 7890",
    holder: "HABIBE YILGIN",
    expiry: "12/28",
    cvv: "345"
  });

  // 3D Secure Modal State
  const [show3DModal, setShow3DModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subTotal = getTotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();

  // Format Card Number
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardData((prev) => ({ ...prev, number: formatted }));
  };

  // Format Expiry
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCardData((prev) => ({ ...prev, expiry: val }));
  };

  // Quick fill test card
  const fillTestCard = () => {
    setCardData({
      number: "4543 6012 3456 7890",
      holder: "HABIBE YILGIN",
      expiry: "12/28",
      cvv: "345"
    });
    toast.success("Test kredi kartı bilgileri dolduruldu!");
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      toast.success(`${res.coupon.label} uygulandı!`);
      setCouponCode("");
    } else {
      toast.error(res.message);
    }
  };

  // Handle Checkout Submit
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Sepetinizde ürün bulunmamaktadır!");
      return;
    }

    if (paymentMethod === "card") {
      // Open 3D Secure modal
      setShow3DModal(true);
      setOtpCode("748291"); // simulation code
    } else {
      finalizeOrder(paymentMethod === "bank" ? "BANK_TRANSFER" : "CASH_ON_DELIVERY");
    }
  };

  // Confirm 3D Secure
  const handleConfirm3D = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShow3DModal(false);
      finalizeOrder("CREDIT_CARD_3D_SECURE");
    }, 1200);
  };

  // Finalize Order
  const finalizeOrder = async (methodName) => {
    setIsProcessing(true);
    try {
      const orderPayload = {
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        totalPrice: grandTotal,
        paymentMethod: methodName,
        customerInfo: formData,
        installment: paymentMethod === "card" ? installment : 1
      };

      const result = await fetchApi("/orders", {
        method: "POST",
        body: JSON.stringify(orderPayload)
      });

      const orderNumber = result?.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderSuccess({
        id: orderNumber,
        total: grandTotal,
        method: methodName,
        date: new Date().toLocaleString("tr-TR")
      });
      clearCart();
      toast.success("Siparişiniz ve ödemeniz başarıyla tamamlandı!");
    } catch (err) {
      toast.error(err.message || "Sipariş işlenirken bir hata oluştu.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Success Screen
  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-lacivert-900/80 rounded-3xl border border-stone-200 dark:border-lacivert-800 p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full mb-3 border border-emerald-200 dark:border-emerald-800">
            ✓ 3D Secure Ödeme Onaylandı
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
            Siparişiniz Başarıyla Alındı!
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm max-w-lg mx-auto">
            Ödemeniz güvenle onaylandı. Seramik ve banyo ürünleriniz özel ahşap paletli ambalaj ile hazırlanıyor.
          </p>

          <div className="mt-8 p-6 bg-stone-50 dark:bg-lacivert-950/80 rounded-2xl border border-stone-200 dark:border-lacivert-800 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block font-medium">Sipariş Takip Kodu:</span>
              <span className="text-base font-black text-blue-600 dark:text-blue-400 font-mono">
                {orderSuccess.id}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Ödenen Tutar:</span>
              <span className="text-base font-black text-stone-900 dark:text-white">
                {formatPrice(orderSuccess.total)}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Ödeme Yöntemi:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">
                {orderSuccess.method === "CREDIT_CARD_3D_SECURE"
                  ? `Kredi Kartı (${installment > 1 ? `${installment} Taksit` : "Tek Çekim"})`
                  : orderSuccess.method === "BANK_TRANSFER"
                  ? "Havale / EFT"
                  : "Kapıda Ödeme"}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Teslimat Adresi:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200 truncate block">
                {formData.district} / {formData.city}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/orders"
              className="px-6 py-3.5 bg-lacivert-800 hover:bg-lacivert-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Sipariş Geçmişime Git <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 dark:bg-lacivert-800 dark:hover:bg-lacivert-700 text-stone-800 dark:text-stone-200 font-bold rounded-xl transition-all"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-stone-100 dark:bg-lacivert-900 text-stone-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Sepetiniz Boş</h1>
        <p className="text-stone-500 text-sm mt-2">Ödeme yapabilmek için sepetinize ürün eklemelisiniz.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md"
        >
          Kataloğa Göz At
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">
          Güvenli Ödeme & Sipariş Onayı
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          256-Bit SSL şifreleme ve 3D Secure koruması ile siparişinizi tamamlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Delivery & Payment Details Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* 1. Teslimat Bilgileri */}
            <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-lacivert-800 pb-3">
                <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Teslimat & İletişim Bilgileri
                </h2>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Gizlilik Korumalı
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    E-Posta *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    Şehir / İl *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  Açık Teslimat Adresi *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  Sipariş / Kargo Notu (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Katta asansör mevcut vb."
                  className="w-full px-3.5 py-2 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Ödeme Yöntemi Seçimi */}
            <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-lacivert-800 pb-3">
                <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Ödeme Yöntemi
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 3D Secure Koruması
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50/80 dark:bg-lacivert-800/80 text-blue-700 dark:text-blue-300 font-bold shadow-sm"
                      : "border-stone-200 dark:border-lacivert-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Kredi / Banka Kartı</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "bank"
                      ? "border-blue-600 bg-blue-50/80 dark:bg-lacivert-800/80 text-blue-700 dark:text-blue-300 font-bold shadow-sm"
                      : "border-stone-200 dark:border-lacivert-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs">Havale / EFT</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50/80 dark:bg-lacivert-800/80 text-blue-700 dark:text-blue-300 font-bold shadow-sm"
                      : "border-stone-200 dark:border-lacivert-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs">Kapıda Ödeme</span>
                </button>
              </div>

              {/* CARD PAYMENT DETAILS */}
              {paymentMethod === "card" && (
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                      Kart Bilgileri
                    </span>
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      ⚡ Test Kartını Doldur
                    </button>
                  </div>

                  {/* Interactive Virtual Card Preview */}
                  <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-tr from-lacivert-950 via-lacivert-900 to-blue-900 text-white shadow-xl border border-blue-500/30">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-6 rounded bg-amber-400/90 flex items-center justify-center font-bold text-[9px] text-lacivert-950">
                          CHIP
                        </div>
                        <span className="text-[10px] tracking-widest uppercase opacity-75">Mete Platinum</span>
                      </div>
                      <span className="font-extrabold text-sm tracking-wider text-blue-300">VISA</span>
                    </div>

                    <div className="text-lg sm:text-xl font-mono tracking-widest font-black mb-4">
                      {cardData.number || "•••• •••• •••• ••••"}
                    </div>

                    <div className="flex justify-between items-end text-xs font-mono uppercase">
                      <div>
                        <span className="text-[9px] text-stone-400 block tracking-normal">Kart Sahibi</span>
                        <span className="font-bold tracking-wider">{cardData.holder || "AD SOYAD"}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-400 block tracking-normal">SKT</span>
                        <span className="font-bold">{cardData.expiry || "AA/YY"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                        Kart Üzerindeki İsim *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.holder}
                        onChange={(e) => setCardData({ ...cardData, holder: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        placeholder="16 Haneli Kart Numarası"
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                          Son Kullanma Tarihi (AA/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardData.expiry}
                          onChange={handleExpiryChange}
                          placeholder="12/28"
                          className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                          Güvenlik Kodu (CVV) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                          placeholder="345"
                          className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Installments Table */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-2">
                        Taksit Seçenekleri
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { count: 1, label: "Tek Çekim", amount: grandTotal },
                          { count: 3, label: "3 Taksit (Vadesiz)", amount: grandTotal / 3 },
                          { count: 6, label: "6 Taksit (Vadesiz)", amount: grandTotal / 6 }
                        ].map((opt) => (
                          <button
                            key={opt.count}
                            type="button"
                            onClick={() => setInstallment(opt.count)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              installment === opt.count
                                ? "border-blue-600 bg-blue-50/80 dark:bg-lacivert-800/80 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20"
                                : "border-stone-200 dark:border-lacivert-800 text-stone-700 dark:text-stone-300"
                            }`}
                          >
                            <span className="text-xs font-bold block">{opt.label}</span>
                            <span className="text-[11px] font-semibold text-stone-500">
                              {formatPrice(opt.amount)} / ay
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BANK TRANSFER DETAILS */}
              {paymentMethod === "bank" && (
                <div className="p-4 bg-stone-50 dark:bg-lacivert-950/60 rounded-2xl border border-stone-200 dark:border-lacivert-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Havale/EFT ile ek %3 nakit indirim uygulanır
                  </div>
                  <div className="space-y-1 font-mono">
                    <p><span className="text-stone-400">Banka:</span> Garanti BBVA</p>
                    <p><span className="text-stone-400">Hesap Sahibi:</span> Mete Banyo ve Yapı Sistemleri A.Ş.</p>
                    <p className="font-bold text-stone-900 dark:text-white break-all">
                      <span className="text-stone-400 font-normal">IBAN:</span> TR33 0006 2000 1234 5678 9012 34
                    </p>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    * Sipariş onayından sonra açıklama kısmına sipariş takip kodunuzu yazarak havaleyi gerçekleştirebilirsiniz.
                  </p>
                </div>
              )}

              {/* CASH ON DELIVERY DETAILS */}
              {paymentMethod === "cod" && (
                <div className="p-4 bg-stone-50 dark:bg-lacivert-950/60 rounded-2xl border border-stone-200 dark:border-lacivert-800 space-y-2 text-xs">
                  <p className="font-bold text-stone-800 dark:text-stone-200">
                    Kapıda Nakit veya Kredi Kartı ile Güvenli Ödeme
                  </p>
                  <p className="text-stone-500 leading-relaxed">
                    Ürünleriniz kapınıza teslim edildiğinde kargo görevlisine nakit veya tek çekim kredi kartı ile ödeme yapabilirsiniz.
                  </p>
                </div>
              )}
            </div>

            {/* Complete Button for mobile/desktop */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-gradient-to-r from-lacivert-900 via-blue-700 to-blue-600 hover:from-lacivert-950 hover:to-blue-700 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-blue-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-emerald-300" />
              {isProcessing
                ? "İşlem Yapılıyor..."
                : paymentMethod === "card"
                ? `3D Secure ile ${formatPrice(grandTotal)} Öde`
                : `${formatPrice(grandTotal)} Siparişi Tamamla`}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary & Coupon Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-lacivert-800 pb-3 flex items-center justify-between">
              <span>Sipariş Özeti ({items.reduce((acc, i) => acc + i.quantity, 0)} Ürün)</span>
              <Link href="/cart" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sepeti Düzenle
              </Link>
            </h2>

            {/* Products List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-stone-50 dark:bg-lacivert-950/60 border border-stone-200/60 dark:border-lacivert-800/60">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"}
                    alt={product.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 dark:text-white truncate">{product.title}</p>
                    <p className="text-stone-500 mt-0.5">Adet: {quantity} x {formatPrice(product.price)}</p>
                  </div>
                  <span className="font-black text-stone-900 dark:text-white shrink-0">
                    {formatPrice(Number(product.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-stone-100 dark:border-lacivert-800">
              {coupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                    <Tag className="w-4 h-4" />
                    <span>{coupon.code} ({coupon.label})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 font-semibold text-xs"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="İndirim kuponu (METE15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Uygula
                  </button>
                </form>
              )}
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-stone-400">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Denemek için: <b className="text-blue-600 font-mono">METE10</b> veya <b className="text-blue-600 font-mono">METE15</b></span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-lacivert-800 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Ara Toplam:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(subTotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Kupon İndirimi:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Kargo Bedeli:</span>
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

            {/* Trust Badges */}
            <div className="p-3 bg-stone-50 dark:bg-lacivert-950/40 rounded-xl space-y-1.5 text-[11px] text-stone-500">
              <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Güvenli Alışveriş & Birebir Garanti
              </div>
              <p>Mete Banyo & Seramik sisteminde kart bilgileriniz sunucularımızda saklanmaz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D SECURE MODAL SIMULATION */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-lacivert-900 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-lacivert-700 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-lacivert-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                  3D
                </div>
                <div>
                  <h3 className="font-black text-sm text-stone-900 dark:text-white">MeteBank 3D Secure Doğrulama</h3>
                  <p className="text-[10px] text-stone-500">Güvenli İşlem Merkezi</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 dark:bg-lacivert-800 px-2 py-1 rounded">
                BKM Express
              </span>
            </div>

            <div className="space-y-3 text-xs bg-stone-50 dark:bg-lacivert-950/60 p-4 rounded-2xl font-mono">
              <div className="flex justify-between">
                <span className="text-stone-400">İşyeri:</span>
                <span className="font-bold">Mete Banyo & Seramik</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">İşlem Tutarı:</span>
                <span className="font-bold text-blue-600 text-sm">{formatPrice(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Kart Numarası:</span>
                <span>**** **** **** {cardData.number.slice(-4) || "7890"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Taksit:</span>
                <span>{installment > 1 ? `${installment} Taksit` : "Tek Çekim"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Cep Telefonunuza Gönderilen 6 Haneli SMS Doğrulama Kodu:
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center text-2xl font-mono font-bold tracking-widest py-3 bg-stone-100 dark:bg-lacivert-950 border border-stone-300 dark:border-lacivert-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-stone-400 text-center">
                Test amaçlı SMS şifresi otomatik girilmiştir (<span className="font-bold text-blue-600">748291</span>).
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShow3DModal(false)}
                className="w-1/3 py-3 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-lacivert-800 rounded-xl transition-colors"
              >
                İptal Et
              </button>
              <button
                type="button"
                onClick={handleConfirm3D}
                disabled={isProcessing}
                className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Doğrulanıyor...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Onayla ve Öde
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
