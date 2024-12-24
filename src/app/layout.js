import { Poppins } from 'next/font/google';
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import CtaSection from './components/ctaSection';
import FooterSection from './components/footerSection';
import { Providers } from './providers';
import HeaderSection from './components/headerSection';
import FacebookPixel from '@/components/FacebookPixel';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export const metadata = {
  title: {
    default: 'Mighty Grains - Traditional South Indian Baby Food',
    template: '%s | Mighty Grains'
  },
  description: 'Discover Mighty Grains\' traditional South Indian baby food for infants 6 months and above, including Sprouted Ragi Seri and Sprouted Sattumaavu. Crafted in Bangalore with love using Ragi, millets, nuts, and 22+ natural ingredients. Now available for international shipping.',
  generator: 'Next.js',
  applicationName: 'Mighty Grains',
  referrer: 'origin-when-cross-origin',
  keywords: ['baby food', 'South Indian', 'Ragi', 'Sattumaavu', 'sprouted grains', 'traditional recipes', 'natural ingredients', 'Bangalore', 'Karnataka', 'babies 6 months and above'],
  authors: [{ name: 'Dayani Prasad', url: 'https://www.mightygrains.in/about' }],
  creator: 'Dayani Prasad',
  publisher: 'Mighty Grains',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mighty Grains - Nourishing Traditions for Little Ones',
    description: 'Discover our traditional South Indian baby food made with sprouted Ragi and 22+ natural ingredients. Pediatrician-approved nutrition for babies 6 months and above. Crafted in Bangalore and available for international shipping.',
    url: 'https://www.mightygrains.in',
    siteName: 'Mighty Grains',
    images: [
      {
        url: 'https://www.mightygrains.in/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Mighty Grains products display',
      },
    ],
    locale: 'en_IN',
    type: 'website',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  manifest: 'https://www.mightygrains.in/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Mighty Grains - Traditional South Indian Baby Food',
    description: 'Nourish your baby (6 months+) with our sprouted Ragi and Sattumaavu products. 100% natural, pediatrician-approved, made in Bangalore. International shipping available.',
    creator: '@mightygrains',
    images: {
      url: 'https://www.mightygrains.in/twitter-image.png',
      alt: 'Mighty Grains product range',
    },
  },
  verification: {
    google: 'LgcU2T6ZKqKdHZMC6rtrQajvPuX-Y7W-aqHpb0ya1hs',
    other: {
      me: ['mailto:dayani.prasad@gmail.com', 'https://www.mightygrains.in'],
    },
  },
  category: 'Food & Beverage',
  other: {
    region: 'Karnataka, South India',
    ageGroup: '6 months and above',
    shipping: 'International shipping available',
    healthBenefits: [
      'Ragi: Rich in calcium for strong bones and teeth',
      'Millets: High in fiber and protein for healthy digestion and growth',
      'Nuts: Packed with healthy fats and vitamins for brain development',
      'Natural ingredients: Provide essential nutrients for overall development',
      'Sprouted grains: Enhanced nutrient absorption and easier digestion'
    ]
  }
}
// <meta name="google-site-verification" content="LgcU2T6ZKqKdHZMC6rtrQajvPuX-Y7W-aqHpb0ya1hs" />

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffbeb",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <FacebookPixel />
        <GoogleAnalytics gaId="G-DJF4L757YF" />
        <Providers>
          <HeaderSection />
          <main className="pt-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}