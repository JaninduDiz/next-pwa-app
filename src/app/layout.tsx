import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PwaProvider } from '@/components/pwa-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { OfflineIndicator } from '@/components/offline-indicator';

const APP_NAME = "NextPWA Learner";
const APP_DESCRIPTION = "An educational app to learn about Progressive Web Apps with Next.js.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export const viewport: Viewport = {
  themeColor: "#673AB7",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <PwaProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <OfflineIndicator />
        </PwaProvider>
        <Toaster />
      </body>
    </html>
  );
}
