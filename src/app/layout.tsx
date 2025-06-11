import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/components/theme-provider';
import { QueryProvider } from '@/app/components/query-provider';
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
  title: 'Portfolio - Ponnuri Aniruddha',
  description: 'AI/ML Developer and Data Engineer Portfolio',
  keywords: ['AI', 'ML', 'Data Engineering', 'Full Stack', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Ponnuri Aniruddha' }],
  creator: 'Ponnuri Aniruddha',
  openGraph: {
    title: 'Portfolio - Ponnuri Aniruddha',
    description: 'AI/ML Developer and Data Engineer Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Ponnuri Aniruddha',
    description: 'AI/ML Developer and Data Engineer Portfolio',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <main className="relative">{children}</main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}