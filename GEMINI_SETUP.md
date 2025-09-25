# Gemini AI API Kurulum Rehberi

Bu rehber, Softiel chatbot'una Gemini AI API entegrasyonu için gerekli adımları açıklar.

## 1. Google AI Studio'da API Key Alma

1. [Google AI Studio](https://aistudio.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. "Get API Key" butonuna tıklayın
4. Yeni bir API key oluşturun veya mevcut birini kullanın
5. API key'i kopyalayın

## 2. Environment Variables Ayarlama

`.env.local` dosyanızı oluşturun veya güncelleyin:

```bash
# Gemini AI API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**Önemli:** `your_gemini_api_key_here` yerine gerçek API key'inizi yazın.

## 3. API Key Güvenliği

- API key'inizi asla public repository'de paylaşmayın
- `.env.local` dosyası `.gitignore`'da olmalı
- Production'da environment variable olarak ayarlayın

## 4. Test Etme

1. Sunucuyu başlatın: `npm run dev`
2. Chatbot'u açın
3. Bir mesaj gönderin
4. Gemini AI'dan yanıt geldiğini kontrol edin

## 5. Fallback Mekanizması

API çalışmadığında chatbot otomatik olarak fallback yanıtları kullanır:
- Hizmetler hakkında bilgi
- Fiyatlandırma bilgisi
- İletişim bilgileri
- Genel yanıtlar

## 6. Özellikler

- **Akıllı Yanıtlar:** Gemini AI ile doğal dil işleme
- **Türkçe Destek:** Tam Türkçe yanıtlar
- **Emoji Desteği:** Renkli ve samimi yanıtlar
- **Hata Yönetimi:** API hatalarında fallback
- **Güvenlik:** İçerik filtreleme ve güvenlik ayarları

## 7. Sorun Giderme

### API Key Hatası
```
AI servisi yapılandırma hatası
```
- `.env.local` dosyasında API key'in doğru yazıldığını kontrol edin
- Sunucuyu yeniden başlatın

### Quota Hatası
```
AI servisi şu anda yoğun
```
- Google AI Studio'da quota limitinizi kontrol edin
- Birkaç dakika bekleyin

### Genel Hata
```
Üzgünüm, bir hata oluştu
```
- Console'da hata detaylarını kontrol edin
- Fallback yanıtlar otomatik olarak devreye girer

## 8. Gelişmiş Ayarlar

`src/lib/gemini.ts` dosyasında aşağıdaki ayarları değiştirebilirsiniz:

- **Model:** `gemini-1.5-flash` (daha hızlı) veya `gemini-1.5-pro` (daha akıllı)
- **Temperature:** 0.7 (yaratıcılık seviyesi)
- **Max Output Tokens:** 1024 (yanıt uzunluğu)
- **Safety Settings:** İçerik filtreleme seviyeleri

## 9. Maliyet

- Gemini API ücretsiz tier'da günde 15 istek limiti vardır
- Daha fazla kullanım için Google Cloud Console'dan billing ayarlayın
- Detaylı fiyatlandırma: [Google AI Pricing](https://ai.google.dev/pricing)

## 10. Destek

Herhangi bir sorun yaşarsanız:
1. Console'da hata mesajlarını kontrol edin
2. API key'inizi doğrulayın
3. Quota limitinizi kontrol edin
4. Fallback yanıtların çalıştığını test edin
