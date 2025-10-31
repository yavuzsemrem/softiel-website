# Softiel Website & CMS Platform

Modern, multilingual (6 languages), performance-focused Next.js 14-based corporate website and content management system.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-12-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Dashboard & CMS](#-dashboard--cms)
- [Multilingual Support](#-multilingual-support)
- [API Routes](#-api-routes)
- [Security](#-security)
- [Performance Optimizations](#-performance-optimizations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🌐 Website Features
- **Full Support in 6 Languages**: Turkish, English, German, French, Russian, Arabic
- **10 Service Pages**: Website Design, Web Development, Mobile App, SEO, Google Ads, WordPress, Logo & Corporate Identity, Social Media Management, AI Integrations, Digital Consulting
- **Blog System**: Categories, tags, comments, multilingual blog posts
- **Project Portfolio**: Detailed project displays, filtering and search
- **Contact Form**: EmailJS integration, reCAPTCHA v3 protection
- **Quote Form**: Modal-based, detailed project quote form
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Optimized for mobile, tablet, desktop
- **Animations**: Smooth transitions with Framer Motion
- **SEO Optimization**: Meta tags, Open Graph, Structured Data
- **Performance**: Lazy loading, code splitting, image optimization

### 🎛️ CMS & Dashboard Features
- **Blog Management**: Create, edit, delete blog posts
- **Project Management**: Manage portfolio projects
- **Category & Tag Management**: Content organization
- **Comment Management**: Blog comment moderation
- **Media Management**: Image upload and management
- **User Management**: Role-based access control
- **SEO Management**: Meta tags, keywords, descriptions
- **Statistics**: Dashboard analytics and reports
- **Notifications**: System notifications
- **Security**: OTP-based two-factor authentication

## 🛠️ Tech Stack

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

### Security & Spam Protection
- **reCAPTCHA v3**: Google reCAPTCHA integration
- **OTP System**: OTP sending via EmailJS
- **Rate Limiting**: API route protection
- **Input Validation**: Zod schema validation

### Email Service
- **EmailJS**: For contact forms
- **SMTP**: Hostinger SMTP (OTP sending)

### AI Integrations
- **Google Gemini**: Content creation and translation
- **Google Translate API**: Automatic translation

## 🚀 Installation

### Requirements
- Node.js 18+ or 20+
- npm, yarn, pnpm or bun
- Firebase account
- EmailJS account (optional)
- Google reCAPTCHA v3 keys (for production)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create `.env.local` file:

```bash
cp env.local.template .env.local
```

Edit `.env.local` file:

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

# EmailJS Configuration (For Contact Forms)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# SMTP Configuration (For OTP Email)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password

# reCAPTCHA v3 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Google Translate API (Optional)
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# Gemini AI API (Optional)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start Development Server

```bash
# On port 3001 (default)
npm run dev

# On port 3000
npm run dev:3000

# or
yarn dev
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## ⚙️ Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app
4. Add Firebase Config information to `.env.local` file
5. Create Firestore Database (Production mode or Test mode)
6. Enable Authentication (Email/Password)
7. Enable Storage

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Add Public Key, Service ID and Template ID to `.env.local` file

For detailed setup, see: `RECAPTCHA_SETUP.md` file.

### reCAPTCHA v3 Setup

1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Create a new site (reCAPTCHA v3)
3. Add domains: `localhost`, `yourdomain.com` (for production)
4. Add Site Key and Secret Key to `.env.local` file

For detailed setup, see: `RECAPTCHA_SETUP.md` file.

## 📁 Project Structure

```
softiel-website/
├── public/                      # Static files
│   ├── images/                  # Images
│   ├── locales/                 # Translation files (JSON)
│   │   ├── tr/                  # Turkish
│   │   ├── en/                  # English
│   │   ├── de/                  # German
│   │   ├── fr/                  # French
│   │   ├── ru/                  # Russian
│   │   └── ar/                  # Arabic
│   └── flags/                   # Country flags
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── [lang]/              # Language-based routing
│   │   │   ├── tr/              # Turkish pages
│   │   │   ├── en/              # English pages
│   │   │   ├── de/              # German pages
│   │   │   ├── fr/              # French pages
│   │   │   ├── ru/              # Russian pages
│   │   │   └── ar/              # Arabic pages
│   │   │
│   │   ├── admin-panel-secure-access-2024/  # Admin login page
│   │   ├── content-management-system-2024/  # CMS Dashboard
│   │   │   ├── blogs/           # Blog management
│   │   │   ├── projects/        # Project management
│   │   │   ├── categories/      # Category management
│   │   │   ├── tags/            # Tag management
│   │   │   ├── comments/        # Comment management
│   │   │   ├── users/           # User management
│   │   │   ├── media/           # Media management
│   │   │   ├── seo/             # SEO management
│   │   │   ├── settings/        # Settings
│   │   │   └── stats/           # Statistics
│   │   │
│   │   ├── api/                 # API Routes
│   │   │   ├── blog/            # Blog API
│   │   │   ├── send-contact-email/  # Contact form
│   │   │   ├── send-quote-email/    # Quote form
│   │   │   ├── send-otp/        # OTP sending
│   │   │   ├── verify-otp/      # OTP verification
│   │   │   └── generate-otp/    # OTP generation
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── header.tsx           # Header/Navigation
│   │   ├── footer.tsx           # Footer
│   │   ├── contact-form.tsx     # Contact form
│   │   ├── quote-modal.tsx      # Quote modal
│   │   ├── blog-*.tsx           # Blog components
│   │   ├── service-*.tsx        # Service page components
│   │   ├── dashboard-*.tsx     # Dashboard components
│   │   └── ...                  # Other components
│   │
│   ├── lib/                     # Utility functions
│   │   ├── firebase.ts          # Firebase config
│   │   ├── firestore-auth.ts   # Firebase Auth
│   │   ├── firestore.ts         # Firestore operations
│   │   ├── session.ts           # Session management
│   │   └── ...                  # Other utilities
│   │
│   ├── contexts/                # React Contexts
│   │   ├── i18n-context.tsx     # i18n context
│   │   └── notification-context.tsx  # Notification context
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useRecaptcha.ts      # reCAPTCHA hook
│   │   ├── useFingerprinting.ts # Fingerprinting hook
│   │   └── ...                  # Other hooks
│   │
│   └── config/                  # Configuration files
│       ├── recaptcha.ts         # reCAPTCHA config
│       ├── emailjs.ts           # EmailJS config
│       └── index.ts              # Main config
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # NPM dependencies
└── README.md                    # This file
```

## 📖 Usage

### Changing Language

To change the language on the website, use the language selector in the header or change the language code in the URL:

- Turkish: `/tr/`
- English: `/en/`
- German: `/de/`
- French: `/fr/`
- Russian: `/ru/`
- Arabic: `/ar/`

### Page Structure

The same page structure is available for each language:

- **Home Page**: `/[lang]/`
- **About**: `/[lang]/about` (or `/[lang]/hakkimizda` etc.)
- **Services**: `/[lang]/services` (or `/[lang]/hizmetlerimiz` etc.)
  - Website Design: `/[lang]/services/website-design`
  - Web Development: `/[lang]/services/web-development`
  - Mobile App: `/[lang]/services/mobile-app-development`
  - SEO Optimization: `/[lang]/services/seo-optimization`
  - Google Ads Management: `/[lang]/services/google-ads-management`
  - WordPress Solutions: `/[lang]/services/wordpress-solutions`
  - Logo & Corporate Identity: `/[lang]/services/logo-corporate-identity-design`
  - Social Media Management: `/[lang]/services/social-media-management`
  - AI Integrations: `/[lang]/services/ai-integrations`
  - Digital Consulting: `/[lang]/services/digital-consulting`
- **Projects**: `/[lang]/projects` (or `/[lang]/projelerimiz` etc.)
- **Blog**: `/[lang]/blog`
- **Contact**: `/[lang]/contact` (or `/[lang]/iletisim` etc.)
- **Pricing**: `/[lang]/pricing` (or `/[lang]/fiyatlandirma` etc.)

### Contact Form Usage

1. Go to the contact page
2. Fill out the form (Name, Email, Phone, Message)
3. Select a service (optional)
4. Accept the privacy policy
5. Click the Send button
6. Email is sent via EmailJS

### Quote Form Usage

1. Click the "Get Quote" button on any page
2. Modal opens
3. Fill out the form (Name, Email, Phone, Company, Service, Project Details)
4. Accept the privacy policy
5. Click the "Request Quote" button
6. Email is sent

## 🎛️ Dashboard & CMS

### Logging In

1. Go to admin panel: `/admin-panel-secure-access-2024`
2. Enter username or email
3. Enter password
4. Click Login button
5. Enter the OTP code sent to your email address
6. You will be redirected to the dashboard: `/content-management-system-2024`

### Dashboard Features

#### Blog Management
- **New Blog Post**: `/content-management-system-2024/blogs/new`
- **Blog List**: `/content-management-system-2024/blogs`
- **Edit Blog**: `/content-management-system-2024/blogs/[id]`
- **View Blog**: `/content-management-system-2024/blogs/[id-view]`

Features:
- Markdown support
- HTML editor
- Image upload
- Category and tag assignment
- Multilingual content support
- SEO settings (meta tags, keywords)
- Publication date setting
- Featured image

#### Project Management
- **New Project**: `/content-management-system-2024/projects/new`
- **Project List**: `/content-management-system-2024/projects`
- **Edit Project**: `/content-management-system-2024/projects/[id]`

Features:
- Project images
- Project description
- Project links
- Technology stack
- Category assignment

#### Category Management
- **Category List**: `/content-management-system-2024/categories`
- **Edit Category**: `/content-management-system-2024/categories/[id]`

#### Tag Management
- **Tag List**: `/content-management-system-2024/tags`
- **Edit Tag**: `/content-management-system-2024/tags/[id]`

#### Comment Management
- **Comment List**: `/content-management-system-2024/comments`
- **Approve/Delete Comment**: `/content-management-system-2024/comments/[id]`

Features:
- Comment moderation
- Reply functionality
- Comment deletion
- Spam control

#### User Management
- **User List**: `/content-management-system-2024/users`
- **User Detail**: `/content-management-system-2024/users/[id]`

Features:
- Role management (Admin, Editor, Author)
- Edit user information
- Delete users

#### Media Management
- **Media Library**: `/content-management-system-2024/media`

Features:
- Image upload
- Image editing
- Image deletion
- Firebase Storage integration

#### SEO Management
- **SEO Settings**: `/content-management-system-2024/seo`

Features:
- Global SEO settings
- Meta tags management
- Keywords management
- Open Graph settings

#### Statistics
- **Dashboard Stats**: `/content-management-system-2024/stats`

Features:
- Blog post count
- Project count
- Comment count
- User count
- Charts and tables

#### Settings
- **General Settings**: `/content-management-system-2024/settings`

Features:
- Site settings
- Email settings
- Security settings

## 🌍 Multilingual Support

### Translation Files

Translations are stored in `public/locales/[lang]/common.json` files.

The same JSON structure is used for each language:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    ...
  },
  "contact": {
    "title": "Contact",
    "name": "Full Name",
    ...
  }
}
```

### Adding New Translations

1. Open `public/locales/[lang]/common.json` file
2. Add the translation key
3. Replace the value with the corresponding translation in that language
4. Use it in components with `t('key.path')`

Example:
```tsx
import { useI18n } from '@/contexts/i18n-context'

const { t } = useI18n()
return <h1>{t('nav.home', 'Home')}</h1>
```

### URL Mapping

URL mapping is managed in `src/contexts/i18n-context.tsx` file:

```typescript
const urlMappings = {
  '/tr/hizmetlerimiz/web-sitesi-tasarimi': {
    en: '/en/services/website-design',
    de: '/de/dienstleistungen/website-design',
    // ...
  }
}
```

Remember to add new pages to the URL mapping.

## 🔌 API Routes

### Contact Form

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

### Quote Form

**Endpoint**: `POST /api/send-quote-email`

**Request Body**: Same structure

### Send OTP

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

### Verify OTP

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

## 🔒 Security

### reCAPTCHA v3

All forms are protected with reCAPTCHA v3:
- Contact form
- Quote form
- Login form
- Blog comments

### OTP Authentication

Admin panel login uses OTP-based two-factor authentication:
1. Username/password
2. OTP code sent via email

### Rate Limiting

API routes are protected with rate limiting:
- Maximum 3 requests / 15 minutes (IP-based)
- Contact form
- OTP APIs

### Input Validation

- Zod schema validation
- XSS protection (DOMPurify)
- SQL injection protection (using Firestore)

### Firebase Security Rules

Firestore Security Rules examples are available in the `firestore.rules` file.

## ⚡ Performance Optimizations

### Code Splitting
- Dynamic imports
- Route-based code splitting
- Component lazy loading

### Image Optimization
- Next.js Image component
- WebP/AVIF formats
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

### Render.com Deployment (Recommended)

1. Push to GitHub
2. Go to [Render](https://render.com/)
3. Import project
4. Add environment variables
5. Deploy

### Environment Variables (Production)

Add these environment variables in Render dashboard:
- All `NEXT_PUBLIC_*` variables
- `RECAPTCHA_SECRET_KEY`
- `SMTP_*` variables
- `NEXT_PUBLIC_SITE_URL` (production URL, e.g.: `https://yourdomain.com`)
- `NEXT_PUBLIC_DASHBOARD_HOST` (e.g.: `dashboard.softiel.com`)
- `NEXT_PUBLIC_DASHBOARD_LOGIN` (e.g.: `/admin-panel-secure-access-2024`)
- `NEXT_PUBLIC_DASHBOARD_BASE` (e.g.: `/content-management-system-2024`)

### Firebase Production Setup

1. Create a production project in Firebase Console
2. Configure Firestore security rules
3. Add production domain to authorized domains
4. Configure Storage rules

### Domain Setup

1. Connect domain to Render
2. SSL certificate is automatically created
3. Configure DNS settings
4. For multiple hostnames (www and dashboard), use Cloudflare Redirect Rules

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

See `package.json` file for the complete list.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This is a private project. All rights reserved.

## 👥 Contact

To contact the project owner, use GitHub Issues or the repository's contact information.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/)

---

**Note**: This README file reflects the current state of the project. The project is continuously being developed and this documentation is kept up to date.