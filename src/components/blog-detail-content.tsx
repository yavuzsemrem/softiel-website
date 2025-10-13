"use client"

import React, { useState, useEffect } from "react"
import { m, LazyMotion } from "framer-motion"
import { Calendar, User, Clock, Eye, Heart, Share2, BookOpen, Tag, ArrowRight, Loader2 } from "lucide-react"
import { getBlog, updateBlogLikes, BlogPost } from "@/lib/blog-service"
import { logBlogLikeActivity } from "@/lib/simple-activity-logger"
import { useI18n } from "@/contexts/i18n-context"

// domAnimation'ı async yükle - Main-thread work azaltmak için
const loadFeatures = () => import("framer-motion").then(mod => mod.domAnimation)

interface BlogDetailContentProps {
  slug: string
  blogData?: BlogPost | null
}

const blogData = {
  "web-tasarim-trendleri-2024": {
    title: "2024'te Web Tasarım Trendleri",
    tags: ["Tasarım", "Trend", "UI/UX"],
    content: `
      <p>Web tasarım dünyası sürekli evrim geçiriyor ve 2024 yılı da bu değişimin hızlandığı bir dönem olarak karşımıza çıkıyor. Bu yazıda, web tasarımında öne çıkan en önemli trendleri ve bunları projelerinizde nasıl uygulayabileceğinizi detaylı bir şekilde inceleyeceğiz.</p>

      <h2>1. Glassmorphism Tasarımı</h2>
      <p>Glassmorphism, 2024'ün en popüler tasarım trendlerinden biri. Bu trend, cam benzeri şeffaflık efektleri ve bulanık arka planlar kullanarak modern ve şık bir görünüm yaratıyor. iOS ve macOS'ta gördüğümüz bu tasarım yaklaşımı, web tasarımında da giderek daha fazla kullanılıyor.</p>
      
      <h3>Glassmorphism Uygulama İpuçları:</h3>
      <ul>
        <li>Şeffaf arka planlar kullanın (rgba değerleri ile)</li>
        <li>Backdrop-filter: blur() özelliğini uygulayın</li>
        <li>Hafif gölgeler ve kenarlıklar ekleyin</li>
        <li>Renkli arka planlarla kontrast yaratın</li>
      </ul>

      <h2>2. Neumorphism ve Soft UI</h2>
      <p>Neumorphism, tasarım elemanlarının arka plandan yükselmiş veya içe gömülmüş gibi görünmesini sağlayan bir tasarım trendi. Bu trend, yumuşak gölgeler ve yüksek kontrast kullanarak 3D benzeri bir efekt yaratıyor.</p>

      <h2>3. Minimal Tasarım ve Beyaz Alan Kullanımı</h2>
      <p>Minimal tasarım, 2024'te de popülerliğini koruyor. Daha az eleman, daha fazla beyaz alan ve odaklanmış içerik sunan bu yaklaşım, kullanıcı deneyimini iyileştiriyor.</p>

      <h2>4. Koyu Tema ve Dark Mode</h2>
      <p>Koyu tema kullanımı artık bir trend değil, bir gereklilik haline geldi. Kullanıcıların büyük çoğunluğu koyu temayı tercih ediyor ve bu durum web tasarımcılarını da etkiliyor.</p>

      <h2>5. Mikro Etkileşimler ve Animasyonlar</h2>
      <p>Mikro etkileşimler, kullanıcı deneyimini zenginleştiren küçük animasyonlar ve geçiş efektleridir. Bu etkileşimler, kullanıcıların site ile olan etkileşimini daha keyifli hale getiriyor.</p>

      <h2>Sonuç</h2>
      <p>2024'te web tasarım trendleri, kullanıcı deneyimini ön planda tutan ve modern teknolojilerle uyumlu yaklaşımları benimsiyor. Glassmorphism, neumorphism, minimal tasarım ve koyu tema gibi trendler, web tasarımının geleceğini şekillendiriyor.</p>
    `
  },
  "wordpress-gelistirme-ipuclari": {
    title: "WordPress Geliştirme İpuçları ve Püf Noktaları",
    tags: ["WordPress", "PHP", "Web Geliştirme"],
    content: `
      <p>WordPress, dünyanın en popüler içerik yönetim sistemi olarak web geliştiricilerin vazgeçilmez aracı haline geldi. Bu yazıda, WordPress'te profesyonel web siteleri geliştirmek için bilmeniz gereken temel ipuçları ve gelişmiş teknikleri ele alacağız.</p>

      <h2>1. Tema Geliştirme Best Practices</h2>
      <p>WordPress tema geliştirirken dikkat etmeniz gereken temel prensipler vardır. Bu prensipler, hem performans hem de güvenlik açısından kritik önem taşır.</p>

      <h3>Tema Geliştirme İpuçları:</h3>
      <ul>
        <li>WordPress Coding Standards'ı takip edin</li>
        <li>Security best practices uygulayın</li>
        <li>Responsive tasarım prensiplerini benimseyin</li>
        <li>Performance optimizasyonu yapın</li>
      </ul>

      <h2>2. Plugin Geliştirme</h2>
      <p>WordPress plugin'leri, sitenizin işlevselliğini artıran güçlü araçlardır. Doğru şekilde geliştirildiğinde, hem performans hem de güvenlik açısından fayda sağlarlar.</p>

      <h2>3. Database Optimizasyonu</h2>
      <p>WordPress veritabanı optimizasyonu, sitenizin performansını doğrudan etkiler. Gereksiz verileri temizlemek ve index'leri optimize etmek önemlidir.</p>

      <h2>Sonuç</h2>
      <p>WordPress geliştirme, sürekli öğrenme gerektiren bir alan. Bu ipuçlarını uygulayarak daha profesyonel ve performanslı WordPress siteleri geliştirebilirsiniz.</p>
    `
  },
  "google-ads-optimizasyonu": {
    title: "Google Ads Kampanyalarınızı Nasıl Optimize Edersiniz?",
    tags: ["Google Ads", "Pazarlama", "Optimizasyon"],
    content: `
      <p>Google Ads, dijital pazarlama dünyasının en güçlü araçlarından biri. Bu yazıda, Google Ads kampanyalarınızın performansını artırmak için uygulayabileceğiniz stratejileri detaylı bir şekilde inceleyeceğiz.</p>

      <h2>1. Anahtar Kelime Araştırması</h2>
      <p>Doğru anahtar kelimeleri seçmek, Google Ads kampanyalarının başarısının temelini oluşturur. Google Keyword Planner ve diğer araçları kullanarak etkili anahtar kelime stratejileri geliştirin.</p>

      <h2>2. Reklam Metni Optimizasyonu</h2>
      <p>Reklam metinleriniz, tıklama oranınızı doğrudan etkiler. A/B test yaparak en etkili reklam metinlerini bulun.</p>

      <h2>3. Landing Page Optimizasyonu</h2>
      <p>Reklamlarınızdan gelen trafiği doğru landing page'lere yönlendirmek kritik önem taşır. Dönüşüm oranınızı artırmak için landing page'lerinizi optimize edin.</p>

      <h2>Sonuç</h2>
      <p>Google Ads optimizasyonu, sürekli test ve iyileştirme gerektiren bir süreçtir. Bu stratejileri uygulayarak kampanyalarınızın performansını artırabilirsiniz.</p>
    `
  },
  "cyber-guvenlik-web-siteleri": {
    title: "Web Siteleri İçin Siber Güvenlik Rehberi",
    tags: ["Güvenlik", "SSL", "Siber Güvenlik"],
    content: `
      <p>Siber güvenlik, günümüzde web siteleri için kritik önem taşıyor. Bu yazıda, web sitenizi siber saldırılardan korumak için almanız gereken temel önlemleri ele alacağız.</p>

      <h2>1. SSL Sertifikası</h2>
      <p>SSL sertifikası, web sitenizin güvenliğinin temelini oluşturur. HTTPS protokolü kullanarak veri şifrelemesi sağlayın.</p>

      <h2>2. Güvenlik Duvarları</h2>
      <p>Web Application Firewall (WAF) kullanarak sitenizi kötü amaçlı trafikten koruyun.</p>

      <h2>3. Güvenli Kodlama</h2>
      <p>SQL injection, XSS ve diğer güvenlik açıklarını önlemek için güvenli kodlama prensiplerini uygulayın.</p>

      <h2>Sonuç</h2>
      <p>Siber güvenlik, web sitenizin sürekli güncellenmesi gereken bir alanıdır. Bu önlemleri alarak sitenizi güvende tutabilirsiniz.</p>
    `
  },
  "javascript-modern-ozellikler": {
    title: "JavaScript'in Modern Özellikleri ve ES2024",
    tags: ["JavaScript", "ES2024", "Web Geliştirme"],
    content: `
      <p>JavaScript, web geliştirme dünyasının en dinamik dillerinden biri. Bu yazıda, JavaScript'in en yeni özelliklerini ve ES2024 ile gelen yenilikleri inceleyeceğiz.</p>

      <h2>1. ES2024 Yenilikleri</h2>
      <p>ES2024 ile gelen yeni özellikler, JavaScript geliştirmeyi daha verimli hale getiriyor.</p>

      <h2>2. Async/Await Kullanımı</h2>
      <p>Asenkron programlama için async/await syntax'ı, Promise'lerden daha okunabilir kod yazmanızı sağlar.</p>

      <h2>3. Destructuring ve Spread Operator</h2>
      <p>Modern JavaScript'te veri manipülasyonu için destructuring ve spread operator'ları etkili şekilde kullanın.</p>

      <h2>Sonuç</h2>
      <p>JavaScript'in modern özelliklerini öğrenmek, daha temiz ve verimli kod yazmanızı sağlar.</p>
    `
  },
  "ui-ux-tasarim-prensipleri": {
    title: "UI/UX Tasarımda Temel Prensipler",
    tags: ["UI/UX", "Tasarım", "Kullanıcı Deneyimi"],
    content: `
      <p>UI/UX tasarım, kullanıcı deneyimini doğrudan etkileyen kritik bir alan. Bu yazıda, kullanıcı deneyimini artıran temel tasarım prensiplerini ele alacağız.</p>

      <h2>1. Renk Teorisi</h2>
      <p>Renkler, kullanıcıların duygusal tepkilerini etkiler. Doğru renk paleti seçimi, marka kimliğinizi güçlendirir.</p>

      <h2>2. Tipografi</h2>
      <p>Okunabilir ve estetik font seçimi, kullanıcı deneyimini önemli ölçüde etkiler.</p>

      <h2>3. Boşluk Kullanımı</h2>
      <p>White space kullanımı, içeriğin daha net görünmesini sağlar ve kullanıcı dikkatini yönlendirir.</p>

      <h2>Sonuç</h2>
      <p>UI/UX tasarım prensiplerini uygulayarak daha etkili ve kullanıcı dostu arayüzler oluşturabilirsiniz.</p>
    `
  },
  "cloud-computing-avantajlari": {
    title: "Cloud Computing'in İşletmenize Avantajları",
    tags: ["Cloud Computing", "AWS", "Azure"],
    content: `
      <p>Cloud computing, modern işletmelerin vazgeçilmez teknolojisi haline geldi. Bu yazıda, bulut bilişim teknolojilerinin işletmenize sağlayacağı faydaları inceleyeceğiz.</p>

      <h2>1. Maliyet Tasarrufu</h2>
      <p>Cloud computing, donanım ve yazılım maliyetlerini önemli ölçüde azaltır.</p>

      <h2>2. Ölçeklenebilirlik</h2>
      <p>İhtiyacınıza göre kaynakları artırıp azaltabilirsiniz.</p>

      <h2>3. Güvenlik</h2>
      <p>Cloud sağlayıcıları, veri güvenliği için gelişmiş önlemler alır.</p>

      <h2>Sonuç</h2>
      <p>Cloud computing, işletmenizin dijital dönüşüm sürecinde kritik rol oynar.</p>
    `
  },
  "seo-onemli-faktorler": {
    title: "SEO İçin En Önemli 10 Faktör",
    tags: ["SEO", "Optimizasyon", "Arama Motoru"],
    content: `
      <p>SEO (Search Engine Optimization) artık sadece anahtar kelime yoğunluğu ile ilgili değil. Google'ın algoritmaları sürekli gelişiyor ve kullanıcı deneyimini ön planda tutuyor. Bu yazıda, 2024 yılında SEO için kritik olan 10 faktörü detaylı bir şekilde ele alacağız.</p>

      <h2>1. Core Web Vitals</h2>
      <p>Google'ın Core Web Vitals metrikleri, sayfa performansını değerlendiren en önemli faktörlerden biri. LCP (Largest Contentful Paint), FID (First Input Delay) ve CLS (Cumulative Layout Shift) metrikleri, SEO sıralamanızı doğrudan etkiliyor.</p>

      <h2>2. Mobil Uyumluluk</h2>
      <p>Mobil-first indexing ile birlikte, sitenizin mobil cihazlarda mükemmel çalışması artık zorunlu. Responsive tasarım ve hızlı yükleme süreleri kritik önem taşıyor.</p>

      <h2>3. Sayfa Hızı</h2>
      <p>Sayfa yükleme hızı, hem kullanıcı deneyimi hem de SEO için kritik. 3 saniyeden uzun süren yükleme süreleri, kullanıcıların sitenizi terk etmesine neden oluyor.</p>

      <h2>4. HTTPS ve Güvenlik</h2>
      <p>HTTPS protokolü, Google tarafından güvenlik sinyali olarak değerlendiriliyor. SSL sertifikası olmayan siteler, arama sonuçlarında düşük sıralanıyor.</p>

      <h2>5. İçerik Kalitesi</h2>
      <p>E-A-T (Expertise, Authoritativeness, Trustworthiness) prensipleri, içerik kalitesini değerlendiren temel kriterler. Uzman, güvenilir ve yetkili içerik üretmek SEO için kritik.</p>

      <h2>6. Teknik SEO</h2>
      <p>XML sitemap, robots.txt, meta etiketleri ve yapılandırılmış veri gibi teknik SEO unsurları, arama motorlarının sitenizi daha iyi anlamasını sağlıyor.</p>

      <h2>7. Backlink Profili</h2>
      <p>Kaliteli ve güvenilir sitelerden gelen backlinkler, SEO sıralamanızı olumlu yönde etkiliyor. Ancak kalitesiz ve spam backlinkler, sitenize zarar verebiliyor.</p>

      <h2>8. Kullanıcı Sinyalleri</h2>
      <p>Bounce rate, dwell time ve click-through rate gibi kullanıcı sinyalleri, Google'ın sitenizin kalitesini değerlendirmesinde önemli rol oynuyor.</p>

      <h2>9. Yerel SEO</h2>
      <p>Yerel işletmeler için Google My Business optimizasyonu ve yerel anahtar kelimeler, yerel arama sonuçlarında üst sıralarda yer almanızı sağlıyor.</p>

      <h2>10. Voice Search Optimizasyonu</h2>
      <p>Sesli arama kullanımının artmasıyla birlikte, long-tail anahtar kelimeler ve doğal dil kullanımı SEO stratejilerinde önemli hale geliyor.</p>

      <h2>Sonuç</h2>
      <p>SEO, sürekli gelişen bir alan. 2024'te başarılı olmak için, kullanıcı deneyimini ön planda tutan ve Google'ın güncel algoritmalarına uygun stratejiler geliştirmeniz gerekiyor.</p>
    `
  },
  "yapay-zeka-web-gelistirme": {
    title: "Yapay Zeka ve Web Geliştirme",
    tags: ["AI", "Geliştirme", "Teknoloji"],
    content: `
      <p>Yapay zeka teknolojileri web geliştirme süreçlerini köklü bir şekilde değiştiriyor. Bu yazıda, AI araçlarının web geliştirmede nasıl kullanılabileceğini ve bu teknolojilerin gelecekteki etkilerini inceleyeceğiz.</p>

      <h2>1. ChatGPT ve Kod Yazma</h2>
      <p>ChatGPT gibi büyük dil modelleri, kod yazma sürecini hızlandırıyor. Geliştiriciler, karmaşık algoritmaları ve fonksiyonları daha hızlı oluşturabiliyor.</p>

      <h2>2. GitHub Copilot</h2>
      <p>GitHub Copilot, AI destekli kod tamamlama aracı olarak web geliştiricilerin en büyük yardımcılarından biri. Kod yazarken öneriler sunarak geliştirme sürecini hızlandırıyor.</p>

      <h2>3. AI Destekli Tasarım Araçları</h2>
      <p>Figma, Adobe Creative Suite gibi tasarım araçları, AI özellikleri ile tasarım sürecini kolaylaştırıyor. Otomatik renk paleti önerileri, layout önerileri gibi özellikler sunuyor.</p>

      <h2>4. Otomatik Test Yazma</h2>
      <p>AI araçları, otomatik test senaryoları oluşturarak test yazma sürecini hızlandırıyor. Bu, yazılım kalitesini artırırken geliştirme süresini kısaltıyor.</p>

      <h2>5. Performans Optimizasyonu</h2>
      <p>AI algoritmaları, web sitelerinin performansını analiz ederek optimizasyon önerileri sunuyor. Bu, manuel optimizasyon sürecini büyük ölçüde kolaylaştırıyor.</p>

      <h2>Sonuç</h2>
      <p>Yapay zeka, web geliştirme süreçlerini dönüştürüyor. Geliştiriciler, AI araçlarını etkili bir şekilde kullanarak daha hızlı ve kaliteli projeler üretebiliyor.</p>
    `
  },
  "e-ticaret-optimizasyonu": {
    title: "E-ticaret Sitesi Optimizasyonu",
    tags: ["E-ticaret", "Dönüşüm", "Optimizasyon"],
    content: `
      <p>E-ticaret sitenizin başarısı, sadece ürün kalitesi ile değil, kullanıcı deneyimi ile de doğrudan ilişkilidir. Bu yazıda, e-ticaret sitenizin dönüşüm oranını artırmak için uygulayabileceğiniz stratejileri detaylı bir şekilde inceleyeceğiz.</p>

      <h2>1. Kullanıcı Deneyimi (UX) İyileştirmeleri</h2>
      <p>E-ticaret sitelerinde kullanıcı deneyimi, satış dönüşümü için kritik önem taşıyor. Kolay navigasyon, hızlı yükleme ve mobil uyumluluk gibi faktörler, kullanıcıların sitenizde kalma süresini artırıyor.</p>

      <h2>2. A/B Test Yöntemleri</h2>
      <p>A/B testleri, farklı tasarım ve içerik varyantlarını test ederek en etkili olanı bulmanızı sağlıyor. Bu yöntemle, dönüşüm oranınızı sistematik olarak artırabilirsiniz.</p>

      <h2>3. Ödeme Süreci Optimizasyonu</h2>
      <p>Ödeme sürecindeki her adım, potansiyel müşteri kaybına neden olabilir. Basit ve güvenli ödeme formları, müşteri dönüşümünü artırıyor.</p>

      <h2>4. Ürün Sayfaları Optimizasyonu</h2>
      <p>Kaliteli ürün fotoğrafları, detaylı açıklamalar ve müşteri yorumları, ürün sayfalarınızın etkinliğini artırıyor.</p>

      <h2>5. SEO ve İçerik Pazarlaması</h2>
      <p>E-ticaret siteniz için SEO optimizasyonu, organik trafik artışı sağlıyor. Blog içerikleri ve ürün açıklamaları, arama motorlarında üst sıralarda yer almanızı sağlıyor.</p>

      <h2>Sonuç</h2>
      <p>E-ticaret optimizasyonu, sürekli iyileştirme gerektiren bir süreç. Kullanıcı geri bildirimlerini takip ederek ve veri analizi yaparak, sitenizin performansını sürekli artırabilirsiniz.</p>
    `
  },
  "mobil-uygulama-gelistirme": {
    title: "Mobil Uygulama Geliştirme Rehberi",
    tags: ["Mobil", "React Native", "Flutter"],
    content: `
      <p>Mobil uygulama geliştirme, günümüzde en hızlı büyüyen teknoloji alanlarından biri. Bu yazıda, başarılı bir mobil uygulama geliştirmek için bilmeniz gereken tüm detayları ele alacağız.</p>

      <h2>1. Platform Seçimi: Native vs Cross-Platform</h2>
      <p>Mobil uygulama geliştirmede en önemli kararlardan biri platform seçimi. Native geliştirme, platform-spesifik özellikler sunarken, cross-platform çözümler maliyet ve zaman tasarrufu sağlıyor.</p>

      <h2>2. React Native</h2>
      <p>React Native, Facebook tarafından geliştirilen cross-platform framework'ü. JavaScript kullanarak hem iOS hem de Android uygulamaları geliştirmenizi sağlıyor.</p>

      <h2>3. Flutter</h2>
      <p>Google'ın Flutter framework'ü, Dart programlama dili kullanarak yüksek performanslı mobil uygulamalar geliştirmenizi sağlıyor.</p>

      <h2>4. UI/UX Tasarım Prensipleri</h2>
      <p>Mobil uygulamalarda kullanıcı arayüzü tasarımı, masaüstü uygulamalardan farklı yaklaşımlar gerektiriyor. Touch-friendly tasarım ve mobil-first yaklaşım kritik önem taşıyor.</p>

      <h2>5. Performans Optimizasyonu</h2>
      <p>Mobil cihazların sınırlı kaynakları nedeniyle, performans optimizasyonu mobil uygulama geliştirmede kritik önem taşıyor.</p>

      <h2>Sonuç</h2>
      <p>Mobil uygulama geliştirme, teknik bilgi ve yaratıcılık gerektiren bir alan. Doğru araçları seçerek ve kullanıcı deneyimini ön planda tutarak, başarılı uygulamalar geliştirebilirsiniz.</p>
    `
  },
  "sosyal-medya-pazarlama": {
    title: "Sosyal Medya Pazarlama Stratejileri",
    tags: ["Sosyal Medya", "Pazarlama", "İçerik"],
    content: `
      <p>Sosyal medya pazarlaması, markaların hedef kitlelerine ulaşmasının en etkili yollarından biri. Bu yazıda, sosyal medyada başarılı pazarlama kampanyaları oluşturmanın yollarını inceleyeceğiz.</p>

      <h2>1. Platform Stratejisi</h2>
      <p>Her sosyal medya platformunun kendine özgü özellikleri ve kullanıcı profilleri var. Instagram, LinkedIn, TikTok gibi platformlar için farklı içerik stratejileri geliştirmeniz gerekiyor.</p>

      <h2>2. İçerik Planlaması</h2>
      <p>Etkili sosyal medya pazarlaması, düzenli ve planlı içerik üretimi gerektiriyor. İçerik takvimi oluşturarak, tutarlı bir yayın programı yürütebilirsiniz.</p>

      <h2>3. Görsel Tasarım</h2>
      <p>Sosyal medyada görsel içerik, metin içeriğinden daha fazla etkileşim alıyor. Profesyonel görseller ve videolar, marka bilinirliğinizi artırıyor.</p>

      <h2>4. Etkileşim ve Topluluk Yönetimi</h2>
      <p>Sosyal medyada başarı, sadece içerik paylaşmakla değil, takipçilerinizle etkileşim kurmakla da ilgili. Yorumlara yanıt vermek ve topluluk oluşturmak kritik önem taşıyor.</p>

      <h2>5. Analitik ve Raporlama</h2>
      <p>Sosyal medya kampanyalarınızın başarısını ölçmek için düzenli analiz yapmanız gerekiyor. Reach, engagement ve conversion gibi metrikleri takip ederek stratejinizi iyileştirebilirsiniz.</p>

      <h2>Sonuç</h2>
      <p>Sosyal medya pazarlaması, sürekli öğrenme ve adaptasyon gerektiren bir alan. Platform trendlerini takip ederek ve kullanıcı geri bildirimlerini değerlendirerek, etkili kampanyalar oluşturabilirsiniz.</p>
    `
  }
}

export function BlogDetailContent({ slug, blogData }: BlogDetailContentProps) {
  const { t } = useI18n()
  const [post, setPost] = useState<BlogPost | null>(blogData || null)
  const [loading, setLoading] = useState(!blogData)
  const [error, setError] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blogData?.likes || 0)

  // Blog verisini yükle (sadece blogData yoksa)
  useEffect(() => {
    if (!blogData) {
      loadBlog()
    }
  }, [slug, blogData])

  const loadBlog = async () => {
    try {
      setLoading(true)
      setError("")
      
      const data = await getBlog(slug, false) // View count'u artırma
      if (data) {
        setPost(data)
        setLikeCount(data.likes || 0)
      } else {
        setError(t('blogDetail.notFound', 'Blog yazısı bulunamadı'))
      }
    } catch (err) {
      setError(t('blogDetail.loadError', 'Blog yüklenirken bir hata oluştu'))
    } finally {
      setLoading(false)
    }
  }

  // Beğen fonksiyonu
  const handleLike = async () => {
    if (!post) return

    try {
      const newLikedState = !isLiked
      setIsLiked(newLikedState)
      
      // Firebase'de beğeni sayısını güncelle
      await updateBlogLikes(slug, newLikedState)
      
      // Local state'i güncelle
      setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1))
      
      // Aktivite kaydet (sadece beğeni eklendiğinde)
      if (newLikedState) {
        // Notification context'i güncelle
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('notification-updated'))
        }
      }
    } catch (err) {
      // Hata durumunda state'i geri al
      setIsLiked(!isLiked)
    }
  }

  // Paylaş fonksiyonu
  const handleShare = async (platform: string) => {
    const shareData = {
      title: post?.title || 'Blog Yazısı',
      text: 'Bu blog yazısını okumanızı tavsiye ederim!',
      url: `${window.location.origin}/blog/${slug}`
    }

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.title)}`
    }

    try {
      // Mobil cihazlarda native paylaşım
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share(shareData)
      } else {
        // Desktop'ta sosyal medya linklerine yönlendirme
        const shareUrl = shareUrls[platform as keyof typeof shareUrls]
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
        }
      }
    } catch (error) {
      // Fallback: URL'yi panoya kopyala
      try {
        await navigator.clipboard.writeText(shareData.url)
        alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} paylaşımı için link panoya kopyalandı!`)
      } catch (clipboardError) {
        alert(t('blogDetail.shareNotSupported', 'Paylaşım desteklenmiyor. Lütfen linki manuel olarak kopyalayın.'))
      }
    }
  }

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <span className="text-white text-lg">İçerik yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">İçerik Bulunamadı</h2>
        <p className="text-neutral-400">{error || "Aradığınız blog yazısının içeriği mevcut değil."}</p>
      </div>
    )
  }

  return (
    <LazyMotion features={loadFeatures}>
    <m.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl shadow-modern-lg p-8 lg:p-12 border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* Content */}
      <div 
        className="blog-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: post.content
        }}
      />

      {/* Author Bio */}
      <div className="mt-12 pt-8 border-t border-white/20">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              Admin
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              {t('blogDetail.authorBio', 'Softiel ekibinin deneyimli yazarlarından. Web geliştirme, dijital pazarlama ve teknoloji trendleri konularında uzman. 5+ yıllık deneyim ile işletmelerin dijital dönüşüm süreçlerinde rehberlik ediyor.')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/Softieldev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://www.instagram.com/softieldev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.facebook.com/people/Softiel/61578774434444/?ref=pl_edit_xav_ig_profile_page_web#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{t('blogDetail.tagsTitle', 'Etiketler')}</h4>
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.length > 0 ? post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400"
              style={{ 
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}
            >
              <Tag className="h-4 w-4" />
              <span>{tag}</span>
            </span>
          )) : null}
        </div>
      </div>

      {/* Like and Share Buttons */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">{t('blogDetail.interactionTitle', 'Etkileşim')}</h4>
          <div className="flex items-center space-x-4">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLike()}
              className={`flex items-center space-x-2 glass px-4 py-2 rounded-lg transition-all duration-200 ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-red-500'
              }`}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </m.button>
          </div>
        </div>
        
        <div data-share-section className="mt-8 pt-6 border-t border-white/20">
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{t('blogDetail.shareTitle', 'Paylaş')}</h4>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center sm:justify-start space-x-2 glass px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 flex-1 sm:flex-none"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Share2 className="h-4 w-4" />
              <span>Twitter</span>
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('linkedin')}
              className="flex items-center justify-center sm:justify-start space-x-2 glass px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 flex-1 sm:flex-none"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Share2 className="h-4 w-4" />
              <span>LinkedIn</span>
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center sm:justify-start space-x-2 glass px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 flex-1 sm:flex-none"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Share2 className="h-4 w-4" />
              <span>Facebook</span>
            </m.button>
          </div>
        </div>
      </div>
    </m.article>
    </LazyMotion>
  )
}
