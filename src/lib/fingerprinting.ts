// Session Fingerprinting servisi
export interface UserFingerprint {
  userAgent: string;
  language: string;
  timezone: string;
  screenResolution: string;
  platform: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  colorDepth: number;
  pixelRatio: number;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  sessionId: string;
  timestamp: number;
}

// Fingerprint hash'i oluştur
export function generateFingerprintHash(fingerprint: UserFingerprint): string {
  const fingerprintString = JSON.stringify(fingerprint);
  
  // Basit hash fonksiyonu (production'da crypto.subtle kullanılabilir)
  let hash = 0;
  for (let i = 0; i < fingerprintString.length; i++) {
    const char = fingerprintString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer'a çevir
  }
  
  return Math.abs(hash).toString(36);
}

// Kullanıcı parmak izi oluştur
export function generateUserFingerprint(sessionId: string): UserFingerprint {
  // Browser API'lerinin mevcut olup olmadığını kontrol et
  const isClient = typeof window !== 'undefined';
  
  if (!isClient) {
    // Server-side rendering durumunda varsayılan değerler
    return {
      userAgent: 'server-side',
      language: 'tr',
      timezone: 'Europe/Istanbul',
      screenResolution: 'unknown',
      platform: 'unknown',
      cookieEnabled: false,
      doNotTrack: null,
      colorDepth: 24,
      pixelRatio: 1,
      hardwareConcurrency: 4,
      maxTouchPoints: 0,
      sessionId,
      timestamp: Date.now()
    };
  }

  try {
    return {
      userAgent: navigator.userAgent || 'unknown',
      language: navigator.language || 'tr',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Istanbul',
      screenResolution: `${screen?.width || 0}x${screen?.height || 0}`,
      platform: navigator.platform || 'unknown',
      cookieEnabled: navigator.cookieEnabled || false,
      doNotTrack: navigator.doNotTrack || null,
      colorDepth: screen?.colorDepth || 24,
      pixelRatio: window.devicePixelRatio || 1,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      sessionId,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Fingerprint generation error:', error);
    // Hata durumunda minimal fingerprint
    return {
      userAgent: 'error',
      language: 'tr',
      timezone: 'Europe/Istanbul',
      screenResolution: 'unknown',
      platform: 'unknown',
      cookieEnabled: false,
      doNotTrack: null,
      colorDepth: 24,
      pixelRatio: 1,
      hardwareConcurrency: 4,
      maxTouchPoints: 0,
      sessionId,
      timestamp: Date.now()
    };
  }
}

// Fingerprint'i analiz et ve risk skoru hesapla
export function analyzeFingerprint(fingerprint: UserFingerprint): {
  riskScore: number;
  isSuspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  let riskScore = 0;

  // Bot user agent kontrolü
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
    /python/i, /java/i, /php/i, /go-http/i, /okhttp/i
  ];
  
  if (botPatterns.some(pattern => pattern.test(fingerprint.userAgent))) {
    riskScore += 0.4;
    reasons.push('Bot user agent detected');
  }

  // Şüpheli ekran çözünürlüğü
  if (fingerprint.screenResolution === '0x0' || fingerprint.screenResolution === 'unknown') {
    riskScore += 0.3;
    reasons.push('Invalid screen resolution');
  }

  // Çok düşük donanım özellikleri
  if (fingerprint.hardwareConcurrency < 2) {
    riskScore += 0.2;
    reasons.push('Low hardware concurrency');
  }

  // Cookie devre dışı
  if (!fingerprint.cookieEnabled) {
    riskScore += 0.1;
    reasons.push('Cookies disabled');
  }

  // Do Not Track aktif
  if (fingerprint.doNotTrack === '1') {
    riskScore += 0.1;
    reasons.push('Do Not Track enabled');
  }

  // Çok yüksek pixel ratio (şüpheli)
  if (fingerprint.pixelRatio > 3) {
    riskScore += 0.2;
    reasons.push('Unusual pixel ratio');
  }

  // Çok düşük color depth
  if (fingerprint.colorDepth < 16) {
    riskScore += 0.2;
    reasons.push('Low color depth');
  }

  // Çok fazla touch point (mobil bot)
  if (fingerprint.maxTouchPoints > 10) {
    riskScore += 0.2;
    reasons.push('Unusual touch points');
  }

  // Varsayılan değerler (server-side rendering)
  if (fingerprint.userAgent === 'server-side' || fingerprint.userAgent === 'error') {
    riskScore += 0.3;
    reasons.push('Server-side rendering or error');
  }

  const isSuspicious = riskScore > 0.5;

  return {
    riskScore: Math.min(riskScore, 1.0), // 0-1 arası sınırla
    isSuspicious,
    reasons
  };
}

// Fingerprint'i localStorage'da sakla
export function storeFingerprint(fingerprint: UserFingerprint): void {
  if (typeof window === 'undefined') return;

  try {
    const fingerprintData = {
      ...fingerprint,
      hash: generateFingerprintHash(fingerprint)
    };
    
    localStorage.setItem('chatbot_fingerprint', JSON.stringify(fingerprintData));
  } catch (error) {
    console.error('Fingerprint storage error:', error);
  }
}

// Fingerprint'i localStorage'dan al
export function getStoredFingerprint(): UserFingerprint | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('chatbot_fingerprint');
    if (!stored) return null;

    const fingerprintData = JSON.parse(stored);
    return fingerprintData;
  } catch (error) {
    console.error('Fingerprint retrieval error:', error);
    return null;
  }
}

// Fingerprint'i temizle
export function clearFingerprint(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('chatbot_fingerprint');
  } catch (error) {
    console.error('Fingerprint clear error:', error);
  }
}

// İki fingerprint'i karşılaştır
export function compareFingerprints(fp1: UserFingerprint, fp2: UserFingerprint): {
  similarity: number;
  isSame: boolean;
  differences: string[];
} {
  const differences: string[] = [];
  let matchingFields = 0;
  const totalFields = 8; // Ana alan sayısı

  if (fp1.userAgent !== fp2.userAgent) differences.push('userAgent');
  else matchingFields++;

  if (fp1.language !== fp2.language) differences.push('language');
  else matchingFields++;

  if (fp1.timezone !== fp2.timezone) differences.push('timezone');
  else matchingFields++;

  if (fp1.screenResolution !== fp2.screenResolution) differences.push('screenResolution');
  else matchingFields++;

  if (fp1.platform !== fp2.platform) differences.push('platform');
  else matchingFields++;

  if (fp1.cookieEnabled !== fp2.cookieEnabled) differences.push('cookieEnabled');
  else matchingFields++;

  if (fp1.colorDepth !== fp2.colorDepth) differences.push('colorDepth');
  else matchingFields++;

  if (fp1.hardwareConcurrency !== fp2.hardwareConcurrency) differences.push('hardwareConcurrency');
  else matchingFields++;

  const similarity = matchingFields / totalFields;
  const isSame = similarity > 0.8; // %80 benzerlik

  return {
    similarity,
    isSame,
    differences
  };
}


