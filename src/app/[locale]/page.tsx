import { HomePage } from "@/pages_fsd/home/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: "HomeMetadata",
  });
  return {
    title: t("title"),
    description: t("openGraphDescription"),
    keywords: t.raw("keywords"),

    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      url: `https://bienenhonig.vercel.app/${locale}`,
      siteName: "Bienenhonig",
      images: [
        {
          url: "https://bienenhonig.vercel.app/favicon/apple-touch-icon.png",
          secureUrl:
            "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737060831/bee_co0lfb.png",
          width: 1200,
          height: 630,
          alt: "Organic honey with honeycomb",
        },
      ],
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      images: {
        url: "https://bienenhonig.vercel.app/favicon/apple-touch-icon.png",
        alt: t("imageAlt"),
      },
      site: `https://bienenhonig.vercel.app/${locale}`,
    },
  };
}

const Home = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Pure Raw and Organic Artisan Honey",
    image:
      "https://res.cloudinary.com/dmrsemgsn/image/upload/v1737060831/bee_co0lfb.png",
    description:
      "Pure raw organic premium honey, honeycomb, bee pollen and bee skincare from artisan beekeepers.",
    brand: {
      "@type": "Brand",
      name: "Bienenhonig",
    },
    offers: {
      "@type": "Offer",
      url: `https://bienenhonig.vercel.app/${locale}`,
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
      <HomePage />
    </>
  );
};

export default Home;
