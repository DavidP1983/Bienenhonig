import { productService } from "@/entities/product/model/product.service";
import { productKeys } from "@/entities/product/model/queryKeys";
import { Product } from "@/entities/product/model/types";
import { ProductDetailsPage } from "@/pages_fsd/product-details/ui";
import { ApiError } from "@/shared/errors/ApiError";
import { ErrorState } from "@/shared/ui";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    locale: string;
    id: string;
  };
  searchParams: {
    size?: string;
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id, locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "ProductDetailsMetadata",
  });

  try {
    const data = await productService.getProductById(id);

    const title = t("title", { title: data.title });
    const description = t("description", { title: data.title });
    const productUrl = `https://bienenhonig.vercel.app/${locale}/products/${id}`;
    const images = data.images?.[0];

    return {
      title,
      description,
      keywords: t.raw("keywords"),
      openGraph: {
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        url: productUrl,
        siteName: "Bienenhonig",
        ...(images && {
          images: [{ url: images, alt: data.title }],
        }),
        locale: locale === "ru" ? "ru_RU" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        ...(images && {
          images: [{ url: images, alt: data.title }],
        }),
        site: productUrl,
      },
    };
  } catch {
    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
};

const ProductDetails = async ({ params, searchParams }: Props) => {
  const { id, locale } = params;
  const { size } = searchParams;

  const productUrl = `https://bienenhonig.vercel.app/${locale}/products/${id}`;

  const sizeData = size || undefined;

  const queryClient = new QueryClient();
  let data: Product | undefined;

  try {
    data = await queryClient.query({
      queryKey: productKeys.detail(id, sizeData),
      queryFn: ({ signal }) =>
        productService.getProductById(id, sizeData, signal),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.code === "PRODUCT_NOT_FOUND") {
        notFound();
      }

      if (error.code === "INVALID_PRODUCT_SIZE") {
        return (
          <div className="globalError">
            <div className="container">
              <ErrorState errorCode={error.code} />;
            </div>
          </div>
        );
      }
    }
  }

  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.title,
        image: data.images,
        description: [
          data.description.producer,
          data.description.color,
          data.description.origin,
        ]
          .filter(Boolean)
          .join(", "),
        brand: {
          "@type": "Brand",
          name: "Bienenhonig",
        },
        offers: data.variants.map((variant) => ({
          "@type": "Offer",
          price: variant.price,
          priceCurrency: "EUR",
          availability:
            variant.quantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          productUrl,
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        </section>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsPage id={id} size={sizeData} />
      </HydrationBoundary>
    </>
  );
};

export default ProductDetails;
