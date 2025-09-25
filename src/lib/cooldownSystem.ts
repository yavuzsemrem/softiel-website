// Cooldown Sistemi Servisi
export interface CooldownResult {
  canSend: boolean;
  remainingTime: number;
  reason?: string;
  cooldownType?: 'message' | 'session' | 'none';
}

export interface CooldownEntry {
  lastMessageTime: number;
  messageCount: number;
  sessionStartTime: number;
  isInCooldown: boolean;
  cooldownEndTime: number;
}

// Cooldown sabitleri
export const MESSAGE_COOLDOWN = 500; // 0.5 saniye
export const SESSION_COOLDOWN = 5000; // 5 saniye
export const MAX_MESSAGES_PER_SESSION = 100; // Session başına maksimum mesaj
export const RAPID_MESSAGE_THRESHOLD = 10; // Hızlı mesaj eşiği
export const RAPID_MESSAGE_WINDOW = 10000; // 10 saniye içinde

// Session'ları sakla
const sessionCooldowns = new Map<string, CooldownEntry>();

// Eski session'ları temizle (5 dakikada bir)
setInterval(() => {
  const now = Date.now();
  sessionCooldowns.forEach((entry, sessionId) => {
    // 5 dakikadan eski session'ları sil
    if (now - entry.sessionStartTime > 300000) {
      sessionCooldowns.delete(sessionId);
    }
  });
}, 300000);

// Session cooldown'u kontrol et
export function checkSessionCooldown(sessionId: string): CooldownResult {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    // Yeni session oluştur
    entry = {
      lastMessageTime: 0,
      messageCount: 0,
      sessionStartTime: now,
      isInCooldown: false,
      cooldownEndTime: 0
    };
    sessionCooldowns.set(sessionId, entry);
  }

  // Session cooldown kontrolü
  if (entry.isInCooldown && now < entry.cooldownEndTime) {
    return {
      canSend: false,
      remainingTime: Math.ceil((entry.cooldownEndTime - now) / 1000),
      reason: 'Session cooldown aktif. Lütfen bekleyin.',
      cooldownType: 'session'
    };
  }

  // Session cooldown'u sıfırla
  if (entry.isInCooldown && now >= entry.cooldownEndTime) {
    entry.isInCooldown = false;
    entry.cooldownEndTime = 0;
  }

  return {
    canSend: true,
    remainingTime: 0,
    cooldownType: 'none'
  };
}

// Mesaj cooldown'u kontrol et
export function checkMessageCooldown(sessionId: string): CooldownResult {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    return {
      canSend: true,
      remainingTime: 0,
      cooldownType: 'none'
    };
  }

  // Mesajlar arası cooldown kontrolü
  const timeSinceLastMessage = now - entry.lastMessageTime;
  if (timeSinceLastMessage < MESSAGE_COOLDOWN) {
    return {
      canSend: false,
      remainingTime: Math.ceil((MESSAGE_COOLDOWN - timeSinceLastMessage) / 1000),
      reason: 'Mesajlar arası bekleme süresi. Lütfen yavaşlayın.',
      cooldownType: 'message'
    };
  }

  return {
    canSend: true,
    remainingTime: 0,
    cooldownType: 'none'
  };
}

// Hızlı mesaj kontrolü
export function checkRapidMessaging(sessionId: string): CooldownResult {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    return {
      canSend: true,
      remainingTime: 0,
      cooldownType: 'none'
    };
  }

  // Son 10 saniyede kaç mesaj gönderildi
  const recentMessages = entry.messageCount;
  if (recentMessages >= RAPID_MESSAGE_THRESHOLD) {
    // Session cooldown'u başlat
    entry.isInCooldown = true;
    entry.cooldownEndTime = now + SESSION_COOLDOWN;
    
    return {
      canSend: false,
      remainingTime: Math.ceil(SESSION_COOLDOWN / 1000),
      reason: 'Çok hızlı mesaj gönderiyorsunuz. Session cooldown aktif.',
      cooldownType: 'session'
    };
  }

  return {
    canSend: true,
    remainingTime: 0,
    cooldownType: 'none'
  };
}

// Mesaj gönderildiğinde çağrılacak fonksiyon
export function recordMessage(sessionId: string): void {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    entry = {
      lastMessageTime: now,
      messageCount: 1,
      sessionStartTime: now,
      isInCooldown: false,
      cooldownEndTime: 0
    };
  } else {
    entry.lastMessageTime = now;
    entry.messageCount++;
  }

  sessionCooldowns.set(sessionId, entry);
}

// Session cooldown'u başlat
export function startSessionCooldown(sessionId: string, duration: number = SESSION_COOLDOWN): void {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    entry = {
      lastMessageTime: 0,
      messageCount: 0,
      sessionStartTime: now,
      isInCooldown: true,
      cooldownEndTime: now + duration
    };
  } else {
    entry.isInCooldown = true;
    entry.cooldownEndTime = now + duration;
  }

  sessionCooldowns.set(sessionId, entry);
}

// Session cooldown'u sıfırla
export function resetSessionCooldown(sessionId: string): void {
  const now = Date.now();
  let entry = sessionCooldowns.get(sessionId);

  if (entry) {
    entry.isInCooldown = false;
    entry.cooldownEndTime = 0;
    entry.messageCount = 0;
    entry.sessionStartTime = now;
    sessionCooldowns.set(sessionId, entry);
  }
}

// Tüm cooldown'ları kontrol et
export function checkAllCooldowns(sessionId: string): CooldownResult {
  // Önce session cooldown'u kontrol et
  const sessionResult = checkSessionCooldown(sessionId);
  if (!sessionResult.canSend) {
    return sessionResult;
  }

  // Sonra mesaj cooldown'u kontrol et
  const messageResult = checkMessageCooldown(sessionId);
  if (!messageResult.canSend) {
    return messageResult;
  }

  // Son olarak hızlı mesaj kontrolü
  const rapidResult = checkRapidMessaging(sessionId);
  if (!rapidResult.canSend) {
    return rapidResult;
  }

  return {
    canSend: true,
    remainingTime: 0,
    cooldownType: 'none'
  };
}

// Session istatistikleri
export function getSessionStats(sessionId: string): {
  messageCount: number;
  sessionDuration: number;
  isInCooldown: boolean;
  cooldownRemaining: number;
  lastMessageTime: number;
} {
  const now = Date.now();
  const entry = sessionCooldowns.get(sessionId);

  if (!entry) {
    return {
      messageCount: 0,
      sessionDuration: 0,
      isInCooldown: false,
      cooldownRemaining: 0,
      lastMessageTime: 0
    };
  }

  return {
    messageCount: entry.messageCount,
    sessionDuration: now - entry.sessionStartTime,
    isInCooldown: entry.isInCooldown,
    cooldownRemaining: entry.isInCooldown ? Math.max(0, entry.cooldownEndTime - now) : 0,
    lastMessageTime: entry.lastMessageTime
  };
}

// Cooldown durumunu al
export function getCooldownStatus(sessionId: string): {
  canSend: boolean;
  remainingTime: number;
  reason?: string;
  cooldownType?: 'message' | 'session' | 'none';
  stats: {
    messageCount: number;
    sessionDuration: number;
    isInCooldown: boolean;
    cooldownRemaining: number;
  };
} {
  const cooldownResult = checkAllCooldowns(sessionId);
  const stats = getSessionStats(sessionId);

  return {
    ...cooldownResult,
    stats
  };
}

// Tüm session'ları temizle (admin fonksiyonu)
export function clearAllCooldowns(): void {
  sessionCooldowns.clear();
}

// Belirli bir session'ı temizle
export function clearSessionCooldown(sessionId: string): void {
  sessionCooldowns.delete(sessionId);
}

// Aktif session sayısı
export function getActiveSessionCount(): number {
  return sessionCooldowns.size;
}

// Cooldown'da olan session sayısı
export function getCooldownSessionCount(): number {
  const now = Date.now();
  let count = 0;
  
  sessionCooldowns.forEach(entry => {
    if (entry.isInCooldown && now < entry.cooldownEndTime) {
      count++;
    }
  });
  
  return count;
}
