
import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { Location } from "@/components/Location";
import { dbloaction } from "../db/dbLocaction";
import { LocationType } from "@/shared/types/type";
import dynamic from "next/dynamic";


interface Props {
    params: {
        id: string;
    }
}

const Location = dynamic(() => import("@/components/Location").then((mod) => mod.default), {
    ssr: false
});

const getPlacebyName = async (id: string) => {

    try {
        const [place] = dbloaction.filter((place) => place.link === id);

        if (!Object.keys(place).length) {
            throw new Error('Could not fetch data')
        }
        return place as LocationType;
    } catch (e) {
        if (e instanceof Error) throw e

    }
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const place = await getPlacebyName(id)

    return {
        title: `Visit Our Location ${place?.city}`,
        description: "Visit us to experience the best raw organic honey and artisan bee products directly from our location in Germany.",
        keywords: [
            'visit Bienenhonig',
            'organic honey location',
            'artisan honey shop',
            'Germany honey store',
            'buy raw honey',
            'honeycomb products Germany',
            'bee pollen store',
            'Düsseldorf',
            'Erkrath-Hochdahl',
            'Hubbelrath',
            'clover',
            'rape',
            'linden'
        ],
        openGraph: {
            title: 'Visit Our Location',
            description: `Come visit ${place?.city} in Germany for the finest raw honey and bee products.`,
            url: `https://bienenhonig.vercel.app/location/${id}`,
            siteName: 'Bienenhonig',
            images: [
                {
                    url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
                    width: 1200,
                    height: 630,
                    alt: "Our artisan honey store in Germany"
                }
            ],
            locale: 'en_US',
            type: "website"
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Visit Our Location',
            description: `Come visit ${place?.city} in Germany for the finest raw honey and bee products.`,
            images: {
                url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
                alt: "Our artisan honey store in Germany"
            },
            site: `https://bienenhonig.vercel.app/location/${id}`
        },

    }
}

const LocationPage = async ({ params }: Props) => {
    const { id } = params;
    const place = await getPlacebyName(id);

    if (!place?.title) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": place.city,
        "image": "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
        "description": place.description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": place.city,
            "addressCountry": "DE",
        },
        "brand": {
            "@type": "Brand",
            "name": "Bienenhonig"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://bienenhonig.vercel.app/location/${id}`
        }
    };

    return (
        <>
            <section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </section>
            <Location {...place} />
        </>
    )
}

export default LocationPage;
