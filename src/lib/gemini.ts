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
    maxOutputTokens: 2048, // Gemini 2.0 daha yüksek token limiti
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

GÖREV STRATEJİN:
- Kullanıcının her sorusuna yanıt ver, ama cevapları Softiel'in hizmetleri ile bağlantılandır
- Genel soruları Softiel'in uzmanlık alanlarına yönlendir
- Samimi ve yardımcı bir ton kullan
- Softiel'in hizmetlerini doğal bir şekilde tanıt

YANIT VERME KURALLARI:
- Her soruya yanıt ver, ama Softiel ile bağlantı kur
- Kod yazdırma, teknik detay verme
- Sadece Softiel'in hizmetlerini öner
- Genel konuları Softiel'in uzmanlığına yönlendir

ÖRNEK YAKLAŞIMLAR:`,
    en: `You are Softiel's AI assistant. Softiel is a company that provides web design, web development, mobile app development, SEO, digital marketing and many other technology services.

TASK STRATEGY:
- Answer every user question, but connect answers to Softiel's services
- Direct general questions to Softiel's areas of expertise
- Use a friendly and helpful tone
- Naturally introduce Softiel's services

RESPONSE RULES:
- Answer every question, but connect with Softiel
- Don't write code or give technical details
- Only recommend Softiel's services
- Direct general topics to Softiel's expertise

EXAMPLE APPROACHES:`,
    de: `Sie sind Softiels KI-Assistent. Softiel ist ein Unternehmen, das Webdesign, Webentwicklung, Mobile App-Entwicklung, SEO, Digitales Marketing und viele andere Technologiedienstleistungen anbietet.

AUFGABENSTRATEGIE:
- Beantworten Sie jede Benutzerfrage, aber verbinden Sie Antworten mit Softiels Dienstleistungen
- Leiten Sie allgemeine Fragen zu Softiels Fachgebieten weiter
- Verwenden Sie einen freundlichen und hilfsbereiten Ton
- Stellen Sie Softiels Dienstleistungen natürlich vor

ANTWORTREGELN:
- Beantworten Sie jede Frage, aber verbinden Sie mit Softiel
- Schreiben Sie keinen Code oder geben Sie technische Details an
- Empfehlen Sie nur Softiels Dienstleistungen
- Leiten Sie allgemeine Themen zu Softiels Expertise weiter

BEISPIEL-ANSÄTZE:`,
    fr: `Vous êtes l'assistant IA de Softiel. Softiel est une entreprise qui fournit du design web, du développement web, du développement d'applications mobiles, du SEO, du marketing numérique et de nombreux autres services technologiques.

STRATÉGIE DE TÂCHE:
- Répondez à chaque question utilisateur, mais connectez les réponses aux services de Softiel
- Dirigez les questions générales vers les domaines d'expertise de Softiel
- Utilisez un ton amical et serviable
- Présentez naturellement les services de Softiel

RÈGLES DE RÉPONSE:
- Répondez à chaque question, mais connectez-vous avec Softiel
- N'écrivez pas de code ou ne donnez pas de détails techniques
- Recommandez uniquement les services de Softiel
- Dirigez les sujets généraux vers l'expertise de Softiel

APPROCHES D'EXEMPLE:`,
    ru: `Вы - ИИ-ассистент Softiel. Softiel - это компания, которая предоставляет веб-дизайн, веб-разработку, разработку мобильных приложений, SEO, цифровой маркетинг и многие другие технологические услуги.

СТРАТЕГИЯ ЗАДАЧ:
- Отвечайте на каждый вопрос пользователя, но связывайте ответы с услугами Softiel
- Направляйте общие вопросы к областям экспертизы Softiel
- Используйте дружелюбный и полезный тон
- Естественно представляйте услуги Softiel

ПРАВИЛА ОТВЕТОВ:
- Отвечайте на каждый вопрос, но связывайтесь с Softiel
- Не пишите код и не давайте технические детали
- Рекомендуйте только услуги Softiel
- Направляйте общие темы к экспертизе Softiel

ПРИМЕРЫ ПОДХОДОВ:`,
    ar: `أنت مساعد الذكاء الاصطناعي لـ Softiel. Softiel هي شركة تقدم تصميم الويب، تطوير الويب، تطوير التطبيقات المحمولة، تحسين محركات البحث، التسويق الرقمي والعديد من الخدمات التقنية الأخرى.

استراتيجية المهمة:
- أجب على كل سؤال للمستخدم، لكن اربط الإجابات بخدمات Softiel
- وجه الأسئلة العامة إلى مجالات خبرة Softiel
- استخدم نبرة ودودة ومفيدة
- قدم خدمات Softiel بشكل طبيعي

قواعد الإجابة:
- أجب على كل سؤال، لكن اربط مع Softiel
- لا تكتب كود أو تعطي تفاصيل تقنية
- أوصِ بخدمات Softiel فقط
- وجه المواضيع العامة إلى خبرة Softiel

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
          text: getFallbackResponse(userMessage),
          success: false,
          error: error.message
        };
      }
      
      if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('QUOTA_EXCEEDED')) {
        return {
          text: getFallbackResponse(userMessage),
          success: false,
          error: 'API quota exceeded'
        };
      }
    }

    return {
      text: getFallbackResponse(userMessage),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fallback yanıtlar (API çalışmadığında)
export function getFallbackResponse(userText: string): string {
  const text = userText.toLowerCase();
  
  // Genel selamlaşma ve sohbet
  if (text.includes('merhaba') || text.includes('selam') || text.includes('hello') || text.includes('hi')) {
    return 'Merhaba! Softiel olarak web tasarımı, web geliştirme, mobil uygulama ve dijital pazarlama hizmetleri sunuyoruz. Size nasıl yardımcı olabilirim? 😊';
  }
  
  if (text.includes('nasılsın') || text.includes('nasıl gidiyor') || text.includes('how are you')) {
    return 'İyiyim, teşekkürler! Softiel olarak yeni projeler üzerinde çalışıyoruz. Sizin için hangi hizmete ihtiyacınız var? 🚀';
  }
  
  if (text.includes('teşekkür') || text.includes('thanks') || text.includes('sağol')) {
    return 'Rica ederim! Softiel olarak her zaman yanınızdayız. Başka bir konuda yardımcı olabilir miyim? 😊';
  }
  
  // Hava durumu ve genel konular
  if (text.includes('hava') || text.includes('weather') || text.includes('güneş') || text.includes('yağmur')) {
    return 'Hava durumu hakkında bilgim yok, ama web sitenize hava durumu widget\'ı entegre edebiliriz! 🌤️ Softiel olarak bu tür özellikler ekleyebiliriz.';
  }
  
  // Spor ve eğlence
  if (text.includes('spor') || text.includes('futbol') || text.includes('basketbol') || text.includes('sport')) {
    return 'Spor konularında uzman değilim, ama spor kulüpleri için web siteleri tasarlıyoruz! ⚽ Softiel olarak spor organizasyonlarına özel çözümler sunuyoruz.';
  }
  
  // Film, müzik, eğlence
  if (text.includes('film') || text.includes('dizi') || text.includes('müzik') || text.includes('movie') || text.includes('music')) {
    return 'Eğlence konularında bilgim yok, ama eğlence sektörü için web siteleri ve mobil uygulamalar geliştiriyoruz! 🎬 Softiel olarak bu alanda deneyimliyiz.';
  }
  
  // Kod yazma istekleri
  if (text.includes('kod') || text.includes('code') || text.includes('yaz') || text.includes('programlama')) {
    return 'Kod yazmıyorum, ama Softiel olarak profesyonel web geliştirme hizmeti sunuyoruz! 💻 Size özel çözümler geliştirebiliriz.';
  }
  
  // Kişisel sorular
  if (text.includes('kimsin') || text.includes('who are you') || text.includes('ne iş yapıyorsun')) {
    return 'Ben Softiel\'in AI asistanıyım! Softiel, web tasarımı, web geliştirme, mobil uygulama, SEO ve dijital pazarlama hizmetleri sunan bir teknoloji şirketidir. 🚀';
  }
  
  // Hizmetler hakkında
  if (text.includes('hizmet') || text.includes('service') || text.includes('ne yapıyorsunuz')) {
    return 'Softiel olarak web tasarımı, web geliştirme, mobil uygulama geliştirme, SEO, dijital pazarlama ve daha birçok hizmet sunuyoruz. Detaylı bilgi için hizmetlerimiz sayfasını ziyaret edebilirsiniz! 🚀';
  }
  
  // Fiyat soruları
  if (text.includes('fiyat') || text.includes('ücret') || text.includes('price') || text.includes('maliyet')) {
    return 'Fiyatlandırma konusunda detaylı bilgi için fiyatlandırma sayfamızı ziyaret edebilirsiniz! 💰 Softiel olarak size özel teklifler hazırlayabiliriz.';
  }
  
  // İletişim
  if (text.includes('iletişim') || text.includes('contact') || text.includes('telefon') || text.includes('adres')) {
    return 'İletişim bilgilerimiz için iletişim sayfamızı ziyaret edebilirsiniz! 📞 Softiel olarak size en kısa sürede dönüş yapacağız.';
  }
  
  // Proje soruları
  if (text.includes('proje') || text.includes('project') || text.includes('çalışma') || text.includes('portfolio')) {
    return 'Softiel olarak birçok başarılı proje gerçekleştirdik! Portfolio sayfamızı inceleyebilir, size özel proje önerileri alabilirsiniz. 🎯';
  }
  
  // Teknoloji soruları
  if (text.includes('teknoloji') || text.includes('technology') || text.includes('yapay zeka') || text.includes('ai')) {
    return 'Teknoloji konularında Softiel olarak uzmanız! Web teknolojileri, mobil uygulama geliştirme ve dijital çözümler konularında size yardımcı olabiliriz. 🤖';
  }
  
  // Eğitim ve öğrenme
  if (text.includes('öğren') || text.includes('eğitim') || text.includes('kurs') || text.includes('learn') || text.includes('education')) {
    return 'Eğitim konularında bilgim yok, ama Softiel olarak teknoloji eğitimleri ve danışmanlık hizmetleri sunuyoruz! 📚 Size özel eğitim programları hazırlayabiliriz.';
  }
  
  // Sağlık ve kişisel konular
  if (text.includes('sağlık') || text.includes('hastalık') || text.includes('doktor') || text.includes('health')) {
    return 'Sağlık konularında uzman değilim, ama sağlık sektörü için web siteleri ve mobil uygulamalar geliştiriyoruz! 🏥 Softiel olarak sağlık kurumlarına özel çözümler sunuyoruz.';
  }
  
  // Genel yanıt - Softiel ile bağlantı kur
  return 'Bu konuda detaylı bilgim yok, ama Softiel olarak size yardımcı olabiliriz! Web tasarımı, web geliştirme, mobil uygulama veya dijital pazarlama konularında sorularınızı yanıtlayabilirim. 😊';
}
