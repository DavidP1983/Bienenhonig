'use server';
import { Metadata } from "next";
import { SingleItem } from "@/components/singleItem/SinglItem";
import { getApiProducts, getApiProductsById } from "@/services/fetchData";
import { Products } from "@/shared/types/type";

interface Props {
    params: {
        id: string;
    }
}


export const generateStaticParams = async () => {
    const data: Products[] = await getApiProducts();
    return data.map(item => ({
        slug: item._id.toString()
    }))
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const data = await getApiProductsById(id);
    return {
        title: `Product Details ${data.title}`,
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
            url: `https://bienenhonig.vercel.app/products/${id}`,
            siteName: 'Bienenhonig',
            images: [
                {
                    url: data.image,
                    secureUrl: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png",
                    width: 1200,
                    height: 630,
                    alt: "Close-up of raw organic honey jar"
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
                url: data.image,
                alt: "Close-up of raw organic honey jar"
            },
            site: `https://bienenhonig.vercel.app/products/${id}`
        },
    }
}


const SingleItemPage = async ({ params }: Props) => {
    const { id } = params;
    const data = await getApiProductsById(id);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.title,
        "image": data.image,
        "description": data.description,
        "brand": {
            "@type": "Brand",
            "name": "Bienenhonig"
        },
        "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "EUR",
            "url": `https://bienenhonig.vercel.app/products/${id}`
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
            <SingleItem data={data} />
        </>
    );

}

export default SingleItemPage;