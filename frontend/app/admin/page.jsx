"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { StatCard } from "@/components/StatCard";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/format";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchApi("/dashboard/stats")
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Toplam Ürün" value={stats.totalProducts} icon={Package} />
        <StatCard title="Toplam Sipariş" value={stats.totalOrders} icon={ShoppingBag} />
        <StatCard title="Toplam Kullanıcı" value={stats.totalUsers} icon={Users} />
        <StatCard title="Toplam Ciro" value={formatPrice(stats.totalRevenue)} icon={DollarSign} />
      </div>
    </div>
  );
}
