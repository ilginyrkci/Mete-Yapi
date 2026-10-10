import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

function makeSlug(text) {
  return slugify(text, { lower: true, strict: true, locale: "tr" }) + "-" + Math.random().toString(36).substring(2, 7);
}

async function main() {
  console.log("🌱 60 ürünlük zengin banyo & seramik tohumlama başlatılıyor...");

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const userPassword = await bcrypt.hash("User123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@mete.com" },
    update: { password: adminPassword, role: "ADMIN", name: "Mete Admin" },
    create: {
      name: "Mete Admin",
      email: "admin@mete.com",
      password: adminPassword,
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "ahmet@mete.com" },
    update: { password: userPassword, role: "USER", name: "Ahmet Yılmaz" },
    create: {
      name: "Ahmet Yılmaz",
      email: "ahmet@mete.com",
      password: userPassword,
      role: "USER"
    }
  });


  const categories = [
    {
      name: "Kalebodur & Zemin Seramikleri",
      slug: "kalebodur"
    },
    {
      name: "Duşakabin Sistemleri",
      slug: "dusakabin"
    },
    {
      name: "Banyo Dolapları",
      slug: "banyo-dolaplari"
    },
    {
      name: "Musluk & Bataryalar",
      slug: "musluk-batarya"
    },
    {
      name: "Klozet & Tuvalet Sistemleri",
      slug: "klozet-tuvalet"
    },
    {
      name: "Seramik Lavabolar",
      slug: "seramik-lavabo"
    }
  ];

  const categoryMap = {};

  for (const cat of categories) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug }
    });
    categoryMap[cat.slug] = createdCat.id;
  }

  // Clear existing items to re-populate exactly 10 per category
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.stockLog.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});

  const products = [
    // 1. KALEBODUR & ZEMİN SERAMİKLERİ (10 items)
    {
      title: "60x120 cm Safir Lacivert Mermer Desen Porselen Kalebodur",
      categorySlug: "kalebodur",
      price: 489.0,
      stock: 180,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Parlak sırlı porselen yüzey, derin okyanus laciverti damarlı mermer dokusu. Donmaya ve aşınmaya dayanıklı 1. kalite rektifiye yer karosu."
    },
    {
      title: "80x80 cm Gece Mavisi Mat Rektifiye Kalebodur Zemin Karosu",
      categorySlug: "kalebodur",
      price: 560.0,
      stock: 110,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Kaymaz mat yüzey (R10), derin lacivert tonları ile minimalist ve modern banyolar için özel tasarım."
    },
    {
      title: "60x60 cm Antrasit & Lacivert Damarlı Duvar ve Yer Seramiği",
      categorySlug: "kalebodur",
      price: 415.0,
      stock: 140,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "Kolay temizlenen leke tutmaz nano kaplama. Banyo ve mutfak zeminlerinde lüks görünüm sağlar."
    },
    {
      title: "60x120 cm Calacatta Beyaz & Altın Damarlı Parlak Karo",
      categorySlug: "kalebodur",
      price: 520.0,
      stock: 200,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Klasik İtalyan Calacatta mermer dokusu. Yansıtıcı parlak yüzeyi ile banyonuzu aydınlık ve ferah gösterir."
    },
    {
      title: "80x80 cm Mat Gri Beton Efektli Mimari Zemin Kaleboduru",
      categorySlug: "kalebodur",
      price: 440.0,
      stock: 125,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Loft ve endüstriyel tasarımlar için brüt beton dokulu rektifiye zemin seramiği."
    },
    {
      title: "30x60 cm Okyanus Laciverti Balıksırtı Duvar Seramiği",
      categorySlug: "kalebodur",
      price: 395.0,
      stock: 160,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "Duş nişleri ve ayna arkası için balıksırtı döşemeye uygun özel lacivert parlak rölyefli seramik."
    },
    {
      title: "60x120 cm Nero Marquina Siyah Mermer Dokulu Karo",
      categorySlug: "kalebodur",
      price: 580.0,
      stock: 90,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "Asil siyah zemin üzerine beyaz ve hafif lacivert geçişli mermer damarları."
    },
    {
      title: "120x120 cm Ekstra Geniş Mat Lacivert Lüks Yer Karosu",
      categorySlug: "kalebodur",
      price: 720.0,
      stock: 75,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "Derzsiz görünüm sağlayan devasa boyut. Villalar ve lüks banyolar için eksiksiz zemin çözümü."
    },
    {
      title: "60x60 cm Rustik Doğal Taş Desenli Kalebodur",
      categorySlug: "kalebodur",
      price: 380.0,
      stock: 150,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "Aşınma sınıfı PEI 4 olan yüksek mukavemetli iç ve dış mekan uyumlu zemin karosu."
    },
    {
      title: "10x30 cm Parlak Lacivert Metro Duvar Seramiği",
      categorySlug: "kalebodur",
      price: 340.0,
      stock: 220,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "Pahlı kenarlı İtalyan metro karo tarzı derin lacivert duvar kaplaması."
    },

    // 2. DUŞAKABİN SİSTEMLERİ (10 items)
    {
      title: "90x90 cm Köşe Sürgülü Lacivert & Siyah Profilli Duşakabin",
      categorySlug: "dusakabin",
      price: 4850.0,
      stock: 24,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "6 mm temperli şeffaf güvenlik camı, paslanmaz elektrostatik boyalı lacivert/siyah alüminyum profil ve manyetik fitil sistemi."
    },
    {
      title: "100x100 cm Füme Karartmalı Cam Kare Lüks Duşakabin",
      categorySlug: "dusakabin",
      price: 5690.0,
      stock: 18,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Su itici kireç tutmaz ClearShield kaplama cam. Sessiz çift tekerlekli paslanmaz rulman mekanizması."
    },
    {
      title: "120x90 cm Walk-In Sabit Cam Duşakabin Paneli (Gold & Lacivert)",
      categorySlug: "dusakabin",
      price: 3650.0,
      stock: 30,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "8 mm ultra dayanıklı şeffaf cam ve teleskopik sabitleme kolu. Geniş ve ferah banyolar için modern walk-in tasarım."
    },
    {
      title: "80x80 cm Oval Sürgülü İki Kapılı Şeffaf Duşakabin",
      categorySlug: "dusakabin",
      price: 3950.0,
      stock: 25,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Dar banyolar için yer kazandıran oval form. Krom parlak çerçeve ve sızdırmaz fitil."
    },
    {
      title: "110x110 cm Çerçevesiz Menteşeli Açılır Lüks Cam Duşakabin",
      categorySlug: "dusakabin",
      price: 6400.0,
      stock: 12,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Pirinç döküm lüks menteşeler, dışa açılır 8 mm temperli cam kanatlar ve mıknatıslı kilit sistemi."
    },
    {
      title: "100x80 cm Dikdörtgen Mat Siyah Çizgili Grid Duşakabin",
      categorySlug: "dusakabin",
      price: 4990.0,
      stock: 20,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Endüstriyel pencereli desen baskılı temperli cam. Siyah mat çerçeveli modern banyo çözümü."
    },
    {
      title: "120x100 cm Asimetrik Çift Sürgülü Geniş Banyo Duşakabini",
      categorySlug: "dusakabin",
      price: 6850.0,
      stock: 15,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "Ekstra geniş giriş açıklığı sunan çift raylı paslanmaz sürgü sistemi."
    },
    {
      title: "90x90 cm Kumlama Şeritli Gizlilik Korumalı Duşakabin",
      categorySlug: "dusakabin",
      price: 4200.0,
      stock: 28,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "Orta bölgesi buğulu kumlama cam, darbelere karşı emniyetli temper işlemi."
    },
    {
      title: "140x90 cm Lüks Walk-In Çift Girişli Ada Duş Paneli",
      categorySlug: "dusakabin",
      price: 4750.0,
      stock: 16,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "Geniş banyolar için ortadan bağımsız iki yandan giriş imkanı sunan duş camı."
    },
    {
      title: "90x90 cm Altın Pirinç Profilli Şeffaf Temperli Duşakabin",
      categorySlug: "dusakabin",
      price: 5900.0,
      stock: 14,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "Fırçalanmış gold alüminyum profil detayları ile lacivert ve mermer banyolara mükemmel uyum."
    },

    // 3. BANYO DOLAPLARI (10 items)
    {
      title: "80 cm Safir Lacivert MDF Aynalı Asma Banyo Dolabı Takımı",
      categorySlug: "banyo-dolaplari",
      price: 7950.0,
      stock: 18,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "Suya dayanıklı lake kaplama gövde, dokunmatik LED aydınlatmalı ayna, seramik lavabo ve yavaş kapanır frenli çekmeceler."
    },
    {
      title: "100 cm Gece Mavisi Mermer Tezgahlı Çift Çekmeceli Banyo Dolabı",
      categorySlug: "banyo-dolaplari",
      price: 11800.0,
      stock: 10,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Doğal Carrara beyaz mermer tezgah, gömme seramik lavabo ve altın rengi kulp detayları ile lüks lacivert banyo ünitesi."
    },
    {
      title: "35 cm Asma Lacivert Frenli Banyo Boy Dolabı",
      categorySlug: "banyo-dolaplari",
      price: 3250.0,
      stock: 22,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Çok raflı geniş iç hacim, çift yönlü monte edilebilir kapak, nem geçirmez lake kaplama."
    },
    {
      title: "65 cm Kompakt Mat Lacivert Küçük Banyo Dolabı Takımı",
      categorySlug: "banyo-dolaplari",
      price: 5400.0,
      stock: 26,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "Dar alanlar için tasarlanmış derin çekmeceli monoblok lavabolu kompakt ünite."
    },
    {
      title: "120 cm Çift Lavabolu Safir Lacivert Lüks Banyo Ünitesi",
      categorySlug: "banyo-dolaplari",
      price: 14900.0,
      stock: 8,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Ebeveyn banyoları için çift seramik lavabo, 4 adet tam açılır frenli çekmece ve çift LED aynalı set."
    },
    {
      title: "80 cm Ahşap & Lacivert Kombinasyonlu Dokunmatik LED Aynalı Dolap",
      categorySlug: "banyo-dolaplari",
      price: 8600.0,
      stock: 14,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Doğal ceviz kaplama ve mat lacivert lake kapakların sıcak uyumu."
    },
    {
      title: "100 cm Mat Antrasit & Füme Cam Çekmeceli Banyo Dolabı",
      categorySlug: "banyo-dolaplari",
      price: 9800.0,
      stock: 12,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "Füme cam vitrin çekmece detayı, sensörlü iç aydınlatma ve su tutmayan porselen lavabo."
    },
    {
      title: "50 cm Misafir WC İçin Mineli Lacivert Lavabolu Dolap",
      categorySlug: "banyo-dolaplari",
      price: 3800.0,
      stock: 25,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "Giriş kat veya misafir lavaboları için yer kaplamayan şık asma dolap."
    },
    {
      title: "40 cm İki Kapaklı Lacivert Çamaşır Sepetli Boy Dolabı",
      categorySlug: "banyo-dolaplari",
      price: 3950.0,
      stock: 20,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "Alt kısmında gizli devrilir kirli çamaşır sepeti mekanizması bulunan fonksiyonel ünite."
    },
    {
      title: "90 cm Oval Hatlı Masif Meşe & Gece Mavisi Banyo Dolabı",
      categorySlug: "banyo-dolaplari",
      price: 10500.0,
      stock: 10,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "Kavisli yumuşak köşe hatları, masif ahşap karkas ve derin safir mavisi kapaklar."
    },

    // 4. MUSLUK & BATARYALAR (10 items)
    {
      title: "Mat Lacivert & Fırçalanmış Altın Şelale Lavabo Bataryası",
      categorySlug: "musluk-batarya",
      price: 1890.0,
      stock: 45,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "Pirinç döküm gövde, seramik kartuş, su tasarruflu perlatör ve zarif şelale akışlı lacivert-gold kombinasyonu."
    },
    {
      title: "Termostatik Ankastre Duş Bataryası & Yağmurlama Tepe Duşu Seti",
      categorySlug: "musluk-batarya",
      price: 3450.0,
      stock: 30,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "38°C sabit emniyet kilitli termostatik vana, 30 cm geniş paslanmaz çelik tepe duş başlığı ve fonksiyonel el duşu."
    },
    {
      title: "Mat Siyah & Lacivert Detaylı Döner Borulu Aç-Kapa Lavabo Musluğu",
      categorySlug: "musluk-batarya",
      price: 1350.0,
      stock: 50,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "360 derece dönebilen yüksek çıkış ucu, çizilmeye dayanıklı PVD kaplama teknolojisi."
    },
    {
      title: "Lüks Altın PVD Kaplama Şelale Akışlı Banyo Bataryası",
      categorySlug: "musluk-batarya",
      price: 2100.0,
      stock: 28,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Kararma yapmayan saf PVD altın kaplama, geniş açık ağızlı doğal dere akışı etkisi."
    },
    {
      title: "Krom Çift Kumandalı Klasik Pirinç Eviye ve Lavabo Bataryası",
      categorySlug: "musluk-batarya",
      price: 1150.0,
      stock: 60,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Yüksek dayanımlı paslanmaz krom kaplama, çift aç-kapa retro kumanda kolları."
    },
    {
      title: "Mat Lacivert Ankastre Duvar Tipi Kuğu Lavabo Bataryası",
      categorySlug: "musluk-batarya",
      price: 2250.0,
      stock: 25,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "Duvara gömme montaj, tezgah üzerinde sıfır yer kaplayan minimalist lacivert gövde."
    },
    {
      title: "Dijital Isı Göstergeli Akıllı Dokunmatik Lavabo Musluğu",
      categorySlug: "musluk-batarya",
      price: 2800.0,
      stock: 20,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Su türbininden güç alan pilsiz LED ekran; anlık su sıcaklığını ve debisini gösterir."
    },
    {
      title: "Piyano Tuşlu 4 Fonksiyonlu Lüks Duş Kolonu & Bataryası",
      categorySlug: "musluk-batarya",
      price: 4200.0,
      stock: 22,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "Piyano tuşlarıyla tepe duşu, el duşu, şelale ve bide çıkışını tek tıkla kontrol edin."
    },
    {
      title: "Fotoselli Otomatik Sensörlü Su Tasarruflu Lavabo Musluğu",
      categorySlug: "musluk-batarya",
      price: 1950.0,
      stock: 35,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Temassız hijyenik kızılötesi algılama, %60 su tasarrufu sağlayan perlatör."
    },
    {
      title: "Fırçalanmış Antrasit Kare Formlu Banyo ve Duş Bataryası",
      categorySlug: "musluk-batarya",
      price: 1680.0,
      stock: 40,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "Keskin geometrik kare çizgiler, parmak izi bırakmayan mat antrasit yüzey."
    },

    // 5. KLOZET & TUVALET SİSTEMLERİ (10 items)
    {
      title: "Mat Lacivert & Altın Detaylı Kanalsız (Rimless) Asma Klozet",
      categorySlug: "klozet-tuvalet",
      price: 5290.0,
      stock: 25,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "Hijyenik kanalsız yıkama teknolojisi, sessiz yavaş kapanan duroplast kapak, antibakteriyel mat lacivert seramik yüzey."
    },
    {
      title: "Parlak Beyaz Entegre Taharet Musluklu Kompakt Asma Klozet",
      categorySlug: "klozet-tuvalet",
      price: 4350.0,
      stock: 35,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "Gizli montaj sistemi ile pürüzsüz dış gövde, su tasarruflu 3/4.5 litre çift kademeli yıkama uyumu."
    },
    {
      title: "Gömme Rezervuar Seti & Lacivert Cam Kumanda Paneli",
      categorySlug: "klozet-tuvalet",
      price: 2890.0,
      stock: 50,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "Tuğla ve alçıpan duvarlara uygun ses yalıtımlı gömme rezervuar, çift kademeli temperli lacivert cam buton."
    },
    {
      title: "Mat Siyah Kanalsız Yavaş Kapanan Kapaklı Asma Klozet",
      categorySlug: "klozet-tuvalet",
      price: 4800.0,
      stock: 22,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "İpeksi mat siyah sır dokusu, kireç tutmayan nano yüzey koruması."
    },
    {
      title: "Akıllı Bide Fonksiyonlu Isıtmalı Kapaklı Elektrikli Lüks Klozet",
      categorySlug: "klozet-tuvalet",
      price: 18500.0,
      stock: 8,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Uzaktan kumandalı su sıcaklık ayarı, kurutma fanı, otomatik koku emişi ve gece LED aydınlatması."
    },
    {
      title: "Safir Lacivert Tek Parça Yere Oturan Monoblok Klozet",
      categorySlug: "klozet-tuvalet",
      price: 6100.0,
      stock: 15,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Gömme rezervuarsız klasik zemin montajına uygun monoblok seramik klozet ve su deposu takımı."
    },
    {
      title: "Kısa Projeksiyonlu Küçük Banyolar İçin Yer Kazandıran Asma Klozet",
      categorySlug: "klozet-tuvalet",
      price: 3900.0,
      stock: 30,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Sadece 48 cm derinlik ile dar banyolarda geçiş alanını genişleten kompakt form."
    },
    {
      title: "Antrasit Mat Seramik Çift Kademeli Rezervuarlı Klozet Takımı",
      categorySlug: "klozet-tuvalet",
      price: 5450.0,
      stock: 18,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Karanlık ve modern mimari banyo projelerine özel antrasit renk tonu."
    },
    {
      title: "Pnömatik Sessiz Butonlu Gömme Rezervuar İç Takım Seti",
      categorySlug: "klozet-tuvalet",
      price: 2450.0,
      stock: 45,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "Hava basınçlı yumuşak basış mekanizması, 10 bar basınca dayanıklı sızdırmaz gövde."
    },
    {
      title: "Altın Çizgili Beyaz Porselen Klasik Lüks Klozet",
      categorySlug: "klozet-tuvalet",
      price: 5800.0,
      stock: 14,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "Saraysı banyolar için altın yaldız bordür detaylı birinci sınıf porselen klozet."
    },

    // 6. SERAMİK LAVABOLAR (10 items)
    {
      title: "Tezgah Üstü Mat Lacivert Oval Çanak Lavabo (42x42 cm)",
      categorySlug: "seramik-lavabo",
      price: 2450.0,
      stock: 30,
      image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      description: "İnce kenarlı yuvarlak form, kadife dokulu mat lacivert sır kaplama, leke tutmayan seramik yüzey."
    },
    {
      title: "Dikdörtgen İnce Kenarlı Monoblok Seramik Lavabo (60x40 cm)",
      categorySlug: "seramik-lavabo",
      price: 1980.0,
      stock: 40,
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      description: "Geniş hazne derinliği, taşma delikli emniyet tasarımı, batarya delikli modern hatlar."
    },
    {
      title: "Mermer Desenli Safir Lacivert Oval Tezgah Üstü Lavabo",
      categorySlug: "seramik-lavabo",
      price: 2850.0,
      stock: 22,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Doğal mermer damarı baskılı lüks lacivert çanak lavabo. Banyonuzun odak noktası."
    },
    {
      title: "Mat Siyah & Altın Bordürlü Yuvarlak Çanak Lavabo",
      categorySlug: "seramik-lavabo",
      price: 2600.0,
      stock: 25,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      description: "Dış yüzeyi mat siyah, ağız kenarı fırçalanmış altın detaylı tasarım lavabo."
    },
    {
      title: "80 cm Geniş Hazneli Entegre Havluluklu Asma Seramik Lavabo",
      categorySlug: "seramik-lavabo",
      price: 3200.0,
      stock: 18,
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
      description: "Alt kısmında paslanmaz çelik havlu asma barı bulunan bağımsız duvara monte seramik lavabo."
    },
    {
      title: "Gece Mavisi Kare İnce Kenar Tezgah Üstü Lavabo (40x40 cm)",
      categorySlug: "seramik-lavabo",
      price: 2300.0,
      stock: 28,
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1000&q=80",
      description: "Kare geometrisi ve 5 mm ultra ince kenarları ile modern banyo tezgahları için ideal."
    },
    {
      title: "Doğal Taş Dokulu Rektifiye Mat Traverten Efektli Lavabo",
      categorySlug: "seramik-lavabo",
      price: 3600.0,
      stock: 15,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      description: "Rustik ve sıcak banyolar için doğal traverten dokulu yüksek sıcaklıkta pişirilmiş seramik."
    },
    {
      title: "Kompakt Köşe Tipi Küçük WC Seramik Lavabosu (35x35 cm)",
      categorySlug: "seramik-lavabo",
      price: 1450.0,
      stock: 35,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      description: "Köşe alanları değerlendiren üçgen form, mini batarya yuvası."
    },
    {
      title: "Çift Gözlü 120 cm Geniş Tezgah Üstü Çiftli Seramik Lavabo",
      categorySlug: "seramik-lavabo",
      price: 4800.0,
      stock: 10,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
      description: "Büyük aile ve ebeveyn banyoları için tek parça döküm çift hazneli porselen lavabo."
    },
    {
      title: "Safir Mavi İçi Parlak Dışı Mat Özel Tasarım Çanak Lavabo",
      categorySlug: "seramik-lavabo",
      price: 2750.0,
      stock: 24,
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1000&q=80",
      description: "İç havuzu suyun akışını kolaylaştıran parlak sır, dış gövdesi kadife mat safir mavisi."
    }
  ];

  for (const prod of products) {
    const slug = makeSlug(prod.title);
    await prisma.product.create({
      data: {
        title: prod.title,
        slug,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        image: prod.image,
        categoryId: categoryMap[prod.categorySlug]
      }
    });
  }

  console.log(`✅ 6 kategori ve tam 60 ADET (her kategoriden 10 adet) banyo & seramik ürünü başarıyla yüklendi!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
