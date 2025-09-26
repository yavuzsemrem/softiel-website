// Mesaj İçerik Analizi Servisi
export interface ContentAnalysisResult {
  isSpam: boolean;
  isHarmful: boolean;
  isSuspicious: boolean;
  riskScore: number;
  reasons: string[];
  detectedPatterns: string[];
  suggestions: string[];
}

// Spam pattern'leri
export const SPAM_PATTERNS = [
  // Tekrarlayan karakterler (aaaaaaa, 1111111, !!!!!!!)
  { pattern: /(.)\1{10,}/, name: 'Tekrarlayan karakterler', severity: 0.8 },
  
  // Büyük harf spam (HELLO WORLD, SHOUTING)
  { pattern: /[A-Z]{20,}/, name: 'Büyük harf spam', severity: 0.6 },
  
  // Link spam (çok fazla URL)
  { pattern: /https?:\/\/[^\s]+/g, name: 'Link spam', severity: 0.7 },
  
  // Sayı spam (1234567890, 1111111111)
  { pattern: /[0-9]{10,}/, name: 'Sayı spam', severity: 0.5 },
  
  // Özel karakter spam (!@#$%^&*)
  { pattern: /[!@#$%^&*()_+={}[\]|\\:";'<>?,./]{15,}/, name: 'Özel karakter spam', severity: 0.7 },
  
  // Boşluk spam (çok fazla boşluk)
  { pattern: /\s{20,}/, name: 'Boşluk spam', severity: 0.4 },
  
  // Emoji spam (çok fazla emoji)
  { pattern: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, name: 'Emoji spam', severity: 0.3 },
  
  // Tekrarlayan kelimeler (merhaba merhaba merhaba)
  { pattern: /\b(\w+)\s+\1\s+\1\b/, name: 'Tekrarlayan kelimeler', severity: 0.6 },
  
  // Çok kısa mesajlar (a, b, c)
  { pattern: /^.{1,2}$/, name: 'Çok kısa mesaj', severity: 0.2 },
  
  // Çok uzun mesajlar (1000+ karakter)
  { pattern: /^.{1000,}$/, name: 'Çok uzun mesaj', severity: 0.3 }
];

// Zararlı içerik pattern'leri
export const HARMFUL_PATTERNS = [
  // Küfür ve hakaret
  { pattern: /\b(küfür|hakaret|sövme|kaba)\b/i, name: 'Küfür içeriği', severity: 0.9 },
  
  // Spam kelimeler
  { pattern: /\b(spam|reklam|promosyon|indirim|fırsat|kazan|ödül|bedava|ücretsiz)\b/i, name: 'Spam kelimeler', severity: 0.6 },
  
  // Kişisel bilgi isteği
  { pattern: /\b(telefon|numara|adres|kimlik|tc|kredi|kart|şifre|parola)\b/i, name: 'Kişisel bilgi isteği', severity: 0.8 },
  
  // Acil durum simülasyonu
  { pattern: /\b(acil|hızlı|hemen|şimdi|derhal|kritik|tehlike)\b/i, name: 'Acil durum simülasyonu', severity: 0.5 },
  
  // Finansal dolandırıcılık
  { pattern: /\b(para|ödeme|transfer|havale|banka|hesap|kredi|borç)\b/i, name: 'Finansal dolandırıcılık', severity: 0.7 },
  
  // Sosyal mühendislik
  { pattern: /\b(güven|güvenlik|doğrula|onayla|tıkla|tıklayın|link|bağlantı)\b/i, name: 'Sosyal mühendislik', severity: 0.6 }
];

// Şüpheli pattern'ler
export const SUSPICIOUS_PATTERNS = [
  // Çok fazla soru işareti
  { pattern: /\?{5,}/, name: 'Çok fazla soru işareti', severity: 0.3 },
  
  // Çok fazla ünlem
  { pattern: /!{5,}/, name: 'Çok fazla ünlem', severity: 0.3 },
  
  // Karışık dil kullanımı
  { pattern: /[a-zA-Z]{3,}.*[çğıöşüÇĞIİÖŞÜ]{3,}|[çğıöşüÇĞIİÖŞÜ]{3,}.*[a-zA-Z]{3,}/, name: 'Karışık dil kullanımı', severity: 0.4 },
  
  // Çok fazla nokta
  { pattern: /\.{5,}/, name: 'Çok fazla nokta', severity: 0.2 },
  
  // Tekrarlayan harfler (merhabaaaa)
  { pattern: /([a-zA-ZçğıöşüÇĞIİÖŞÜ])\1{4,}/, name: 'Tekrarlayan harfler', severity: 0.4 },
  
  // Çok fazla virgül
  { pattern: /,{5,}/, name: 'Çok fazla virgül', severity: 0.2 }
];

// Mesaj içeriğini analiz et
export function analyzeContent(text: string): ContentAnalysisResult {
  const reasons: string[] = [];
  const detectedPatterns: string[] = [];
  const suggestions: string[] = [];
  let totalRiskScore = 0;
  let patternCount = 0;

  // Spam pattern kontrolü
  for (const spamPattern of SPAM_PATTERNS) {
    const matches = text.match(spamPattern.pattern);
    if (matches) {
      detectedPatterns.push(spamPattern.name);
      reasons.push(`${spamPattern.name} tespit edildi`);
      totalRiskScore += spamPattern.severity;
      patternCount++;
      
      if (spamPattern.name === 'Tekrarlayan karakterler') {
        suggestions.push('Lütfen tekrarlayan karakterleri azaltın');
      } else if (spamPattern.name === 'Büyük harf spam') {
        suggestions.push('Büyük harfleri sadece gerekli yerlerde kullanın');
      } else if (spamPattern.name === 'Link spam') {
        suggestions.push('Çok fazla link paylaşmayın');
      }
    }
  }

  // Zararlı içerik kontrolü
  for (const harmfulPattern of HARMFUL_PATTERNS) {
    const matches = text.match(harmfulPattern.pattern);
    if (matches) {
      detectedPatterns.push(harmfulPattern.name);
      reasons.push(`${harmfulPattern.name} tespit edildi`);
      totalRiskScore += harmfulPattern.severity;
      patternCount++;
      
      if (harmfulPattern.name === 'Küfür içeriği') {
        suggestions.push('Lütfen saygılı bir dil kullanın');
      } else if (harmfulPattern.name === 'Spam kelimeler') {
        suggestions.push('Spam içerik paylaşmayın');
      } else if (harmfulPattern.name === 'Kişisel bilgi isteği') {
        suggestions.push('Kişisel bilgilerinizi paylaşmayın');
      }
    }
  }

  // Şüpheli pattern kontrolü
  for (const suspiciousPattern of SUSPICIOUS_PATTERNS) {
    const matches = text.match(suspiciousPattern.pattern);
    if (matches) {
      detectedPatterns.push(suspiciousPattern.name);
      reasons.push(`${suspiciousPattern.name} tespit edildi`);
      totalRiskScore += suspiciousPattern.severity;
      patternCount++;
    }
  }

  // Mesaj uzunluğu analizi
  const textLength = text.length;
  if (textLength < 3) {
    reasons.push('Çok kısa mesaj');
    totalRiskScore += 0.3;
    suggestions.push('Daha açıklayıcı bir mesaj yazın');
  } else if (textLength > 500) {
    reasons.push('Çok uzun mesaj');
    totalRiskScore += 0.2;
    suggestions.push('Mesajınızı kısaltın');
  }

  // Boşluk oranı analizi
  const spaceRatio = (text.match(/\s/g) || []).length / textLength;
  if (spaceRatio > 0.5) {
    reasons.push('Çok fazla boşluk');
    totalRiskScore += 0.3;
    suggestions.push('Boşlukları azaltın');
  }

  // Karakter çeşitliliği analizi
  const uniqueChars = new Set(text.toLowerCase()).size;
  const diversityRatio = uniqueChars / textLength;
  if (diversityRatio < 0.1 && textLength > 20) {
    reasons.push('Düşük karakter çeşitliliği');
    totalRiskScore += 0.4;
    suggestions.push('Daha çeşitli karakterler kullanın');
  }

  // Risk skorunu hesapla
  const averageRiskScore = patternCount > 0 ? totalRiskScore / patternCount : 0;
  const finalRiskScore = Math.min(averageRiskScore, 1.0);

  // Sonuçları belirle
  const isSpam = finalRiskScore > 0.6;
  const isHarmful = reasons.some(reason => 
    reason.includes('Küfür') || 
    reason.includes('Zararlı') || 
    reason.includes('Dolandırıcılık')
  );
  const isSuspicious = finalRiskScore > 0.4 && !isSpam && !isHarmful;

  return {
    isSpam,
    isHarmful,
    isSuspicious,
    riskScore: finalRiskScore,
    reasons,
    detectedPatterns,
    suggestions
  };
}

// Mesajı temizle (spam karakterleri kaldır)
export function cleanMessage(text: string): string {
  let cleanedText = text;
  
  // Tekrarlayan karakterleri azalt
  cleanedText = cleanedText.replace(/(.)\1{3,}/g, '$1$1$1');
  
  // Çok fazla boşluğu azalt
  cleanedText = cleanedText.replace(/\s{3,}/g, ' ');
  
  // Çok fazla nokta, virgül, soru işareti, ünlem işaretlerini azalt
  cleanedText = cleanedText.replace(/\.{3,}/g, '...');
  cleanedText = cleanedText.replace(/,{3,}/g, ',');
  cleanedText = cleanedText.replace(/\?{3,}/g, '???');
  cleanedText = cleanedText.replace(/!{3,}/g, '!!!');
  
  // Başındaki ve sonundaki boşlukları temizle
  cleanedText = cleanedText.trim();
  
  return cleanedText;
}

// Mesajın güvenli olup olmadığını kontrol et
export function isMessageSafe(text: string): boolean {
  const analysis = analyzeContent(text);
  return !analysis.isSpam && !analysis.isHarmful && analysis.riskScore < 0.7;
}

// Mesaj için öneriler oluştur
export function generateMessageSuggestions(text: string): string[] {
  const analysis = analyzeContent(text);
  const suggestions: string[] = [];
  
  if (analysis.isSpam) {
    suggestions.push('Spam içerik tespit edildi. Lütfen daha anlamlı bir mesaj yazın.');
  }
  
  if (analysis.isHarmful) {
    suggestions.push('Zararlı içerik tespit edildi. Lütfen saygılı bir dil kullanın.');
  }
  
  if (analysis.riskScore > 0.5) {
    suggestions.push('Mesajınız şüpheli görünüyor. Lütfen daha açık ve net yazın.');
  }
  
  // Özel öneriler
  if (text.length < 5) {
    suggestions.push('Daha detaylı bir mesaj yazabilirsiniz.');
  }
  
  if (text.length > 200) {
    suggestions.push('Mesajınızı kısaltabilirsiniz.');
  }
  
  if (!text.includes(' ')) {
    suggestions.push('Kelime aralarında boşluk bırakın.');
  }
  
  return suggestions;
}

// Mesaj istatistikleri
export function getMessageStats(text: string): {
  length: number;
  wordCount: number;
  characterCount: number;
  spaceCount: number;
  uniqueCharCount: number;
  diversityRatio: number;
} {
  const length = text.length;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const characterCount = text.replace(/\s/g, '').length;
  const spaceCount = (text.match(/\s/g) || []).length;
  const uniqueChars = new Set(text.toLowerCase()).size;
  const diversityRatio = uniqueChars / length;
  
  return {
    length,
    wordCount,
    characterCount,
    spaceCount,
    uniqueCharCount: uniqueChars,
    diversityRatio
  };
}


