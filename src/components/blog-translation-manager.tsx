"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Globe, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { translateBlogPost } from '@/lib/translation-service';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  language: string;
}

interface TranslationStatus {
  language: string;
  status: 'pending' | 'translating' | 'completed' | 'error';
  translatedPost?: BlogPost;
  error?: string;
}

interface BlogTranslationManagerProps {
  originalPost: BlogPost;
  onTranslationComplete: (translations: BlogPost[]) => void;
}

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export function BlogTranslationManager({ 
  originalPost, 
  onTranslationComplete 
}: BlogTranslationManagerProps) {
  const [translations, setTranslations] = useState<TranslationStatus[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);

  const startTranslation = async () => {
    setIsTranslating(true);
    
    // Başlangıç durumunu ayarla
    const initialTranslations = supportedLanguages.map(lang => ({
      language: lang.code,
      status: 'pending' as const
    }));
    
    setTranslations(initialTranslations);
    
    const completedTranslations: BlogPost[] = [];
    
    // Her dil için çeviri yap
    for (let i = 0; i < supportedLanguages.length; i++) {
      const lang = supportedLanguages[i];
      
      // Durumu "çeviriliyor" olarak güncelle
      setTranslations(prev => 
        prev.map(t => 
          t.language === lang.code 
            ? { ...t, status: 'translating' as const }
            : t
        )
      );
      
      try {
        const translatedPost = await translateBlogPost({
          title: originalPost.title,
          content: originalPost.content,
          excerpt: originalPost.excerpt,
          category: originalPost.category
        }, lang.code);
        
        const translatedBlogPost: BlogPost = {
          ...translatedPost,
          id: `${originalPost.id}-${lang.code}`,
          language: lang.code
        };
        
        completedTranslations.push(translatedBlogPost);
        
        // Durumu "tamamlandı" olarak güncelle
        setTranslations(prev => 
          prev.map(t => 
            t.language === lang.code 
              ? { 
                  ...t, 
                  status: 'completed' as const, 
                  translatedPost: translatedBlogPost 
                }
              : t
          )
        );
        
      } catch (error) {
        console.error(`${lang.code} çeviri hatası:`, error);
        
        // Durumu "hata" olarak güncelle
        setTranslations(prev => 
          prev.map(t => 
            t.language === lang.code 
              ? { 
                  ...t, 
                  status: 'error' as const, 
                  error: 'Çeviri başarısız' 
                }
              : t
          )
        );
      }
    }
    
    setIsTranslating(false);
    onTranslationComplete(completedTranslations);
  };

  const getStatusIcon = (status: TranslationStatus['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      case 'translating':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (status: TranslationStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'Bekliyor';
      case 'translating':
        return 'Çevriliyor...';
      case 'completed':
        return 'Tamamlandı';
      case 'error':
        return 'Hata';
    }
  };

  const getStatusColor = (status: TranslationStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'translating':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'error':
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Blog Yazısı Çevirisi</span>
        </CardTitle>
        <CardDescription>
          "{originalPost.title}" yazısını desteklenen dillere otomatik olarak çevirin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Orijinal yazı bilgisi */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Orijinal Yazı</h4>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Başlık:</strong> {originalPost.title}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Kategori:</strong> {originalPost.category}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Dil:</strong> Türkçe
          </p>
        </div>

        {/* Çeviri durumları */}
        {translations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Çeviri Durumu</h4>
            {translations.map((translation) => {
              const langInfo = supportedLanguages.find(l => l.code === translation.language);
              return (
                <div
                  key={translation.language}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{langInfo?.flag}</span>
                    <span className="font-medium">{langInfo?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(translation.status)}
                    <Badge className={getStatusColor(translation.status)}>
                      {getStatusText(translation.status)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Çeviri butonu */}
        <div className="flex justify-end">
          <Button
            onClick={startTranslation}
            disabled={isTranslating}
            className="flex items-center space-x-2"
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Çeviriliyor...</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span>Çevirileri Başlat</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

