import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/components/theme-provider';
import { QueryProvider } from '@/app/components/query-provider';
import { ErrorBoundary } from '@/app/components/ui/error-boundary';
import Footer from '@/app/components/layout/footer';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.PUBLIC_APP_URL ||
  'https://aniruddhaponnuri.vercel.app';
const profileName = process.env.NEXT_PUBLIC_PROFILE_NAME || 'Ponnuri Aniruddha';

// Variable fonts tuned for a stronger editorial feel.
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${profileName} - AI/ML Developer & Data Engineer`,
    template: `%s | ${profileName}`,
  },
  description: 'AI/ML developer and data engineer focused on useful systems, clean interfaces, and production-ready machine learning.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Data Engineering', 'Full Stack Developer', 'React', 'Next.js', 'Python', 'TypeScript', 'Portfolio', 'Chennai', 'India'],
  authors: [{ name: profileName, url: siteUrl }],
  creator: profileName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/image.webp',
    shortcut: '/images/image.webp',
    apple: '/images/image.webp',
  },
  openGraph: {
    title: `${profileName} - AI/ML Developer & Data Engineer`,
    description: 'Explore selected AI/ML and data engineering projects with a focus on execution quality and practical impact.',
    url: siteUrl,
    siteName: `${profileName} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileName} - AI/ML Developer & Data Engineer`,
    description: 'AI/ML and data engineering portfolio with selected projects, writing, and contact details.',
  },
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  // },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased selection:bg-primary/20" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <QueryProvider>
              <main className="relative">{children}</main>
              <Footer />
            </QueryProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}