"use client";

import { useEffect, useState, use } from "react";
import { fetchApi } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useFavoriteStore } from "@/store/favorite-store";
import { initialProducts } from "@/lib/products-data";
import { ProductCard } from "@/components/ProductCard";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Star,
  MessageSquare,
  Zap,
  Info,
  Check,
  Share2
} from "lucide-react";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);

  // Find initial fallback product immediately so it renders without delay
  const fallbackProduct = initialProducts.find(
    (p) => p.id === resolvedParams.id || p.slug === resolvedParams.id
  ) || initialProducts[0];

  const [product, setProduct] = useState(fallbackProduct);
  const [selectedImage, setSelectedImage] = useState(fallbackProduct?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs"); // "specs" | "reviews" | "shipping"

  // Review submission state
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      author: "Murat Can K.",
      rating: 5,
      date: "14 Mart 2026",
      comment: "Ahşap sandık ambalajı harikaydı, tek bir çizik dahi olmadan geldi. Banyoma çok asil bir hava kattı, tavsiye ederim!"
    },
    {
      id: "rev-2",
      author: "Zeynep T.",
      rating: 5,
      date: "28 Şubat 2026",
      comment: "Mermer desen dokusu ve yüzey sırlaması 1. kalite. Ustamız da montajını çok kolay yaptı."
    }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const addItem = useCartStore((state) => state.addItem);
  const { favorites, toggleFavorite } = useFavoriteStore();

  useEffect(() => {
    fetchApi(`/products/${resolvedParams.id}`)
      .then((data) => {
        if (data && data.title) {
          setProduct(data);
          setSelectedImage(data.image || fallbackProduct.image);
        }
      })
      .catch(() => {});
  }, [resolvedParams.id, fallbackProduct]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 font-medium text-sm">Ürün bilgileri yükleniyor...</p>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const isLacivert =
    product.title?.toLowerCase().includes("lacivert") ||
    product.title?.toLowerCase().includes("mavi") ||
    product.description?.toLowerCase().includes("lacivert");

  // Gallery images list
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80"
  ].filter(Boolean);

  // Related products from same category or fallback
  const relatedProducts = initialProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} adet ${product.title.slice(0, 20)}... sepete eklendi!`);
  };

  const handleDirectBuy = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim() || "Müşteri",
      rating: newRating,
      date: "Bugün",
      comment: newComment.trim()
    };
    setReviews([newRev, ...reviews]);
    setNewComment("");
    setReviewerName("");
    toast.success("Değerlendirmeniz ve yorumunuz başarıyla eklendi!");
  };

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600 transition-colors">Ürünlerimiz</Link>
        <span>/</span>
        <span className="text-stone-900 dark:text-white font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left: Interactive Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-lacivert-950 border border-stone-200 dark:border-lacivert-800 shadow-xl group">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              {isLacivert && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lacivert-900/90 text-blue-200 text-xs font-bold rounded-xl shadow-lg border border-blue-400/40 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Özel Safir Lacivert Serisi
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                1. Sınıf Rektifiye
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-5 right-5 p-3 bg-white/90 dark:bg-lacivert-900/90 rounded-full text-stone-700 dark:text-stone-300 hover:text-red-500 hover:scale-110 shadow-md transition-all"
              title="Favorilere Ekle"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          {/* Thumbnails list */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === img
                    ? "border-blue-600 ring-2 ring-blue-500/20 scale-105"
                    : "border-stone-200 dark:border-lacivert-800 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Görsel ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 dark:bg-lacivert-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-lacivert-700">
                {product.category?.name || "Banyo & Seramik"}
              </span>
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stokta Var (Son {product.stock || 25} Adet)
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{averageRating}</span>
                <span className="text-stone-400">({reviews.length} Yorum)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="p-5 bg-gradient-to-r from-stone-50 to-blue-50/50 dark:from-lacivert-900/40 dark:to-blue-950/40 rounded-2xl border border-stone-200 dark:border-lacivert-800 flex items-baseline justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-lacivert-900 dark:text-blue-400">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-stone-500 block mt-1">KDV Dahil • Peşin Fiyatına 6 Taksit İmkanı</span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold px-3 py-1.5 rounded-full">
                Ücretsiz Paletli Kargo
              </span>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Quick Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white dark:bg-lacivert-950/60 rounded-2xl border border-stone-200 dark:border-lacivert-800 text-xs">
              <div>
                <span className="text-stone-400 block font-medium">Koleksiyon:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {isLacivert ? "Safir Lacivert Luxury Line" : "Modern Mimari Seri"}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Garanti:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">6 Yıl Fabrika Garantisi</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Yüzey Dayanımı:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">PEI 4 Yüksek Mukavemet</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Ambalaj Tipi:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">Ahşap Sandıklı Güvenli Palet</span>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 dark:border-lacivert-700 rounded-xl overflow-hidden bg-white dark:bg-lacivert-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-stone-100 dark:hover:bg-lacivert-800 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-extrabold text-sm min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 hover:bg-stone-100 dark:hover:bg-lacivert-800 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-lacivert-800 hover:bg-lacivert-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Sepete Ekle ({formatPrice(Number(product.price) * quantity)})
                </button>
              </div>

              {/* Instant Buy button */}
              <button
                onClick={handleDirectBuy}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4" />
                Hemen Satın Al (Doğrudan Ödemeye Geç)
              </button>
            </div>
          </div>

          {/* Trust assurances */}
          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-lacivert-800 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-stone-50 dark:bg-lacivert-900/30 rounded-xl">
              <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
              <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200">Kırılma Sigortası</p>
              <p className="text-[10px] text-stone-500">Hasarsız teslim garantisi</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-lacivert-900/30 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
              <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200">TSE & CE Belgeli</p>
              <p className="text-[10px] text-stone-500">1. Sınıf üretim standardı</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-lacivert-900/30 rounded-xl">
              <RotateCcw className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
              <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200">14 Gün İade</p>
              <p className="text-[10px] text-stone-500">Koşulsuz iade güvencesi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Technical Specs / Customer Reviews / Shipping */}
      <div className="mb-16">
        <div className="flex border-b border-stone-200 dark:border-lacivert-800 mb-6 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "specs"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Teknik Özellikler
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Müşteri Yorumları ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "shipping"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Teslimat & İade Koşulları
          </button>
        </div>

        {/* Tab Content: Specs */}
        {activeTab === "specs" && (
          <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Ürün Kodu:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">{product.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Kategori:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">{product.category?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Donma Dayanımı:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">Var (İç ve Dış Mekan Uyumlu)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Leke Tutmaz Kaplama:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">Easy-Clean Nano Kaplama</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Rektifiye Kesim:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">Evet (1 mm derz ile sıfır uyum)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-lacivert-800">
              <span className="text-stone-400">Üretim Yeri:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">Türkiye / Mete Tesisleri</span>
            </div>
          </div>
        )}

        {/* Tab Content: Reviews & Submission */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Submit new review form */}
            <form onSubmit={handleAddReview} className="p-6 bg-white dark:bg-lacivert-900/60 rounded-3xl border border-stone-200 dark:border-lacivert-800 space-y-4">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                Ürünü Değerlendirin ve Yorum Yapın
              </h3>

              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-500">Puanınız:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? "fill-amber-400" : "text-stone-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Ürün kalitesi, paketleme ve teslimat hakkındaki görüşlerinizi yazın..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-lacivert-950 border border-stone-200 dark:border-lacivert-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Yorumu Gönder
              </button>
            </form>

            {/* Existing reviews list */}
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white dark:bg-lacivert-900/40 rounded-2xl border border-stone-200 dark:border-lacivert-800 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 dark:bg-lacivert-800 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-bold text-stone-900 dark:text-white">{rev.author}</span>
                      <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Doğrulanmış Alıcı
                      </span>
                    </div>
                    <span className="text-stone-400 text-[11px]">{rev.date}</span>
                  </div>

                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Shipping Info */}
        {activeTab === "shipping" && (
          <div className="bg-white dark:bg-lacivert-900/60 p-6 rounded-3xl border border-stone-200 dark:border-lacivert-800 space-y-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            <h3 className="font-bold text-stone-900 dark:text-white text-sm">
              Özel Lojistik & Kırılmaya Karşı Sandıklama Garantisi
            </h3>
            <p>
              Tüm kalebodur karolarımız, temperli duşakabin camlarımız ve banyo dolaplarımız; nakliye sırasında sarsıntı ve darbelerden etkilenmemesi için köpüklü ve ahşap paletli sandıklar içinde sevk edilir.
            </p>
            <p>
              Teslimat sırasında kargo görevlisi nezaretinde paket kontrol edilebilir. Hasar tespiti durumunda tutanak tutularak <b>anında yenisi ücretsiz olarak</b> gönderilir.
            </p>
          </div>
        )}
      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-stone-200 dark:border-lacivert-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                Benzer & Tamamlayıcı Ürünler
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                Bu ürünle birlikte banyonuzu tamamlayabileceğiniz önerilen modeller.
              </p>
            </div>
            <Link href="/products" className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">
              Tümünü Gör &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
