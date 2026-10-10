"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Sparkles,
  CreditCard,
  Headphones
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-stone-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Paletli Güvenli Kargo</h4>
              <p className="text-xs text-stone-400 mt-0.5">Kırılmaya karşı sigortalı teslimat</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">TSE & CE Sertifikalı</h4>
              <p className="text-xs text-stone-400 mt-0.5">1. Sınıf malzeme ve işçilik</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Safir Lacivert Seri</h4>
              <p className="text-xs text-stone-400 mt-0.5">Özel tasarım lüks banyo koleksiyonu</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Uzman Mimari Destek</h4>
              <p className="text-xs text-stone-400 mt-0.5">0850 302 45 45 & WhatsApp hattı</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white font-black text-lg">
                M
              </div>
              <span className="text-2xl font-black text-white tracking-tight">METE</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Banyo & Seramik
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Mete Banyo & Seramik, 2012 yılından bu yana kaliteli kalebodur zemin seramikleri, temperli duşakabinler, safir lacivert banyo dolapları ve şık batarya sistemleri ile yaşam alanlarınıza zarafet ve dayanıklılık sunar.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zafer, Yıldırım Beyazıt Cd. No:136, 34797 Bahçelievler/İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>0212 452 47 38</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>destek@meteseramik.com</span>
              </div>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Ürün Kategorileri
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products?category=kalebodur" className="hover:text-white transition-colors">
                  Kalebodur & Seramik (10 Model)
                </Link>
              </li>
              <li>
                <Link href="/products?category=dusakabin" className="hover:text-white transition-colors">
                  Duşakabin Sistemleri (10 Model)
                </Link>
              </li>
              <li>
                <Link href="/products?category=banyo-dolaplari" className="hover:text-white transition-colors">
                  Banyo Dolapları (10 Model)
                </Link>
              </li>
              <li>
                <Link href="/products?category=musluk-batarya" className="hover:text-white transition-colors">
                  Musluk & Bataryalar (10 Model)
                </Link>
              </li>
              <li>
                <Link href="/products?category=klozet-tuvalet" className="hover:text-white transition-colors">
                  Tuvalet & Klozetler (10 Model)
                </Link>
              </li>
              <li>
                <Link href="/products?category=seramik-lavabo" className="hover:text-white transition-colors">
                  Seramik Lavabolar (10 Model)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Kurumsal & Sayfalar
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Hakkımızda & Fabrika
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  İletişim & Showroom
                </Link>
              </li>
              <li>
                <Link href="/products?color=lacivert" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1">
                  <span>Safir Lacivert Seri</span>
                  <Sparkles className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Tüm Ürün Kataloğu (60 Çeşit)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Sepetim
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  Favori Ürünler
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Üyelik & Destek
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Kayıt Ol (Yeni Hesap)
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Profilim & Siparişlerim
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Yönetici Paneli
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 METE Banyo & Seramik A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <span>Gizlilik Politikası</span>
            <span>Kullanım Şartları</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
