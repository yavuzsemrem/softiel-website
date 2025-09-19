// Kullanıcı adı işleme utility fonksiyonları

/**
 * Kullanıcı adını temizler ve kısaltır
 * @param name - Ham kullanıcı adı
 * @returns Temizlenmiş kullanıcı adı
 */
export function processUserName(name: string): string {
  if (!name) return 'Admin';
  
  // Özel durumlar - bilinen kullanıcı adları için özel işlem
  const specialCases: Record<string, string> = {
    'selimemrem': 'selim',
    'selimemrem06': 'selim',
    'selimemrem06@gmail.com': 'selim',
    'selimemrem@gmail.com': 'selim'
  };
  
  // Özel durum kontrolü
  const lowerName = name.toLowerCase().trim();
  if (specialCases[lowerName]) {
    return specialCases[lowerName];
  }
  
  // Email adresinden kullanıcı adı çıkar
  if (name.includes('@')) {
    const emailPart = name.split('@')[0];
    return processUserName(emailPart);
  }
  
  // Uzun kullanıcı adlarını kısalt
  if (name.length > 10) {
    // İlk kelimeyi al
    const firstWord = name.split(/[\s\-_\.]/)[0];
    if (firstWord.length <= 10) {
      return firstWord;
    }
    
    // İlk 8 karakteri al
    return name.substring(0, 8);
  }
  
  return name;
}

/**
 * Kullanıcı adını display için formatlar
 * @param name - Ham kullanıcı adı
 * @returns Formatlanmış kullanıcı adı
 */
export function formatDisplayName(name: string): string {
  const processed = processUserName(name);
  
  // İlk harfi büyük yap
  return processed.charAt(0).toUpperCase() + processed.slice(1).toLowerCase();
}

/**
 * Kullanıcı adının kısaltılmış versiyonunu döndürür
 * @param name - Ham kullanıcı adı
 * @param maxLength - Maksimum uzunluk (varsayılan: 6)
 * @returns Kısaltılmış kullanıcı adı
 */
export function getShortUserName(name: string, maxLength: number = 6): string {
  const processed = processUserName(name);
  
  if (processed.length <= maxLength) {
    return processed;
  }
  
  return processed.substring(0, maxLength);
}


