import { data } from "@/entities/location/model/data";
import { LocationType } from "@/entities/location/model/type";
import { LocationPage } from "@/pages_fsd/loaction/ui";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    locale: string;
    id: string;
  };
}

export const dynamicParams = false; // Dynamic route segments not included in generateStaticParams will return immediately a 404.
export const generateStaticParams = () => {
  return data.map((location) => ({
    id: location.link,
  }));
};

const getPlaceByName = (id: string): LocationType => {
  const place = data.find((place) => place.link === id);

  if (!place) {
    notFound();
  }
  return place;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id, locale } = params;
  const place = getPlaceByName(id);

  const t = await getTranslations({
    locale,
    namespace: "LocationMetadata",
  });

  return {
    title: t("title", { city: place.city }),
    description: t("description"),
    keywords: t.raw("keywords"),
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription", {
        city: place.city,
      }),
      url: `https://bienenhonig.vercel.app/${locale}/location/${id}`,
      siteName: "Bienenhonig",
      images: [
        {
          url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription", {
        city: place.city,
      }),
      images: {
        url: "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
        alt: "Our artisan honey store in Germany",
      },
      site: `https://bienenhonig.vercel.app/${locale}/location/${id}`,
    },
  };
};

const Location = async ({ params }: Props) => {
  const { id, locale } = params;
  const place = getPlaceByName(id);

  const t = await getTranslations({
    locale,
    namespace: "Locations",
  });

  const location = t.raw(String(place.id)) as {
    title: string;
    description: string;
    info: string;
  };

  const localizedPlace = {
    ...place,
    ...location,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: place.city,
    image:
      "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127324/passika_simoa7.webp",
    description: localizedPlace.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: place.city,
      addressCountry: "DE",
    },
    brand: {
      "@type": "Brand",
      name: "Bienenhonig",
    },
    offers: {
      "@type": "Offer",
      url: `https://bienenhonig.vercel.app/${locale}/location/${id}`,
    },
  };

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <LocationPage {...localizedPlace} />
    </>
  );
};

export default Location;
