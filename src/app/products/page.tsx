import { Metadata } from "next";
import { AllProducts } from '@/components/products/AllProducts';

export const metadata: Metadata = {
    title: 'Our products - Pure Raw and Organic Honey',
    description: "Explore our wide selection of pure raw organic honey, honeycomb, and bee products from artisan beekeepers in Germany.",
    keywords: [
        'raw honey products',
        'organic honey selection',
        'artisan honey Germany',
        'bee products',
        'honeycomb',
        'clover honey',
        'linden honey',
        'rape honey',
        'pure honey',
        'bee',
        'propolis'
    ],
    openGraph: {
        title: 'Explore Our Honey Products',
        description: 'Discover our premium selection of raw organic honey and bee products crafted by artisan beekeepers.',
        url: 'https://bienenhonig.vercel.app/products',
        siteName: 'Bienenhonig',
        images: [
            {
                url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png",
                secureUrl: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png",
                width: 1200,
                height: 630,
                alt: "A variety of honey jars and bee products"
            }
        ],
        locale: 'en_US',
        type: "website"
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Explore Our Honey Products',
        description: 'Discover our premium selection of raw organic honey and bee products crafted by artisan beekeepers.',
        images: {
            url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png",
            alt: "A variety of honey jars and bee products"
        },
        site: 'https://bienenhonig.vercel.app/products'
    },
}

export const revalidate = 10;

const Products = () => {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Explore Our Honey Products",
        "image": "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png",
        "description": "Discover our premium selection of raw organic honey and bee products crafted by artisan beekeepers.",
        "brand": {
            "@type": "Brand",
            "name": "Bienenhonig"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://bienenhonig.vercel.app/products`
        }
    };


    return (
        <>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <AllProducts />
        </>
    )
}

export default Products;