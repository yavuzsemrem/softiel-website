# Softiel Website & CMS Platform

Modern, çok dilli (6 dil), performans odaklı Next.js 14 tabanlı kurumsal website ve içerik yönetim sistemi.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-12-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack'i](#-teknoloji-stacki)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [Proje Yapısı](#-proje-yapısı)
- [Kullanım](#-kullanım)
- [Dashboard & CMS](#-dashboard--cms)
- [Çok Dilli Destek](#-çok-dilli-destek)
- [API Routes](#-api-routes)
- [Güvenlik](#-güvenlik)
- [Performans Optimizasyonları](#-performans-optimizasyonları)
- [Deployment](#-deployment)
- [Kontribüsyon](#-kontribüsyon)

## ✨ Özellikler

### 🌐 Website Özellikleri
- **6 Dilde Tam Destek**: Türkçe, İngilizce, Almanca, Fransızca, Rusça, Arapça
- **9 Hizmet Sayfası**: Web Tasarım, Web Geliştirme, Mobil Uygulama, SEO, Google Ads, WordPress, Logo & Kurumsal Kimlik, Sosyal Medya Yönetimi, Yapay Zeka Entegrasyonları, Dijital Danışmanlık
- **Blog Sistemi**: Kategoriler, etiketler, yorumlar, çok dilli blog yazıları
- **Proje Portföy**: Detaylı proje gösterimleri, filtreleme ve arama
- **İletişim Formu**: EmailJS entegrasyonu, reCAPTCHA v3 koruması
- **Teklif Formu**: Modal tabanlı, detaylı proje teklif formu
- **Dark Mode**: Tam dark mode desteği
- **Responsive Design**: Mobil, tablet, desktop için optimize edilmiş
- **Animasyonlar**: Framer Motion ile akıcı geçişler
- **SEO Optimizasyonu**: Meta tags, Open Graph, Structured Data
- **Performans**: Lazy loading, code splitting, image optimization

### 🎛️ CMS & Dashboard Özellikleri
- **Blog Yönetimi**: Blog yazıları oluşturma, düzenleme, silme
- **Proje Yönetimi**: Portföy projelerinin yönetimi
- **Kategori & Etiket Yönetimi**: İçerik organizasyonu
- **Yorum Yönetimi**: Blog yorumlarının moderasyonu
- **Medya Yönetimi**: Görsel yükleme ve yönetimi
- **Kullanıcı Yönetimi**: Rol tabanlı erişim kontrolü
- **SEO Yönetimi**: Meta tag'ler, keywords, descriptions
- **İstatistikler**: Dashboard analytics ve raporlar
- **Bildirimler**: Sistem bildirimleri
- **Güvenlik**: OTP tabanlı iki faktörlü kimlik doğrulama

## 🛠️ Teknoloji Stack'i

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes (Dark mode)
- **i18n**: next-i18next, react-i18next

### Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Server Functions**: Next.js API Routes

### Güvenlik & Spam Koruması
- **reCAPTCHA v3**: Google reCAPTCHA entegrasyonu
- **OTP Sistemi**: EmailJS ile OTP gönderimi
- **Rate Limiting**: API route koruması
- **Input Validation**: Zod schema validation

### Email Servisi
- **EmailJS**: İletişim formları için
- **SMTP**: Hostinger SMTP (OTP gönderimi)

### AI Entegrasyonları
- **Google Gemini**: İçerik oluşturma ve çeviri
- **Google Translate API**: Otomatik çeviri

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ veya 20+
- npm, yarn, pnpm veya bun
- Firebase hesabı
- EmailJS hesabı (isteğe bağlı)
- Google reCAPTCHA v3 keys (production için)

### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Environment Variables Ayarlayın

`.env.local` dosyası oluşturun:

```bash
cp env.local.template .env.local
```

`.env.local` dosyasını düzenleyin:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# EmailJS Configuration (İletişim Formları için)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# SMTP Configuration (OTP Email için)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password

# reCAPTCHA v3 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Google Translate API (İsteğe bağlı)
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# Gemini AI API (İsteğe bağlı)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Development Server'ı Başlatın

```bash
# Port 3001'de (default)
npm run dev

# Port 3000'de
npm run dev:3000

# veya
yarn dev
pnpm dev
```

Tarayıcınızda [http://localhost:3001](http://localhost:3001) adresini açın.

## ⚙️ Yapılandırma

### Firebase Kurulumu

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. Yeni bir proje oluşturun
3. Web uygulaması ekleyin
4. Firebase Config bilgilerini `.env.local` dosyasına ekleyin
5. Firestore Database'i oluşturun (Production mode veya Test mode)
6. Authentication'ı etkinleştirin (Email/Password)
7. Storage'ı etkinleştirin

### EmailJS Kurulumu

1. [EmailJS](https://www.emailjs.com/)'e kaydolun
2. Email servisi oluşturun (Gmail, Outlook, vb.)
3. Email template oluşturun
4. Public Key, Service ID ve Template ID'yi `.env.local` dosyasına ekleyin

Detaylı kurulum için: `RECAPTCHA_SETUP.md` dosyasına bakın.

### reCAPTCHA v3 Kurulumu

1. [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)'a gidin
2. Yeni site oluşturun (reCAPTCHA v3)
3. Domain'leri ekleyin: `localhost`, `yourdomain.com` (production için)
4. Site Key ve Secret Key'i `.env.local` dosyasına ekleyin

Detaylı kurulum için: `RECAPTCHA_SETUP.md` dosyasına bakın.

## 📁 Proje Yapısı

```
softiel-website/
├── public/                      # Static dosyalar
│   ├── images/                  # Görseller
│   ├── locales/                 # Çeviri dosyaları (JSON)
│   │   ├── tr/                  # Türkçe
│   │   ├── en/                  # İngilizce
│   │   ├── de/                  # Almanca
│   │   ├── fr/                  # Fransızca
│   │   ├── ru/                  # Rusça
│   │   └── ar/                  # Arapça
│   └── flags/                   # Ülke bayrakları
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── [lang]/              # Dil bazlı routing
│   │   │   ├── tr/              # Türkçe sayfalar
│   │   │   ├── en/              # İngilizce sayfalar
│   │   │   ├── de/              # Almanca sayfalar
│   │   │   ├── fr/              # Fransızca sayfalar
│   │   │   ├── ru/              # Rusça sayfalar
│   │   │   └── ar/              # Arapça sayfalar
│   │   │
│   │   ├── admin-panel-secure-access-2024/  # Admin giriş sayfası
│   │   ├── content-management-system-2024/  # CMS Dashboard
│   │   │   ├── blogs/           # Blog yönetimi
│   │   │   ├── projects/        # Proje yönetimi
│   │   │   ├── categories/      # Kategori yönetimi
│   │   │   ├── tags/            # Etiket yönetimi
│   │   │   ├── comments/        # Yorum yönetimi
│   │   │   ├── users/           # Kullanıcı yönetimi
│   │   │   ├── media/           # Medya yönetimi
│   │   │   ├── seo/             # SEO yönetimi
│   │   │   ├── settings/        # Ayarlar
│   │   │   └── stats/           # İstatistikler
│   │   │
│   │   ├── api/                 # API Routes
│   │   │   ├── blog/            # Blog API
│   │   │   ├── send-contact-email/  # İletişim formu
│   │   │   ├── send-quote-email/    # Teklif formu
│   │   │   ├── send-otp/        # OTP gönderme
│   │   │   ├── verify-otp/      # OTP doğrulama
│   │   │   └── generate-otp/    # OTP oluşturma
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Ana sayfa
│   │   └── globals.css          # Global stiller
│   │
│   ├── components/              # React bileşenleri
│   │   ├── header.tsx           # Header/Navigation
│   │   ├── footer.tsx           # Footer
│   │   ├── contact-form.tsx     # İletişim formu
│   │   ├── quote-modal.tsx      # Teklif modal
│   │   ├── blog-*.tsx           # Blog bileşenleri
│   │   ├── service-*.tsx        # Servis sayfası bileşenleri
│   │   ├── dashboard-*.tsx     # Dashboard bileşenleri
│   │   └── ...                  # Diğer bileşenler
│   │
│   ├── lib/                     # Utility fonksiyonlar
│   │   ├── firebase.ts          # Firebase config
│   │   ├── firestore-auth.ts   # Firebase Auth
│   │   ├── firestore.ts         # Firestore operations
│   │   ├── session.ts           # Session yönetimi
│   │   └── ...                  # Diğer utilities
│   │
│   ├── contexts/                # React Context'ler
│   │   ├── i18n-context.tsx     # i18n context
│   │   └── notification-context.tsx  # Bildirim context
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useRecaptcha.ts      # reCAPTCHA hook
│   │   ├── useFingerprinting.ts # Fingerprinting hook
│   │   └── ...                  # Diğer hooks
│   │
│   └── config/                  # Konfigürasyon dosyaları
│       ├── recaptcha.ts         # reCAPTCHA config
│       ├── emailjs.ts           # EmailJS config
│       └── index.ts              # Ana config
│
├── next.config.js               # Next.js konfigürasyonu
├── tailwind.config.ts           # Tailwind CSS konfigürasyonu
├── tsconfig.json                # TypeScript konfigürasyonu
├── package.json                 # NPM dependencies
└── README.md                    # Bu dosya
```

## 📖 Kullanım

### Dil Değiştirme

Website'de dil değiştirmek için header'daki dil seçiciyi kullanın veya URL'deki dil kodunu değiştirin:

- Türkçe: `/tr/`
- İngilizce: `/en/`
- Almanca: `/de/`
- Fransızca: `/fr/`
- Rusça: `/ru/`
- Arapça: `/ar/`

### Sayfa Yapısı

Her dil için aynı sayfa yapısı mevcuttur:

- **Ana Sayfa**: `/[lang]/`
- **Hakkımızda**: `/[lang]/about` (veya `/[lang]/hakkimizda` gibi)
- **Hizmetler**: `/[lang]/services` (veya `/[lang]/hizmetlerimiz` gibi)
  - Web Sitesi Tasarımı: `/[lang]/services/website-design`
  - Web Geliştirme: `/[lang]/services/web-development`
  - Mobil Uygulama: `/[lang]/services/mobile-app-development`
  - SEO Optimizasyonu: `/[lang]/services/seo-optimization`
  - Google Ads Yönetimi: `/[lang]/services/google-ads-management`
  - WordPress Çözümleri: `/[lang]/services/wordpress-solutions`
  - Logo & Kurumsal Kimlik: `/[lang]/services/logo-corporate-identity-design`
  - Sosyal Medya Yönetimi: `/[lang]/services/social-media-management`
  - Yapay Zeka Entegrasyonları: `/[lang]/services/ai-integrations`
  - Dijital Danışmanlık: `/[lang]/services/digital-consulting`
- **Projeler**: `/[lang]/projects` (veya `/[lang]/projelerimiz` gibi)
- **Blog**: `/[lang]/blog`
- **İletişim**: `/[lang]/contact` (veya `/[lang]/iletisim` gibi)
- **Fiyatlandırma**: `/[lang]/pricing` (veya `/[lang]/fiyatlandirma` gibi)

### İletişim Formu Kullanımı

1. İletişim sayfasına gidin
2. Formu doldurun (Ad, E-posta, Telefon, Mesaj)
3. Hizmet seçin (opsiyonel)
4. Gizlilik politikasını onaylayın
5. Gönder butonuna tıklayın
6. EmailJS üzerinden email gönderilir

### Teklif Formu Kullanımı

1. Herhangi bir sayfada "Teklif Al" butonuna tıklayın
2. Modal açılır
3. Formu doldurun (Ad, E-posta, Telefon, Şirket, Hizmet, Proje Detayları)
4. Gizlilik politikasını onaylayın
5. "Teklif Talep Et" butonuna tıklayın
6. Email gönderilir

## 🎛️ Dashboard & CMS

### Giriş Yapma

1. Admin paneline gidin: `/admin-panel-secure-access-2024`
2. Kullanıcı adı veya e-posta girin
3. Şifre girin
4. Login butonuna tıklayın
5. E-posta adresinize gönderilen OTP kodunu girin
6. Dashboard'a yönlendirilirsiniz: `/content-management-system-2024`

### Dashboard Özellikleri

#### Blog Yönetimi
- **Yeni Blog Yazısı**: `/content-management-system-2024/blogs/new`
- **Blog Listesi**: `/content-management-system-2024/blogs`
- **Blog Düzenleme**: `/content-management-system-2024/blogs/[id]`
- **Blog Görüntüleme**: `/content-management-system-2024/blogs/[id-view]`

Özellikler:
- Markdown desteği
- HTML editor
- Görsel yükleme
- Kategori ve etiket atama
- Çok dilli içerik desteği
- SEO ayarları (meta tags, keywords)
- Yayınlama tarihi ayarlama
- Featured image

#### Proje Yönetimi
- **Yeni Proje**: `/content-management-system-2024/projects/new`
- **Proje Listesi**: `/content-management-system-2024/projects`
- **Proje Düzenleme**: `/content-management-system-2024/projects/[id]`

Özellikler:
- Proje görselleri
- Proje açıklaması
- Proje linkleri
- Teknoloji stack'i
- Kategori atama

#### Kategori Yönetimi
- **Kategori Listesi**: `/content-management-system-2024/categories`
- **Kategori Düzenleme**: `/content-management-system-2024/categories/[id]`

#### Etiket Yönetimi
- **Etiket Listesi**: `/content-management-system-2024/tags`
- **Etiket Düzenleme**: `/content-management-system-2024/tags/[id]`

#### Yorum Yönetimi
- **Yorum Listesi**: `/content-management-system-2024/comments`
- **Yorum Onaylama/Silme**: `/content-management-system-2024/comments/[id]`

Özellikler:
- Yorum moderasyonu
- Yanıt verme
- Yorum silme
- Spam kontrolü

#### Kullanıcı Yönetimi
- **Kullanıcı Listesi**: `/content-management-system-2024/users`
- **Kullanıcı Detayı**: `/content-management-system-2024/users/[id]`

Özellikler:
- Rol yönetimi (Admin, Editor, Author)
- Kullanıcı bilgileri düzenleme
- Kullanıcı silme

#### Medya Yönetimi
- **Medya Kütüphanesi**: `/content-management-system-2024/media`

Özellikler:
- Görsel yükleme
- Görsel düzenleme
- Görsel silme
- Firebase Storage entegrasyonu

#### SEO Yönetimi
- **SEO Ayarları**: `/content-management-system-2024/seo`

Özellikler:
- Global SEO ayarları
- Meta tags yönetimi
- Keywords yönetimi
- Open Graph ayarları

#### İstatistikler
- **Dashboard Stats**: `/content-management-system-2024/stats`

Özellikler:
- Blog yazısı sayısı
- Proje sayısı
- Yorum sayısı
- Kullanıcı sayısı
- Grafik ve tablolar

#### Ayarlar
- **Genel Ayarlar**: `/content-management-system-2024/settings`

Özellikler:
- Site ayarları
- Email ayarları
- Güvenlik ayarları

## 🌍 Çok Dilli Destek

### Çeviri Dosyaları

Çeviriler `public/locales/[lang]/common.json` dosyalarında tutulur.

Her dil için aynı JSON yapısı kullanılır:

```json
{
  "nav": {
    "home": "Ana Sayfa",
    "about": "Hakkımızda",
    "services": "Hizmetlerimiz",
    ...
  },
  "contact": {
    "title": "İletişim",
    "name": "Ad Soyad",
    ...
  }
}
```

### Yeni Çeviri Ekleme

1. `public/locales/[lang]/common.json` dosyasını açın
2. Çeviri key'ini ekleyin
3. Value'yu ilgili dildeki karşılığıyla değiştirin
4. Component'te `t('key.path')` ile kullanın

Örnek:
```tsx
import { useI18n } from '@/contexts/i18n-context'

const { t } = useI18n()
return <h1>{t('nav.home', 'Ana Sayfa')}</h1>
```

### URL Mapping

URL mapping `src/contexts/i18n-context.tsx` dosyasında yönetilir:

```typescript
const urlMappings = {
  '/tr/hizmetlerimiz/web-sitesi-tasarimi': {
    en: '/en/services/website-design',
    de: '/de/dienstleistungen/website-design',
    // ...
  }
}
```

Yeni sayfa eklerken URL mapping'e eklemeyi unutmayın.

## 🔌 API Routes

### İletişim Formu

**Endpoint**: `POST /api/send-contact-email`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+90 555 123 45 67",
  "company": "Example Corp",
  "service": "Web Development",
  "message": "I need a website...",
  "to_email": "your-email@yourdomain.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Teklif Formu

**Endpoint**: `POST /api/send-quote-email`

**Request Body**: Aynı yapıda

### OTP Gönderme

**Endpoint**: `POST /api/send-otp`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "expiresIn": 300
}
```

### OTP Doğrulama

**Endpoint**: `POST /api/verify-otp`

**Request Body**:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response**:
```json
{
  "success": true,
  "isValid": true
}
```

## 🔒 Güvenlik

### reCAPTCHA v3

Tüm formlar reCAPTCHA v3 ile korunur:
- İletişim formu
- Teklif formu
- Login formu
- Blog yorumları

### OTP Authentication

Admin panel girişi OTP tabanlı iki faktörlü kimlik doğrulama kullanır:
1. Kullanıcı adı/şifre
2. E-posta ile gönderilen OTP kodu

### Rate Limiting

API route'lar rate limiting ile korunur:
- Maksimum 3 istek / 15 dakika (IP bazlı)
- İletişim formu
- OTP API'leri

### Input Validation

- Zod schema validation
- XSS koruması (DOMPurify)
- SQL injection koruması (Firestore kullanımı)

### Firebase Security Rules

Firestore Security Rules örnekleri `firestore.rules` dosyasında mevcuttur.

## ⚡ Performans Optimizasyonları

### Code Splitting
- Dynamic imports
- Route-based code splitting
- Component lazy loading

### Image Optimization
- Next.js Image component
- WebP/AVIF formatları
- Lazy loading
- Responsive images

### CSS Optimization
- Critical CSS extraction
- CSS chunking
- Tailwind CSS purging

### Caching
- Static page caching
- API response caching
- Browser caching headers

### Bundle Optimization
- Tree shaking
- Minification
- Compression
- Bundle analyzer

## 🚀 Deployment

### Vercel Deployment (Önerilen)

1. GitHub'a push edin
2. [Vercel](https://vercel.com/)'e gidin
3. Import project
4. Environment variables'ları ekleyin
5. Deploy edin

### Environment Variables (Production)

Vercel dashboard'da şu environment variables'ları ekleyin:
- Tüm `NEXT_PUBLIC_*` değişkenleri
- `RECAPTCHA_SECRET_KEY`
- `SMTP_*` değişkenleri
- `NEXT_PUBLIC_SITE_URL` (production URL, örn: `https://yourdomain.com`)

### Firebase Production Setup

1. Firebase Console'da production projesi oluşturun
2. Firestore security rules'ları ayarlayın
3. Production domain'i authorized domains'e ekleyin
4. Storage rules'ları ayarlayın

### Domain Setup

1. Domain'i Vercel'e bağlayın
2. SSL sertifikası otomatik oluşturulur
3. DNS ayarlarını yapın

## 🧪 Development Commands

```bash
# Development server (port 3001)
npm run dev

# Development server (port 3000)
npm run dev:3000

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint

# Bundle analysis
npm run analyze
```

## 📦 Dependencies

### Production Dependencies
- `next`: Next.js framework
- `react`: React library
- `react-dom`: React DOM
- `firebase`: Firebase SDK
- `@emailjs/browser`: EmailJS client
- `framer-motion`: Animations
- `lucide-react`: Icons
- `next-themes`: Theme management
- `i18next`: Internationalization
- `react-google-recaptcha-v3`: reCAPTCHA v3
- `zod`: Schema validation
- `dompurify`: XSS protection

### Development Dependencies
- `typescript`: TypeScript
- `tailwindcss`: Tailwind CSS
- `eslint`: Linting
- `@next/bundle-analyzer`: Bundle analysis

Tam liste için `package.json` dosyasına bakın.

## 🤝 Kontribüsyon

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 👥 İletişim

Proje sahibi ile iletişime geçmek için GitHub Issues veya repository'nin iletişim bilgilerini kullanın.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/)

---

**Not**: Bu README dosyası projenin mevcut durumunu yansıtmaktadır. Proje sürekli geliştirilmektedir ve bu dokümantasyon güncel tutulmaya çalışılmaktadır.
