import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/contexts/notification-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Softiel - Modern Web Ajansı",
  description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.",
  keywords: "web tasarım, web geliştirme, SEO, dijital pazarlama, mobil uygulama, yapay zeka",
  authors: [{ name: "Softiel" }],
  openGraph: {
    title: "Softiel - Modern Web Ajansı",
    description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Next.js Dev Tools butonunu kaldır
              const removeNextJSBadge = () => {
                const badges = document.querySelectorAll('[data-next-badge="true"], [data-nextjs-dev-tools-button="true"], #next-logo');
                badges.forEach(badge => {
                  badge.style.display = 'none';
                  badge.remove();
                });
              };
              
              // Sayfa yüklendiğinde çalıştır
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeNextJSBadge);
              } else {
                removeNextJSBadge();
              }
              
              // MutationObserver ile dinamik olarak eklenen elementleri de kaldır
              const observer = new MutationObserver(() => {
                removeNextJSBadge();
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
