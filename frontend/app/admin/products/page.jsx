"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchApi } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import toast from "react-hot-toast";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { initialProducts, categories as initialCategories } from "@/lib/products-data";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategories[0]?.id || "");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const loadData = useCallback(() => {
    fetchApi("/products?limit=100")
      .then((data) => setProducts(data.products || []))
      .catch(() => {});
    fetchApi("/products/categories/list")
      .then((cats) => {
        setCategories(cats || []);
        if (cats && cats.length > 0 && !categoryId) {
          setCategoryId(cats[0].id);
        }
      })
      .catch(() => {});
  }, [categoryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetchApi("/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          price: Number(price),
          stock: Number(stock),
          categoryId,
          description,
          image: image || undefined
        })
      });
      toast.success("Ürün başarıyla oluşturuldu!");
      setTitle("");
      setPrice("");
      setStock("");
      setDescription("");
      setImage("");
      loadData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Ürünü silmek istediğinize emin misiniz?")) return;
    try {
      await fetchApi(`/products/${id}`, { method: "DELETE" });
      toast.success("Ürün silindi!");
      loadData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Ürün Yönetimi</h1>
        <p className="text-sm text-stone-500 mt-1">Kalebodur, duşakabin, musluk, dolap ve seramik ürünleri ekleyin ve düzenleyin.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleCreate} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-stone-900 dark:text-white">
          <Plus className="w-5 h-5 text-blue-600" /> Yeni Banyo / Seramik Ürünü Ekle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Ürün Başlığı</label>
            <input
              type="text"
              placeholder="Örn: 80 cm Safir Lacivert Banyo Dolabı"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Kategori</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Fiyat (₺)</label>
            <input
              type="number"
              placeholder="Örn: 4850"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Stok Adedi</label>
            <input
              type="number"
              placeholder="Örn: 25"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Görsel URL (Opsiyonel)</label>
            <input
              type="url"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Ürün Açıklaması & Özellikleri (Renk, Ebat vb.)</label>
          <textarea
            placeholder="Ürünün malzeme kalitesi, ebatları ve lacivert/mat tonları hakkında bilgi girin..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow"
        >
          Ürünü Kaydet
        </button>
      </form>

      {/* List */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
          <h2 className="font-bold text-base">Mevcut Ürünler ({products.length})</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-500 font-semibold text-xs">
            <tr>
              <th className="p-4">Ürün</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4">Stok</th>
              <th className="p-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {products.map((p) => {
              const isLacivert = p.title?.toLowerCase().includes("lacivert") || p.title?.toLowerCase().includes("mavi");
              return (
                <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                  <td className="p-4 font-semibold text-stone-900 dark:text-white flex items-center gap-2">
                    {isLacivert && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" title="Lacivert Seri" />
                    )}
                    {p.title}
                  </td>
                  <td className="p-4 text-xs font-medium text-stone-500">{p.category?.name}</td>
                  <td className="p-4 font-bold text-lacivert-900 dark:text-blue-400">{formatPrice(p.price)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400" : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"}`}>
                      {p.stock} adet
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
