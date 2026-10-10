"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/format";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetchApi("/orders").then((data) => {
      if (Array.isArray(data)) setOrders(data);
    }).catch(() => {});
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await fetchApi(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      toast.success("Sipariş durumu güncellendi!");
      loadOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="p-6 bg-white dark:bg-stone-900 border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs text-stone-400">Sipariş ID: {o.id}</span>
              <h3 className="font-bold text-lg">{o.user?.name} ({o.user?.email})</h3>
              <p className="text-sm text-stone-500">{formatDate(o.createdAt)} - {formatPrice(o.totalPrice)}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={o.status}
                onChange={(e) => handleStatusChange(o.id, e.target.value)}
                className="px-3 py-1.5 border rounded-lg dark:bg-stone-800 font-medium text-sm"
              >
                <option value="PENDING">PENDING (Beklemede)</option>
                <option value="PAID">PAID (Ödendi)</option>
                <option value="PREPARING">PREPARING (Hazırlanıyor)</option>
                <option value="SHIPPED">SHIPPED (Kargolandı)</option>
                <option value="DELIVERED">DELIVERED (Teslim Edildi)</option>
                <option value="CANCELLED">CANCELLED (İptal)</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
