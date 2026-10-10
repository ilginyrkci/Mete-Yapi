"use client";

import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <div className="p-12 text-center">Giriş yapmanız gerekiyor.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Profil Hesabım</h1>
      <div className="p-8 bg-white dark:bg-stone-900 border rounded-2xl space-y-4">
        <div>
          <span className="text-sm text-stone-500">Ad Soyad</span>
          <p className="text-lg font-bold">{user.name}</p>
        </div>
        <div>
          <span className="text-sm text-stone-500">E-Posta</span>
          <p className="text-lg font-bold">{user.email}</p>
        </div>
        <div>
          <span className="text-sm text-stone-500">Hesap Rolü</span>
          <p className="text-sm font-bold text-amber-700">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
