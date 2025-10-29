import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Web Uygulaması Geliştirme - Softiel",
  description: "Modern web uygulamaları, React, Next.js ve Node.js ile profesyonel web geliştirme hizmetleri.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebGelistirmePage() {
  const serviceData = {
    title: "Web Uygulaması Geliştirme",
    subtitle: "Özel İhtiyaçlarınıza Özel Çözümler",
    description: "Modern teknolojilerle özel web uygulamaları geliştiriyoruz. Kullanıcı dostu, hızlı ve güvenli çözümlerle profesyonel sonuçlar elde ediyorsunuz.",
    detailDescription: "Web uygulamaları artık işletmeler için vazgeçilmez araçlar haline geldi. Doğru yaklaşım ve teknoloji seçimiyle müşteri memnuniyetini artırır, operasyonel verimliliği yükseltirsiniz.",
    icon: "💻",
    serviceType: "web-gelistirme",
    features: [
      {
        title: "Özel Çözüm",
        description: "İhtiyaçlarınıza tam uyum",
        icon: "🎯"
      },
      {
        title: "Entegrasyon Kabiliyeti",
        description: "ERP, CRM, ödeme, API'lerle sorunsuz çalışma",
        icon: "🔗"
      },
      {
        title: "Ölçeklenebilirlik",
        description: "İleride büyümeye hazır altyapı",
        icon: "📈"
      },
      {
        title: "Güvenlik & Hız",
        description: "Modern framework, yüksek performans",
        icon: "⚡"
      }
    ],
    process: [
      {
        step: "1",
        title: "İhtiyaç Analizi",
        description: "İş gereksinimlerinizi detaylı analiz edip proje kapsamını belirliyoruz."
      },
      {
        step: "2", 
        title: "Teknoloji Stack Seçimi",
        description: "Projenize en uygun teknoloji kombinasyonunu seçip mimariyi tasarlıyoruz."
      },
      {
        step: "3",
        title: "Agile Geliştirme",
        description: "Sürekli test ve geri bildirimle adım adım uygulamayı geliştiriyoruz."
      },
      {
        step: "4",
        title: "Deploy & Bakım",
        description: "Production ortamına deploy edip uzun vadeli destek sağlıyoruz."
      }
    ],
    pricing: [
      {
        name: "Starter",
        price: "₺40.000",
        period: "başlangıç",
        features: [
          "Basit CRUD uygulamaları",
          "Kullanıcı giriş/rol bazlı yetkilendirme",
          "Responsive tasarım (modern UI)",
          "Basit raporlama (tablolar, grafikler)",
          "1 entegrasyon (ör. e-posta veya SMS API)",
          "1 revizyon turu"
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "₺60.000",
        period: "başlangıç",
        features: [
          "Kapsamlı dashboard ve modüller",
          "Çoklu rol & izin yönetimi",
          "Gelişmiş raporlama (grafikler, filtreler, export)",
          "2–3 entegrasyon (ERP, CRM, ödeme sistemleri)",
          "Gelişmiş güvenlik (2FA, loglama)",
          "2 revizyon turu"
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "₺100.000+",
        period: "başlangıç",
        features: [
          "Büyük ölçekli kurumsal çözümler",
          "Çoklu kullanıcı desteği",
          "Gelişmiş erişim kontrolü (RBAC, LDAP, SSO)",
          "Mikro servis / API tabanlı yapı",
          "Ölçeklenebilirlik (yük dengeleme, cache)",
          "CI/CD entegrasyonu",
          "SLA + 3–6 ay bakım",
          "3 revizyon turu"
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ek Modül",
        description: "Özel iş süreçleriniz için ek modüller",
        price: "₺7.500"
      },
      {
        name: "Progressive Web App",
        description: "Mobil uyumlu offline uygulama",
        price: "₺10.000"
      },
      {
        name: "Analitik / BI",
        description: "İş zekası ve analitik entegrasyonu",
        price: "₺7.500"
      },
      {
        name: "Gelişmiş Güvenlik",
        description: "Penetrasyon testi ve loglama",
        price: "₺7.500"
      },
      {
        name: "CI/CD Kurulumu",
        description: "GitHub Actions pipeline kurulumu",
        price: "₺5.000"
      },
      {
        name: "Yedekleme / Monitoring",
        description: "Otomatik yedekleme ve izleme",
        price: "₺5.000"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} duration="2 - 4 Hafta" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />

        <CTA />
      </main>
      <Footer />
    </div>
  )
}
