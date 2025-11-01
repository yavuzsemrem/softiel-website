"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  generateUserFingerprint, 
  analyzeFingerprint, 
  storeFingerprint, 
  getStoredFingerprint,
  generateFingerprintHash,
  UserFingerprint 
} from '@/lib/fingerprinting'

export interface FingerprintResult {
  fingerprint: UserFingerprint | null;
  hash: string | null;
  riskScore: number;
  isSuspicious: boolean;
  reasons: string[];
  isLoading: boolean;
  error: string | null;
}

export function useFingerprinting(sessionId: string) {
  const [result, setResult] = useState<FingerprintResult>({
    fingerprint: null,
    hash: null,
    riskScore: 0,
    isSuspicious: false,
    reasons: [],
    isLoading: true,
    error: null
  });

  const generateFingerprint = useCallback(async () => {
    try {
      setResult(prev => ({ ...prev, isLoading: true, error: null }));

      // Önce stored fingerprint'i kontrol et
      const storedFingerprint = getStoredFingerprint();
      
      if (storedFingerprint && storedFingerprint.sessionId === sessionId) {
        // Stored fingerprint'i kullan
        const analysis = analyzeFingerprint(storedFingerprint);
        const hash = generateFingerprintHash(storedFingerprint);
        
        setResult({
          fingerprint: storedFingerprint,
          hash,
          riskScore: analysis.riskScore,
          isSuspicious: analysis.isSuspicious,
          reasons: analysis.reasons,
          isLoading: false,
          error: null
        });
        return;
      }

      // Yeni fingerprint oluştur
      const fingerprint = generateUserFingerprint(sessionId);
      const analysis = analyzeFingerprint(fingerprint);
      const hash = generateFingerprintHash(fingerprint);

      // Fingerprint'i sakla
      storeFingerprint(fingerprint);

      setResult({
        fingerprint,
        hash,
        riskScore: analysis.riskScore,
        isSuspicious: analysis.isSuspicious,
        reasons: analysis.reasons,
        isLoading: false,
        error: null
      });

    } catch (error) {
      console.error('Fingerprint generation error:', error);
      setResult(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Fingerprint generation failed'
      }));
    }
  }, [sessionId]);

  const refreshFingerprint = useCallback(() => {
    generateFingerprint();
  }, [generateFingerprint]);

  const clearFingerprint = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatbot_fingerprint');
    }
    setResult({
      fingerprint: null,
      hash: null,
      riskScore: 0,
      isSuspicious: false,
      reasons: [],
      isLoading: true,
      error: null
    });
  }, []);

  useEffect(() => {
    generateFingerprint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...result,
    refreshFingerprint,
    clearFingerprint
  };
}


