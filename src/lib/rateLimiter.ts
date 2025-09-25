// Rate limiting için kullanıcı oturum takibi
interface UserSession {
  messageCount: number;
  lastMessageTime: number;
  isBlocked: boolean;
  blockUntil?: number;
}

// Memory'de kullanıcı oturumlarını sakla (production'da Redis kullanılabilir)
const userSessions = new Map<string, UserSession>();

// Rate limiting ayarları
const RATE_LIMIT_CONFIG = {
  // Dakikada maksimum mesaj sayısı
  MAX_MESSAGES_PER_MINUTE: 10,
  // Saniyede maksimum mesaj sayısı
  MAX_MESSAGES_PER_SECOND: 2,
  // Mesajlar arası minimum bekleme süresi (milisaniye)
  MIN_MESSAGE_INTERVAL: 1000, // 1 saniye
  // Spam tespit edildiğinde blok süresi (milisaniye)
  BLOCK_DURATION: 60000, // 1 dakika
  // Temizlik aralığı (milisaniye)
  CLEANUP_INTERVAL: 300000, // 5 dakika
};

// Oturum temizleme (memory leak önleme)
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of userSessions.entries()) {
    // 1 saatten eski oturumları temizle
    if (now - session.lastMessageTime > 3600000) {
      userSessions.delete(sessionId);
    }
  }
}, RATE_LIMIT_CONFIG.CLEANUP_INTERVAL);

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  retryAfter?: number;
  remainingMessages?: number;
}

export function checkRateLimit(sessionId: string): RateLimitResult {
  const now = Date.now();
  const session = userSessions.get(sessionId) || {
    messageCount: 0,
    lastMessageTime: 0,
    isBlocked: false,
  };

  // Blok kontrolü
  if (session.isBlocked && session.blockUntil && now < session.blockUntil) {
    return {
      allowed: false,
      reason: 'Çok hızlı mesaj gönderiyorsunuz. Lütfen bekleyin.',
      retryAfter: Math.ceil((session.blockUntil - now) / 1000),
    };
  }

  // Blok süresi dolmuşsa sıfırla
  if (session.isBlocked && session.blockUntil && now >= session.blockUntil) {
    session.isBlocked = false;
    session.blockUntil = undefined;
    session.messageCount = 0;
  }

  // Mesajlar arası minimum bekleme süresi kontrolü
  if (now - session.lastMessageTime < RATE_LIMIT_CONFIG.MIN_MESSAGE_INTERVAL) {
    return {
      allowed: false,
      reason: 'Mesajlar arasında en az 1 saniye bekleyin.',
      retryAfter: Math.ceil((RATE_LIMIT_CONFIG.MIN_MESSAGE_INTERVAL - (now - session.lastMessageTime)) / 1000),
    };
  }

  // Son 1 dakikadaki mesaj sayısını hesapla
  const oneMinuteAgo = now - 60000;
  if (session.lastMessageTime > oneMinuteAgo) {
    // Son 1 dakika içinde mesaj gönderilmiş
    if (session.messageCount >= RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE) {
      // Spam tespit edildi, kullanıcıyı blokla
      session.isBlocked = true;
      session.blockUntil = now + RATE_LIMIT_CONFIG.BLOCK_DURATION;
      
      userSessions.set(sessionId, session);
      
      return {
        allowed: false,
        reason: 'Çok fazla mesaj gönderdiniz. 1 dakika bekleyin.',
        retryAfter: Math.ceil(RATE_LIMIT_CONFIG.BLOCK_DURATION / 1000),
      };
    }
  } else {
    // Son 1 dakika içinde mesaj yok, sayacı sıfırla
    session.messageCount = 0;
  }

  // Son 1 saniyedeki mesaj sayısını kontrol et
  const oneSecondAgo = now - 1000;
  if (session.lastMessageTime > oneSecondAgo) {
    // Son 1 saniye içinde mesaj gönderilmiş
    if (session.messageCount >= RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_SECOND) {
      return {
        allowed: false,
        reason: 'Çok hızlı mesaj gönderiyorsunuz. 1 saniye bekleyin.',
        retryAfter: 1,
      };
    }
  }

  // Mesaj sayısını artır ve zamanı güncelle
  session.messageCount++;
  session.lastMessageTime = now;
  userSessions.set(sessionId, session);

  // Kalan mesaj sayısını hesapla
  const remainingMessages = RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE - session.messageCount;

  return {
    allowed: true,
    remainingMessages: Math.max(0, remainingMessages),
  };
}

// Kullanıcı oturum ID'si oluştur (basit bir yöntem)
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Rate limit durumunu al
export function getRateLimitStatus(sessionId: string): {
  isBlocked: boolean;
  remainingMessages: number;
  blockUntil?: number;
} {
  const session = userSessions.get(sessionId);
  if (!session) {
    return {
      isBlocked: false,
      remainingMessages: RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE,
    };
  }

  const now = Date.now();
  const isBlocked = session.isBlocked && session.blockUntil && now < session.blockUntil;
  const remainingMessages = Math.max(0, RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE - session.messageCount);

  return {
    isBlocked,
    remainingMessages,
    blockUntil: session.blockUntil,
  };
}

// Rate limit ayarlarını al (UI için)
export function getRateLimitConfig() {
  return {
    maxMessagesPerMinute: RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE,
    minMessageInterval: RATE_LIMIT_CONFIG.MIN_MESSAGE_INTERVAL,
    blockDuration: RATE_LIMIT_CONFIG.BLOCK_DURATION,
  };
}
