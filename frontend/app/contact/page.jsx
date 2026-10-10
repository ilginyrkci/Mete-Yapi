"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  Building,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("kalebodur");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Mesajınız alındı! Uzman mimari ekibimiz en kısa sürede size dönüş yapacaktır.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-lacivert-950 via-lacivert-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-lacivert-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30 mb-4">
            <MessageSquare className="w-4 h-4 text-amber-300" /> Bize Ulaşın
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            İletişim & Showroom Bilgileri
          </h1>
          <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kalebodur m² hesaplama, duşakabin özel ölçü ve safir lacivert banyo dolapları hakkında sorularınız için bize her zaman ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white dark:bg-lacivert-900/60 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                Mete Banyo & Seramik Showroom
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                Tüm kalebodur çeşitlerini, duşakabin modellerini ve banyo dolabı takımlarını yerinde incelemek için showroomumuza davetlisiniz.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950/70 text-blue-600 rounded-2xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">Adres</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                      Seramikçiler Sanayi Sitesi, Banyo & Mimarlık Caddesi No: 42, A Blok D: 14, Başakşehir / İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950/70 text-blue-600 rounded-2xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">Telefon & WhatsApp</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-medium">
                      Santral: +90 (212) 555 42 00
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      WhatsApp Danışma: +90 (532) 000 42 00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950/70 text-blue-600 rounded-2xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">E-Posta</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      info@meteseramik.com
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      siparis@meteseramik.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950/70 text-blue-600 rounded-2xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">Çalışma Saatleri</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Hafta İçi: 08:30 - 19:00
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Cumartesi: 09:00 - 18:00 (Pazar: Randevulu Showroom)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card */}
            <div className="p-6 bg-gradient-to-br from-lacivert-900 to-slate-900 text-white rounded-3xl border border-lacivert-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Ücretsiz Ölçü & Metraj Desteği</h4>
                <p className="text-xs text-stone-300 mt-1">Banyonuzun planını veya resmini WhatsApp üzerinden gönderin, gerekli karo ve dolap ebatlarını hesaplayalım.</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-white dark:bg-lacivert-900/60 rounded-3xl border border-stone-200 dark:border-lacivert-800 shadow-sm">
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-2">
                Bize Mesaj Gönderin
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-8">
                Formu doldurduğunuzda teknik danışmanımız 30 dakika içerisinde sizinle iletişime geçecektir.
              </p>

              {submitted && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0532 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      İlgilendiğiniz Ürün Grubu
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      <option value="kalebodur">Kalebodur & Zemin Seramikleri</option>
                      <option value="dusakabin">Duşakabin Sistemleri</option>
                      <option value="banyo-dolaplari">Banyo Dolapları (Lacivert vb.)</option>
                      <option value="musluk-batarya">Musluk & Bataryalar</option>
                      <option value="klozet-tuvalet">Klozet & Tuvalet Sistemleri</option>
                      <option value="seramik-lavabo">Seramik Çanak Lavabolar</option>
                      <option value="toptan">Toplu Proje & Müteahhit Fiyatı</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Mesajınız veya İhtiyacınız *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Banyonuzun ölçüleri, talep ettiğiniz model veya sormak istedikleriniz..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-lacivert-950/80 border border-stone-200 dark:border-lacivert-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-lacivert-800 hover:bg-lacivert-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Mesajı Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
