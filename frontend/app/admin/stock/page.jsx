"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { initialProducts } from "@/lib/products-data";
import toast from "react-hot-toast";

export default function AdminStockPage() {
  const [products, setProducts] = useState(initialProducts);
  const [logs, setLogs] = useState([]);

  const loadData = () => {
    fetchApi("/products?limit=100").then((data) => setProducts(data.products || [])).catch(() => {});
    fetchApi("/stock/logs/history").then(setLogs).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStock = async (id, newStock) => {
    try {
      await fetchApi(`/stock/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ stock: Number(newStock) })
      });
      toast.success("Stok güncellendi!");
      loadData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Stok Yönetimi & Geçmişi</h1>

      <div className="bg-white dark:bg-stone-900 border rounded-xl overflow-hidden p-6">
        <h2 className="text-xl font-bold mb-4">Hızlı Stok Güncelleme</h2>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg dark:bg-stone-800">
              <span className="font-semibold">{p.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-500">Mevcut: {p.stock}</span>
                <button
                  onClick={() => {
                    const input = prompt("Yeni stok adedini girin:", p.stock);
                    if (input !== null) handleUpdateStock(p.id, input);
                  }}
                  className="px-3 py-1 bg-amber-700 text-white rounded text-sm hover:bg-amber-800"
                >
                  Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
