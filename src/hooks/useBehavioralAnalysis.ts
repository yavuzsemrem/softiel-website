"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  getBehaviorTracker, 
  analyzeBehavior, 
  BehaviorData, 
  BehaviorAnalysis,
  initializeBehaviorAnalysis 
} from '@/lib/behavioralAnalysis'

export interface UseBehavioralAnalysisResult {
  behaviorData: BehaviorData | null
  analysis: BehaviorAnalysis | null
  isHuman: boolean
  confidence: number
  riskScore: number
  reasons: string[]
  suggestions: string[]
  isLoading: boolean
  refreshAnalysis: () => void
}

export function useBehavioralAnalysis(): UseBehavioralAnalysisResult {
  const [behaviorData, setBehaviorData] = useState<BehaviorData | null>(null)
  const [analysis, setAnalysis] = useState<BehaviorAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Davranış analizi yap
  const performAnalysis = useCallback(() => {
    try {
      const tracker = getBehaviorTracker()
      const data = tracker.analyzeBehavior()
      const analysisResult = analyzeBehavior(data)
      
      setBehaviorData(data)
      setAnalysis(analysisResult)
      setIsLoading(false)
    } catch (error) {
      console.error('Behavioral analysis error:', error)
      setIsLoading(false)
    }
  }, [])

  // Analizi yenile
  const refreshAnalysis = useCallback(() => {
    setIsLoading(true)
    performAnalysis()
  }, [performAnalysis])

  // İlk yüklemede analiz yap
  useEffect(() => {
    initializeBehaviorAnalysis()
    
    // İlk analiz için kısa bir gecikme
    const timer = setTimeout(() => {
      performAnalysis()
    }, 2000) // 2 saniye sonra ilk analiz

    return () => clearTimeout(timer)
  }, [performAnalysis])

  // Periyodik analiz (30 saniyede bir)
  useEffect(() => {
    const interval = setInterval(() => {
      performAnalysis()
    }, 30000)

    return () => clearInterval(interval)
  }, [performAnalysis])

  return {
    behaviorData,
    analysis,
    isHuman: analysis?.isHuman ?? true, // Varsayılan olarak insan kabul et
    confidence: analysis?.confidence ?? 0.5,
    riskScore: analysis?.riskScore ?? 0,
    reasons: analysis?.reasons ?? [],
    suggestions: analysis?.suggestions ?? [],
    isLoading,
    refreshAnalysis
  }
}
