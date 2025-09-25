"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  checkAllCooldowns, 
  recordMessage, 
  getCooldownStatus,
  resetSessionCooldown,
  startSessionCooldown,
  CooldownResult 
} from '@/lib/cooldownSystem'

export interface CooldownHookResult {
  canSend: boolean;
  remainingTime: number;
  reason?: string;
  cooldownType?: 'message' | 'session' | 'none';
  isInCooldown: boolean;
  messageCount: number;
  sessionDuration: number;
  cooldownRemaining: number;
  recordMessageSent: () => void;
  resetCooldown: () => void;
  startCooldown: (duration?: number) => void;
  checkCooldown: () => CooldownResult;
  isLoading: boolean;
}

export function useCooldown(sessionId: string): CooldownHookResult {
  const [cooldownStatus, setCooldownStatus] = useState<CooldownResult>({
    canSend: true,
    remainingTime: 0,
    cooldownType: 'none'
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkCooldown = useCallback((): CooldownResult => {
    try {
      const result = checkAllCooldowns(sessionId);
      setCooldownStatus(result);
      return result;
    } catch (error) {
      console.error('Cooldown check error:', error);
      return {
        canSend: true,
        remainingTime: 0,
        cooldownType: 'none'
      };
    }
  }, [sessionId]);

  const recordMessageSent = useCallback(() => {
    try {
      recordMessage(sessionId);
      // Mesaj kaydedildikten sonra cooldown'u tekrar kontrol et
      checkCooldown();
    } catch (error) {
      console.error('Record message error:', error);
    }
  }, [sessionId, checkCooldown]);

  const resetCooldown = useCallback(() => {
    try {
      resetSessionCooldown(sessionId);
      checkCooldown();
    } catch (error) {
      console.error('Reset cooldown error:', error);
    }
  }, [sessionId, checkCooldown]);

  const startCooldown = useCallback((duration?: number) => {
    try {
      startSessionCooldown(sessionId, duration);
      checkCooldown();
    } catch (error) {
      console.error('Start cooldown error:', error);
    }
  }, [sessionId, checkCooldown]);

  // Cooldown durumunu periyodik olarak güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      checkCooldown();
    }, 1000); // Her saniye kontrol et

    return () => clearInterval(interval);
  }, [checkCooldown]);

  // İlk yüklemede cooldown'u kontrol et
  useEffect(() => {
    checkCooldown();
  }, [checkCooldown]);

  // Detaylı durum bilgisi al
  const getDetailedStatus = useCallback(() => {
    try {
      return getCooldownStatus(sessionId);
    } catch (error) {
      console.error('Get detailed status error:', error);
      return {
        canSend: true,
        remainingTime: 0,
        cooldownType: 'none' as const,
        stats: {
          messageCount: 0,
          sessionDuration: 0,
          isInCooldown: false,
          cooldownRemaining: 0
        }
      };
    }
  }, [sessionId]);

  const detailedStatus = getDetailedStatus();

  return {
    canSend: cooldownStatus.canSend,
    remainingTime: cooldownStatus.remainingTime,
    reason: cooldownStatus.reason,
    cooldownType: cooldownStatus.cooldownType,
    isInCooldown: detailedStatus.stats.isInCooldown,
    messageCount: detailedStatus.stats.messageCount,
    sessionDuration: detailedStatus.stats.sessionDuration,
    cooldownRemaining: detailedStatus.stats.cooldownRemaining,
    recordMessageSent,
    resetCooldown,
    startCooldown,
    checkCooldown,
    isLoading
  };
}
