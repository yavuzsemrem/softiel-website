"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

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
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-24 bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="-mb-16"
        >
           <div className="text-center mb-20">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}
             >
               <Star className="h-5 w-5 text-cyan-500 fill-current" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                 Müşteri Yorumları
               </span>
             </motion.div>
             
             <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
               Müşterilerimiz{" "}
               <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                 Ne Diyor?
               </span>
             </h2>
             <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-20 max-w-4xl mx-auto leading-relaxed">
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