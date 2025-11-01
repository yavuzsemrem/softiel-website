"use client"

import { useState, useCallback } from 'react'
import { 
  analyzeContent, 
  cleanMessage, 
  isMessageSafe, 
  generateMessageSuggestions,
  getMessageStats,
  ContentAnalysisResult 
} from '@/lib/contentAnalyzer'

export interface ContentAnalysisHookResult {
  analyzeMessage: (text: string) => ContentAnalysisResult;
  cleanMessage: (text: string) => string;
  isMessageSafe: (text: string) => boolean;
  getSuggestions: (text: string) => string[];
  getStats: (text: string) => {
    length: number;
    wordCount: number;
    characterCount: number;
    spaceCount: number;
    uniqueCharCount: number;
    diversityRatio: number;
  };
  lastAnalysis: ContentAnalysisResult | null;
  isAnalyzing: boolean;
}

export function useContentAnalysis(): ContentAnalysisHookResult {
  const [lastAnalysis, setLastAnalysis] = useState<ContentAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMessage = useCallback((text: string): ContentAnalysisResult => {
    if (!text || text.trim().length === 0) {
      return {
        isSpam: false,
        isHarmful: false,
        isSuspicious: false,
        riskScore: 0,
        reasons: [],
        detectedPatterns: [],
        suggestions: []
      };
    }

    setIsAnalyzing(true);
    
    try {
      const analysis = analyzeContent(text);
      setLastAnalysis(analysis);
      return analysis;
    } catch (error) {
      console.error('Content analysis error:', error);
      const errorAnalysis: ContentAnalysisResult = {
        isSpam: false,
        isHarmful: false,
        isSuspicious: false,
        riskScore: 0,
        reasons: ['Analiz hatası'],
        detectedPatterns: [],
        suggestions: ['Lütfen mesajınızı tekrar deneyin']
      };
      setLastAnalysis(errorAnalysis);
      return errorAnalysis;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const cleanMessageText = useCallback((text: string): string => {
    return cleanMessage(text);
  }, []);

  const isMessageSafeCheck = useCallback((text: string): boolean => {
    return isMessageSafe(text);
  }, []);

  const getSuggestions = useCallback((text: string): string[] => {
    return generateMessageSuggestions(text);
  }, []);

  const getStats = useCallback((text: string) => {
    return getMessageStats(text);
  }, []);

  return {
    analyzeMessage,
    cleanMessage: cleanMessageText,
    isMessageSafe: isMessageSafeCheck,
    getSuggestions,
    getStats,
    lastAnalysis,
    isAnalyzing
  };
}


