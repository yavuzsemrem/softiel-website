/**
 * Türkçe karakterleri İngilizce karşılıklarına dönüştürür
 * @param text - Dönüştürülecek metin
 * @returns Dönüştürülmüş metin
 */
export function turkishToEnglish(text: string): string {
  const turkishChars: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  }

  return text.replace(/[çÇğĞıIİöÖşŞüÜ]/g, (char) => turkishChars[char] || char)
}

/**
 * Metni SEO dostu slug'a dönüştürür
 * @param text - Dönüştürülecek metin
 * @returns SEO dostu slug
 */
export function createSlug(text: string): string {
  if (!text) return ''
  
  return turkishToEnglish(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Sadece harf, rakam, boşluk ve tire bırak
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tire yap
    .replace(/(^-|-$)/g, '') // Başta ve sonda tire varsa kaldır
    .trim()
}

/**
 * Slug'ın benzersiz olup olmadığını kontrol eder
 * @param slug - Kontrol edilecek slug
 * @param existingSlugs - Mevcut slug'lar listesi
 * @returns Benzersiz slug
 */
export function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) {
    return slug
  }
  
  let counter = 1
  let uniqueSlug = `${slug}-${counter}`
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++
    uniqueSlug = `${slug}-${counter}`
  }
  
  return uniqueSlug
}
