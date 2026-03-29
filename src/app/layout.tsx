import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/components/theme-provider';
import { QueryProvider } from '@/app/components/query-provider';
import { ErrorBoundary } from '@/app/components/ui/error-boundary';
import Footer from '@/app/components/layout/footer';

// Variable fonts for better text scaling and performance
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ponnuri Aniruddha - AI/ML Developer & Data Engineer',
    template: '%s | Ponnuri Aniruddha'
  },
  description: 'Aspiring AI/ML Developer and Data Engineer specializing in building innovative solutions using machine learning, data engineering, and modern web technologies. View my projects and experience.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Data Engineering', 'Full Stack Developer', 'React', 'Next.js', 'Python', 'TypeScript', 'Portfolio', 'Chennai', 'India'],
  authors: [{ name: 'Ponnuri Aniruddha', url: 'https://aniruddhaponnuri.vercel.app' }],
  creator: 'Ponnuri Aniruddha',
  metadataBase: new URL('https://aniruddhaponnuri.vercel.app'),
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
    title: 'Ponnuri Aniruddha - AI/ML Developer & Data Engineer',
    description: 'Aspiring AI/ML Developer and Data Engineer specializing in building innovative solutions. Explore my portfolio of projects in machine learning, data engineering, and web development.',
    url: 'https://aniruddhaponnuri.vercel.app',
    siteName: 'Ponnuri Aniruddha Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponnuri Aniruddha - AI/ML Developer & Data Engineer',
    description: 'Aspiring AI/ML Developer and Data Engineer. View my portfolio of AI/ML and data engineering projects.',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
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