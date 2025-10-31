"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone,
  Mail,
  Clock,
  CheckCircle,
  MessageSquare
} from "lucide-react"
import aiIcon from "@/images/ai.webp"
import { generateGeminiResponse, getFallbackResponse, FallbackResponse } from "@/lib/gemini"
import { checkRateLimit, generateSessionId, getRateLimitStatus } from "@/lib/rateLimiter"
import { useRecaptcha } from "@/hooks/useRecaptcha"
import { useFingerprinting } from "@/hooks/useFingerprinting"
import { useContentAnalysis } from "@/hooks/useContentAnalysis"
import { useCooldown } from "@/hooks/useCooldown"
import { useHoneypot } from "@/hooks/useHoneypot"
import { useBehavioralAnalysis } from "@/hooks/useBehavioralAnalysis"
import { useI18n } from "@/contexts/i18n-context"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { RECAPTCHA_CONFIG, isReCAPTCHAEnabled } from '@/config'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'contact_info'
  actionType?: 'services' | 'pricing' | 'projects' | 'contact'
}

interface QuickReply {
  id: string
  text: string
  action: string
}

// Quick replies will be generated dynamically based on language
const getQuickReplies = (t: (key: string) => string): QuickReply[] => [
  { id: '1', text: t('chatbot.quickReplies.services'), action: 'services' },
  { id: '2', text: t('chatbot.quickReplies.pricing'), action: 'pricing' },
  { id: '3', text: t('chatbot.quickReplies.projects'), action: 'projects' },
  { id: '4', text: t('chatbot.quickReplies.contact'), action: 'contact' }
]

const getContactInfo = (t: (key: string) => string) => ({
  phone: t('chatbot.contactInfo.phone'),
  email: t('chatbot.contactInfo.email'),
  workingHours: t('chatbot.contactInfo.workingHours')
})

// WhatsApp ikonu komponenti
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

// WhatsApp butonu için fonksiyon
const openWhatsApp = (locale: string) => {
  const phoneNumber = '905411883045' // WhatsApp formatında telefon numarası
  
  // Dil bazlı mesajlar - Hizmetler hakkında bilgi almak için
  const messages = {
    tr: 'Merhabalar, hizmetleriniz hakkında bilgi almak istiyorum.',
    en: 'Hello, I would like to get information about your services.',
    de: 'Hallo, ich möchte Informationen über Ihre Dienstleistungen erhalten.',
    fr: 'Bonjour, je voudrais obtenir des informations sur vos services.',
    ru: 'Здравствуйте, я хотел бы получить информацию о ваших услугах.',
    ar: 'مرحباً، أود الحصول على معلومات حول خدماتكم.'
  }

  const message = encodeURIComponent(messages[locale as keyof typeof messages] || messages.tr)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, '_blank')
}

// WhatsApp buton metinlerini al
const getWhatsAppButtonText = (locale: string) => {
  const texts = {
    tr: 'Hemen İletişime Geçin',
    en: 'Contact Us Now',
    de: 'Jetzt Kontaktieren',
    fr: 'Contactez-nous Maintenant',
    ru: 'Связаться Сейчас',
    ar: 'تواصل معنا الآن'
  }
  return texts[locale as keyof typeof texts] || texts.tr
}

// Dil bazlı sayfa isimleri
const getPageName = (page: string, locale: string) => {
  const pageNames = {
    services: {
      tr: 'hizmetlerimiz',
      en: 'services', 
      de: 'services',
      fr: 'services',
      ru: 'services',
      ar: 'services'
    },
    pricing: {
      tr: 'fiyatlandirma',
      en: 'pricing',
      de: 'pricing', 
      fr: 'pricing',
      ru: 'pricing',
      ar: 'pricing'
    },
    projects: {
      tr: 'projelerimiz',
      en: 'projects',
      de: 'projekte',
      fr: 'projets', 
      ru: 'projects',
      ar: 'projects'
    },
    contact: {
      tr: 'iletisim',
      en: 'contact',
      de: 'contact',
      fr: 'contact', 
      ru: 'contact',
      ar: 'contact'
    }
  }
  
  return pageNames[page as keyof typeof pageNames]?.[locale as keyof typeof pageNames.services] || pageNames[page as keyof typeof pageNames]?.tr || page
}

// Sayfa yönlendirme fonksiyonları
const navigateToPage = (page: string, locale: string = 'tr') => {
  const pageName = getPageName(page, locale)
  window.open(`/${locale}/${pageName}`, '_blank')
}

// Mesaj içeriğinden actionType'ı belirle
const detectActionType = (messageText: string): 'services' | 'pricing' | 'projects' | 'contact' | null => {
  const text = messageText.toLowerCase()
  
  // Hizmetler - tüm dillerde
  const servicesKeywords = [
    'hizmet', 'service', 'dienstleistung', 'услуг', 'خدم',
    'web tasarım', 'web design', 'webdesign', 'веб-дизайн', 'تصميم',
    'mobil', 'mobile', 'app', 'uygulama', 'мобильн', 'تطبيق',
    'seo', 'optimizasyon', 'optimization', 'оптимизац', 'تحسين',
    'wordpress', 'logo', 'sosyal medya', 'social media', 'соцсет', 'وسائل',
    'yapay zeka', 'artificial', 'ai ', 'otomasyon', 'automation', 'автомат', 'أتمتة'
  ]
  
  // Fiyatlandırma - tüm dillerde
  const pricingKeywords = [
    'fiyat', 'price', 'pricing', 'preis', 'цен', 'أسعار',
    'tarif', 'ücret', 'cost', 'kosten', 'стоимост', 'تكلف',
    'teklif', 'quote', 'angebot', 'предложен', 'عرض'
  ]
  
  // Projeler - tüm dillerde
  const projectsKeywords = [
    'proje', 'project', 'portfolio', 'portföy', 'портфол', 'محفظ',
    'referans', 'reference', 'örnek', 'example', 'beispiel', 'пример', 'مثال',
    'çalışma', 'work', 'arbeit', 'работ', 'عمل'
  ]
  
  // İletişim - tüm dillerde
  const contactKeywords = [
    'iletişim', 'contact', 'kontakt', 'контакт', 'اتصال',
    'telefon', 'phone', 'телефон', 'هاتف',
    'mail', 'email', 'e-posta', 'почта', 'بريد',
    'adres', 'address', 'adresse', 'адрес', 'عنوان',
    'whatsapp', 'ulaş', 'reach', 'erreichen', 'связаться', 'تواصل'
  ]
  
  // Öncelik sırasıyla kontrol et (daha spesifikten genele)
  if (pricingKeywords.some(keyword => text.includes(keyword))) {
    return 'pricing'
  }
  
  if (projectsKeywords.some(keyword => text.includes(keyword))) {
    return 'projects'
  }
  
  if (contactKeywords.some(keyword => text.includes(keyword))) {
    return 'contact'
  }
  
  if (servicesKeywords.some(keyword => text.includes(keyword))) {
    return 'services'
  }
  
  return null
}

function ChatbotContent() {
  const { t, locale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])

  // String interpolation helper
  const interpolate = (text: string, values: Record<string, any>) => {
    return text.replace(/\{(\w+)\}/g, (match, key) => values[key] || match)
  }
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitMessage, setRateLimitMessage] = useState('')
  const [retryAfter, setRetryAfter] = useState(0)
  const [remainingMessages, setRemainingMessages] = useState(10)
  const [sessionId] = useState(() => generateSessionId())
  const [isApiError, setIsApiError] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { executeRecaptchaAction, isAvailable } = useRecaptcha()
  const { fingerprint, riskScore, isSuspicious, reasons, isLoading: isFingerprintLoading } = useFingerprinting(sessionId)
  const { analyzeMessage, cleanMessage, isMessageSafe, getSuggestions, isAnalyzing: isContentAnalyzing } = useContentAnalysis()
  const { canSend: canSendMessage, remainingTime: cooldownRemaining, reason: cooldownReason, cooldownType, isInCooldown, messageCount, recordMessageSent } = useCooldown(sessionId)
  const { honeypotFields, checkFormData, isInitialized: isHoneypotInitialized } = useHoneypot()
  const { isHuman: isBehaviorHuman, confidence: behaviorConfidence, riskScore: behaviorRiskScore, reasons: behaviorReasons, isLoading: isBehaviorLoading } = useBehavioralAnalysis()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Dil değiştiğinde initial message'ı güncelle
  useEffect(() => {
    // Her dil için fallback mesajları
    const fallbackMessages = {
      tr: 'Merhaba! Softiel\'e hoş geldiniz! 👋 Size nasıl yardımcı olabilirim?',
      en: 'Hello! Welcome to Softiel! 👋 How can I help you?',
      de: 'Hallo! Willkommen bei Softiel! 👋 Wie kann ich Ihnen helfen?',
      fr: 'Bonjour! Bienvenue chez Softiel! 👋 Comment puis-je vous aider?',
      ru: 'Привет! Добро пожаловать в Softiel! 👋 Как я могу вам помочь?',
      ar: 'مرحبا! أهلا بك في Softiel! 👋 كيف يمكنني مساعدتك؟'
    }
    
    // Çeviri anahtarını kontrol et, eğer anahtarın kendisi dönüyorsa fallback kullan
    const translatedMessage = t('chatbot.initialMessage')
    const finalMessage = translatedMessage === 'chatbot.initialMessage' 
      ? fallbackMessages[locale as keyof typeof fallbackMessages] || fallbackMessages.tr
      : translatedMessage
    
    // İlk mesajı her zaman güncelle (dil değiştiğinde de)
    setMessages([{
      id: '1',
      text: finalMessage,
      sender: 'bot',
      timestamp: new Date()
    }])
  }, [locale, t])


  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // API hatası varsa mesaj gönderilmesini engelle
    if (isApiError) {
      return
    }

    // Behavioral Analysis kontrolü
    if (!isBehaviorLoading && !isBehaviorHuman && behaviorRiskScore > 0.7) {
      const behaviorBotMessage: Message = {
        id: Date.now().toString(),
        text: t('chatbot.errors.behaviorSuspicious'),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, behaviorBotMessage])
      return
    }

    // Honeypot kontrolü
    if (isHoneypotInitialized) {
      const formData = { message: text };
      const honeypotResult = checkFormData(formData);
      
      if (honeypotResult.isBot) {
        const honeypotBotMessage: Message = {
          id: Date.now().toString(),
          text: t('chatbot.errors.honeypotBot'),
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, honeypotBotMessage])
        return
      }
    }

    // Cooldown kontrolü
    if (!canSendMessage) {
      const cooldownBotMessage: Message = {
        id: Date.now().toString(),
        text: interpolate(t('chatbot.errors.cooldownActive'), { time: cooldownRemaining }),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, cooldownBotMessage])
      return
    }

    // İçerik analizi kontrolü
    const contentAnalysis = analyzeMessage(text)
    if (!isMessageSafe(text)) {
      const contentBotMessage: Message = {
        id: Date.now().toString(),
        text: interpolate(t('chatbot.errors.contentBlocked'), { reasons: contentAnalysis.reasons.join(', ') }),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, contentBotMessage])
      
      // Öneriler varsa göster
      if (contentAnalysis.suggestions.length > 0) {
        const suggestionMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: interpolate(t('chatbot.errors.suggestions'), { suggestions: contentAnalysis.suggestions.join(', ') }),
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, suggestionMessage])
      }
      return
    }

    // Fingerprinting kontrolü
    if (isSuspicious && riskScore > 0.7) {
      const suspiciousBotMessage: Message = {
        id: Date.now().toString(),
        text: interpolate(t('chatbot.errors.suspiciousActivity'), { score: (riskScore * 100).toFixed(0) }),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, suspiciousBotMessage])
      return
    }

    // Rate limiting kontrolü
    const rateLimitResult = checkRateLimit(sessionId)
    
    if (!rateLimitResult.allowed) {
      setIsRateLimited(true)
      setRateLimitMessage(rateLimitResult.reason || 'Mesaj gönderemezsiniz.')
      setRetryAfter(rateLimitResult.retryAfter || 0)
      
      // Rate limit mesajını göster
      const rateLimitBotMessage: Message = {
        id: Date.now().toString(),
        text: interpolate(t('chatbot.errors.rateLimited'), { reason: rateLimitResult.reason }),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, rateLimitBotMessage])
      
      // Retry after süresini takip et
      if (rateLimitResult.retryAfter) {
        const countdown = setInterval(() => {
          setRetryAfter(prev => {
            if (prev <= 1) {
              clearInterval(countdown)
              setIsRateLimited(false)
              setRateLimitMessage('')
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
      
      return
    }

    // Rate limit geçildi, reCAPTCHA kontrolü yap
    setIsRecaptchaLoading(true)
    
    try {
      // reCAPTCHA token'ını al ve doğrula
      const recaptchaResult = await executeRecaptchaAction('chatbot_message')
      
      if (!recaptchaResult.success) {
        // reCAPTCHA başarısız
        const recaptchaBotMessage: Message = {
          id: Date.now().toString(),
          text: interpolate(t('chatbot.errors.recaptchaFailed'), { error: recaptchaResult.error || 'Bilinmeyen hata' }),
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, recaptchaBotMessage])
        return
      }

      // reCAPTCHA başarılı, mesajı işle
      setIsRateLimited(false)
      setRateLimitMessage('')
      setRetryAfter(0)
      setRemainingMessages(rateLimitResult.remainingMessages || 0)

      const userMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'user',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)
      
      // Cooldown'u kaydet
      recordMessageSent()

      try {
        // Gemini API'den yanıt al
        const geminiResponse = await generateGeminiResponse(text, locale)
        
        if (geminiResponse.success) {
          // API başarılı - hata durumunu temizle
          setIsApiError(false)
          setApiErrorMessage('')
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: geminiResponse.text,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          }
          setMessages(prev => [...prev, botMessage])
        } else {
          // API başarısız - hata durumunu ayarla
          setIsApiError(true)
          const errorMessages = {
            tr: '⚠️ AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin veya WhatsApp ile iletişime geçin.',
            en: '⚠️ AI service is currently unavailable. Please try again later or contact us via WhatsApp.',
            de: '⚠️ AI-Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns über WhatsApp.',
            fr: '⚠️ Le service IA est actuellement indisponible. Veuillez réessayer plus tard ou nous contacter via WhatsApp.',
            ru: '⚠️ AI-сервис в настоящее время недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами через WhatsApp.',
            ar: '⚠️ خدمة الذكاء الاصطناعي غير متاحة حالياً. يرجى المحاولة لاحقاً أو التواصل معنا عبر WhatsApp.'
          }
          setApiErrorMessage(errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr)
          
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          }
          setMessages(prev => [...prev, errorMessage])
        }
      } catch (error) {
        // Kritik hata durumu
        setIsApiError(true)
        const errorMessages = {
          tr: '❌ Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya WhatsApp ile iletişime geçin.',
          en: '❌ An unexpected error occurred. Please refresh the page or contact us via WhatsApp.',
          de: '❌ Ein unerwarteter Fehler ist aufgetreten. Bitte aktualisieren Sie die Seite oder kontaktieren Sie uns über WhatsApp.',
          fr: '❌ Une erreur inattendue s\'est produite. Veuillez actualiser la page ou nous contacter via WhatsApp.',
          ru: '❌ Произошла непредвиденная ошибка. Пожалуйста, обновите страницу или свяжитесь с нами через WhatsApp.',
          ar: '❌ حدث خطأ غير متوقع. يرجى تحديث الصفحة أو التواصل معنا عبر WhatsApp.'
        }
        setApiErrorMessage(errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr)
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    } catch (error) {
      // reCAPTCHA hatası durumunda fallback mesaj
      const recaptchaBotMessage: Message = {
        id: Date.now().toString(),
        text: t('chatbot.errors.recaptchaError'),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, recaptchaBotMessage])
    } finally {
      setIsRecaptchaLoading(false)
    }
  }


  const handleQuickReply = async (reply: QuickReply) => {
    // API hatası varsa mesaj gönderilmesini engelle
    if (isApiError) {
      return
    }
    
    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
      type: 'quick_reply'
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    
    try {
      // Gemini API'yi dene
      const geminiResponse = await generateGeminiResponse(reply.text, locale)
      
      if (geminiResponse.success) {
        // API başarılı - hata durumunu temizle
        setIsApiError(false)
        setApiErrorMessage('')
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: geminiResponse.text,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        // API başarısız - hata durumunu ayarla
        setIsApiError(true)
        const errorMessages = {
          tr: '⚠️ AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin veya WhatsApp ile iletişime geçin.',
          en: '⚠️ AI service is currently unavailable. Please try again later or contact us via WhatsApp.',
          de: '⚠️ AI-Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns über WhatsApp.',
          fr: '⚠️ Le service IA est actuellement indisponible. Veuillez réessayer plus tard ou nous contacter via WhatsApp.',
          ru: '⚠️ AI-сервис в настоящее время недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами через WhatsApp.',
          ar: '⚠️ خدمة الذكاء الاصطناعي غير متاحة حالياً. يرجى المحاولة لاحقاً أو التواصل معنا عبر WhatsApp.'
        }
        setApiErrorMessage(errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr)
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      // Kritik hata durumu
      setIsApiError(true)
      const errorMessages = {
        tr: '❌ Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya WhatsApp ile iletişime geçin.',
        en: '❌ An unexpected error occurred. Please refresh the page or contact us via WhatsApp.',
        de: '❌ Ein unerwarteter Fehler ist aufgetreten. Bitte aktualisieren Sie die Seite oder kontaktieren Sie uns über WhatsApp.',
        fr: '❌ Une erreur inattendue s\'est produite. Veuillez actualiser la page ou nous contacter via WhatsApp.',
        ru: '❌ Произошла непредвиденная ошибка. Пожалуйста, обновите страницу или свяжитесь с нами через WhatsApp.',
        ar: '❌ حدث خطأ غير متوقع. يرجى تحديث الصفحة أو التواصل معنا عبر WhatsApp.'
      }
      setApiErrorMessage(errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessages[locale as keyof typeof errorMessages] || errorMessages.tr,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Dinamik quick replies ve contact info
  const quickReplies = getQuickReplies(t)
  const contactInfo = getContactInfo(t)

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }


  return (
    <>
      {/* Chatbot Toggle Button - Modern UI/UX tasarım */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Welcome Message - Sadece kapalıyken ve görünürken göster */}
        {!isOpen && isWelcomeVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="absolute bottom-20 sm:bottom-24 right-0 mb-3 sm:mb-4"
          >
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl chatbot-welcome-message w-80 sm:w-96 relative">
              {/* Kapatma butonu */}
              <button
                onClick={() => setIsWelcomeVisible(false)}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-all duration-200 z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2 sm:space-x-3 pr-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  }}>
                    <Image 
                      src={aiIcon} 
                      alt="AI Assistant" 
                      width={28}
                      height={28}
                      className="w-5 h-5 sm:w-7 sm:h-7 object-contain rounded-full"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      {t('chatbot.welcome.greeting')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 leading-tight mt-1">
                    {t('chatbot.welcome.description')}
                  </div>
                </div>
              </div>
              {/* Ok işareti */}
              <div className="absolute -bottom-1 right-3 sm:right-4 w-3 h-3 bg-gradient-to-br from-slate-800/95 to-slate-900/95 transform rotate-45 border-r border-b border-slate-700/50"></div>
            </div>
          </motion.div>
        )}
        
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={toggleChatbot}
           className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center text-white transition-all duration-300 chatbot-button overflow-hidden focus:outline-none"
           style={{
             background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)'
           }}
           initial={{ 
             opacity: 0, 
             scale: 0.1, 
             rotate: -360,
             y: 100,
             x: 50
           }}
           animate={{ 
             opacity: 1, 
             scale: 1, 
             rotate: 0,
             y: 0,
             x: 0
           }}
           transition={{ 
             duration: 0.6, 
             ease: [0.68, -0.55, 0.265, 1.55],
             delay: 0.1
           }}
         >
           {/* Glow effect */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
           {/* Icon with animation */}
           <AnimatePresence mode="wait">
             {isOpen ? (
               <motion.div
                 key="close"
                 initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                 animate={{ rotate: 0, opacity: 1, scale: 1 }}
                 exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <X className="w-8 h-8 sm:w-10 sm:h-10 md:w-9 md:h-9 text-gray-300" />
               </motion.div>
             ) : (
               <motion.div
                 key="chat"
                 initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                 animate={{ rotate: 0, opacity: 1, scale: 1 }}
                 exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <Image 
                   src={aiIcon} 
                   alt="AI Assistant" 
                   width={48} 
                   height={48} 
                   className="w-10 h-10 sm:w-12 sm:h-12 md:w-11 md:h-11 object-contain rounded-full"
                 />
               </motion.div>
             )}
           </AnimatePresence>
           
           {/* Pulse animation when closed */}
           {!isOpen && (
             <motion.div
               className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
           )}
         </motion.button>
      </motion.div>

      {/* Chatbot Window - Ayrı konumlandırma, daha yukarıda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
             <div
               className="bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl shadow-2xl w-80 sm:w-[420px] h-[420px] sm:h-[600px] flex flex-col overflow-hidden chatbot-window"
               style={{
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
               }}
             >
            {/* Header */}
            <div className="flex items-center justify-between chatbot-header bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '24px 24px 0 0'
            }}>
              <div className="flex items-center space-x-3">
                 <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg w-10 h-10 overflow-hidden">
                   <Image 
                     src={aiIcon} 
                     alt="AI Assistant" 
                     width={32} 
                     height={32} 
                     className="w-8 h-8 object-contain"
                   />
                 </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-white text-base leading-none"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)',
                    margin: 0,
                    padding: 0
                  }}>Softiel AI</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full shadow-lg ${
                      isApiError
                        ? 'bg-red-500'
                        : isRateLimited 
                          ? 'bg-red-400' 
                          : 'bg-green-400 animate-pulse'
                    }`}
                         style={{
                           boxShadow: isApiError
                             ? '0 0 8px rgba(239, 68, 68, 0.8)'
                             : isRateLimited 
                               ? '0 0 8px rgba(239, 68, 68, 0.6)'
                               : '0 0 8px rgba(34, 197, 94, 0.6)'
                         }}></div>
        <p className={`text-sm font-medium leading-none ${
          isApiError
            ? 'text-red-500'
            : isRateLimited 
              ? 'text-red-400' 
              : (isSuspicious && riskScore > 0.7)
                ? 'text-yellow-400'
                : isFingerprintLoading
                  ? 'text-blue-400'
                  : isContentAnalyzing
                    ? 'text-purple-400'
                    : 'text-green-400'
        }`}
           style={{
             textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
             margin: 0,
             padding: 0
           }}>
          {isApiError
            ? 'AI Servisi Kullanılamıyor'
            : isRateLimited 
              ? `${t('chatbot.status.waiting')} (${retryAfter}s)` 
              : (isSuspicious && riskScore > 0.7)
                ? `Risk: ${(riskScore * 100).toFixed(0)}%`
                : isFingerprintLoading
                  ? t('chatbot.status.securityCheck')
                  : isContentAnalyzing
                    ? t('chatbot.status.contentAnalysis')
                    : t('chatbot.status.online')}
        </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChatbot}
                  className="p-2 text-slate-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all duration-200"
                  style={{
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 chatbot-messages bg-gradient-to-b from-slate-800/20 to-transparent">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} chatbot-message`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                           message.sender === 'user' 
                             ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                             : 'bg-gradient-to-br from-slate-700 to-slate-800'
                         }`}>
                           {message.sender === 'user' ? (
                             <User className="w-4 h-4 text-white" />
                           ) : (
                             <Image 
                               src={aiIcon} 
                               alt="AI Assistant" 
                               width={24} 
                               height={24} 
                               className="w-6 h-6 object-contain rounded-full"
                             />
                           )}
                         </div>
                        <div className={`rounded-xl px-4 py-3 shadow-md backdrop-blur-sm ${
                          message.sender === 'user'
                            ? 'text-white'
                            : 'text-slate-200'
                        }`}
                        style={message.sender === 'bot' ? {
                          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        } : message.sender === 'user' ? {
                          background: 'var(--chatbot-user-bg)',
                          boxShadow: 'var(--chatbot-user-shadow)'
                        } : {}}>
                          <p className="text-base leading-relaxed">
                            {typeof message.text === 'string' ? message.text : JSON.stringify(message.text)}
                          </p>
                          {message.type === 'contact_info' && (
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center space-x-3 text-sm">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.phone}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.email}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.workingHours}</span>
                              </div>
                            </div>
                          )}
                          {/* Aksiyon Butonları - Mesaj içeriğine göre otomatik */}
                          {message.sender === 'bot' && (() => {
                            // Önce message'daki actionType'ı kontrol et, yoksa içeriği analiz et
                            const actionType = message.actionType || detectActionType(message.text)
                            
                            if (!actionType) return null
                            
                            switch (actionType) {
                              case 'services':
                                return (
                                  <div className="mt-4">
                                    <button
                                      onClick={() => navigateToPage('services', locale)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                      <span>{t('chatbot.servicesButton', 'Hizmetlerimizi Gör')}</span>
                                    </button>
                                  </div>
                                )
                              
                              case 'pricing':
                                return (
                                  <div className="mt-4">
                                    <button
                                      onClick={() => navigateToPage('pricing', locale)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                      <span>{t('chatbot.pricingButton', 'Fiyatlandırma Sayfasına Git')}</span>
                                    </button>
                                  </div>
                                )
                              
                              case 'projects':
                                return (
                                  <div className="mt-4">
                                    <button
                                      onClick={() => navigateToPage('projects', locale)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                      <span>{t('chatbot.projectsButton', 'Projelerimizi Gör')}</span>
                                    </button>
                                  </div>
                                )
                              
                              case 'contact':
                                return (
                                  <div className="mt-4">
                                    <button
                                      onClick={() => navigateToPage('contact', locale)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                      <span>{t('chatbot.contactButton', 'İletişim Sayfasına Git')}</span>
                                    </button>
                                  </div>
                                )
                              
                              default:
                                return null
                            }
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg overflow-hidden">
                           <Image 
                             src={aiIcon} 
                             alt="AI Assistant" 
                             width={24} 
                             height={24} 
                             className="w-6 h-6 object-contain"
                           />
                         </div>
                        <div className="backdrop-blur-sm rounded-xl px-4 py-3 shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}>
                          <div className="flex space-x-1.5">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && !isApiError && !isRateLimited && !isFingerprintLoading && !isContentAnalyzing && !(isSuspicious && riskScore > 0.7) && canSendMessage && !(!isBehaviorHuman && behaviorRiskScore > 0.7) && (
                  <div className="px-4 pb-2 chatbot-quick-replies">
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 text-slate-200 hover:text-white text-sm rounded-lg chatbot-quick-reply shadow-sm hover:shadow-md backdrop-blur-sm border border-slate-600/30 hover:border-blue-400/50 transition-all duration-200 ease-out hover:scale-102"
                          style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(14, 165, 233, 0.1) 50%, rgba(59, 130, 246, 0.15) 75%, rgba(30, 41, 59, 0.8) 100%)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-5 chatbot-input bg-gradient-to-t from-slate-800/40 to-transparent">
                  {/* WhatsApp İletişim Butonu */}
                  <div className="mb-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openWhatsApp(locale)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>{getWhatsAppButtonText(locale)}</span>
                    </motion.button>
                  </div>
                  
                  {/* Güvenlik bilgisi */}
                  <div className="flex items-center justify-center space-x-2 mb-3 pb-2 border-b border-slate-700/30">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">
                      Güvenli bağlantı - reCAPTCHA korumalı
                    </span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Honeypot Tuzakları - Görünmez alanlar */}
                    {honeypotFields.map((field) => (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="honeypot-field"
                        style={field.style}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                    ))}
                    
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isApiError && !isRateLimited && !isRecaptchaLoading && !isFingerprintLoading && !isContentAnalyzing && !(isSuspicious && riskScore > 0.7) && canSendMessage && !(!isBehaviorHuman && behaviorRiskScore > 0.7) && handleSendMessage(inputValue)}
                      placeholder={
                        isApiError
                          ? apiErrorMessage
                          : isRateLimited 
                            ? `${t('chatbot.placeholders.waiting')} (${retryAfter}s)` 
                            : isFingerprintLoading
                              ? t('chatbot.placeholders.securityCheck')
                              : isContentAnalyzing
                                ? t('chatbot.placeholders.contentAnalysis')
                                : (!isBehaviorHuman && behaviorRiskScore > 0.7)
                                  ? t('chatbot.placeholders.behaviorAnalysis')
                                  : (isSuspicious && riskScore > 0.7)
                                    ? t('chatbot.placeholders.blocked')
                                    : t('chatbot.placeholders.typeMessage')
                      }
                      disabled={isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)}
                      className={`flex-1 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-slate-400 text-base focus:outline-none transition-all duration-200 chatbot-input shadow-md ${
                        isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{
                        background: isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)
                          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.3) 50%, rgba(30, 41, 59, 0.4) 100%)'
                          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 50%, rgba(30, 41, 59, 0.8) 100%)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        border: isApiError
                          ? '2px solid rgba(239, 68, 68, 0.5)'
                          : isRateLimited 
                            ? '2px solid rgba(239, 68, 68, 0.3)'
                            : isRecaptchaLoading
                              ? '2px solid rgba(59, 130, 246, 0.3)'
                              : (isSuspicious && riskScore > 0.7)
                                ? '2px solid rgba(245, 158, 11, 0.3)'
                                : '2px solid rgba(148, 163, 184, 0.1)'
                      }}
                    />
                      <motion.button
                        whileHover={!isApiError && !isRateLimited && !isRecaptchaLoading && !isFingerprintLoading && !isContentAnalyzing && !(isSuspicious && riskScore > 0.7) && canSendMessage && !(!isBehaviorHuman && behaviorRiskScore > 0.7) ? { scale: 1.05 } : {}}
                        whileTap={!isApiError && !isRateLimited && !isRecaptchaLoading && !isFingerprintLoading && !isContentAnalyzing && !(isSuspicious && riskScore > 0.7) && canSendMessage && !(!isBehaviorHuman && behaviorRiskScore > 0.7) ? { scale: 0.95 } : {}}
                        onClick={() => !isApiError && !isRateLimited && !isRecaptchaLoading && !isFingerprintLoading && !isContentAnalyzing && !(isSuspicious && riskScore > 0.7) && canSendMessage && !(!isBehaviorHuman && behaviorRiskScore > 0.7) && handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)}
                        className={`p-3 text-white rounded-xl transition-all duration-200 chatbot-button shadow-md backdrop-blur-sm ${
                          isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg'
                        }`}
                        style={{
                          background: isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)
                            ? 'rgba(100, 100, 100, 0.3)'
                            : 'var(--chatbot-user-bg)',
                          boxShadow: isApiError || isRateLimited || isRecaptchaLoading || isFingerprintLoading || isContentAnalyzing || (isSuspicious && riskScore > 0.7) || !canSendMessage || (!isBehaviorHuman && behaviorRiskScore > 0.7)
                            ? 'none'
                            : 'var(--chatbot-user-shadow)'
                        }}
                      >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Ana Chatbot component'i - ReCAPTCHA Provider ile sarmalanmış
export function Chatbot() {
  // Her zaman Provider ile sarmala (hook'lar conditional olamaz)
  // Localhost'ta bile Provider olmalı, ama executeRecaptcha null olacak
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_CONFIG.siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'body', // head yerine body'ye ekle
        nonce: undefined,
      }}
      container={{
        element: undefined,
        parameters: {
          badge: 'inline', // Badge'i inline yap
          theme: 'dark'
        }
      }}
    >
      <ChatbotContent />
    </GoogleReCaptchaProvider>
  )
}
