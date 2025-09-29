"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle, 
  Award, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Heart,
  ArrowRight,
  Star
} from "lucide-react"

const advantages = [
  {
    icon: Award,
    title: "Kaliteli Hizmet",
    description: "En yüksek kalite standartlarında çalışarak mükemmel sonuçlar elde ediyoruz.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Target,
    title: "Hedef Odaklı",
    description: "Her projede müşterinin hedeflerine ulaşmasını sağlayacak stratejiler geliştiriyoruz.",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: Users,
    title: "Müşteri Memnuniyeti",
    description: "Müşteri memnuniyeti bizim önceliğimizdir ve her adımda bunu gözetiyoruz.",
    color: "from-sky-500 to-sky-600"
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    description: "Projelerinizi belirlenen sürelerde teslim etmeyi garanti ediyoruz.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Güvenilir Partner",
    description: "Şeffaf iletişim ve güvenilir çalışma prensiplerimizle fark yaratıyoruz.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Zap,
    title: "Modern Teknolojiler",
    description: "En güncel teknolojileri kullanarak geleceğe uygun çözümler geliştiriyoruz.",
    color: "from-orange-500 to-orange-600"
  }
]

const testimonials = [
  {
    name: "Mehmet Özkan",
    company: "TechFlow",
    role: "CEO",
    content: "Softiel ile çalışmak harika bir deneyimdi. Profesyonel yaklaşımları ve kaliteli işleri sayesinde hedeflerimize ulaştık. Ekip gerçekten çok deneyimli ve müşteri odaklı.",
    rating: 5
  },
  {
    name: "Elif Demir",
    company: "ShopMax",
    role: "Pazarlama Müdürü",
    content: "E-ticaret sitemizi Softiel'e yaptırdık. Sonuçlar beklentilerimizi aştı. Kesinlikle tavsiye ederim. Süreç boyunca çok destekleyici oldular.",
    rating: 5
  },
  {
    name: "Mehmet Kaya",
    company: "AppVenture",
    role: "Kurucu",
    content: "Mobil uygulamamızı Softiel geliştirdi. Süreç boyunca çok profesyonel ve destekleyici oldular. Proje yönetimi mükemmeldi.",
    rating: 5
  },
  {
    name: "Zeynep Özkan",
    company: "CreativeLab",
    role: "Kurucu Ortak",
    content: "Web sitemizi Softiel'e yeniden tasarlattık. Sonuç muhteşem! Kullanıcı deneyimi çok iyileşti ve trafiğimiz arttı. Kesinlikle tekrar çalışırız.",
    rating: 5
  },
  {
    name: "Can Arslan",
    company: "MarketPro",
    role: "Operasyon Müdürü",
    content: "SEO çalışmalarımızı Softiel'e verdik. Arama motorlarında sıralamamız çok iyileşti. Profesyonel yaklaşımları ve sonuç odaklı çalışmaları takdire şayan.",
    rating: 5
  },
  {
    name: "Selin Yıldız",
    company: "StyleHub",
    role: "Marka Müdürü",
    content: "Sosyal medya yönetimimizi Softiel'e bıraktık. Takipçi sayımız ve etkileşim oranlarımız katlandı. Çok memnunuz!",
    rating: 5
  },
  {
    name: "Burak Çelik",
    company: "AI Solutions",
    role: "CTO",
    content: "Yapay zeka entegrasyonu projemizi Softiel'e verdik. Sonuçlar inanılmaz! Müşteri hizmetlerimiz otomatikleşti ve verimliliğimiz %300 arttı.",
    rating: 5
  },
  {
    name: "Ayşe Korkmaz",
    company: "EduTech",
    role: "Kurucu",
    content: "Eğitim platformumuzu Softiel'e yaptırdık. Kullanıcı arayüzü çok kullanışlı ve öğrencilerimiz çok memnun. Kesinlikle tavsiye ederim.",
    rating: 5
  },
  {
    name: "Oğuz Demir",
    company: "HealthCare Plus",
    role: "Doktor & Kurucu",
    content: "Sağlık uygulamamızı Softiel geliştirdi. Hasta takibi artık çok kolay. Doktorlar ve hastalar çok memnun. Profesyonel yaklaşımları takdire şayan.",
    rating: 5
  },
  {
    name: "Gamze Şahin",
    company: "FinanceCore",
    role: "Finans Müdürü",
    content: "Finansal yönetim uygulamamızı Softiel'e yaptırdık. Güvenlik ve kullanım kolaylığı mükemmel. Müşteri memnuniyetimiz %95'e çıktı.",
    rating: 5
  },
  {
    name: "Emre Yılmaz",
    company: "LogiTrack",
    role: "Operasyon Direktörü",
    content: "Lojistik takip sistemimizi Softiel'e yeniledik. Gerçek zamanlı takip özelliği sayesinde müşteri şikayetlerimiz %80 azaldı.",
    rating: 5
  },
  {
    name: "Deniz Öztürk",
    company: "PropertyPro",
    role: "Satış Müdürü",
    content: "Emlak portföy yönetim sistemimizi Softiel'e yaptırdık. Satış süreçlerimiz hızlandı ve müşteri deneyimi çok iyileşti.",
    rating: 5
  },
  {
    name: "Ali Çelik",
    company: "RestoApp",
    role: "İşletme Sahibi",
    content: "Restoran yönetim uygulamamızı Softiel'e yaptırdık. Sipariş takibi ve müşteri memnuniyeti çok arttı. Harika bir çalışma!",
    rating: 5
  },
  {
    name: "Seda Kaya",
    company: "BeautyBox",
    role: "Kurucu",
    content: "Güzellik markamızın e-ticaret sitesini Softiel'e yaptırdık. Satışlarımız %200 arttı ve müşteri deneyimi mükemmel.",
    rating: 5
  },
  {
    name: "Murat Özkan",
    company: "ConsultPro",
    role: "Kurucu Ortak",
    content: "Danışmanlık firmamızın web sitesini Softiel'e yeniledik. Profesyonel görünüm ve kullanıcı dostu arayüz sayesinde müşteri sayımız arttı.",
    rating: 5
  },
  {
    name: "Ebru Şahin",
    company: "FitZone",
    role: "Spor Eğitmeni",
    content: "Spor salonumuzun mobil uygulamasını Softiel'e yaptırdık. Üye takibi ve program yönetimi artık çok kolay. Müşterilerimiz çok memnun!",
    rating: 5
  },
  {
    name: "Kemal Demir",
    company: "AutoShow",
    role: "Satış Müdürü",
    content: "Araç galerimizin web sitesini Softiel'e yeniledik. Araç kataloğu ve satış süreçleri çok iyileşti. Kesinlikle tavsiye ederim.",
    rating: 5
  },
  {
    name: "Pınar Yıldız",
    company: "EventMaster",
    role: "Etkinlik Planlayıcısı",
    content: "Etkinlik planlama platformumuzu Softiel'e yaptırdık. Müşteri rezervasyonları ve etkinlik yönetimi artık çok kolay. Harika bir çalışma!",
    rating: 5
  },
  {
    name: "Berk Çelik",
    company: "LegalTech",
    role: "Avukat",
    content: "Hukuk büromuzun web sitesini Softiel'e yeniledik. Profesyonel görünüm ve müşteri portföyü çok iyileşti. Teşekkürler Softiel!",
    rating: 5
  },
  {
    name: "Zeynep Arslan",
    company: "PetCare",
    role: "Mağaza Sahibi",
    content: "Pet shop'umuzun e-ticaret sitesini Softiel'e yaptırdık. Ürün kataloğu ve satış süreçleri mükemmel. Müşterilerimiz çok memnun!",
    rating: 5
  },
  {
    name: "Okan Korkmaz",
    company: "TravelGo",
    role: "Seyahat Acentesi Sahibi",
    content: "Seyahat acentemizin web sitesini Softiel'e yeniledik. Rezervasyon sistemi ve müşteri deneyimi çok iyileşti. Kesinlikle tekrar çalışırız.",
    rating: 5
  },
  {
    name: "Fatma Özkan",
    company: "MediCore",
    role: "Doktor",
    content: "Medikal cihaz takip sistemimizi Softiel'e yaptırdık. Hasta güvenliği ve verimlilik çok arttı. Mükemmel bir çözüm!",
    rating: 5
  },
  {
    name: "Hakan Yılmaz",
    company: "EcoPower",
    role: "Mühendis",
    content: "Yenilenebilir enerji yönetim platformumuzu Softiel'e yaptırdık. Enerji verimliliği %40 arttı. Harika bir iş çıkardılar!",
    rating: 5
  },
  {
    name: "Merve Çelik",
    company: "FoodieApp",
    role: "Operasyon Müdürü",
    content: "Yemek teslimat uygulamamızı Softiel geliştirdi. Sipariş süreçleri çok hızlandı ve müşteri memnuniyeti arttı.",
    rating: 5
  },
  {
    name: "Tolga Arslan",
    company: "SmartHome Pro",
    role: "Kurucu",
    content: "Akıllı ev sistemimizi Softiel'e yaptırdık. Otomasyon ve güvenlik özellikleri mükemmel. Kesinlikle tavsiye ederim.",
    rating: 5
  },
  {
    name: "Nazlı Şahin",
    company: "FashionLab",
    role: "Tasarımcı",
    content: "Moda tasarım platformumuzu Softiel'e yaptırdık. Kreatif süreçlerimiz çok iyileşti ve üretkenliğimiz arttı.",
    rating: 5
  },
  {
    name: "Serkan Demir",
    company: "AgriTech",
    role: "Çiftçi",
    content: "Tarım teknolojisi uygulamamızı Softiel'e yaptırdık. Mahsul verimliliği %60 arttı. Çok memnunuz!",
    rating: 5
  },
  {
    name: "Elif Kaya",
    company: "LearnHub",
    role: "Eğitmen",
    content: "Online eğitim platformumuzu Softiel'e yaptırdık. Öğrenci deneyimi mükemmel ve kurs tamamlama oranları arttı.",
    rating: 5
  },
  {
    name: "Burak Öztürk",
    company: "CryptoPay",
    role: "Geliştirici",
    content: "Blockchain tabanlı ödeme sistemimizi Softiel'e yaptırdık. Güvenlik ve hız mükemmel. Harika bir çalışma!",
    rating: 5
  },
  {
    name: "Gizem Yıldız",
    company: "WellnessHub",
    role: "Sağlık Koçu",
    content: "Sağlık ve wellness uygulamamızı Softiel'e yaptırdık. Kullanıcı takibi ve motivasyon özellikleri çok etkili.",
    rating: 5
  },
  {
    name: "Onur Çelik",
    company: "SportTrack",
    role: "Antrenör",
    content: "Spor performans takip uygulamamızı Softiel'e yaptırdık. Sporcuların performansı çok iyileşti. Teşekkürler!",
    rating: 5
  },
  {
    name: "Derya Arslan",
    company: "RetailMax",
    role: "Mağaza Müdürü",
    content: "Perakende yönetim sistemimizi Softiel'e yaptırdık. Stok takibi ve satış analizi çok iyileşti. Mükemmel!",
    rating: 5
  },
  {
    name: "Kaan Yılmaz",
    company: "GameStudio",
    role: "Oyun Geliştirici",
    content: "Oyun geliştirme platformumuzu Softiel'e yaptırdık. Oyun performansı ve kullanıcı deneyimi harika. Çok memnunuz!",
    rating: 5
  },
  {
    name: "Selin Özkan",
    company: "MusicStream",
    role: "Müzisyen",
    content: "Müzik paylaşım platformumuzu Softiel'e yaptırdık. Ses kalitesi ve kullanıcı arayüzü mükemmel. Harika bir iş!",
    rating: 5
  },
  {
    name: "Mert Şahin",
    company: "ArtSpace",
    role: "Galeri Sahibi",
    content: "Sanat galerimizin dijital platformunu Softiel'e yaptırdık. Sanatçı portföyü ve sergi yönetimi çok iyileşti.",
    rating: 5
  },
  {
    name: "Aslı Demir",
    company: "CharityHub",
    role: "Gönüllü",
    content: "Hayır kurumu uygulamamızı Softiel'e yaptırdık. Bağış süreçleri çok kolaylaştı ve etkileşim arttı. Teşekkürler!",
    rating: 5
  },
  {
    name: "Volkan Kaya",
    company: "BuildTech",
    role: "İnşaat Mühendisi",
    content: "İnşaat proje yönetim sistemimizi Softiel'e yaptırdık. Proje takibi ve maliyet kontrolü çok iyileşti. Mükemmel!",
    rating: 5
  },
  {
    name: "İpek Yıldız",
    company: "BeautyTech",
    role: "Kozmetik Uzmanı",
    content: "Güzellik danışmanlık uygulamamızı Softiel'e yaptırdık. Müşteri deneyimi ve ürün önerileri çok iyileşti.",
    rating: 5
  },
  {
    name: "Cem Öztürk",
    company: "LogiAI",
    role: "Lojistik Uzmanı",
    content: "Yapay zeka destekli lojistik sistemimizi Softiel'e yaptırdık. Rota optimizasyonu ve teslimat süreleri çok iyileşti.",
    rating: 5
  },
  {
    name: "Pınar Çelik",
    company: "HealthCenter",
    role: "Hemşire",
    content: "Hasta bakım takip sistemimizi Softiel'e yaptırdık. Hasta güvenliği ve bakım kalitesi çok arttı. Harika!",
    rating: 5
  },
  {
    name: "Tolga Arslan",
    company: "FinTech Pro",
    role: "Finans Uzmanı",
    content: "Finansal analiz platformumuzu Softiel'e yaptırdık. Veri analizi ve raporlama özellikleri mükemmel. Çok memnunuz!",
    rating: 5
  }
]

export function AboutWhyChoose() {
  return (
    <section id="why-choose" className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1, duration: 0.6 }}
             viewport={{ once: true }}
             className="inline-flex items-center space-x-2 rounded-full px-6 py-3 shadow-modern mb-8"
             style={{ background: 'rgba(178, 178, 178, 0.1)' }}
           >
             <Heart className="h-5 w-5 text-cyan-500 fill-current" />
             <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
               Neden Softiel?
             </span>
           </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Neden{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Bizi Seçmelisiniz?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Softiel olarak, müşterilerimize en iyi hizmeti sunmak için sürekli gelişiyoruz. 
            İşte bizi tercih etmeniz için nedenlerimiz.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] text-center sm:text-left"
                   style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${advantage.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/25 mx-auto sm:mx-0`}
                >
                  <advantage.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-40 -mb-16"
        >
           <div className="text-center mb-20">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="inline-flex items-center space-x-2 rounded-full px-6 py-3 shadow-modern mb-8"
               style={{ background: 'rgba(178, 178, 178, 0.1)' }}
             >
               <Star className="h-6 w-6 text-cyan-500" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                 Müşteri Yorumları
               </span>
             </motion.div>
             
             <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
               Müşterilerimiz{" "}
               <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                 Ne Diyor?
               </span>
             </h3>
             <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
               Başarılı projelerimizde yer alan müşterilerimizin deneyimlerini ve görüşlerini keşfedin.
             </p>
           </div>

          {/* First Row - Moving Left */}
          <div className="mb-8 overflow-hidden relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <motion.div
              className="flex space-x-8"
              animate={{ x: [0, -416 * 10] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Multiple testimonials for smooth infinite scroll */}
              {[...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10)].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-96 glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="overflow-hidden relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <motion.div
              className="flex space-x-8"
              animate={{ x: [-416 * 15, 0] }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Multiple testimonials for smooth infinite scroll */}
              {[...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20)].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-96 glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
