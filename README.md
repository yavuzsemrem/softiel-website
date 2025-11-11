# Softiel Website & CMS Platform

Modern Next.js 14-based corporate website and content management system with support for 6 languages.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-12-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🌐 Website

![Softiel Website](public/images/softiel-website.png)

**Key Features:**
- 6 language support (TR, EN, DE, FR, RU, AR)
- 10 service pages (Web Design, SEO, Google Ads, AI Integrations, etc.)
- Blog system (Categories, tags, comments)
- Project portfolio
- Contact & quote forms (EmailJS + reCAPTCHA v3)
- Dark mode
- Responsive design
- SEO optimization

## 🎛️ Dashboard & CMS

![Softiel Dashboard](public/images/softiel-dashboard.png)

**Management Features:**
- Blog and project management
- Category & tag management
- Comment moderation
- Media library
- User management
- SEO settings
- Statistics and reports
- Two-factor authentication with OTP

## 🛠️ Tech Stack

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS 4, Framer Motion  
**Backend:** Firebase (Firestore, Auth, Storage), Next.js API Routes  
**Security:** reCAPTCHA v3, OTP, Rate Limiting, Zod Validation  
**Email:** EmailJS, Hostinger SMTP  
**AI:** Google Gemini, Google Translate API

## 🚀 Installation

### Requirements
- Node.js 18+ or 20+
- Firebase account
- EmailJS account (optional)
- Google reCAPTCHA v3 keys

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp env.local.template .env.local

# 4. Edit .env.local file (Firebase, EmailJS, SMTP, reCAPTCHA)

# 5. Start development server
npm run dev
```

**Important Environment Variables:**
- `NEXT_PUBLIC_FIREBASE_*` (API Key, Auth Domain, etc.)
- `NEXT_PUBLIC_EMAILJS_*` (Service ID, Template ID, Public Key)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`
- `SMTP_*` (Host, Port, User, Pass)

See `env.local.template` file for detailed setup.

## 📁 Project Structure

```
softiel-website/
├── public/
│   ├── images/              # Images
│   └── locales/             # Translation files (tr, en, de, fr, ru, ar)
├── src/
│   ├── app/
│   │   ├── [lang]/          # Language-based routing
│   │   ├── admin-panel-secure-access-2024/    # Admin login
│   │   ├── content-management-system-2024/    # CMS Dashboard
│   │   └── api/             # API Routes
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   ├── contexts/            # React Contexts
│   └── hooks/               # Custom hooks
```

## 📖 Usage

### Website
- **Home Page:** `/[lang]/`
- **Services:** `/[lang]/services/[service-slug]`
- **Projects:** `/[lang]/projects`
- **Blog:** `/[lang]/blog`
- **Contact:** `/[lang]/contact`

### CMS Dashboard
1. Login to admin panel: `/admin-panel-secure-access-2024`
2. Sign in with email/username and password
3. Enter OTP code sent to your email
4. Dashboard: ``

**Dashboard Modules:**
- `/blogs` - Blog management
- `/projects` - Project management
- `/categories` & `/tags` - Category/tag management
- `/comments` - Comment moderation
- `/media` - Media library
- `/users` - User management
- `/seo` - SEO settings
- `/stats` - Statistics

## 🔒 Security

- **reCAPTCHA v3:** Spam protection on all forms
- **OTP Authentication:** Two-factor authentication
- **Rate Limiting:** IP-based request limiting (3 requests / 15 minutes)
- **Input Validation:** Zod schema validation
- **XSS Protection:** DOMPurify sanitization

## ⚡ Performance Optimizations

- Code splitting and lazy loading
- Next.js Image optimization (WebP/AVIF)
- Tailwind CSS purging
- Static page caching
- Bundle optimization

## 🚀 Deployment

### Render.com (Recommended)

1. Push to GitHub
2. Import project from [Render](https://render.com/) dashboard
3. Add environment variables
4. Deploy

**Production Environment Variables:**
- All `NEXT_PUBLIC_*` variables
- `RECAPTCHA_SECRET_KEY`
- `SMTP_*` variables
- `NEXT_PUBLIC_SITE_URL` (production URL)

### Firebase Production Setup
- Create production project
- Configure Firestore security rules
- Add authorized domains

## 🧪 Commands

```bash
npm run dev        # Development server (port 3001)
npm run dev:3000   # Development server (port 3000)
npm run build      # Production build
npm run start      # Production server
npm run lint       # Linting
npm run analyze    # Bundle analysis
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This is a private project. All rights reserved.

## 🙏 Acknowledgments

[Next.js](https://nextjs.org/) • [Firebase](https://firebase.google.com/) • [Tailwind CSS](https://tailwindcss.com/) • [Framer Motion](https://www.framer.com/motion/)

---

**Note:** This README file reflects the current state of the project. The project is continuously being developed and this documentation is kept up to date.
