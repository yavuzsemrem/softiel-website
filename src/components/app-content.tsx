"use client";

import { useI18n } from "@/contexts/i18n-context";
import { LoadingScreen } from "@/components/loading-screen";

interface AppContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const { isChangingLocale, t } = useI18n();

  if (isChangingLocale) {
    return <LoadingScreen message={t('common.changingLanguage', 'Dil değiştiriliyor...')} />;
  }

  return <>{children}</>;
}
