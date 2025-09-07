import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/provider/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};

export const metadata: Metadata = {
  title: 'We Care: Cloud-Based Pathology Lab Management Software',
  description:
    'Streamline your pathology lab with We Care, a cloud-based SaaS solution. Automate sample tracking, reporting, and billing, integrate with EHR systems, and share QR-enabled reports via WhatsApp, SMS, or Email. HIPAA-compliant and scalable for all labs.',
  keywords:
    'pathology lab software, laboratory information system, LIMS, cloud-based lab management, pathology reporting software, EHR integration, sample tracking, automated billing, QR code reports, HIPAA compliant, lab analytics, diagnostic lab software, patient management',
  authors: [{ name: 'We Care Team', url: 'https://www.wecarelab.com' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'We Care: Advanced Pathology Lab Management SaaS',
    description:
      'Transform your lab with We Care&apos;s cloud-based software. Automate workflows, manage patient data, and share reports securely. Start your free trial today!',
    type: 'website',
    url: 'https://www.wecarelab.com',
    siteName: 'We Care',
    images: [
      {
        url: 'https://www.wecarelab.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'We Care Pathology Lab Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Care: Cloud-Based Pathology Lab Management Software',
    description:
      'Discover We Care, the ultimate SaaS for pathology labs. Automate sample tracking, reporting, and billing with seamless EHR integration.',
    images: ['https://www.wecarelab.com/assets/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.wecarelab.com',
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // pick the weights you need
  variable: '--font-ibm-plex-sans', // define a CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none antialiased',
          ibmPlexSans.variable,
          geistSans.variable,
          geistMono.variable,
          fontVariables,
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            duration={3000}
            visibleToasts={1}
            position="bottom-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
