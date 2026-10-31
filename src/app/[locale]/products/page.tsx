import { productService } from '@/entities/product/model/product.service';
import { productKeys } from '@/entities/product/model/queryKeys';
import { ProductsPage } from '@/pages_fsd/products/ui';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: 'ProductsMetadata',
  });

  const siteUrl = `https://bienenhonig.vercel.app`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),

    openGraph: {
      title: t('openGraphTitle'),
      description: t('openGraphDescription'),
      url: `${siteUrl}/${locale}/products`,
      siteName: 'Bienenhonig',
      images: [
        {
          url: 'https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png',
          secureUrl:
            'https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png',
          width: 1200,
          height: 630,
          alt: t('imageAlt'),
        },
      ],
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: t('openGraphTitle'),
      description: t('openGraphDescription'),
      images: {
        url: 'https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png',
        alt: t('imageAlt'),
      },
      site: siteUrl,
    },
  };
}

const Products = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: 'ProductsMetadata',
  });

  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: productKeys.all,
      queryFn: ({ signal }) => productService.getProducts(signal),
    })
    .catch(() => {});

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('openGraphTitle'),
    image:
      'https://res.cloudinary.com/dmrsemgsn/image/upload/v1737127372/products_akaokz.png',
    description: t('openGraphDescription'),
    brand: {
      '@type': 'Brand',
      name: 'Bienenhonig',
    },
    offers: {
      '@type': 'Offer',
      url: `https://bienenhonig.vercel.app/${locale}/products`,
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsPage />
      </HydrationBoundary>
    </>
  );
};

export default Products;
