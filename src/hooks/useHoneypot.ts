"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  checkHoneypotFields, 
  generateHoneypotFields, 
  getRandomHoneypotFields,
  cleanHoneypotData,
  initializeHoneypot,
  HoneypotResult 
} from '@/lib/honeypotSystem'

export interface HoneypotHookResult {
  honeypotFields: Array<{
    name: string;
    type: string;
    placeholder: string;
    style: React.CSSProperties;
  }>;
  checkFormData: (formData: Record<string, string>) => HoneypotResult;
  cleanData: (formData: Record<string, string>) => Record<string, string>;
  isInitialized: boolean;
  rotateFields: () => void;
}

export function useHoneypot(): HoneypotHookResult {
  const [honeypotFields, setHoneypotFields] = useState<Array<{
    name: string;
    type: string;
    placeholder: string;
    style: React.CSSProperties;
  }>>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Honeypot alanlarını başlat
  const initializeFields = useCallback(() => {
    try {
      initializeHoneypot();
      const fields = getRandomHoneypotFields(3); // 3 rastgele alan
      setHoneypotFields(fields);
      setIsInitialized(true);
    } catch (error) {
      console.error('Honeypot initialization error:', error);
      setIsInitialized(false);
    }
  }, []);

  // Form verilerini kontrol et
  const checkFormData = useCallback((formData: Record<string, string>): HoneypotResult => {
    try {
      return checkHoneypotFields(formData);
    } catch (error) {
      console.error('Honeypot check error:', error);
      return {
        isBot: false,
        detectedFields: [],
        riskScore: 0
      };
    }
  }, []);

  // Verileri temizle
  const cleanData = useCallback((formData: Record<string, string>): Record<string, string> => {
    try {
      return cleanHoneypotData(formData);
    } catch (error) {
      console.error('Honeypot clean error:', error);
      return formData;
    }
  }, []);

  // Alanları değiştir
  const rotateFields = useCallback(() => {
    try {
      const newFields = getRandomHoneypotFields(3);
      setHoneypotFields(newFields);
    } catch (error) {
      console.error('Honeypot rotate error:', error);
    }
  }, []);

  // İlk yüklemede başlat
  useEffect(() => {
    initializeFields();
  }, [initializeFields]);

  // Periyodik olarak alanları değiştir (5 dakikada bir)
  useEffect(() => {
    const interval = setInterval(() => {
      rotateFields();
    }, 300000); // 5 dakika

    return () => clearInterval(interval);
  }, [rotateFields]);

  return {
    honeypotFields,
    checkFormData,
    cleanData,
    isInitialized,
    rotateFields
  };
}


