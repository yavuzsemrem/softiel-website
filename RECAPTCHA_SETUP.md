# reCAPTCHA v3 Kurulum Rehberi

Bu rehber, Softiel chatbot'una reCAPTCHA v3 entegrasyonu için gerekli adımları açıklar.

## 1. Google reCAPTCHA Console'da Site Oluşturma

1. [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create" butonuna tıklayın
4. Aşağıdaki bilgileri doldurun:
   - **Label:** Softiel Chatbot
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:** 
     - `localhost` (development için)
     - `softiel.com` (production için)
     - `www.softiel.com` (production için)
   - **Accept the Terms of Service:** ✅
5. "Submit" butonuna tıklayın

## 2. API Keys Alma

Site oluşturulduktan sonra iki key alacaksınız:

- **Site Key:** Public key (frontend'de kullanılır)
- **Secret Key:** Private key (backend'de kullanılır)

## 3. Environment Variables Ayarlama

`.env.local` dosyanızı oluşturun veya güncelleyin:

```bash
# reCAPTCHA v3 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Önemli:** 
- `NEXT_PUBLIC_` prefix'i olan key frontend'de kullanılır
- Secret key sadece backend'de kullanılır
- Keys'leri asla public repository'de paylaşmayın

## 4. Production vs Development

### Development (Local)
- reCAPTCHA **devre dışı**
- Mock token'lar kullanılır
- Güvenlik kontrolü yapılmaz
- Hızlı test için ideal

### Production
- reCAPTCHA **aktif**
- Gerçek Google reCAPTCHA servisi
- Bot koruması aktif
- Güvenlik skoru kontrolü

## 5. Güvenlik Skoru Ayarları

`src/lib/recaptcha.ts` dosyasında:

```typescript
const RECAPTCHA_CONFIG = {
  minScore: 0.5,  // Minimum güven skoru (0.0 - 1.0)
  action: 'chatbot_message',  // Action adı
};
```

**Skor Açıklaması:**
- **1.0:** İnsan kullanıcı (en güvenli)
- **0.5:** Şüpheli ama kabul edilebilir
- **0.0:** Bot (en riskli)

## 6. Test Etme

### Development Testi
1. `npm run dev` ile sunucuyu başlatın
2. Chatbot'u açın
3. Mesaj gönderin
4. Console'da "reCAPTCHA not loaded" mesajını görmelisiniz
5. Mesaj normal şekilde işlenmelidir

### Production Testi
1. `.env.local` dosyasına gerçek keys'leri ekleyin
2. `NODE_ENV=production npm run build` ile build alın
3. `NODE_ENV=production npm start` ile çalıştırın
4. Chatbot'u açın ve mesaj gönderin
5. reCAPTCHA kontrolü yapılmalıdır

## 7. reCAPTCHA Durumları

### Başarılı Durum
- ✅ Yeşil gösterge: "Çevrimiçi"
- ✅ Mesaj işlenir
- ✅ Normal chatbot yanıtı

### Başarısız Durum
- ❌ Kırmızı gösterge: "Güvenlik kontrolü başarısız"
- ❌ Mesaj işlenmez
- ❌ Hata mesajı gösterilir

### Loading Durumu
- 🔵 Mavi gösterge: "Güvenlik kontrolü..."
- 🔵 Input devre dışı
- 🔵 Send butonu devre dışı

## 8. Sorun Giderme

### reCAPTCHA Yüklenmiyor
```
reCAPTCHA not loaded
```
**Çözüm:**
- Site key'in doğru olduğunu kontrol edin
- Domain'in reCAPTCHA console'da kayıtlı olduğunu kontrol edin
- Network bağlantısını kontrol edin

### Skor Çok Düşük
```
reCAPTCHA score too low: 0.3
```
**Çözüm:**
- `minScore` değerini düşürün (0.3 gibi)
- Kullanıcı davranışını analiz edin
- reCAPTCHA ayarlarını gözden geçirin

### Secret Key Hatası
```
reCAPTCHA secret key not configured
```
**Çözüm:**
- `.env.local` dosyasında `RECAPTCHA_SECRET_KEY` kontrol edin
- Secret key'in doğru olduğunu kontrol edin
- Sunucuyu yeniden başlatın

## 9. Gelişmiş Ayarlar

### Skor Eşiklerini Ayarlama
```typescript
// src/lib/recaptcha.ts
const RECAPTCHA_CONFIG = {
  minScore: 0.7,  // Daha yüksek güvenlik
  // veya
  minScore: 0.3,  // Daha düşük güvenlik
};
```

### Action Adını Değiştirme
```typescript
const RECAPTCHA_CONFIG = {
  action: 'custom_action_name',  // Özel action adı
};
```

### Domain Ekleme
reCAPTCHA Console'da yeni domain eklemek için:
1. Site settings'e gidin
2. "Domains" bölümüne yeni domain ekleyin
3. "Save" butonuna tıklayın

## 10. Monitoring ve Analytics

reCAPTCHA Console'da şunları görebilirsiniz:
- **Requests:** Toplam istek sayısı
- **Score Distribution:** Skor dağılımı
- **Top Actions:** En çok kullanılan action'lar
- **Error Rate:** Hata oranı

## 11. Maliyet

- reCAPTCHA v3 **ücretsizdir**
- Günlük 1M istek limiti vardır
- Daha fazla kullanım için Google Cloud Console'dan billing ayarlayın

## 12. Destek

Herhangi bir sorun yaşarsanız:
1. Console'da hata mesajlarını kontrol edin
2. reCAPTCHA Console'da site ayarlarını kontrol edin
3. Environment variables'ları doğrulayın
4. Network bağlantısını test edin

## 13. Güvenlik Notları

- Secret key'i asla frontend'de kullanmayın
- Keys'leri environment variables'da saklayın
- Production'da HTTPS kullanın
- Düzenli olarak skorları analiz edin
- Şüpheli aktiviteleri izleyin
