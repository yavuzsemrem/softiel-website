"use client"

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { verifyRecaptchaToken, generateMockToken, isRecaptchaAvailable } from '@/lib/recaptcha'
import { RecaptchaResult } from '@/lib/recaptcha'

export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const executeRecaptchaAction = async (action: string = 'chatbot_message'): Promise<RecaptchaResult> => {
    // reCAPTCHA kullanılabilir değilse mock token döndür
    if (!isRecaptchaAvailable()) {
      return {
        success: true,
        score: 0.9,
        token: generateMockToken()
      }
    }

    // executeRecaptcha fonksiyonu yoksa (localhost) mock token döndür
    if (!executeRecaptcha) {
      return {
        success: true,
        score: 0.9,
        token: generateMockToken()
      }
    }

    try {
      // reCAPTCHA token'ını al
      const token = await executeRecaptcha(action)
      
      if (!token) {
        return {
          success: false,
          error: 'Failed to get reCAPTCHA token'
        }
      }

      // Token'ı doğrula
      const verificationResult = await verifyRecaptchaToken(token)
      
      return verificationResult
    } catch (error) {
      console.error('reCAPTCHA execution error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'reCAPTCHA execution failed'
      }
    }
  }

  return {
    executeRecaptchaAction,
    isAvailable: isRecaptchaAvailable()
  }
}