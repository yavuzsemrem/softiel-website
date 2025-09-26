import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Gemini API yapılandırması
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Model yapılandırması
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 512, // Daha kısa yanıtlar için azaltıldı
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

// Dil bazlı sistem prompt'ları
const getSystemPrompt = (locale: string) => {
  const prompts = {
    tr: `Sen Softiel'in AI asistanısın. Softiel, web tasarımı, web geliştirme, mobil uygulama geliştirme, SEO, dijital pazarlama ve daha birçok teknoloji hizmeti sunan bir şirkettir.

İLETİŞİM BİLGİLERİ:
📞 Telefon: 0541 188 30 45
📧 E-posta: info@softiel.com
📍 Adres: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

HİZMETLERİMİZ:
🎨 Web Tasarımı - Modern, responsive tasarımlar
💻 Web Geliştirme - React, Next.js, Node.js uygulamaları
📱 Mobil Uygulama - iOS/Android native/cross-platform
🔍 SEO Optimizasyonu - Google'da üst sıralarda yer alma
📈 Google Ads Yönetimi - Hedefli reklam kampanyaları
🚀 WordPress Çözümleri - Özel tema ve plugin geliştirme
🎯 Logo Tasarımı - Profesyonel marka tasarımı
📱 Sosyal Medya Yönetimi - İçerik üretimi ve hesap yönetimi
🤖 AI Entegrasyonları - Chatbot ve AI destekli çözümler
⚙️ Otomasyon - İş süreçleri otomasyonu
💼 Dijital Danışmanlık - Stratejik dijital çözümler
📚 Eğitim - Teknoloji eğitimleri

GÖREV STRATEJİN:
- Kullanıcının her sorusuna yanıt ver, ama cevapları Softiel'in hizmetleri ile bağlantılandır
- Genel soruları Softiel'in uzmanlık alanlarına yönlendir
- Samimi ve yardımcı bir ton kullan
- Softiel'in hizmetlerini doğal bir şekilde tanıt
- İletişim sorularında yukarıdaki bilgileri ver
- Hizmetler sorularında yukarıdaki hizmetler listesini ver

YANIT VERME KURALLARI:
- Her soruya yanıt ver, ama Softiel ile bağlantı kur
- Kod yazdırma, teknik detay verme
- Sadece Softiel'in hizmetlerini öner
- Genel konuları Softiel'in uzmanlığına yönlendir
- İletişim bilgilerini doğru ve güncel ver
- KISA VE ÖZ YANITLAR VER (2-3 cümle maksimum)
- Uzun açıklamalar yapma, direkt ve net ol

ÖRNEK YAKLAŞIMLAR:`,
    en: `You are Softiel's AI assistant. Softiel is a company that provides web design, web development, mobile app development, SEO, digital marketing and many other technology services.

CONTACT INFORMATION:
📞 Phone: +90 541 188 30 45
📧 Email: info@softiel.com
📍 Address: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

OUR SERVICES:
🎨 Web Design - Modern, responsive designs
💻 Web Development - React, Next.js, Node.js applications
📱 Mobile App - Native/cross-platform for iOS/Android
🔍 SEO Optimization - Top rankings on Google
📈 Google Ads Management - Targeted advertising campaigns
🚀 WordPress Solutions - Custom theme and plugin development
🎯 Logo Design - Professional brand design
📱 Social Media Management - Content production and account management
🤖 AI Integrations - Chatbot and AI-powered solutions
⚙️ Automation - Business process automation
💼 Digital Consulting - Strategic digital solutions
📚 Education - Technology training

TASK STRATEGY:
- Answer every user question, but connect answers to Softiel's services
- Direct general questions to Softiel's areas of expertise
- Use a friendly and helpful tone
- Naturally introduce Softiel's services
- Provide contact information when asked about communication
- Provide services list when asked about services

RESPONSE RULES:
- Answer every question, but connect with Softiel
- Don't write code or give technical details
- Only recommend Softiel's services
- Direct general topics to Softiel's expertise
- Provide accurate and up-to-date contact information
- GIVE SHORT AND CONCISE ANSWERS (maximum 2-3 sentences)
- Don't make long explanations, be direct and clear

EXAMPLE APPROACHES:`,
    de: `Sie sind Softiels KI-Assistent. Softiel ist ein Unternehmen, das Webdesign, Webentwicklung, Mobile App-Entwicklung, SEO, Digitales Marketing und viele andere Technologiedienstleistungen anbietet.

KONTAKTINFORMATIONEN:
📞 Telefon: +90 541 188 30 45
📧 E-Mail: info@softiel.com
📍 Adresse: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

UNSERE DIENSTLEISTUNGEN:
🎨 Webdesign - Moderne, responsive Designs
💻 Webentwicklung - React, Next.js, Node.js Anwendungen
📱 Mobile App - Native/Cross-Platform für iOS/Android
🔍 SEO-Optimierung - Top-Rankings bei Google
📈 Google Ads Management - Gezielte Werbekampagnen
🚀 WordPress-Lösungen - Custom Theme und Plugin-Entwicklung
🎯 Logo-Design - Professionelles Markendesign
📱 Social Media Management - Content-Produktion und Account-Management
🤖 KI-Integrationen - Chatbot und KI-gestützte Lösungen
⚙️ Automatisierung - Geschäftsprozess-Automatisierung
💼 Digitale Beratung - Strategische digitale Lösungen
📚 Bildung - Technologie-Schulungen

AUFGABENSTRATEGIE:
- Beantworten Sie jede Benutzerfrage, aber verbinden Sie Antworten mit Softiels Dienstleistungen
- Leiten Sie allgemeine Fragen zu Softiels Fachgebieten weiter
- Verwenden Sie einen freundlichen und hilfsbereiten Ton
- Stellen Sie Softiels Dienstleistungen natürlich vor
- Geben Sie Kontaktinformationen bei Kommunikationsfragen an
- Geben Sie Dienstleistungsliste bei Dienstleistungsfragen an

ANTWORTREGELN:
- Beantworten Sie jede Frage, aber verbinden Sie mit Softiel
- Schreiben Sie keinen Code oder geben Sie technische Details an
- Empfehlen Sie nur Softiels Dienstleistungen
- Leiten Sie allgemeine Themen zu Softiels Expertise weiter
- Geben Sie genaue und aktuelle Kontaktinformationen an
- GEBEN SIE KURZE UND PRÄGNANTE ANTWORTEN (maximal 2-3 Sätze)
- Machen Sie keine langen Erklärungen, seien Sie direkt und klar

BEISPIEL-ANSÄTZE:`,
    fr: `Vous êtes l'assistant IA de Softiel. Softiel est une entreprise qui fournit du design web, du développement web, du développement d'applications mobiles, du SEO, du marketing numérique et de nombreux autres services technologiques.

INFORMATIONS DE CONTACT:
📞 Téléphone: +90 541 188 30 45
📧 E-mail: info@softiel.com
📍 Adresse: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

NOS SERVICES:
🎨 Design Web - Designs modernes et responsives
💻 Développement Web - Applications React, Next.js, Node.js
📱 App Mobile - Native/multiplateforme pour iOS/Android
🔍 Optimisation SEO - Classements élevés sur Google
📈 Gestion Google Ads - Campagnes publicitaires ciblées
🚀 Solutions WordPress - Développement de thèmes et plugins personnalisés
🎯 Design Logo - Design de marque professionnel
📱 Gestion Réseaux Sociaux - Production de contenu et gestion de comptes
🤖 Intégrations IA - Solutions chatbot et alimentées par l'IA
⚙️ Automatisation - Automatisation des processus métier
💼 Conseil Numérique - Solutions numériques stratégiques
📚 Formation - Formation technologique

STRATÉGIE DE TÂCHE:
- Répondez à chaque question utilisateur, mais connectez les réponses aux services de Softiel
- Dirigez les questions générales vers les domaines d'expertise de Softiel
- Utilisez un ton amical et serviable
- Présentez naturellement les services de Softiel
- Fournissez les informations de contact lors des questions de communication
- Fournissez la liste des services lors des questions sur les services

RÈGLES DE RÉPONSE:
- Répondez à chaque question, mais connectez-vous avec Softiel
- N'écrivez pas de code ou ne donnez pas de détails techniques
- Recommandez uniquement les services de Softiel
- Dirigez les sujets généraux vers l'expertise de Softiel
- Fournissez des informations de contact précises et à jour
- DONNEZ DES RÉPONSES COURTES ET CONCISES (maximum 2-3 phrases)
- Ne faites pas de longues explications, soyez direct et clair

APPROCHES D'EXEMPLE:`,
    ru: `Вы - ИИ-ассистент Softiel. Softiel - это компания, которая предоставляет веб-дизайн, веб-разработку, разработку мобильных приложений, SEO, цифровой маркетинг и многие другие технологические услуги.

КОНТАКТНАЯ ИНФОРМАЦИЯ:
📞 Телефон: +90 541 188 30 45
📧 Электронная почта: info@softiel.com
📍 Адрес: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

НАШИ УСЛУГИ:
🎨 Веб-дизайн - Современные, адаптивные дизайны
💻 Веб-разработка - Приложения React, Next.js, Node.js
📱 Мобильное приложение - Нативные/кроссплатформенные для iOS/Android
🔍 SEO-оптимизация - Высокие позиции в Google
📈 Управление Google Ads - Целевые рекламные кампании
🚀 Решения WordPress - Разработка пользовательских тем и плагинов
🎯 Дизайн логотипа - Профессиональный дизайн бренда
📱 Управление соцсетями - Производство контента и управление аккаунтами
🤖 Интеграции ИИ - Решения чат-ботов и на основе ИИ
⚙️ Автоматизация - Автоматизация бизнес-процессов
💼 Цифровое консультирование - Стратегические цифровые решения
📚 Образование - Технологическое обучение

СТРАТЕГИЯ ЗАДАЧ:
- Отвечайте на каждый вопрос пользователя, но связывайте ответы с услугами Softiel
- Направляйте общие вопросы к областям экспертизы Softiel
- Используйте дружелюбный и полезный тон
- Естественно представляйте услуги Softiel
- Предоставляйте контактную информацию при вопросах о коммуникации
- Предоставляйте список услуг при вопросах об услугах

ПРАВИЛА ОТВЕТОВ:
- Отвечайте на каждый вопрос, но связывайтесь с Softiel
- Не пишите код и не давайте технические детали
- Рекомендуйте только услуги Softiel
- Направляйте общие темы к экспертизе Softiel
- Предоставляйте точную и актуальную контактную информацию
- ДАВАЙТЕ КОРОТКИЕ И СОДЕРЖАТЕЛЬНЫЕ ОТВЕТЫ (максимум 2-3 предложения)
- Не делайте длинных объяснений, будьте прямыми и ясными

ПРИМЕРЫ ПОДХОДОВ:`,
    ar: `أنت مساعد الذكاء الاصطناعي لـ Softiel. Softiel هي شركة تقدم تصميم الويب، تطوير الويب، تطوير التطبيقات المحمولة، تحسين محركات البحث، التسويق الرقمي والعديد من الخدمات التقنية الأخرى.

معلومات الاتصال:
📞 الهاتف: +90 541 188 30 45
📧 البريد الإلكتروني: info@softiel.com
📍 العنوان: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul

خدماتنا:
🎨 تصميم الويب - تصاميم حديثة ومتجاوبة
💻 تطوير الويب - تطبيقات React، Next.js، Node.js
📱 تطبيق محمول - أصلية/متعددة المنصات لـ iOS/Android
🔍 تحسين محركات البحث - مراكز عالية في Google
📈 إدارة Google Ads - حملات إعلانية مستهدفة
🚀 حلول WordPress - تطوير قوالب وإضافات مخصصة
🎯 تصميم الشعار - تصميم علامة تجارية احترافي
📱 إدارة وسائل التواصل - إنتاج المحتوى وإدارة الحسابات
🤖 تكاملات الذكاء الاصطناعي - حلول روبوتات الدردشة والمدعومة بالذكاء الاصطناعي
⚙️ الأتمتة - أتمتة العمليات التجارية
💼 الاستشارات الرقمية - حلول رقمية استراتيجية
📚 التعليم - التدريب التكنولوجي

استراتيجية المهمة:
- أجب على كل سؤال للمستخدم، لكن اربط الإجابات بخدمات Softiel
- وجه الأسئلة العامة إلى مجالات خبرة Softiel
- استخدم نبرة ودودة ومفيدة
- قدم خدمات Softiel بشكل طبيعي
- قدم معلومات الاتصال عند الأسئلة حول التواصل
- قدم قائمة الخدمات عند الأسئلة حول الخدمات

قواعد الإجابة:
- أجب على كل سؤال، لكن اربط مع Softiel
- لا تكتب كود أو تعطي تفاصيل تقنية
- أوصِ بخدمات Softiel فقط
- وجه المواضيع العامة إلى خبرة Softiel
- قدم معلومات اتصال دقيقة ومحدثة
- أعط إجابات قصيرة ومختصرة (حد أقصى 2-3 جمل)
- لا تعطي شرحاً طويلاً، كن مباشراً وواضحاً

أمثلة على النهج:`
  }
  
  return prompts[locale as keyof typeof prompts] || prompts.tr
}

// Softiel hakkında sistem prompt'u (Gemini 2.0 Flash için optimize edilmiş)
const SYSTEM_PROMPT = getSystemPrompt('tr')

export interface GeminiResponse {
  text: string;
  success: boolean;
  error?: string;
}

// Dil talimatları
const getLanguageInstruction = (locale: string) => {
  const instructions = {
    tr: "ÖNEMLİ DİL KURALI: Sadece Türkçe yanıt ver. Hiçbir durumda başka dilde yanıt verme. Eğer kullanıcı başka dilde soru sorarsa, Türkçe yanıtla ve Türkçe konuşmanı söyle.",
    en: "IMPORTANT LANGUAGE RULE: Respond ONLY in English. Never respond in any other language. If user asks in another language, respond in English and tell them to speak English.",
    de: "WICHTIGE SPRACHREGEL: Antworte NUR auf Deutsch. Antworte niemals in einer anderen Sprache. Wenn der Benutzer in einer anderen Sprache fragt, antworte auf Deutsch und sage ihm, auf Deutsch zu sprechen.",
    fr: "RÈGLE LINGUISTIQUE IMPORTANTE: Répondez UNIQUEMENT en français. Ne répondez jamais dans une autre langue. Si l'utilisateur pose une question dans une autre langue, répondez en français et dites-lui de parler français.",
    ru: "ВАЖНОЕ ПРАВИЛО ЯЗЫКА: Отвечайте ТОЛЬКО на русском языке. Никогда не отвечайте на другом языке. Если пользователь задает вопрос на другом языке, отвечайте на русском и скажите ему говорить на русском.",
    ar: "قاعدة اللغة المهمة: أجب باللغة العربية فقط. لا تجب أبداً بلغة أخرى. إذا سأل المستخدم بلغة أخرى، أجب بالعربية واطلب منه التحدث بالعربية."
  }
  
  return instructions[locale as keyof typeof instructions] || instructions.tr
}

export async function generateGeminiResponse(userMessage: string, locale: string = 'tr'): Promise<GeminiResponse> {
  try {
    // API key kontrolü
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return {
        text: "Üzgünüm, AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
        success: false,
        error: "API key not configured"
      };
    }

    // Dil bazlı sistem prompt'u al
    const systemPrompt = getSystemPrompt(locale)
    
    // Dil talimatı ekle
    const languageInstruction = getLanguageInstruction(locale)
    
    // Prompt'u hazırla
    const prompt = `${systemPrompt}\n\n${languageInstruction}\n\nKullanıcı: ${userMessage}\n\nAsistan:`;

    // Gemini'den yanıt al
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      text: text.trim(),
      success: true
    };

  } catch (error) {
    
    // Hata türüne göre farklı mesajlar
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return {
          text: getFallbackResponse(userMessage, locale),
          success: false,
          error: error.message
        };
      }
      
      if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('QUOTA_EXCEEDED')) {
        return {
          text: getFallbackResponse(userMessage, locale),
          success: false,
          error: 'API quota exceeded'
        };
      }
    }

    return {
      text: getFallbackResponse(userMessage, locale),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fallback yanıtlar (API çalışmadığında)
export function getFallbackResponse(userText: string, locale: string = 'tr'): string {
  const text = userText.toLowerCase();
  
  // Dil bazlı yanıtlar
  const responses = {
    tr: {
      greeting: 'Merhaba! Softiel olarak web tasarımı, web geliştirme, mobil uygulama ve dijital pazarlama hizmetleri sunuyoruz. Size nasıl yardımcı olabilirim? 😊',
      howAreYou: 'İyiyim, teşekkürler! Softiel olarak yeni projeler üzerinde çalışıyoruz. Sizin için hangi hizmete ihtiyacınız var? 🚀',
      thanks: 'Rica ederim! Softiel olarak her zaman yanınızdayız. Başka bir konuda yardımcı olabilir miyim? 😊',
      services: 'Softiel olarak şu hizmetleri sunuyoruz:\n🎨 Web Tasarımı - Modern, responsive tasarımlar\n💻 Web Geliştirme - React, Next.js, Node.js uygulamaları\n📱 Mobil Uygulama - iOS/Android native/cross-platform\n🔍 SEO Optimizasyonu - Google\'da üst sıralarda yer alma\n📈 Google Ads Yönetimi - Hedefli reklam kampanyaları\n🚀 WordPress Çözümleri - Özel tema ve plugin geliştirme\n🎯 Logo Tasarımı - Profesyonel marka tasarımı\n📱 Sosyal Medya Yönetimi - İçerik üretimi ve hesap yönetimi\n🤖 AI Entegrasyonları - Chatbot ve AI destekli çözümler\n⚙️ Otomasyon - İş süreçleri otomasyonu\n💼 Dijital Danışmanlık - Stratejik dijital çözümler\n📚 Eğitim - Teknoloji eğitimleri\n\nDetaylı bilgi için hizmetlerimiz sayfasını inceleyebilirsiniz! 😊',
      webDesign: 'Web tasarımı konusunda Softiel olarak uzmanız! Modern, responsive ve kullanıcı dostu web siteleri tasarlıyoruz. Size özel tasarım çözümleri sunabiliriz! 🎨',
      webDevelopment: 'Web geliştirme konusunda Softiel olarak deneyimliyiz! React, Next.js, Node.js gibi modern teknolojilerle profesyonel web uygulamaları geliştiriyoruz. 💻',
      mobile: 'Mobil uygulama geliştirme konusunda Softiel olarak uzmanız! iOS ve Android platformları için native ve cross-platform uygulamalar geliştiriyoruz. 📱',
      seo: 'SEO konusunda Softiel olarak uzmanız! Web sitenizin Google\'da üst sıralarda yer alması için profesyonel SEO hizmetleri sunuyoruz. 🔍',
      marketing: 'Dijital pazarlama konusunda Softiel olarak deneyimliyiz! Google Ads, Facebook Ads ve sosyal medya yönetimi hizmetleri sunuyoruz. 📈',
      ecommerce: 'E-ticaret konusunda Softiel olarak uzmanız! WooCommerce, Shopify ve özel e-ticaret çözümleri geliştiriyoruz. Size özel online mağaza kurabiliriz! 🛒',
      wordpress: 'WordPress konusunda Softiel olarak deneyimliyiz! Özel tema tasarımı, plugin geliştirme ve WordPress optimizasyonu hizmetleri sunuyoruz. 🚀',
      logo: 'Logo ve kurumsal kimlik tasarımı konusunda Softiel olarak uzmanız! Markanızı güçlendirecek profesyonel tasarım çözümleri sunuyoruz. 🎨',
      socialMedia: 'Sosyal medya yönetimi konusunda Softiel olarak deneyimliyiz! İçerik üretimi, hesap yönetimi ve sosyal medya stratejileri geliştiriyoruz. 📱',
      ai: 'Yapay zeka entegrasyonu konusunda Softiel olarak uzmanız! Chatbot, otomasyon ve AI destekli çözümler geliştiriyoruz. 🤖',
      automation: 'Otomasyon ve entegrasyon konusunda Softiel olarak deneyimliyiz! İş süreçlerinizi otomatikleştirecek çözümler geliştiriyoruz. ⚙️',
      contact: 'İletişim bilgilerimiz:\n📞 Telefon: 0541 188 30 45\n📧 E-posta: info@softiel.com\n📍 Adres: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nDetaylı sorularınız için şimdi bize ulaşın! 😊',
      pricing: 'Softiel olarak her projeye özel fiyatlandırma yapıyoruz! Projenizin kapsamına göre detaylı teklif hazırlıyoruz. Web tasarımı, web geliştirme, mobil uygulama, SEO, Google Ads ve diğer hizmetlerimiz için fiyat bilgisi almak istiyorsanız bizimle iletişime geçin. Size özel teklif hazırlayalım! 💰\n\nDetaylı fiyatlandırma bilgileri için fiyatlandırma sayfamızı inceleyebilirsiniz!',
      projects: 'Softiel olarak birçok başarılı projeye imza attık! Web siteleri, mobil uygulamalar, e-ticaret platformları, kurumsal kimlik tasarımları ve dijital pazarlama kampanyaları gerçekleştirdik. Projelerimizi görmek için portföyümüzü inceleyebilir veya bizimle iletişime geçerek detaylı bilgi alabilirsiniz! 🚀\n\nDetaylı proje örnekleri için portföy sayfamızı inceleyebilirsiniz!',
      general: 'Bu konuda size yardımcı olabilirim! Softiel olarak web tasarımı, web geliştirme, mobil uygulama geliştirme, SEO optimizasyonu, Google Ads yönetimi, WordPress çözümleri, logo tasarımı, sosyal medya yönetimi, yapay zeka entegrasyonları, otomasyon ve dijital danışmanlık hizmetleri sunuyoruz. Hangi konuda detaylı bilgi almak istiyorsunuz? 😊'
    },
    en: {
      greeting: 'Hello! Softiel provides web design, web development, mobile app and digital marketing services. How can I help you? 😊',
      services: 'Softiel provides these services:\n🎨 Web Design - Modern, responsive designs\n💻 Web Development - React, Next.js, Node.js applications\n📱 Mobile App - Native/cross-platform for iOS/Android\n🔍 SEO Optimization - Top rankings on Google\n📈 Google Ads Management - Targeted advertising campaigns\n🚀 WordPress Solutions - Custom theme and plugin development\n🎯 Logo Design - Professional brand design\n📱 Social Media Management - Content production and account management\n🤖 AI Integrations - Chatbot and AI-powered solutions\n⚙️ Automation - Business process automation\n💼 Digital Consulting - Strategic digital solutions\n📚 Education - Technology training\n\nCheck out our services page for detailed information! 😊',
      howAreYou: 'I\'m doing well, thank you! Softiel is working on new projects. What service do you need? 🚀',
      thanks: 'You\'re welcome! Softiel is always here for you. Can I help you with anything else? 😊',
      webDesign: 'Softiel is an expert in web design! We design modern, responsive and user-friendly websites. We can provide custom design solutions for you! 🎨',
      webDevelopment: 'Softiel is experienced in web development! We develop professional web applications with modern technologies like React, Next.js, Node.js. 💻',
      mobile: 'Softiel is an expert in mobile app development! We develop native and cross-platform applications for iOS and Android platforms. 📱',
      seo: 'Softiel is an expert in SEO! We provide professional SEO services to get your website to the top ranks on Google. 🔍',
      marketing: 'Softiel is experienced in digital marketing! We provide Google Ads, Facebook Ads and social media management services. 📈',
      ecommerce: 'Softiel is an expert in e-commerce! We develop WooCommerce, Shopify and custom e-commerce solutions. We can set up a custom online store for you! 🛒',
      wordpress: 'Softiel is experienced in WordPress! We provide custom theme design, plugin development and WordPress optimization services. 🚀',
      logo: 'Softiel is an expert in logo and corporate identity design! We provide professional design solutions that will strengthen your brand. 🎨',
      socialMedia: 'Softiel is experienced in social media management! We develop content production, account management and social media strategies. 📱',
      ai: 'Softiel is an expert in AI integration! We develop chatbots, automation and AI-powered solutions. 🤖',
      automation: 'Softiel is experienced in automation and integration! We develop solutions that will automate your business processes. ⚙️',
      contact: 'Our contact information:\n📞 Phone: +90 541 188 30 45\n📧 Email: info@softiel.com\n📍 Address: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nContact us now for detailed questions! 😊',
      pricing: 'Softiel provides custom pricing for every project! We prepare detailed quotes based on your project scope. For pricing information on web design, web development, mobile apps, SEO, Google Ads and our other services, please contact us. Let us prepare a custom quote for you! 💰\n\nCheck out our pricing page for detailed pricing information!',
      projects: 'Softiel has successfully completed many projects! We have delivered websites, mobile applications, e-commerce platforms, corporate identity designs and digital marketing campaigns. You can review our portfolio to see our projects or contact us for detailed information! 🚀\n\nCheck out our portfolio page for detailed project examples!',
      general: 'I can help you with that! Softiel provides web design, web development, mobile app development, SEO optimization, Google Ads management, WordPress solutions, logo design, social media management, AI integrations, automation, and digital consulting services. What specific information would you like to know? 😊'
    },
    de: {
      greeting: 'Hallo! Softiel bietet Webdesign, Webentwicklung, Mobile Apps und digitales Marketing. Wie kann ich helfen? 😊',
      services: 'Softiel bietet diese Dienstleistungen:\n🎨 Webdesign - Moderne, responsive Designs\n💻 Webentwicklung - React, Next.js, Node.js Anwendungen\n📱 Mobile App - Native/Cross-Platform für iOS/Android\n🔍 SEO-Optimierung - Top-Rankings bei Google\n📈 Google Ads Management - Gezielte Werbekampagnen\n🚀 WordPress-Lösungen - Custom Theme und Plugin-Entwicklung\n🎯 Logo-Design - Professionelles Markendesign\n📱 Social Media Management - Content-Produktion und Account-Management\n🤖 KI-Integrationen - Chatbot und KI-gestützte Lösungen\n⚙️ Automatisierung - Geschäftsprozess-Automatisierung\n💼 Digitale Beratung - Strategische digitale Lösungen\n📚 Bildung - Technologie-Schulungen\n\nSchauen Sie sich unsere Dienstleistungsseite für detaillierte Informationen an! 😊',
      howAreYou: 'Mir geht es gut, danke! Softiel arbeitet an neuen Projekten. Welche Dienstleistung benötigen Sie? 🚀',
      thanks: 'Gern geschehen! Softiel ist immer für Sie da. Kann ich Ihnen bei etwas anderem helfen? 😊',
      webDesign: 'Softiel ist Experte im Webdesign! Wir entwerfen moderne, responsive und benutzerfreundliche Websites. Wir können maßgeschneiderte Designlösungen für Sie bereitstellen! 🎨',
      webDevelopment: 'Softiel ist erfahren in der Webentwicklung! Wir entwickeln professionelle Webanwendungen mit modernen Technologien wie React, Next.js, Node.js. 💻',
      mobile: 'Softiel ist Experte in der Mobile App-Entwicklung! Wir entwickeln native und plattformübergreifende Anwendungen für iOS und Android. 📱',
      seo: 'Softiel ist Experte in SEO! Wir bieten professionelle SEO-Dienstleistungen, um Ihre Website in den Top-Rankings von Google zu platzieren. 🔍',
      marketing: 'Softiel ist erfahren im Digitalen Marketing! Wir bieten Google Ads, Facebook Ads und Social Media Management. 📈',
      ecommerce: 'Softiel ist Experte im E-Commerce! Wir entwickeln WooCommerce, Shopify und maßgeschneiderte E-Commerce-Lösungen. Wir können einen maßgeschneiderten Online-Shop für Sie einrichten! 🛒',
      wordpress: 'Softiel ist erfahren in WordPress! Wir bieten maßgeschneidertes Theme-Design, Plugin-Entwicklung und WordPress-Optimierung. 🚀',
      logo: 'Softiel ist Experte in Logo- und Corporate Identity-Design! Wir bieten professionelle Designlösungen, die Ihre Marke stärken. 🎨',
      socialMedia: 'Softiel ist erfahren im Social Media Management! Wir entwickeln Content-Produktion, Account-Management und Social Media-Strategien. 📱',
      ai: 'Softiel ist Experte in der KI-Integration! Wir entwickeln Chatbots, Automatisierung und KI-gestützte Lösungen. 🤖',
      automation: 'Softiel ist erfahren in Automatisierung und Integration! Wir entwickeln Lösungen, die Ihre Geschäftsprozesse automatisieren. ⚙️',
      contact: 'Unsere Kontaktinformationen:\n📞 Telefon: +90 541 188 30 45\n📧 E-Mail: info@softiel.com\n📍 Adresse: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nKontaktieren Sie uns jetzt für detaillierte Fragen! 😊',
      pricing: 'Softiel bietet individuelle Preise für jedes Projekt! Wir erstellen detaillierte Angebote basierend auf Ihrem Projektumfang. Für Preisinformationen zu Webdesign, Webentwicklung, Mobile Apps, SEO, Google Ads und unseren anderen Dienstleistungen kontaktieren Sie uns bitte. Lassen Sie uns ein individuelles Angebot für Sie erstellen! 💰\n\nSchauen Sie sich unsere Preisseite für detaillierte Preisinformationen an!',
      projects: 'Softiel hat viele erfolgreiche Projekte abgeschlossen! Wir haben Websites, Mobile Anwendungen, E-Commerce-Plattformen, Corporate Identity-Designs und digitale Marketingkampagnen geliefert. Sie können unser Portfolio durchsehen, um unsere Projekte zu sehen, oder uns für detaillierte Informationen kontaktieren! 🚀\n\nSchauen Sie sich unsere Portfolio-Seite für detaillierte Projektbeispiele an!',
      general: 'Ich kann Ihnen dabei helfen! Softiel bietet Webdesign, Webentwicklung, Mobile App-Entwicklung, SEO-Optimierung, Google Ads Management, WordPress-Lösungen, Logo-Design, Social Media Management, KI-Integrationen, Automatisierung und digitale Beratung. Welche spezifischen Informationen benötigen Sie? 😊'
    },
    fr: {
      greeting: 'Bonjour! Softiel fournit des services de design web, développement web, applications mobiles et marketing numérique. Comment puis-je vous aider? 😊',
      services: 'Softiel fournit ces services:\n🎨 Design Web - Designs modernes et responsives\n💻 Développement Web - Applications React, Next.js, Node.js\n📱 App Mobile - Native/multiplateforme pour iOS/Android\n🔍 Optimisation SEO - Classements élevés sur Google\n📈 Gestion Google Ads - Campagnes publicitaires ciblées\n🚀 Solutions WordPress - Développement de thèmes et plugins personnalisés\n🎯 Design Logo - Design de marque professionnel\n📱 Gestion Réseaux Sociaux - Production de contenu et gestion de comptes\n🤖 Intégrations IA - Solutions chatbot et alimentées par l\'IA\n⚙️ Automatisation - Automatisation des processus métier\n💼 Conseil Numérique - Solutions numériques stratégiques\n📚 Formation - Formation technologique\n\nConsultez notre page de services pour des informations détaillées! 😊',
      howAreYou: 'Je vais bien, merci! Softiel travaille sur de nouveaux projets. De quel service avez-vous besoin? 🚀',
      thanks: 'De rien! Softiel est toujours là pour vous. Puis-je vous aider avec autre chose? 😊',
      webDesign: 'Softiel est expert en design web! Nous concevons des sites web modernes, responsives et conviviaux. Nous pouvons fournir des solutions de design personnalisées pour vous! 🎨',
      webDevelopment: 'Softiel est expérimenté en développement web! Nous développons des applications web professionnelles avec des technologies modernes comme React, Next.js, Node.js. 💻',
      mobile: 'Softiel est expert en développement d\'applications mobiles! Nous développons des applications natives et multiplateformes pour iOS et Android. 📱',
      seo: 'Softiel est expert en SEO! Nous fournissons des services SEO professionnels pour placer votre site web dans les premiers rangs de Google. 🔍',
      marketing: 'Softiel est expérimenté en marketing numérique! Nous fournissons Google Ads, Facebook Ads et gestion des réseaux sociaux. 📈',
      ecommerce: 'Softiel est expert en e-commerce! Nous développons WooCommerce, Shopify et des solutions e-commerce personnalisées. Nous pouvons configurer une boutique en ligne personnalisée pour vous! 🛒',
      wordpress: 'Softiel est expérimenté en WordPress! Nous fournissons la conception de thèmes personnalisés, le développement de plugins et l\'optimisation WordPress. 🚀',
      logo: 'Softiel est expert en conception de logos et d\'identité d\'entreprise! Nous fournissons des solutions de design professionnelles qui renforceront votre marque. 🎨',
      socialMedia: 'Softiel est expérimenté en gestion des réseaux sociaux! Nous développons la production de contenu, la gestion de comptes et les stratégies de réseaux sociaux. 📱',
      ai: 'Softiel est expert en intégration IA! Nous développons des chatbots, l\'automatisation et des solutions alimentées par l\'IA. 🤖',
      automation: 'Softiel est expérimenté en automatisation et intégration! Nous développons des solutions qui automatiseront vos processus métier. ⚙️',
      contact: 'Nos informations de contact:\n📞 Téléphone: +90 541 188 30 45\n📧 E-mail: info@softiel.com\n📍 Adresse: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nContactez-nous maintenant pour des questions détaillées! 😊',
      pricing: 'Softiel propose des tarifs personnalisés pour chaque projet! Nous préparons des devis détaillés basés sur la portée de votre projet. Pour les informations tarifaires sur le design web, le développement web, les applications mobiles, le SEO, Google Ads et nos autres services, veuillez nous contacter. Laissez-nous préparer un devis personnalisé pour vous! 💰\n\nConsultez notre page de tarification pour des informations tarifaires détaillées!',
      projects: 'Softiel a réalisé avec succès de nombreux projets! Nous avons livré des sites web, des applications mobiles, des plateformes e-commerce, des designs d\'identité d\'entreprise et des campagnes de marketing numérique. Vous pouvez consulter notre portfolio pour voir nos projets ou nous contacter pour des informations détaillées! 🚀\n\nConsultez notre page portfolio pour des exemples de projets détaillés!',
      general: 'Je peux vous aider avec cela! Softiel fournit du design web, du développement web, du développement d\'applications mobiles, de l\'optimisation SEO, de la gestion Google Ads, des solutions WordPress, du design de logo, de la gestion des réseaux sociaux, des intégrations IA, de l\'automatisation et des conseils numériques. Quelles informations spécifiques souhaitez-vous connaître? 😊'
    },
    ru: {
      greeting: 'Привет! Softiel предоставляет услуги веб-дизайна, веб-разработки, мобильных приложений и цифрового маркетинга. Как я могу помочь? 😊',
      services: 'Softiel предоставляет эти услуги:\n🎨 Веб-дизайн - Современные, адаптивные дизайны\n💻 Веб-разработка - Приложения React, Next.js, Node.js\n📱 Мобильное приложение - Нативные/кроссплатформенные для iOS/Android\n🔍 SEO-оптимизация - Высокие позиции в Google\n📈 Управление Google Ads - Целевые рекламные кампании\n🚀 Решения WordPress - Разработка пользовательских тем и плагинов\n🎯 Дизайн логотипа - Профессиональный дизайн бренда\n📱 Управление соцсетями - Производство контента и управление аккаунтами\n🤖 Интеграции ИИ - Решения чат-ботов и на основе ИИ\n⚙️ Автоматизация - Автоматизация бизнес-процессов\n💼 Цифровое консультирование - Стратегические цифровые решения\n📚 Образование - Технологическое обучение\n\nПосетите нашу страницу услуг для подробной информации! 😊',
      howAreYou: 'У меня все хорошо, спасибо! Softiel работает над новыми проектами. Какая услуга вам нужна? 🚀',
      thanks: 'Пожалуйста! Softiel всегда рядом с вами. Могу ли я помочь вам с чем-то еще? 😊',
      webDesign: 'Softiel - эксперт в веб-дизайне! Мы создаем современные, адаптивные и удобные веб-сайты. Мы можем предоставить индивидуальные дизайн-решения для вас! 🎨',
      webDevelopment: 'Softiel имеет опыт в веб-разработке! Мы разрабатываем профессиональные веб-приложения с современными технологиями, такими как React, Next.js, Node.js. 💻',
      mobile: 'Softiel - эксперт в разработке мобильных приложений! Мы разрабатываем нативные и кроссплатформенные приложения для iOS и Android. 📱',
      seo: 'Softiel - эксперт в SEO! Мы предоставляем профессиональные SEO-услуги для попадания вашего сайта в топ-рейтинги Google. 🔍',
      marketing: 'Softiel имеет опыт в цифровом маркетинге! Мы предоставляем Google Ads, Facebook Ads и управление социальными сетями. 📈',
      ecommerce: 'Softiel - эксперт в электронной коммерции! Мы разрабатываем WooCommerce, Shopify и индивидуальные решения электронной коммерции. Мы можем настроить индивидуальный интернет-магазин для вас! 🛒',
      wordpress: 'Softiel имеет опыт в WordPress! Мы предоставляем индивидуальный дизайн тем, разработку плагинов и оптимизацию WordPress. 🚀',
      logo: 'Softiel - эксперт в дизайне логотипов и корпоративной идентичности! Мы предоставляем профессиональные дизайн-решения, которые укрепят ваш бренд. 🎨',
      socialMedia: 'Softiel имеет опыт в управлении социальными сетями! Мы разрабатываем производство контента, управление аккаунтами и стратегии социальных сетей. 📱',
      ai: 'Softiel - эксперт в интеграции ИИ! Мы разрабатываем чат-боты, автоматизацию и решения на основе ИИ. 🤖',
      automation: 'Softiel имеет опыт в автоматизации и интеграции! Мы разрабатываем решения, которые автоматизируют ваши бизнес-процессы. ⚙️',
      contact: 'Наша контактная информация:\n📞 Телефон: +90 541 188 30 45\n📧 Электронная почта: info@softiel.com\n📍 Адрес: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nСвяжитесь с нами сейчас для подробных вопросов! 😊',
      pricing: 'Softiel предоставляет индивидуальные цены для каждого проекта! Мы готовим подробные предложения на основе масштаба вашего проекта. Для получения информации о ценах на веб-дизайн, веб-разработку, мобильные приложения, SEO, Google Ads и наши другие услуги, пожалуйста, свяжитесь с нами. Давайте подготовим индивидуальное предложение для вас! 💰\n\nПосетите нашу страницу цен для подробной информации о ценах!',
      projects: 'Softiel успешно завершил множество проектов! Мы реализовали веб-сайты, мобильные приложения, платформы электронной коммерции, дизайны корпоративной идентичности и цифровые маркетинговые кампании. Вы можете просмотреть наше портфолио, чтобы увидеть наши проекты, или связаться с нами для получения подробной информации! 🚀\n\nПосетите нашу страницу портфолио для подробных примеров проектов!',
      general: 'Я могу вам помочь! Softiel предоставляет веб-дизайн, веб-разработку, разработку мобильных приложений, SEO-оптимизацию, управление Google Ads, решения WordPress, дизайн логотипа, управление социальными сетями, интеграции ИИ, автоматизацию и цифровое консультирование. Какую конкретную информацию вы хотели бы узнать? 😊'
    },
    ar: {
      greeting: 'مرحبا! Softiel تقدم خدمات تصميم الويب، تطوير الويب، التطبيقات المحمولة والتسويق الرقمي. كيف يمكنني مساعدتك؟ 😊',
      services: 'Softiel تقدم هذه الخدمات:\n🎨 تصميم الويب - تصاميم حديثة ومتجاوبة\n💻 تطوير الويب - تطبيقات React, Next.js, Node.js\n📱 تطبيق محمول - أصلية/متعددة المنصات لـ iOS/Android\n🔍 تحسين محركات البحث - مراكز عالية في Google\n📈 إدارة Google Ads - حملات إعلانية مستهدفة\n🚀 حلول WordPress - تطوير قوالب وإضافات مخصصة\n🎯 تصميم الشعار - تصميم هوية تجارية احترافية\n📱 إدارة وسائل التواصل - إنتاج المحتوى وإدارة الحسابات\n🤖 تكاملات الذكاء الاصطناعي - حلول روبوتات المحادثة والذكاء الاصطناعي\n⚙️ الأتمتة - أتمتة العمليات التجارية\n💼 الاستشارات الرقمية - حلول رقمية استراتيجية\n📚 التعليم - تدريب تقني\n\nتحقق من صفحة خدماتنا للحصول على معلومات مفصلة! 😊',
      howAreYou: 'أنا بخير، شكرا! Softiel تعمل على مشاريع جديدة. ما الخدمة التي تحتاجها؟ 🚀',
      thanks: 'العفو! Softiel دائما معك. هل يمكنني مساعدتك في شيء آخر؟ 😊',
      webDesign: 'Softiel خبير في تصميم الويب! نصمم مواقع ويب حديثة ومتجاوبة وسهلة الاستخدام. يمكننا تقديم حلول تصميم مخصصة لك! 🎨',
      webDevelopment: 'Softiel لديها خبرة في تطوير الويب! نطور تطبيقات ويب احترافية بتقنيات حديثة مثل React، Next.js، Node.js. 💻',
      mobile: 'Softiel خبير في تطوير التطبيقات المحمولة! نطور تطبيقات أصلية ومتعددة المنصات لنظامي iOS و Android. 📱',
      seo: 'Softiel خبير في تحسين محركات البحث! نقدم خدمات SEO احترافية لجعل موقعك في المراكز الأولى على Google. 🔍',
      marketing: 'Softiel لديها خبرة في التسويق الرقمي! نقدم Google Ads، Facebook Ads وإدارة وسائل التواصل الاجتماعي. 📈',
      ecommerce: 'Softiel خبير في التجارة الإلكترونية! نطور WooCommerce، Shopify وحلول التجارة الإلكترونية المخصصة. يمكننا إعداد متجر إلكتروني مخصص لك! 🛒',
      wordpress: 'Softiel لديها خبرة في WordPress! نقدم تصميم قوالب مخصصة، تطوير الإضافات وتحسين WordPress. 🚀',
      logo: 'Softiel خبير في تصميم الشعارات والهوية المؤسسية! نقدم حلول تصميم احترافية ستعزز علامتك التجارية. 🎨',
      socialMedia: 'Softiel لديها خبرة في إدارة وسائل التواصل الاجتماعي! نطور إنتاج المحتوى، إدارة الحسابات واستراتيجيات وسائل التواصل الاجتماعي. 📱',
      ai: 'Softiel خبير في تكامل الذكاء الاصطناعي! نطور روبوتات الدردشة، الأتمتة والحلول المدعومة بالذكاء الاصطناعي. 🤖',
      automation: 'Softiel لديها خبرة في الأتمتة والتكامل! نطور حلول ستؤتمت عملياتك التجارية. ⚙️',
      contact: 'معلومات الاتصال الخاصة بنا:\n📞 الهاتف: +90 541 188 30 45\n📧 البريد الإلكتروني: info@softiel.com\n📍 العنوان: Başak, Şair Zihni Cd. 4. Etap 1. Kısım L-33, 34480 Başakşehir/İstanbul\n\nاتصل بنا الآن للأسئلة المفصلة! 😊',
      pricing: 'Softiel تقدم أسعار مخصصة لكل مشروع! نحن نعد عروض أسعار مفصلة بناءً على نطاق مشروعك. للحصول على معلومات الأسعار حول تصميم الويب، تطوير الويب، التطبيقات المحمولة، تحسين محركات البحث، Google Ads وخدماتنا الأخرى، يرجى الاتصال بنا. دعنا نعد عرض أسعار مخصص لك! 💰\n\nتحقق من صفحة الأسعار للحصول على معلومات أسعار مفصلة!',
      projects: 'Softiel أكملت بنجاح العديد من المشاريع! لقد سلمنا مواقع ويب، تطبيقات محمولة، منصات التجارة الإلكترونية، تصاميم الهوية المؤسسية وحملات التسويق الرقمي. يمكنك مراجعة محفظتنا لرؤية مشاريعنا أو الاتصال بنا للحصول على معلومات مفصلة! 🚀\n\nتحقق من صفحة المحفظة للحصول على أمثلة مشاريع مفصلة!',
      general: 'يمكنني مساعدتك في ذلك! Softiel تقدم تصميم الويب، تطوير الويب، تطوير التطبيقات المحمولة، تحسين محركات البحث، إدارة Google Ads، حلول WordPress، تصميم الشعار، إدارة وسائل التواصل الاجتماعي، تكاملات الذكاء الاصطناعي، الأتمتة والاستشارات الرقمية. ما هي المعلومات المحددة التي تريد معرفتها؟ 😊'
    }
  };

  const currentResponses = responses[locale as keyof typeof responses] || responses.tr;
  
  // Genel selamlaşma ve sohbet
  if (text.includes('merhaba') || text.includes('selam') || text.includes('hello') || text.includes('hi') || text.includes('hallo') || text.includes('bonjour') || text.includes('привет') || text.includes('مرحبا')) {
    return currentResponses.greeting;
  }
  
  if (text.includes('nasılsın') || text.includes('nasıl gidiyor') || text.includes('how are you') || text.includes('wie geht es') || text.includes('comment allez-vous') || text.includes('как дела') || text.includes('كيف حالك')) {
    return currentResponses.howAreYou;
  }
  
  if (text.includes('teşekkür') || text.includes('thanks') || text.includes('sağol') || text.includes('danke') || text.includes('merci') || text.includes('спасибо') || text.includes('شكرا')) {
    return currentResponses.thanks;
  }
  
  // Web tasarım ve geliştirme
  if (text.includes('web tasarım') || text.includes('web design') || text.includes('website') || text.includes('site') || text.includes('webdesign') || text.includes('design web') || text.includes('веб-дизайн') || text.includes('تصميم الويب')) {
    return currentResponses.webDesign;
  }
  
  if (text.includes('web geliştirme') || text.includes('web development') || text.includes('programlama') || text.includes('kod') || text.includes('webentwicklung') || text.includes('développement web') || text.includes('веб-разработка') || text.includes('تطوير الويب')) {
    return currentResponses.webDevelopment;
  }
  
  // Mobil uygulama
  if (text.includes('mobil') || text.includes('mobile') || text.includes('app') || text.includes('uygulama') || text.includes('app-') || text.includes('application') || text.includes('мобильное') || text.includes('تطبيق')) {
    return currentResponses.mobile;
  }
  
  // SEO ve dijital pazarlama
  if (text.includes('seo') || text.includes('arama motoru') || text.includes('google') || text.includes('optimizasyon') || text.includes('suchmaschinenoptimierung') || text.includes('optimisation') || text.includes('оптимизация') || text.includes('تحسين')) {
    return currentResponses.seo;
  }
  
  if (text.includes('pazarlama') || text.includes('marketing') || text.includes('reklam') || text.includes('ads') || text.includes('marketing') || text.includes('marketing numérique') || text.includes('маркетинг') || text.includes('تسويق')) {
    return currentResponses.marketing;
  }
  
  // E-ticaret
  if (text.includes('e-ticaret') || text.includes('ecommerce') || text.includes('online satış') || text.includes('mağaza') || text.includes('e-commerce') || text.includes('commerce') || text.includes('электронная коммерция') || text.includes('تجارة إلكترونية')) {
    return currentResponses.ecommerce;
  }
  
  // WordPress
  if (text.includes('wordpress') || text.includes('wp') || text.includes('cms') || text.includes('wordpress') || text.includes('wordpress') || text.includes('wordpress') || text.includes('wordpress') || text.includes('ووردبريس')) {
    return currentResponses.wordpress;
  }
  
  // Logo ve kurumsal kimlik
  if (text.includes('logo') || text.includes('kimlik') || text.includes('brand') || text.includes('marka') || text.includes('marke') || text.includes('marque') || text.includes('бренд') || text.includes('علامة تجارية')) {
    return currentResponses.logo;
  }
  
  // Sosyal medya
  if (text.includes('sosyal medya') || text.includes('social media') || text.includes('instagram') || text.includes('facebook') || text.includes('soziale medien') || text.includes('réseaux sociaux') || text.includes('социальные сети') || text.includes('وسائل التواصل الاجتماعي')) {
    return currentResponses.socialMedia;
  }
  
  // Yapay zeka
  if (text.includes('yapay zeka') || text.includes('ai') || text.includes('artificial intelligence') || text.includes('chatbot') || text.includes('ki') || text.includes('ia') || text.includes('ии') || text.includes('ذكاء اصطناعي')) {
    return currentResponses.ai;
  }
  
  // Otomasyon
  if (text.includes('otomasyon') || text.includes('automation') || text.includes('entegrasyon') || text.includes('integration') || text.includes('automatisierung') || text.includes('automatisation') || text.includes('автоматизация') || text.includes('أتمتة')) {
    return currentResponses.automation;
  }
  
  // Kısayol action'ları kontrol et
  if (text.includes('Hizmetleriniz neler?') || text.includes('What are your services?') || text.includes('Was sind Ihre Dienstleistungen?') || text.includes('Quels sont vos services ?') || text.includes('Какие у вас услуги?') || text.includes('ما هي خدماتكم؟')) {
    return currentResponses.services;
  }
  
  if (text.includes('Fiyat bilgisi al') || text.includes('Get pricing information') || text.includes('Preisinformationen erhalten') || text.includes('Obtenir des informations sur les prix') || text.includes('Получить информацию о ценах') || text.includes('احصل على معلومات الأسعار')) {
    return currentResponses.pricing;
  }
  
  if (text.includes('Projelerinizi görmek istiyorum') || text.includes('I want to see your projects') || text.includes('Ich möchte Ihre Projekte sehen') || text.includes('Je veux voir vos projets') || text.includes('Я хочу посмотреть ваши проекты') || text.includes('أريد أن أرى مشاريعكم')) {
    return currentResponses.projects;
  }
  
  if (text.includes('İletişim bilgileri') || text.includes('Contact information') || text.includes('Kontaktinformationen') || text.includes('Informations de contact') || text.includes('Контактная информация') || text.includes('معلومات الاتصال')) {
    return currentResponses.contact;
  }
  
  // Hizmetler
  if (text.includes('hizmet') || text.includes('service') || text.includes('ne yapıyorsunuz') || text.includes('dienstleistung') || text.includes('service') || text.includes('услуга') || text.includes('خدمة') || text.includes('what do you do') || text.includes('was machen sie') || text.includes('que faites-vous') || text.includes('что вы делаете') || text.includes('ماذا تفعلون')) {
    return currentResponses.services;
  }
  
  // İletişim
  if (text.includes('iletişim') || text.includes('contact') || text.includes('telefon') || text.includes('adres') || text.includes('kontakt') || text.includes('contact') || text.includes('контакт') || text.includes('اتصال') || text.includes('phone') || text.includes('email') || text.includes('mail') || text.includes('adresse') || text.includes('адрес') || text.includes('عنوان')) {
    return currentResponses.contact;
  }
  
  // Genel yanıt - Softiel ile bağlantı kur
  return currentResponses.general;
}
