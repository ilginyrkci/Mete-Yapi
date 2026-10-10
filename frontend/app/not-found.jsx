import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <span className="inline-block text-6xl font-extrabold text-amber-800 tracking-tight mb-2">404</span>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Aradığınız Sayfa Bulunamadı</h1>
        <p className="text-stone-600 text-sm mb-6">
          Ulaşmaya çalıştığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm transition"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Ürün Kataloğu
          </Link>
        </div>
      </div>
    </div>
  );
}
