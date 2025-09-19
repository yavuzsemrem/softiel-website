import { translateBlogPost, getLanguageCode } from './translation-service';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  slug: string;
  language: string;
  originalPostId?: string;
  publishedAt: Date;
  author: string;
  tags: string[];
  featuredImage?: string;
}

export interface TranslatedBlogPost extends Omit<BlogPost, 'id' | 'slug' | 'originalPostId'> {
  id?: string;
  slug?: string;
  originalPostId: string;
}

// Blog yazısı oluşturma ve otomatik çeviri
export async function createBlogPostWithTranslation(
  postData: Omit<BlogPost, 'id' | 'language' | 'publishedAt' | 'originalPostId'>,
  languages: string[] = ['tr', 'en', 'de', 'fr', 'ru', 'ar']
): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Ana dilde (Türkçe) orijinal yazıyı oluştur
  const originalPost: BlogPost = {
    ...postData,
    id: generateId(),
    language: 'tr',
    publishedAt: new Date(),
    originalPostId: ''
  };
  
  posts.push(originalPost);
  
  // Diğer dillerde otomatik çeviri
  for (const lang of languages) {
    if (lang === 'tr') continue; // Türkçe zaten eklendi
    
    try {
      const translatedData = await translateBlogPost({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        category: postData.category
      }, getLanguageCode(lang));
      
      const translatedPost: BlogPost = {
        ...postData,
        ...translatedData,
        id: generateId(),
        language: lang,
        publishedAt: new Date(),
        originalPostId: originalPost.id,
        slug: generateSlug(translatedData.title)
      };
      
      posts.push(translatedPost);
    } catch (error) {
      console.error(`${lang} dilinde çeviri hatası:`, error);
      // Hata durumunda o dilde çeviri yapmadan devam et
    }
  }
  
  return posts;
}

// Mevcut blog yazısını güncelleme ve çevirileri yenileme
export async function updateBlogPostWithTranslation(
  originalPostId: string,
  updatedData: Partial<Omit<BlogPost, 'id' | 'language' | 'originalPostId'>>,
  languages: string[] = ['tr', 'en', 'de', 'fr', 'ru', 'ar']
): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Orijinal yazıyı güncelle
  const originalPost: BlogPost = {
    ...updatedData as BlogPost,
    id: originalPostId,
    language: 'tr',
    originalPostId: ''
  };
  
  posts.push(originalPost);
  
  // Çevirileri güncelle
  for (const lang of languages) {
    if (lang === 'tr') continue;
    
    try {
      const translatedData = await translateBlogPost({
        title: updatedData.title || '',
        content: updatedData.content || '',
        excerpt: updatedData.excerpt || '',
        category: updatedData.category || ''
      }, getLanguageCode(lang));
      
      const translatedPost: BlogPost = {
        ...updatedData as BlogPost,
        ...translatedData,
        id: generateId(),
        language: lang,
        originalPostId: originalPostId,
        slug: generateSlug(translatedData.title)
      };
      
      posts.push(translatedPost);
    } catch (error) {
      console.error(`${lang} dilinde güncelleme hatası:`, error);
    }
  }
  
  return posts;
}

// Belirli bir dildeki blog yazılarını getir
export async function getBlogPostsByLanguage(
  language: string,
  limit: number = 10,
  offset: number = 0
): Promise<BlogPost[]> {
  // Bu fonksiyon veritabanından veri çekecek
  // Şimdilik mock data döndürüyoruz
  return [];
}

// Blog yazısını belirli bir dile çevir
export async function translateSingleBlogPost(
  post: BlogPost,
  targetLanguage: string
): Promise<TranslatedBlogPost> {
  const translatedData = await translateBlogPost({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category
  }, getLanguageCode(targetLanguage));
  
  return {
    ...translatedData,
    language: targetLanguage,
    originalPostId: post.id,
    publishedAt: post.publishedAt,
    author: post.author,
    tags: post.tags,
    featuredImage: post.featuredImage
  };
}

// Yardımcı fonksiyonlar
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Çeviri kalitesini kontrol et
export function validateTranslationQuality(
  original: string,
  translated: string
): {
  isValid: boolean;
  confidence: number;
  issues: string[];
} {
  const issues: string[] = [];
  let confidence = 1.0;
  
  // Uzunluk kontrolü
  const lengthRatio = translated.length / original.length;
  if (lengthRatio < 0.3 || lengthRatio > 3) {
    issues.push('Çeviri uzunluğu orijinal metinden çok farklı');
    confidence -= 0.3;
  }
  
  // Boş çeviri kontrolü
  if (!translated.trim()) {
    issues.push('Çeviri boş');
    confidence = 0;
  }
  
  // Aynı metin kontrolü
  if (original.toLowerCase() === translated.toLowerCase()) {
    issues.push('Çeviri orijinal metinle aynı');
    confidence -= 0.5;
  }
  
  return {
    isValid: confidence > 0.5,
    confidence,
    issues
  };
}

