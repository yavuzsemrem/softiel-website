// Google Translate API entegrasyonu için servis
export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

// Google Translate API kullanarak çeviri yapma
export async function translateText(
  text: string, 
  targetLanguage: string, 
  sourceLanguage: string = 'tr'
): Promise<string> {
  try {
    // Google Translate API key'inizi buraya ekleyin
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      console.warn('Google Translate API key bulunamadı, orijinal metin döndürülüyor');
      return text;
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage,
          format: 'text'
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Çeviri hatası:', error);
    return text; // Hata durumunda orijinal metni döndür
  }
}

// Blog yazısı için çeviri
export async function translateBlogPost(
  post: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
  },
  targetLanguage: string
): Promise<{
  title: string;
  content: string;
  excerpt: string;
  category: string;
}> {
  try {
    const [translatedTitle, translatedContent, translatedExcerpt, translatedCategory] = await Promise.all([
      translateText(post.title, targetLanguage),
      translateText(post.content, targetLanguage),
      translateText(post.excerpt, targetLanguage),
      translateText(post.category, targetLanguage)
    ]);

    return {
      title: translatedTitle,
      content: translatedContent,
      excerpt: translatedExcerpt,
      category: translatedCategory
    };
  } catch (error) {
    console.error('Blog yazısı çeviri hatası:', error);
    return post; // Hata durumunda orijinal içeriği döndür
  }
}

// Dil kodlarını desteklenen dillere çevir
export function getLanguageCode(locale: string): string {
  const languageMap: Record<string, string> = {
    'tr': 'tr',
    'en': 'en',
    'de': 'de',
    'fr': 'fr',
    'ru': 'ru',
    'ar': 'ar'
  };
  
  return languageMap[locale] || 'tr';
}

// Çeviri cache'i için basit bir sistem
const translationCache = new Map<string, string>();

export async function getCachedTranslation(
  text: string, 
  targetLanguage: string, 
  sourceLanguage: string = 'tr'
): Promise<string> {
  const cacheKey = `${text}-${sourceLanguage}-${targetLanguage}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }
  
  const translatedText = await translateText(text, targetLanguage, sourceLanguage);
  translationCache.set(cacheKey, translatedText);
  
  return translatedText;
}

