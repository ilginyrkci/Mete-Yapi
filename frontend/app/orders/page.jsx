"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/format";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  XCircle,
  FileText
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = () => {
    fetchApi("/orders")
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await fetchApi(`/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "CANCELLED" })
      });
      toast.success("Sipariş iptal edildi.");
      loadOrders();
    } catch {
      toast.error("İptal işlemi başarısız oldu.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PAID":
        return { label: "Ödeme Onaylandı", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300" };
      case "PREPARING":
        return { label: "Hazırlanıyor (Paletleme)", color: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" };
      case "SHIPPED":
        return { label: "Kargoda (Yolda)", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300" };
      case "DELIVERED":
        return { label: "Teslim Edildi", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" };
      case "CANCELLED":
        return { label: "İptal Edildi", color: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300" };
      default:
        return { label: "Beklemede", color: "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300" };
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "active") return o.status !== "DELIVERED" && o.status !== "CANCELLED";
    if (statusFilter === "completed") return o.status === "DELIVERED";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Sipariş Geçmişim & Kargo Takibi
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Mete Banyo & Seramik siparişlerinizin durumunu, faturasını ve kargo hareketlerini inceleyin.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-lacivert-900/60 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              statusFilter === "all" ? "bg-white dark:bg-blue-600 text-stone-900 dark:text-white shadow-sm font-bold" : "text-stone-600 dark:text-stone-400"
            }`}
          >
            Tümü ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              statusFilter === "active" ? "bg-white dark:bg-blue-600 text-stone-900 dark:text-white shadow-sm font-bold" : "text-stone-600 dark:text-stone-400"
            }`}
          >
            Aktif Siparişler
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              statusFilter === "completed" ? "bg-white dark:bg-blue-600 text-stone-900 dark:text-white shadow-sm font-bold" : "text-stone-600 dark:text-stone-400"
            }`}
          >
            Teslim Edilenler
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-lacivert-900/60 rounded-3xl border border-stone-200 dark:border-lacivert-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-stone-100 dark:bg-lacivert-800 text-stone-400 rounded-2xl flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">Henüz Siparişiniz Bulunmuyor</h2>
          <p className="text-stone-500 text-sm max-w-sm mx-auto">
            Banyo dolapları, kalebodur seramikler ve duşakabin modellerimizden sipariş vererek başlayın.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Alışverişe Başla <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((o) => {
            const badge = getStatusBadge(o.status);
            const isCompleted = o.status === "DELIVERED";
            const isCancelled = o.status === "CANCELLED";

            return (
              <div
                key={o.id}
                className="bg-white dark:bg-lacivert-900/60 border border-stone-200 dark:border-lacivert-800 rounded-3xl p-6 shadow-sm space-y-5"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-stone-100 dark:border-lacivert-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-lacivert-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-stone-900 dark:text-white">
                          {o.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {formatDate(o.createdAt)} • Kargo: Mete Lojistik Güvenli Palet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setSelectedInvoice(o)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-lacivert-800 dark:hover:bg-lacivert-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> Fatura Görüntüle
                    </button>
                    {!isCompleted && !isCancelled && o.status === "PENDING" && (
                      <button
                        onClick={() => handleCancelOrder(o.id)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 rounded-xl text-xs font-bold transition-colors"
                      >
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>

                {/* Tracking Stepper */}
                {!isCancelled && (
                  <div className="p-4 bg-stone-50 dark:bg-lacivert-950/60 rounded-2xl border border-stone-200/60 dark:border-lacivert-800/60">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400 dark:text-stone-500">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sipariş Alındı</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${o.status !== "PENDING" ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        <Clock className="w-4 h-4" />
                        <span>Hazırlanıyor</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${o.status === "SHIPPED" || o.status === "DELIVERED" ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        <Truck className="w-4 h-4" />
                        <span>Kargoya Verildi</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${o.status === "DELIVERED" ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Teslim Edildi</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items in order */}
                <div className="space-y-2">
                  {o.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-lacivert-950/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80"}
                          alt={item.product?.title || "Ürün"}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-stone-800 dark:text-stone-200">{item.product?.title || "Seramik Ürünü"}</p>
                          <p className="text-stone-400">{item.quantity} Adet x {formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <span className="font-black text-stone-900 dark:text-white">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer total */}
                <div className="flex justify-between items-center pt-3 border-t border-stone-100 dark:border-lacivert-800 text-sm">
                  <span className="text-xs text-stone-400">
                    Ödeme Durumu: <b className="text-stone-700 dark:text-stone-300">{o.paymentStatus || "ÖDENDİ"}</b>
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 mr-2">Toplam:</span>
                    <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                      {formatPrice(o.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-xl text-stone-900 dark:text-white">Mete Banyo & Seramik</h3>
                <p className="text-xs text-stone-400">E-Fatura / Sipariş Makbuzu</p>
              </div>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 dark:bg-stone-800 px-3 py-1.5 rounded-lg">
                {selectedInvoice.id}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Tarih:</span>
                <span className="font-semibold">{formatDate(selectedInvoice.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Müşteri:</span>
                <span className="font-semibold">{selectedInvoice.user?.name || "Habibe Yılğın"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Durum:</span>
                <span className="font-bold text-emerald-600">ÖDENDİ (3D Secure)</span>
              </div>
            </div>

            <div className="border-t border-b py-3 space-y-2 text-xs max-h-48 overflow-y-auto">
              {selectedInvoice.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate pr-4">{item.product?.title} (x{item.quantity})</span>
                  <span className="font-bold">{formatPrice(Number(item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-base font-black">
              <span>Genel Toplam (KDV Dahil):</span>
              <span className="text-blue-600 font-mono">{formatPrice(selectedInvoice.totalPrice)}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold transition-colors"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  window.print();
                  setSelectedInvoice(null);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" /> Yazdır / PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
