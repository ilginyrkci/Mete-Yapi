"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Award,
  Users,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Yıllık Tecrübe", value: "14+" },
    { label: "Yıllık Seramik Sevkiyatı", value: "85.000 m²" },
    { label: "Mutlu Ev & Proje", value: "12.500+" },
    { label: "Müşteri Memnuniyeti", value: "%99.6" }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "1. Sınıf Malzeme Kalitesi",
      desc: "Tüm kalebodur, duşakabin ve armatürlerimiz TSE ve Avrupa CE standartlarında 1. kalite sertifikalı üretilir."
    },
    {
      icon: Sparkles,
      title: "Özel Tasarım & Renk Seçenekleri",
      desc: "Özellikle imzamız haline gelen 'Safir Lacivert' banyo dolapları ve mermer damar koleksiyonu ile banyolara asil bir kimlik kazandırıyoruz."
    },
    {
      icon: Layers,
      title: "Kırılmaya Karşı Özel Paletleme",
      desc: "Seramik ve cam duşakabin sevkiyatlarımız ahşap kafesli ve darbe emici köpük ambalajlarla sıfır hasar garantisiyle ulaştırılır."
    },
    {
      icon: Award,
      title: "Yetkili Üretici Garantisi",
      desc: "Banyo dolaplarında suya ve neme dirençli lake kaplama; musluk bataryalarında 5 yıl sızdırmazlık garantisi sunuyoruz."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-lacivert-950 via-lacivert-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-lacivert-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30 mb-4">
            <Building2 className="w-4 h-4 text-amber-300" /> 2012&apos;den Beri Güvenle
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Mete Banyo & Seramik Hakkında
          </h1>
          <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Kalebodur zemin seramiklerinden modern temperli duşakabinlere, safir lacivert banyo dolaplarından şelale musluklara kadar banyolara değer katan mimari çözümler üretiyoruz.
          </p>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-lacivert-800">
              <img
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80"
                alt="Mete Banyo Showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-lacivert-900 p-6 rounded-2xl shadow-xl border border-stone-200 dark:border-lacivert-700 hidden sm:block max-w-xs">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Özel İmalat</p>
              <p className="text-stone-800 dark:text-white font-bold text-sm mt-1">
                Safir Lacivert Lake Banyo Dolapları & Porselen Karolar
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
              Banyonuz Sadece Bir İhtiyaç Değil, Evinizin En Huzurlu Yaşam Alanıdır
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Mete Banyo & Seramik olarak, 10 yılı aşkın süredir hem bireysel konut projelerine hem de mimari lüks villa ve otel inşaatlarına seramik ve banyo donanımları tedarik ediyoruz.
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Koleksiyonumuzda sadece standart beyaz ve bej renklerle sınırlı kalmıyor; banyolara derinlik ve karakter katan <strong>Safir Lacivert</strong>, <strong>Gece Mavisi</strong>, <strong>Mat Siyah</strong> ve <strong>Fırçalanmış Gold</strong> tonlarını birinci sınıf işçilikle harmanlıyoruz.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Rektifiye porselen sırlı kalebodur yer ve duvar kaplamaları
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Paslanmaz profilli 6-8 mm temperli emniyetli duşakabinler
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Çizilmez PVD kaplamalı su tasarruflu pirinç musluk ve bataryalar
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Suya ve neme %100 dayanıklı MDF lake asma banyo dolapları
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="bg-lacivert-900 text-white py-14 border-y border-lacivert-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx}>
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">
                {item.value}
              </span>
              <p className="text-stone-300 text-sm font-medium mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white">Neden Mete Banyo & Seramik?</h2>
          <p className="text-stone-500 text-sm mt-2">Banyolarınızı yenilerken size sunduğumuz ayrıcalıklar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-8 bg-white dark:bg-lacivert-900/60 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{val.title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-10 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black">Banyonuz İçin Doğru Ürünü Seçmeye Hazır mısınız?</h3>
          <p className="text-blue-100 text-sm mt-3 max-w-xl mx-auto">
            Geniş kalebodur, duşakabin ve safir lacivert banyo dolabı kataloğumuzu inceleyin; banyonuzu hemen dönüştürün.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-white text-blue-900 font-extrabold rounded-xl shadow-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Ürünleri İncele <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-blue-950/40 hover:bg-blue-950/60 text-white font-bold rounded-xl border border-white/20 transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
