"use client"

import dynamic from "next/dynamic"

// Tüm provider'ları lazy load et
const NotificationProvider = dynamic(() => import("@/contexts/notification-context").then(mod => ({ default: mod.NotificationProvider })), {
  ssr: false,
  loading: () => <div />
});

const I18nProvider = dynamic(() => import("@/contexts/i18n-context").then(mod => ({ default: mod.I18nProvider })), {
  ssr: false,
  loading: () => <div />
});

const AppContent = dynamic(() => import("@/components/app-content").then(mod => ({ default: mod.AppContent })), {
  ssr: false,
  loading: () => <div />
});

const RecaptchaProvider = dynamic(() => import("@/components/recaptcha-provider").then(mod => ({ default: mod.RecaptchaProvider })), {
  ssr: false,
  loading: () => <div />
});

interface LazyProvidersProps {
  children: React.ReactNode;
}

export default function LazyProviders({ children }: LazyProvidersProps) {
  return (
    <RecaptchaProvider>
      <I18nProvider>
        <NotificationProvider>
          <AppContent>
            {children}
          </AppContent>
        </NotificationProvider>
      </I18nProvider>
    </RecaptchaProvider>
  );
}


