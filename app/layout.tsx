import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { AppProviders } from '@/components/providers/AppProviders';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'FanForGood | Celebrity Charity Platform',
    template: '%s | FanForGood',
  },
  description:
    'Support charitable causes through official celebrity merchandise. Shop, give back, and earn chances to meet your favorite stars.',
  keywords: [
    'celebrity charity',
    'fan merchandise',
    'meet and greet',
    'charitable giving',
    'FanForGood',
  ],
  openGraph: {
    title: 'FanForGood | Meet Celebrities While Changing Lives',
    description:
      'Official celebrity merchandise that funds verified charities and exclusive experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
