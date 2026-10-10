# Mete Ceramic Store

Modern ve profesyonel bir full-stack seramik mağazası yönetim ve e-ticaret sistemi. Proje; **Frontend**, **Backend** ve **Database** olmak üzere 3 bağımsız modül klasörüne ayrılmıştır:

- `frontend/`: Next.js App Router, React (Pure JSX), Tailwind CSS, Zustand
- `backend/`: Node.js, Express.js (JavaScript ES Modules), JWT Auth, Zod Validation
- `database/`: PostgreSQL Docker konfigürasyonu, Prisma ORM şeması (`schema.prisma`) ve `seed.js` scripti

## Kurulum

1. Paketleri kurun:

```bash
npm install
```

2. Ortam değişkenlerini hazırlayın:

```bash
cp .env.example .env
```

3. PostgreSQL veritabanını başlatın (Docker):

```bash
docker compose up -d
```

4. Prisma client, migration ve veritabanı tohumlama (seed):

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

5. Geliştirme sunucuları:

```bash
# Backend sunucusu (Port 5000)
npm run dev:backend

# Frontend sunucusu (Port 3000)
npm run dev:frontend
```

Veya Windows kısayol çalıştırma dosyaları:
- `start-backend.cmd`
- `start-frontend.cmd`

- API: `http://localhost:5000/api`
- Frontend: `http://localhost:3000`

Seed admin kullanıcısı: `admin@ceramic.local / Admin123!`

## Modül Yapısı

- `frontend/`: Arayüz kodları, sayfalar (`app/`), bileşenler (`components/`), durum yönetimi (`store/`).
- `backend/`: REST API uç noktaları (`src/routes/`), servisler (`src/services/`), middleware'ler (`src/middlewares/`).
- `database/`: Veritabanı şeması (`prisma/schema.prisma`), seed verileri (`seed.js`) ve Docker Compose (`docker-compose.yml`).
