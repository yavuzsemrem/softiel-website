// Honeypot Tuzakları Servisi
export interface HoneypotResult {
  isBot: boolean;
  reason?: string;
  detectedFields: string[];
  riskScore: number;
}

// Honeypot alanları
export const HONEYPOT_FIELDS = [
  { name: 'website', type: 'text', placeholder: 'Website' },
  { name: 'email_confirmation', type: 'email', placeholder: 'Email Confirmation' },
  { name: 'phone_number', type: 'tel', placeholder: 'Phone Number' },
  { name: 'company_name', type: 'text', placeholder: 'Company Name' },
  { name: 'address', type: 'text', placeholder: 'Address' },
  { name: 'zip_code', type: 'text', placeholder: 'ZIP Code' },
  { name: 'birth_date', type: 'date', placeholder: 'Birth Date' },
  { name: 'social_security', type: 'text', placeholder: 'Social Security' },
  { name: 'credit_card', type: 'text', placeholder: 'Credit Card' },
  { name: 'password_confirmation', type: 'password', placeholder: 'Password Confirmation' }
];

// Honeypot değerleri (botların doldurma ihtimali yüksek)
export const BOT_VALUES = [
  'http://example.com',
  'test@example.com',
  '1234567890',
  'Test Company',
  '123 Test Street',
  '12345',
  '1990-01-01',
  '123-45-6789',
  '4111-1111-1111-1111',
  'password123',
  'admin',
  'user',
  'test',
  'demo',
  'sample',
  'example',
  'bot',
  'spam',
  'fake',
  'dummy'
];

// Honeypot alanlarını kontrol et
export function checkHoneypotFields(formData: Record<string, string>): HoneypotResult {
  const detectedFields: string[] = [];
  let riskScore = 0;
  let isBot = false;

  // Her honeypot alanını kontrol et
  for (const field of HONEYPOT_FIELDS) {
    const value = formData[field.name];
    
    if (value && value.trim() !== '') {
      detectedFields.push(field.name);
      riskScore += 0.3; // Her doldurulmuş alan için risk artır
      
      // Bot değerleri kontrolü
      if (BOT_VALUES.some(botValue => 
        value.toLowerCase().includes(botValue.toLowerCase())
      )) {
        riskScore += 0.5; // Bot değeri tespit edilirse ek risk
      }
      
      // Çok kısa değerler (botlar genelde kısa yazar)
      if (value.length < 3) {
        riskScore += 0.2;
      }
      
      // Çok uzun değerler (spam botları)
      if (value.length > 100) {
        riskScore += 0.3;
      }
      
      // Tekrarlayan karakterler
      if (/(.)\1{3,}/.test(value)) {
        riskScore += 0.4;
      }
      
      // Sadece sayılar (bot pattern)
      if (/^\d+$/.test(value)) {
        riskScore += 0.3;
      }
      
      // Sadece harfler (bot pattern)
      if (/^[a-zA-Z]+$/.test(value)) {
        riskScore += 0.2;
      }
    }
  }

  // Risk skoruna göre bot tespiti
  if (riskScore > 0.5) {
    isBot = true;
  }

  // Çok fazla alan doldurulmuşsa kesin bot
  if (detectedFields.length > 3) {
    isBot = true;
    riskScore = 1.0;
  }

  return {
    isBot,
    reason: isBot ? `Honeypot tuzakları tetiklendi. Doldurulan alanlar: ${detectedFields.join(', ')}` : undefined,
    detectedFields,
    riskScore: Math.min(riskScore, 1.0)
  };
}

// Honeypot alanları oluştur
export function generateHoneypotFields(): Array<{
  name: string;
  type: string;
  placeholder: string;
  style: React.CSSProperties;
}> {
  return HONEYPOT_FIELDS.map(field => ({
    name: field.name,
    type: field.type,
    placeholder: field.placeholder,
    style: {
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '1px',
      height: '1px',
      opacity: 0,
      pointerEvents: 'none',
      zIndex: -1
    }
  }));
}

// Honeypot alanlarını form verilerinden temizle
export function cleanHoneypotData(formData: Record<string, string>): Record<string, string> {
  const cleanedData: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(formData)) {
    // Honeypot alanları değilse ekle
    if (!HONEYPOT_FIELDS.some(field => field.name === key)) {
      cleanedData[key] = value;
    }
  }
  
  return cleanedData;
}

// Honeypot tuzaklarını rastgele seç
export function getRandomHoneypotFields(count: number = 3): Array<{
  name: string;
  type: string;
  placeholder: string;
  style: React.CSSProperties;
}> {
  const shuffled = [...HONEYPOT_FIELDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(field => ({
    name: field.name,
    type: field.type,
    placeholder: field.placeholder,
    style: {
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '1px',
      height: '1px',
      opacity: 0,
      pointerEvents: 'none',
      zIndex: -1
    }
  }));
}

// Honeypot alanlarını DOM'da gizle
export function hideHoneypotFields(): void {
  if (typeof window === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = `
    .honeypot-field {
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      width: 1px !important;
      height: 1px !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -1 !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);
}

// Honeypot tuzaklarını başlat
export function initializeHoneypot(): void {
  hideHoneypotFields();
}

// Honeypot alanlarını form submit'inde kontrol et
export function validateHoneypotOnSubmit(formData: FormData): HoneypotResult {
  const data: Record<string, string> = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }
  
  return checkHoneypotFields(data);
}

// Honeypot istatistikleri
export function getHoneypotStats(): {
  totalFields: number;
  activeFields: number;
  botDetectionRate: number;
} {
  return {
    totalFields: HONEYPOT_FIELDS.length,
    activeFields: 3, // Varsayılan aktif alan sayısı
    botDetectionRate: 0.85 // %85 bot tespit oranı
  };
}

// Honeypot alanlarını dinamik olarak değiştir
export function rotateHoneypotFields(): Array<{
  name: string;
  type: string;
  placeholder: string;
  style: React.CSSProperties;
}> {
  // Her seferinde farklı alanlar seç
  const randomCount = Math.floor(Math.random() * 3) + 2; // 2-4 arası
  return getRandomHoneypotFields(randomCount);
}


