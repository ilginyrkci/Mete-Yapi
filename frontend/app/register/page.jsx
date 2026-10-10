"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { fetchApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserPlus, User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchApi("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      setAuth(data.user, data.token);
      toast.success("Hesabınız başarıyla oluşturuldu!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Kayıt işlemi sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-lacivert-900/60 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-lacivert-900 to-blue-600 text-white font-black text-2xl shadow-lg mb-4">
            M
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Yeni Hesap Oluşturun
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Mete Banyo & Seramik ayrıcalıklarından hemen faydalanmaya başlayın
          </p>
        </div>

        {/* Benefits pills */}
        <div className="space-y-1.5 p-3.5 bg-blue-50/60 dark:bg-lacivert-950/80 rounded-2xl border border-blue-100 dark:border-lacivert-800 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Favori seramik ve ürünlerinizi kaydedin</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Kargo ve özel mimari siparişlerinizi anlık takip edin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Ad Soyad
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Ayşe Yılmaz"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-lacivert-950/90 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              E-Posta Adresi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mete.com"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-lacivert-950/90 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Şifre (En az 6 karakter)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-lacivert-950/90 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-lacivert-900 via-lacivert-800 to-blue-700 hover:from-lacivert-950 hover:to-blue-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-stone-200 dark:border-lacivert-800 text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Zaten bir hesabınız var mı?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
            >
              Giriş Yapın
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
