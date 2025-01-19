import { HomePage } from "@/components/HomePage";
import Carousel from "@/components/UI/carousel/Carousel";
import { EmblaOptionsType } from 'embla-carousel';
import { Footer } from "@/components/Footer";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Pure Raw and Organic Artisan Honey - Direct From the Hive to You',
  description: "Pure raw organic premium honey, honeycomb, bee pollen and bee skincare from artisan beekeepers. Unpasteurised and natural, on sale from Europe | Germany",
  keywords: [
    'raw honey',
    'organic honey',
    'artisan honey',
    'honeycomb',
    'bee products',
    'bee pollen',
    'natural skincare',
    'Germany honey',
  ],
  openGraph: {
    title: 'Pure Raw and Organic Artisan Honey',
    description: 'Pure raw organic premium honey, honeycomb, bee pollen and bee skincare from artisan beekeepers.',
    url: 'https://bienenhonig.vercel.app/',
    siteName: 'Bienenhonig',
    images: [
      {
        url: "https://bienenhonig.vercel.app/favicon/apple-touch-icon.png",
        secureUrl: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737060831/bee_co0lfb.png",
        width: 1200,
        height: 630,
        alt: "Organic honey with honeycomb"
      }
    ],
    locale: 'en_US',
    type: "website"
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pure Raw and Organic Artisan Honey',
    description: 'Pure raw organic premium honey, honeycomb, bee pollen and bee skincare from artisan beekeepers.',
    images: {
      url: "https://bienenhonig.vercel.app/favicon/apple-touch-icon.png",
      alt: "Organic honey with honeycomb"
    },
    site: 'https://bienenhonig.vercel.app/'
  },

}


const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Pure Raw and Organic Artisan Honey",
    "image": "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737060831/bee_co0lfb.png",
    "description": "Pure raw organic premium honey, honeycomb, bee pollen and bee skincare from artisan beekeepers.",
    "brand": {
      "@type": "Brand",
      "name": "Bienenhonig"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bienenhonig.vercel.app/`
    }
  };


  return (
    <>
      <main style={{ minHeight: 500 }}>
        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </section>

        <HomePage />
        <Carousel slides={SLIDES} options={OPTIONS} />
      </main>
      <Footer />
    </>
  );
}
