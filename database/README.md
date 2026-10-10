# 🗄️ Database Module - Mete Ceramic Store

Bu klasör, projenin tüm PostgreSQL veritabanı şemasını, migration'larını, seed verilerini ve Docker kapsayıcısını bağımsız bir şekilde yönetir.

## Dosya Yapısı
- `prisma/schema.prisma`: PostgreSQL Prisma ORM veri modelleri
- `seed.js`: Varsayılan Admin kullanıcısı (`admin@ceramic.local`) ve örnek seramik kategorileri/ürünleri yükleme scripti
- `docker-compose.yml`: PostgreSQL veritabanı Docker konfigürasyonu

## Veritabanı Komutları

```bash
# Docker PostgreSQL Başlatma
docker compose up -d

# Prisma Şema Generate & Migration
npm run prisma:generate
npm run prisma:migrate

# Seed Verilerini Yükleme
npm run seed
```
