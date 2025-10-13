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
    tr: `Sen Softiel'in yapay zeka asistanısın. Kullanıcılara yardımcı ol ve sorularını yanıtla.

🏢 SOFTIEL HAKKINDA:
Modern dijital ajans. Web, mobil ve dijital pazarlama çözümleri sunuyoruz.

📞 İLETİŞİM:
• Telefon: 0541 188 30 45
• E-posta: info@softiel.com
• Adres: Başakşehir/İstanbul

🚀 HİZMETLER:
• Web Tasarımı & Geliştirme (React, Next.js)
• Mobil Uygulama (iOS & Android)
• SEO & Google Ads
• WordPress Çözümleri
• Logo & Kurumsal Kimlik
• Sosyal Medya Yönetimi
• AI Entegrasyonları & Otomasyon
• Dijital Danışmanlık

✅ GÖREV KURALLARI:
• Her soruyu doğrudan ve net yanıtla
• KISA yanıtlar ver (2-3 cümle)
• Samimi ve profesyonel ol
• Gerektiğinde Softiel hizmetlerini öner
• Teknik jargon kullanma, basit dil kullan
• İletişim bilgilerini doğru ver`,
    en: `You are Softiel's AI assistant. Help users and answer their questions.

🏢 ABOUT SOFTIEL:
Modern digital agency. We provide web, mobile and digital marketing solutions.

📞 CONTACT:
• Phone: +90 541 188 30 45
• Email: info@softiel.com
• Address: Başakşehir/İstanbul

🚀 SERVICES:
• Web Design & Development (React, Next.js)
• Mobile Apps (iOS & Android)
• SEO & Google Ads
• WordPress Solutions
• Logo & Corporate Identity
• Social Media Management
• AI Integrations & Automation
• Digital Consulting

✅ TASK RULES:
• Answer every question directly and clearly
• Keep answers SHORT (2-3 sentences)
• Be friendly and professional
• Suggest Softiel services when relevant
• Use simple language, no technical jargon
• Provide accurate contact information`,
    de: `Sie sind Softiels KI-Assistent. Helfen Sie Benutzern und beantworten Sie ihre Fragen.

🏢 ÜBER SOFTIEL:
Moderne Digitalagentur. Wir bieten Web-, Mobil- und Digitalmarketing-Lösungen.

📞 KONTAKT:
• Telefon: +90 541 188 30 45
• E-Mail: info@softiel.com
• Adresse: Başakşehir/İstanbul

🚀 DIENSTLEISTUNGEN:
• Webdesign & Entwicklung (React, Next.js)
• Mobile Apps (iOS & Android)
• SEO & Google Ads
• WordPress-Lösungen
• Logo & Corporate Identity
• Social Media Management
• KI-Integrationen & Automatisierung
• Digitale Beratung

✅ AUFGABENREGELN:
• Beantworten Sie jede Frage direkt und klar
• Halten Sie Antworten KURZ (2-3 Sätze)
• Seien Sie freundlich und professionell
• Empfehlen Sie Softiel-Dienste wenn relevant
• Verwenden Sie einfache Sprache, kein Fachjargon
• Geben Sie genaue Kontaktinformationen`,
    fr: `Vous êtes l'assistant IA de Softiel. Aidez les utilisateurs et répondez à leurs questions.

🏢 À PROPOS DE SOFTIEL:
Agence digitale moderne. Nous fournissons des solutions web, mobile et marketing digital.

📞 CONTACT:
• Téléphone: +90 541 188 30 45
• E-mail: info@softiel.com
• Adresse: Başakşehir/İstanbul

🚀 SERVICES:
• Design & Développement Web (React, Next.js)
• Applications Mobiles (iOS & Android)
• SEO & Google Ads
• Solutions WordPress
• Logo & Identité d'Entreprise
• Gestion Réseaux Sociaux
• Intégrations IA & Automatisation
• Conseil Digital

✅ RÈGLES DE TÂCHE:
• Répondez à chaque question directement et clairement
• Gardez les réponses COURTES (2-3 phrases)
• Soyez amical et professionnel
• Suggérez les services Softiel si pertinent
• Utilisez un langage simple, pas de jargon technique
• Fournissez des informations de contact précises`,
    ru: `Вы - ИИ-ассистент Softiel. Помогайте пользователям и отвечайте на их вопросы.

🏢 О SOFTIEL:
Современное цифровое агентство. Мы предоставляем веб, мобильные и маркетинговые решения.

📞 КОНТАКТЫ:
• Телефон: +90 541 188 30 45
• E-mail: info@softiel.com
• Адрес: Башакшехир/Стамбул

🚀 УСЛУГИ:
• Веб-дизайн и Разработка (React, Next.js)
• Мобильные приложения (iOS & Android)
• SEO & Google Ads
• Решения WordPress
• Лого & Корпоративная идентичность
• Управление социальными сетями
• ИИ-интеграции & Автоматизация
• Цифровой консалтинг

✅ ПРАВИЛА ЗАДАЧ:
• Отвечайте на каждый вопрос прямо и ясно
• Держите ответы КОРОТКИМИ (2-3 предложения)
• Будьте дружелюбны и профессиональны
• Предлагайте услуги Softiel когда уместно
• Используйте простой язык, без жаргона
• Предоставляйте точную контактную информацию`,
    ar: `أنت مساعد الذكاء الاصطناعي لـ Softiel. ساعد المستخدمين وأجب على أسئلتهم.

🏢 حول SOFTIEL:
وكالة رقمية حديثة. نقدم حلول الويب والموبايل والتسويق الرقمي.

📞 الاتصال:
• الهاتف: 0541 188 30 45+
• البريد: info@softiel.com
• العنوان: باشاك شهير/إسطنبول

🚀 الخدمات:
• تصميم وتطوير الويب (React, Next.js)
• تطبيقات الموبايل (iOS & Android)
• SEO & Google Ads
• حلول WordPress
• الشعار والهوية المؤسسية
• إدارة وسائل التواصل الاجتماعي
• تكاملات الذكاء الاصطناعي والأتمتة
• الاستشارات الرقمية

✅ قواعد المهمة:
• أجب على كل سؤال بشكل مباشر وواضح
• اجعل الإجابات قصيرة (2-3 جمل)
• كن ودوداً ومحترفاً
• اقترح خدمات Softiel عند الحاجة
• استخدم لغة بسيطة، بدون مصطلحات تقنية
• قدم معلومات اتصال دقيقة`
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
          text: getFallbackResponse(userMessage, locale).text,
          success: false,
          error: error.message
        };
      }
      
      if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('QUOTA_EXCEEDED')) {
        return {
          text: getFallbackResponse(userMessage, locale).text,
          success: false,
          error: 'API quota exceeded'
        };
      }
    }

    return {
      text: getFallbackResponse(userMessage, locale).text,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fallback yanıt türü
export interface FallbackResponse {
  text: string;
  actionType?: 'services' | 'pricing' | 'projects' | 'contact';
}

// Fallback yanıtlar (API çalışmadığında)
export function getFallbackResponse(userText: string, locale: string = 'tr'): FallbackResponse {
  const text = userText.toLowerCase();
  
  // Dil bazlı yanıtlar
  const responses = {
    tr: {
      greeting: { text: 'Merhaba! Size nasıl yardımcı olabilirim? 😊' },
      howAreYou: { text: 'İyiyim, teşekkürler! Sizin için hangi hizmete ihtiyacınız var? 🚀' },
      thanks: { text: 'Rica ederim! Başka bir konuda yardımcı olabilir miyim? 😊' },
      services: { text: 'Web tasarımı, mobil uygulama, SEO ve daha fazlası! Tüm hizmetlerimizi keşfedin. 🚀', actionType: 'services' as const },
      webDesign: { text: 'Modern ve kullanıcı dostu web siteleri tasarlıyoruz. Size özel çözümler sunabiliriz! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'React, Next.js gibi modern teknolojilerle profesyonel web uygulamaları geliştiriyoruz. 💻', actionType: 'services' as const },
      mobile: { text: 'iOS ve Android için native ve cross-platform uygulamalar geliştiriyoruz. 📱', actionType: 'services' as const },
      seo: { text: 'Web sitenizin Google\'da üst sıralarda yer alması için profesyonel SEO hizmetleri sunuyoruz. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads, Meta Ads ve sosyal medya yönetimi hizmetleri sunuyoruz. 📈', actionType: 'services' as const },
      ecommerce: { text: 'WooCommerce, Shopify ve özel e-ticaret çözümleri geliştiriyoruz. 🛒', actionType: 'services' as const },
      wordpress: { text: 'Özel tema tasarımı, plugin geliştirme ve WordPress optimizasyonu hizmetleri sunuyoruz. 🚀', actionType: 'services' as const },
      logo: { text: 'Markanızı güçlendirecek profesyonel logo ve kurumsal kimlik tasarımı yapıyoruz. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'İçerik üretimi, hesap yönetimi ve sosyal medya stratejileri geliştiriyoruz. 📱', actionType: 'services' as const },
      ai: { text: 'Chatbot, otomasyon ve AI destekli çözümler geliştiriyoruz. 🤖', actionType: 'services' as const },
      automation: { text: 'İş süreçlerinizi otomatikleştirecek akıllı çözümler geliştiriyoruz. ⚙️', actionType: 'services' as const },
      contact: { text: 'Detaylı sorularınız için şimdi bize ulaşın! 📞', actionType: 'contact' as const },
      pricing: { text: 'Her projeye özel fiyatlandırma yapıyoruz. Detaylı bilgi için fiyatlandırma sayfamızı inceleyin! 💰', actionType: 'pricing' as const },
      projects: { text: 'Gerçekleştirdiğimiz başarılı projeleri keşfedin! 🚀', actionType: 'projects' as const },
      general: { text: 'Size nasıl yardımcı olabilirim? Hangi konuda bilgi almak istersiniz? 😊' }
    },
    en: {
      greeting: { text: 'Hello! How can I help you? 😊' },
      howAreYou: { text: 'I\'m doing well, thank you! What service do you need? 🚀' },
      thanks: { text: 'You\'re welcome! Can I help you with anything else? 😊' },
      services: { text: 'Web design, mobile apps, SEO and more! Discover all our services. 🚀', actionType: 'services' as const },
      webDesign: { text: 'We design modern and user-friendly websites. We can provide custom solutions! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'We develop professional web applications with React, Next.js and more. 💻', actionType: 'services' as const },
      mobile: { text: 'We develop native and cross-platform apps for iOS and Android. 📱', actionType: 'services' as const },
      seo: { text: 'Professional SEO services to get your website to the top ranks on Google. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads, Meta Ads and social media management services. 📈', actionType: 'services' as const },
      ecommerce: { text: 'We develop WooCommerce, Shopify and custom e-commerce solutions. 🛒', actionType: 'services' as const },
      wordpress: { text: 'Custom theme design, plugin development and WordPress optimization. 🚀', actionType: 'services' as const },
      logo: { text: 'Professional logo and corporate identity design to strengthen your brand. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'Content production, account management and social media strategies. 📱', actionType: 'services' as const },
      ai: { text: 'We develop chatbots, automation and AI-powered solutions. 🤖', actionType: 'services' as const },
      automation: { text: 'Smart solutions to automate your business processes. ⚙️', actionType: 'services' as const },
      contact: { text: 'Contact us now for detailed questions! 📞', actionType: 'contact' as const },
      pricing: { text: 'Custom pricing for every project. Check our pricing page for details! 💰', actionType: 'pricing' as const },
      projects: { text: 'Discover our successful projects! 🚀', actionType: 'projects' as const },
      general: { text: 'How can I help you? What would you like to know? 😊' }
    },
    de: {
      greeting: { text: 'Hallo! Wie kann ich helfen? 😊' },
      howAreYou: { text: 'Mir geht es gut, danke! Welche Dienstleistung benötigen Sie? 🚀' },
      thanks: { text: 'Gern geschehen! Kann ich Ihnen bei etwas anderem helfen? 😊' },
      services: { text: 'Webdesign, Mobile Apps, SEO und mehr! Entdecken Sie alle unsere Dienstleistungen. 🚀', actionType: 'services' as const },
      webDesign: { text: 'Wir entwerfen moderne und benutzerfreundliche Websites. Maßgeschneiderte Lösungen! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'Professionelle Webanwendungen mit React, Next.js und mehr. 💻', actionType: 'services' as const },
      mobile: { text: 'Native und plattformübergreifende Apps für iOS und Android. 📱', actionType: 'services' as const },
      seo: { text: 'Professionelle SEO-Dienstleistungen für Top-Rankings bei Google. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads, Meta Ads und Social Media Management. 📈', actionType: 'services' as const },
      ecommerce: { text: 'WooCommerce, Shopify und maßgeschneiderte E-Commerce-Lösungen. 🛒', actionType: 'services' as const },
      wordpress: { text: 'Theme-Design, Plugin-Entwicklung und WordPress-Optimierung. 🚀', actionType: 'services' as const },
      logo: { text: 'Professionelles Logo- und Corporate Identity-Design für Ihre Marke. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'Content-Produktion, Account-Management und Social Media-Strategien. 📱', actionType: 'services' as const },
      ai: { text: 'Chatbots, Automatisierung und KI-gestützte Lösungen. 🤖', actionType: 'services' as const },
      automation: { text: 'Intelligente Lösungen zur Automatisierung Ihrer Geschäftsprozesse. ⚙️', actionType: 'services' as const },
      contact: { text: 'Kontaktieren Sie uns jetzt für detaillierte Fragen! 📞', actionType: 'contact' as const },
      pricing: { text: 'Individuelle Preise für jedes Projekt. Details auf unserer Preisseite! 💰', actionType: 'pricing' as const },
      projects: { text: 'Entdecken Sie unsere erfolgreichen Projekte! 🚀', actionType: 'projects' as const },
      general: { text: 'Wie kann ich Ihnen helfen? Was möchten Sie wissen? 😊' }
    },
    fr: {
      greeting: { text: 'Bonjour! Comment puis-je vous aider? 😊' },
      howAreYou: { text: 'Je vais bien, merci! De quel service avez-vous besoin? 🚀' },
      thanks: { text: 'De rien! Puis-je vous aider avec autre chose? 😊' },
      services: { text: 'Design web, applications mobiles, SEO et plus! Découvrez tous nos services. 🚀', actionType: 'services' as const },
      webDesign: { text: 'Nous concevons des sites web modernes et conviviaux. Solutions personnalisées! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'Applications web professionnelles avec React, Next.js et plus. 💻', actionType: 'services' as const },
      mobile: { text: 'Applications natives et multiplateformes pour iOS et Android. 📱', actionType: 'services' as const },
      seo: { text: 'Services SEO professionnels pour les premiers rangs de Google. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads, Meta Ads et gestion des réseaux sociaux. 📈', actionType: 'services' as const },
      ecommerce: { text: 'WooCommerce, Shopify et solutions e-commerce personnalisées. 🛒', actionType: 'services' as const },
      wordpress: { text: 'Conception de thèmes, développement de plugins et optimisation WordPress. 🚀', actionType: 'services' as const },
      logo: { text: 'Design de logo et identité d\'entreprise professionnels pour votre marque. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'Production de contenu, gestion de comptes et stratégies réseaux sociaux. 📱', actionType: 'services' as const },
      ai: { text: 'Chatbots, automatisation et solutions alimentées par l\'IA. 🤖', actionType: 'services' as const },
      automation: { text: 'Solutions intelligentes pour automatiser vos processus métier. ⚙️', actionType: 'services' as const },
      contact: { text: 'Contactez-nous maintenant pour des questions détaillées! 📞', actionType: 'contact' as const },
      pricing: { text: 'Tarifs personnalisés pour chaque projet. Détails sur notre page tarification! 💰', actionType: 'pricing' as const },
      projects: { text: 'Découvrez nos projets réussis! 🚀', actionType: 'projects' as const },
      general: { text: 'Comment puis-je vous aider? Que voulez-vous savoir? 😊' }
    },
    ru: {
      greeting: { text: 'Привет! Как я могу помочь? 😊' },
      howAreYou: { text: 'У меня все хорошо, спасибо! Какая услуга вам нужна? 🚀' },
      thanks: { text: 'Пожалуйста! Могу ли я помочь вам с чем-то еще? 😊' },
      services: { text: 'Веб-дизайн, мобильные приложения, SEO и многое другое! Откройте все наши услуги. 🚀', actionType: 'services' as const },
      webDesign: { text: 'Мы создаем современные и удобные веб-сайты. Индивидуальные решения! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'Профессиональные веб-приложения с React, Next.js и другими технологиями. 💻', actionType: 'services' as const },
      mobile: { text: 'Нативные и кроссплатформенные приложения для iOS и Android. 📱', actionType: 'services' as const },
      seo: { text: 'Профессиональные SEO-услуги для топ-рейтингов в Google. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads, Meta Ads и управление социальными сетями. 📈', actionType: 'services' as const },
      ecommerce: { text: 'WooCommerce, Shopify и индивидуальные решения электронной коммерции. 🛒', actionType: 'services' as const },
      wordpress: { text: 'Дизайн тем, разработка плагинов и оптимизация WordPress. 🚀', actionType: 'services' as const },
      logo: { text: 'Профессиональный дизайн логотипов и корпоративной идентичности для вашего бренда. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'Производство контента, управление аккаунтами и стратегии социальных сетей. 📱', actionType: 'services' as const },
      ai: { text: 'Чат-боты, автоматизация и решения на основе ИИ. 🤖', actionType: 'services' as const },
      automation: { text: 'Умные решения для автоматизации ваших бизнес-процессов. ⚙️', actionType: 'services' as const },
      contact: { text: 'Свяжитесь с нами сейчас для подробных вопросов! 📞', actionType: 'contact' as const },
      pricing: { text: 'Индивидуальные цены для каждого проекта. Детали на нашей странице цен! 💰', actionType: 'pricing' as const },
      projects: { text: 'Откройте наши успешные проекты! 🚀', actionType: 'projects' as const },
      general: { text: 'Как я могу вам помочь? Что вы хотели бы узнать? 😊' }
    },
    ar: {
      greeting: { text: 'مرحبا! كيف يمكنني مساعدتك؟ 😊' },
      howAreYou: { text: 'أنا بخير، شكرا! ما الخدمة التي تحتاجها؟ 🚀' },
      thanks: { text: 'العفو! هل يمكنني مساعدتك في شيء آخر؟ 😊' },
      services: { text: 'تصميم الويب، التطبيقات المحمولة، تحسين محركات البحث والمزيد! اكتشف جميع خدماتنا. 🚀', actionType: 'services' as const },
      webDesign: { text: 'نصمم مواقع ويب حديثة وسهلة الاستخدام. حلول مخصصة! 🎨', actionType: 'services' as const },
      webDevelopment: { text: 'تطبيقات ويب احترافية بتقنيات React، Next.js والمزيد. 💻', actionType: 'services' as const },
      mobile: { text: 'تطبيقات أصلية ومتعددة المنصات لنظامي iOS و Android. 📱', actionType: 'services' as const },
      seo: { text: 'خدمات SEO احترافية للمراكز الأولى على Google. 🔍', actionType: 'services' as const },
      marketing: { text: 'Google Ads، Meta Ads وإدارة وسائل التواصل الاجتماعي. 📈', actionType: 'services' as const },
      ecommerce: { text: 'WooCommerce، Shopify وحلول التجارة الإلكترونية المخصصة. 🛒', actionType: 'services' as const },
      wordpress: { text: 'تصميم قوالب، تطوير الإضافات وتحسين WordPress. 🚀', actionType: 'services' as const },
      logo: { text: 'تصميم شعار وهوية مؤسسية احترافية لعلامتك التجارية. 🎨', actionType: 'services' as const },
      socialMedia: { text: 'إنتاج المحتوى، إدارة الحسابات واستراتيجيات وسائل التواصل. 📱', actionType: 'services' as const },
      ai: { text: 'روبوتات الدردشة، الأتمتة والحلول المدعومة بالذكاء الاصطناعي. 🤖', actionType: 'services' as const },
      automation: { text: 'حلول ذكية لأتمتة عملياتك التجارية. ⚙️', actionType: 'services' as const },
      contact: { text: 'اتصل بنا الآن للأسئلة المفصلة! 📞', actionType: 'contact' as const },
      pricing: { text: 'أسعار مخصصة لكل مشروع. التفاصيل في صفحة الأسعار! 💰', actionType: 'pricing' as const },
      projects: { text: 'اكتشف مشاريعنا الناجحة! 🚀', actionType: 'projects' as const },
      general: { text: 'كيف يمكنني مساعدتك؟ ماذا تريد أن تعرف؟ 😊' }
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
