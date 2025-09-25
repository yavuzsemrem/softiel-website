// Behavioral Analysis - Kullanıcı Davranış Analizi
export interface BehaviorData {
  typingSpeed: number; // 0-1 arası, yüksek = hızlı yazma
  mouseMovement: number; // 0-1 arası, yüksek = doğal fare hareketi
  clickPattern: number; // 0-1 arası, yüksek = doğal tıklama
  sessionDuration: number; // 0-1 arası, yüksek = uzun oturum
  scrollBehavior: number; // 0-1 arası, yüksek = doğal kaydırma
  interactionPattern: number; // 0-1 arası, yüksek = doğal etkileşim
  responseTime: number; // 0-1 arası, yüksek = hızlı yanıt
  focusBehavior: number; // 0-1 arası, yüksek = odaklanma
}

export interface BehaviorAnalysis {
  isHuman: boolean;
  confidence: number; // 0-1 arası güven skoru
  riskScore: number; // 0-1 arası risk skoru
  reasons: string[];
  suggestions: string[];
}

// Davranış verilerini topla
export class BehaviorTracker {
  private typingTimes: number[] = [];
  private mouseMovements: number[] = [];
  private clickTimes: number[] = [];
  private scrollEvents: number[] = [];
  private focusEvents: number[] = [];
  private sessionStartTime: number;
  private lastInteraction: number = 0;
  private interactionCount: number = 0;

  constructor() {
    this.sessionStartTime = Date.now();
    this.initializeTracking();
  }

  private initializeTracking() {
    if (typeof window === 'undefined') return;

    // Klavye olaylarını takip et
    document.addEventListener('keydown', (e) => {
      this.recordTyping();
    });

    // Fare hareketlerini takip et
    document.addEventListener('mousemove', (e) => {
      this.recordMouseMovement(e);
    });

    // Tıklama olaylarını takip et
    document.addEventListener('click', (e) => {
      this.recordClick();
    });

    // Kaydırma olaylarını takip et
    document.addEventListener('scroll', (e) => {
      this.recordScroll();
    });

    // Odaklanma olaylarını takip et
    window.addEventListener('focus', () => {
      this.recordFocus();
    });

    // Sayfa görünürlüğünü takip et
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.recordFocus();
      }
    });
  }

  private recordTyping() {
    const now = Date.now();
    if (this.typingTimes.length > 0) {
      const timeDiff = now - this.typingTimes[this.typingTimes.length - 1];
      if (timeDiff < 1000) { // 1 saniyeden kısa aralıklar
        this.typingTimes.push(now);
      }
    } else {
      this.typingTimes.push(now);
    }
    this.updateInteraction();
  }

  private recordMouseMovement(e: MouseEvent) {
    const now = Date.now();
    const movement = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
    this.mouseMovements.push(movement);
    
    // Son 100 hareketi tut
    if (this.mouseMovements.length > 100) {
      this.mouseMovements = this.mouseMovements.slice(-100);
    }
    
    this.updateInteraction();
  }

  private recordClick() {
    const now = Date.now();
    this.clickTimes.push(now);
    
    // Son 50 tıklamayı tut
    if (this.clickTimes.length > 50) {
      this.clickTimes = this.clickTimes.slice(-50);
    }
    
    this.updateInteraction();
  }

  private recordScroll() {
    const now = Date.now();
    this.scrollEvents.push(now);
    
    // Son 30 kaydırmayı tut
    if (this.scrollEvents.length > 30) {
      this.scrollEvents = this.scrollEvents.slice(-30);
    }
    
    this.updateInteraction();
  }

  private recordFocus() {
    const now = Date.now();
    this.focusEvents.push(now);
    this.updateInteraction();
  }

  private updateInteraction() {
    this.lastInteraction = Date.now();
    this.interactionCount++;
  }

  // Davranış verilerini analiz et
  public analyzeBehavior(): BehaviorData {
    const now = Date.now();
    const sessionDuration = now - this.sessionStartTime;

    return {
      typingSpeed: this.calculateTypingSpeed(),
      mouseMovement: this.calculateMouseMovement(),
      clickPattern: this.calculateClickPattern(),
      sessionDuration: this.calculateSessionDuration(sessionDuration),
      scrollBehavior: this.calculateScrollBehavior(),
      interactionPattern: this.calculateInteractionPattern(),
      responseTime: this.calculateResponseTime(),
      focusBehavior: this.calculateFocusBehavior()
    };
  }

  private calculateTypingSpeed(): number {
    if (this.typingTimes.length < 2) return 0.5;
    
    const intervals = [];
    for (let i = 1; i < this.typingTimes.length; i++) {
      intervals.push(this.typingTimes[i] - this.typingTimes[i - 1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    
    // 50-500ms arası doğal, 50ms altı bot, 500ms üstü çok yavaş
    if (avgInterval < 50) return 0.1; // Çok hızlı, bot olabilir
    if (avgInterval > 500) return 0.3; // Çok yavaş
    if (avgInterval < 200) return 0.9; // Hızlı ama doğal
    return 0.7; // Normal hız
  }

  private calculateMouseMovement(): number {
    if (this.mouseMovements.length < 5) return 0.5;
    
    const avgMovement = this.mouseMovements.reduce((a, b) => a + b, 0) / this.mouseMovements.length;
    const variance = this.calculateVariance(this.mouseMovements);
    
    // Çok düzenli hareket bot işareti
    if (variance < 10) return 0.2; // Çok düzenli, bot olabilir
    if (avgMovement < 5) return 0.3; // Çok küçük hareketler
    if (avgMovement > 100) return 0.4; // Çok büyük hareketler
    
    return 0.8; // Doğal fare hareketi
  }

  private calculateClickPattern(): number {
    if (this.clickTimes.length < 3) return 0.5;
    
    const intervals = [];
    for (let i = 1; i < this.clickTimes.length; i++) {
      intervals.push(this.clickTimes[i] - this.clickTimes[i - 1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = this.calculateVariance(intervals);
    
    // Çok düzenli tıklama bot işareti
    if (variance < 100) return 0.2; // Çok düzenli, bot olabilir
    if (avgInterval < 100) return 0.3; // Çok hızlı tıklama
    if (avgInterval > 5000) return 0.4; // Çok yavaş tıklama
    
    return 0.8; // Doğal tıklama
  }

  private calculateSessionDuration(duration: number): number {
    // 30 saniyeden kısa şüpheli
    if (duration < 30000) return 0.2;
    // 2 dakikadan uzun iyi
    if (duration > 120000) return 0.9;
    // 1-2 dakika arası normal
    if (duration > 60000) return 0.7;
    return 0.5;
  }

  private calculateScrollBehavior(): number {
    if (this.scrollEvents.length < 2) return 0.5;
    
    const intervals = [];
    for (let i = 1; i < this.scrollEvents.length; i++) {
      intervals.push(this.scrollEvents[i] - this.scrollEvents[i - 1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = this.calculateVariance(intervals);
    
    // Çok düzenli kaydırma bot işareti
    if (variance < 200) return 0.2; // Çok düzenli, bot olabilir
    if (avgInterval < 100) return 0.3; // Çok hızlı kaydırma
    if (avgInterval > 10000) return 0.4; // Çok yavaş kaydırma
    
    return 0.8; // Doğal kaydırma
  }

  private calculateInteractionPattern(): number {
    const now = Date.now();
    const timeSinceLastInteraction = now - this.lastInteraction;
    
    // 5 dakikadan fazla etkileşim yok
    if (timeSinceLastInteraction > 300000) return 0.3;
    
    // Etkileşim sayısı çok az
    if (this.interactionCount < 3) return 0.4;
    
    // Çok fazla etkileşim (spam)
    if (this.interactionCount > 100) return 0.2;
    
    return 0.8; // Normal etkileşim
  }

  private calculateResponseTime(): number {
    // Bu örnekte basit bir hesaplama
    // Gerçek uygulamada mesaj gönderme sürelerini takip edebilirsiniz
    return 0.7; // Varsayılan değer
  }

  private calculateFocusBehavior(): number {
    if (this.focusEvents.length < 2) return 0.5;
    
    const now = Date.now();
    const recentFocus = this.focusEvents.filter(time => now - time < 60000); // Son 1 dakika
    
    // Çok az odaklanma
    if (recentFocus.length < 2) return 0.3;
    
    return 0.8; // Normal odaklanma
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  }

  // Verileri temizle
  public reset() {
    this.typingTimes = [];
    this.mouseMovements = [];
    this.clickTimes = [];
    this.scrollEvents = [];
    this.focusEvents = [];
    this.sessionStartTime = Date.now();
    this.lastInteraction = 0;
    this.interactionCount = 0;
  }
}

// Davranış analizi yap
export function analyzeBehavior(behaviorData: BehaviorData): BehaviorAnalysis {
  const reasons: string[] = [];
  const suggestions: string[] = [];
  let riskScore = 0;
  let confidence = 0;

  // Her davranış özelliğini değerlendir
  const behaviors = [
    { name: 'Yazma Hızı', value: behaviorData.typingSpeed, weight: 0.2 },
    { name: 'Fare Hareketi', value: behaviorData.mouseMovement, weight: 0.15 },
    { name: 'Tıklama Paterni', value: behaviorData.clickPattern, weight: 0.15 },
    { name: 'Oturum Süresi', value: behaviorData.sessionDuration, weight: 0.1 },
    { name: 'Kaydırma Davranışı', value: behaviorData.scrollBehavior, weight: 0.1 },
    { name: 'Etkileşim Paterni', value: behaviorData.interactionPattern, weight: 0.15 },
    { name: 'Yanıt Süresi', value: behaviorData.responseTime, weight: 0.1 },
    { name: 'Odaklanma', value: behaviorData.focusBehavior, weight: 0.05 }
  ];

  behaviors.forEach(behavior => {
    confidence += behavior.value * behavior.weight;
    
    if (behavior.value < 0.3) {
      riskScore += behavior.weight * 0.8;
      reasons.push(`${behavior.name} şüpheli görünüyor.`);
      suggestions.push(`${behavior.name} daha doğal olmalı.`);
    } else if (behavior.value < 0.5) {
      riskScore += behavior.weight * 0.4;
      reasons.push(`${behavior.name} düşük skor.`);
    }
  });

  // Genel değerlendirme
  const isHuman = confidence > 0.6 && riskScore < 0.4;

  if (!isHuman) {
    if (confidence < 0.4) {
      reasons.push('Genel davranış paterni çok düşük.');
      suggestions.push('Daha doğal bir şekilde etkileşim kurun.');
    }
    if (riskScore > 0.6) {
      reasons.push('Yüksek risk skoru tespit edildi.');
      suggestions.push('Şüpheli davranış paterni tespit edildi.');
    }
  }

  return {
    isHuman,
    confidence: Math.min(confidence, 1),
    riskScore: Math.min(riskScore, 1),
    reasons,
    suggestions
  };
}

// Global davranış takipçisi
let globalTracker: BehaviorTracker | null = null;

export function getBehaviorTracker(): BehaviorTracker {
  if (!globalTracker) {
    globalTracker = new BehaviorTracker();
  }
  return globalTracker;
}

// Davranış analizi başlat
export function initializeBehaviorAnalysis(): void {
  if (typeof window !== 'undefined') {
    getBehaviorTracker();
  }
}
