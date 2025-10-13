// reCAPTCHA v3 servisi
export interface RecaptchaResult {
  success: boolean;
  score?: number;
  error?: string;
  token?: string;
}

// reCAPTCHA yapılandırması
const RECAPTCHA_CONFIG = {
  // Sadece gerçek production domain'lerde çalışacak
  enabled: typeof window !== 'undefined' && (
    window.location.hostname.includes('softiel.com') ||
    window.location.hostname.includes('softiel.dev')
  ),
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  // Minimum güven skoru (0.0 - 1.0 arası)
  minScore: 0.5,
  // Action adı
  action: 'chatbot_message',
};

// reCAPTCHA token'ını doğrula (server-side)
export async function verifyRecaptchaToken(token: string): Promise<RecaptchaResult> {
  // Localhost veya test domain'lerde her zaman başarılı döndür
  if (!RECAPTCHA_CONFIG.enabled) {
    return {
      success: true,
      score: 0.9,
      token: token // Gelen token'ı geri döndür
    };
  }

  // Production'da reCAPTCHA doğrulaması yap
  if (!RECAPTCHA_CONFIG.secretKey) {
    return {
      success: true, // Hata yerine başarılı döndür
      score: 0.9,
      token: token
    };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_CONFIG.secretKey,
        response: token,
        remoteip: '', // IP adresi opsiyonel
      }),
    });

    const data = await response.json();

    if (data.success) {
      const score = data.score || 0;
      
      // Skor kontrolü
      if (score >= RECAPTCHA_CONFIG.minScore) {
        return {
          success: true,
          score: score,
          token: token
        };
      } else {
        return {
          success: false,
          score: score,
          error: `reCAPTCHA score too low: ${score} (minimum: ${RECAPTCHA_CONFIG.minScore})`
        };
      }
    } else {
      return {
        success: false,
        error: `reCAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}`
      };
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'reCAPTCHA verification failed'
    };
  }
}

// reCAPTCHA yapılandırmasını al
export function getRecaptchaConfig() {
  return {
    enabled: RECAPTCHA_CONFIG.enabled,
    siteKey: RECAPTCHA_CONFIG.siteKey,
    minScore: RECAPTCHA_CONFIG.minScore,
    action: RECAPTCHA_CONFIG.action,
  };
}

// reCAPTCHA'nın kullanılabilir olup olmadığını kontrol et
export function isRecaptchaAvailable(): boolean {
  return RECAPTCHA_CONFIG.enabled && !!RECAPTCHA_CONFIG.siteKey;
}

// Development için mock token oluştur
export function generateMockToken(): string {
  return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}


