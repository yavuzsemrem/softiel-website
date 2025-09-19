"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    position: "CEO",
    company: "TechStart",
    content: "Softiel ile çalışmak harika bir deneyimdi. Web sitemizi sıfırdan tasarladılar ve SEO performansımız %300 arttı. Kesinlikle tavsiye ederim.",
    rating: 5,
    avatar: "AY"
  },
  {
    name: "Elif Demir",
    position: "Pazarlama Müdürü",
    company: "E-Ticaret Plus",
    content: "Mobil uygulamamızı Softiel'e yaptırdık. Kullanıcı deneyimi mükemmel ve satışlarımız %150 arttı. Profesyonel yaklaşımları çok etkileyici.",
    rating: 5,
    avatar: "ED"
  },
  {
    name: "Mehmet Kaya",
    position: "Kurucu",
    company: "Dijital Ajans",
    content: "Google Ads kampanyalarımızı Softiel yönetiyor. ROI'miz %400 arttı ve müşteri kazanma maliyetimiz %60 azaldı. Harika sonuçlar!",
    rating: 5,
    avatar: "MK"
  },
  {
    name: "Zeynep Özkan",
    position: "İnsan Kaynakları Müdürü",
    company: "HR Solutions",
    content: "WordPress sitemizi Softiel'e yenilettik. Hızlı, güvenli ve kullanıcı dostu. Teknik destekleri de çok hızlı. Teşekkürler Softiel!",
    rating: 5,
    avatar: "ZÖ"
  },
  {
    name: "Can Arslan",
    position: "Pazarlama Direktörü",
    company: "Fashion Brand",
    content: "Sosyal medya yönetimimizi Softiel'e bıraktık. Takipçi sayımız 5 kat arttı ve etkileşim oranımız %200 yükseldi. Çok memnunuz!",
    rating: 5,
    avatar: "CA"
  },
  {
    name: "Selin Yıldız",
    position: "Kurucu Ortak",
    company: "Startup Hub",
    content: "Yapay zeka entegrasyonu projemizde Softiel'in uzmanlığı çok değerliydi. Chatbot'umuz müşteri memnuniyetini %80 artırdı.",
    rating: 5,
    avatar: "SY"
  },
  {
    name: "Burak Çelik",
    position: "CTO",
    company: "TechCorp",
    content: "E-ticaret platformumuzu Softiel'e yaptırdık. Satışlarımız %250 arttı ve müşteri deneyimi mükemmel. Kesinlikle tekrar çalışırız.",
    rating: 5,
    avatar: "BÇ"
  },
  {
    name: "Ayşe Korkmaz",
    position: "Kurucu",
    company: "EduTech",
    content: "Eğitim platformumuzu Softiel'e yaptırdık. Öğrenci memnuniyeti %95'e çıktı ve platform çok kullanışlı. Harika bir çalışma!",
    rating: 5,
    avatar: "AK"
  },
  {
    name: "Oğuz Demir",
    position: "Doktor & Kurucu",
    company: "HealthTech",
    content: "Sağlık uygulamamızı Softiel geliştirdi. Hasta takibi artık çok kolay. Doktorlar ve hastalar çok memnun. Profesyonel yaklaşımları takdire şayan.",
    rating: 5,
    avatar: "OD"
  },
  {
    name: "Gamze Şahin",
    position: "Finans Müdürü",
    company: "FinanceApp",
    content: "Finansal yönetim uygulamamızı Softiel'e yaptırdık. Güvenlik ve kullanım kolaylığı mükemmel. Müşteri memnuniyetimiz %95'e çıktı.",
    rating: 5,
    avatar: "GŞ"
  },
  {
    name: "Emre Yılmaz",
    position: "Operasyon Direktörü",
    company: "LogisticsPro",
    content: "Lojistik takip sistemimizi Softiel'e yeniledik. Gerçek zamanlı takip özelliği sayesinde müşteri şikayetlerimiz %80 azaldı.",
    rating: 5,
    avatar: "EY"
  },
  {
    name: "Deniz Öztürk",
    position: "Satış Müdürü",
    company: "RealEstate",
    content: "Emlak portföy yönetim sistemimizi Softiel'e yaptırdık. Satış süreçlerimiz hızlandı ve müşteri deneyimi çok iyileşti.",
    rating: 5,
    avatar: "DÖ"
  },
  {
    name: "Cem Yılmaz",
    position: "İşletme Sahibi",
    company: "RestaurantApp",
    content: "Restoran yönetim uygulamamızı Softiel'e yaptırdık. Sipariş takibi ve müşteri memnuniyeti çok arttı. Harika bir çalışma!",
    rating: 5,
    avatar: "CY"
  },
  {
    name: "Seda Kaya",
    position: "Kurucu",
    company: "BeautyBrand",
    content: "Güzellik markamızın e-ticaret sitesini Softiel'e yaptırdık. Satışlarımız %200 arttı ve müşteri deneyimi mükemmel.",
    rating: 5,
    avatar: "SK"
  },
  {
    name: "Murat Özkan",
    position: "Kurucu Ortak",
    company: "TechConsulting",
    content: "Danışmanlık firmamızın web sitesini Softiel'e yeniledik. Profesyonel görünüm ve kullanıcı dostu arayüz sayesinde müşteri sayımız arttı.",
    rating: 5,
    avatar: "MÖ"
  },
  {
    name: "Ebru Şahin",
    position: "Spor Eğitmeni",
    company: "FitnessCenter",
    content: "Spor salonumuzun mobil uygulamasını Softiel'e yaptırdık. Üye takibi ve program yönetimi artık çok kolay. Müşterilerimiz çok memnun!",
    rating: 5,
    avatar: "EŞ"
  },
  {
    name: "Kemal Demir",
    position: "Satış Müdürü",
    company: "AutoDealer",
    content: "Araç galerimizin web sitesini Softiel'e yeniledik. Araç kataloğu ve satış süreçleri çok iyileşti. Kesinlikle tavsiye ederim.",
    rating: 5,
    avatar: "KD"
  },
  {
    name: "Pınar Yıldız",
    position: "Etkinlik Planlayıcısı",
    company: "EventPlanner",
    content: "Etkinlik planlama platformumuzu Softiel'e yaptırdık. Müşteri rezervasyonları ve etkinlik yönetimi artık çok kolay. Harika bir çalışma!",
    rating: 5,
    avatar: "PY"
  },
  {
    name: "Berk Çelik",
    position: "Avukat",
    company: "LawFirm",
    content: "Hukuk büromuzun web sitesini Softiel'e yeniledik. Profesyonel görünüm ve müşteri portföyü çok iyileşti. Teşekkürler Softiel!",
    rating: 5,
    avatar: "BÇ"
  },
  {
    name: "Zeynep Arslan",
    position: "Mağaza Sahibi",
    company: "PetShop",
    content: "Pet shop'umuzun e-ticaret sitesini Softiel'e yaptırdık. Ürün kataloğu ve satış süreçleri mükemmel. Müşterilerimiz çok memnun!",
    rating: 5,
    avatar: "ZA"
  },
  {
    name: "Okan Korkmaz",
    position: "Seyahat Acentesi Sahibi",
    company: "TravelAgency",
    content: "Seyahat acentemizin web sitesini Softiel'e yeniledik. Rezervasyon sistemi ve müşteri deneyimi çok iyileşti. Kesinlikle tekrar çalışırız.",
    rating: 5,
    avatar: "OK"
  }
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Başarılı projelerimiz ve mutlu müşterilerimizin deneyimlerini keşfedin.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
          {/* First Row - Moving Left */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8"
              animate={{ x: [0, -100 * 50] }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Create enough testimonials for seamless infinite scroll */}
              {Array.from({ length: 50 }, (_, groupIndex) => 
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${groupIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 relative"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 opacity-10">
                      <Quote className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-primary-500" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3 md:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm md:text-base lg:text-lg truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-xs md:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                          {testimonial.position}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8"
              animate={{ x: [0, 100 * 50] }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Create enough testimonials for seamless infinite scroll */}
              {Array.from({ length: 50 }, (_, groupIndex) => 
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${groupIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 relative"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 opacity-10">
                      <Quote className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-primary-500" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3 md:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm md:text-base lg:text-lg truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-xs md:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                          {testimonial.position}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Siz de Başarı Hikayemizin Bir Parçası Olun
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Müşterilerimiz gibi siz de dijital dünyada fark yaratmak istiyorsanız, 
              hemen iletişime geçin ve projenizi hayata geçirelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Ücretsiz Danışmanlık
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Portföyümüzü İnceleyin
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

