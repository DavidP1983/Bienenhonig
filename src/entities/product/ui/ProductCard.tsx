import type { ReviewSummery } from '@/entities/review/model/type';
import { WishlistButton } from '@/features/toggle-wishlist/ui';
import { Link } from '@/i18n/navigation';
import { FiAward } from '@/shared/assets/icons';
import { isNewProduct } from '@/shared/lib';
import { ReviewRating } from '@/shared/ui';
import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import type { ViewMode } from '@/widgets/Products/model/types';
import { useTranslations } from 'next-intl';
import { getHoneyGuideMatch } from '../lib/getHoneyGuideMatch';
import type { HoneyGuideAttributes, Product } from '../model/types';
import { HoneyGuideExplanation } from './HoneyGuideExplanation';

import styles from './ProductCard.module.scss';

type ProductCardHoneyGuideProps = {
  attributes: HoneyGuideAttributes | undefined;
  isBestMatch: boolean;
};

type Props = {
  product: Product;
  reviewSummary: ReviewSummery | undefined;
  viewMode: ViewMode;
  isBestSeller: boolean;
  isPriority: boolean;
  honeyGuide: ProductCardHoneyGuideProps;
};

export const ProductCard = ({
  product,
  reviewSummary,
  viewMode,
  isBestSeller,
  isPriority,
  honeyGuide,
}: Props) => {
  const t = useTranslations('ProductCard');
  const tHoneyGuide = useTranslations('HoneyGuide');

  const { attributes, isBestMatch } = honeyGuide;

  const productUrl = `/products/${product._id}`;
  const viewCardMode = viewMode === 'list' ? styles.horizontal : '';

  const isInStock = product.variants.some((variant) => variant.quantity > 0);
  const isNew = isNewProduct(product.createdAt);

  /* Отображения предпочтения выбора в карточке */
  const honeyGuideMatch = attributes
    ? getHoneyGuideMatch(product, attributes)
    : null;

  const shouldShowHoneyGuideExplanation =
    honeyGuideMatch !== null &&
    (honeyGuideMatch.flavorMatch || honeyGuideMatch.matchingUses.length > 0);

  const matchingUsesText =
    honeyGuideMatch?.matchingUses.map((use) =>
      tHoneyGuide(`recommendedUses.${use}`)
    ) ?? [];

  const flavorText = honeyGuideMatch?.flavorMatch
    ? tHoneyGuide(`flavors.${attributes!.flavorPreference}`)
    : null;

  const explanationText = (() => {
    if (matchingUsesText.length > 0 && flavorText) {
      return tHoneyGuide('explanation.both', {
        uses: matchingUsesText.join(', '),
        flavor: flavorText,
      });
    }

    if (matchingUsesText.length > 0) {
      return tHoneyGuide('explanation.uses', {
        uses: matchingUsesText.join(', '),
      });
    }

    if (flavorText) {
      return tHoneyGuide('explanation.flavor', {
        flavor: flavorText,
      });
    }

    return null;
  })();

  return (
    <div className={`${styles.cardItem} ${viewCardMode}`}>
      <div className={styles.image}>
        {isNew && <div className={styles.newBadge}>{t('new')}</div>}
        {isBestSeller && (
          <div className={styles.bestSeller}>
            <FiAward />
            {t('bestSeller')}
          </div>
        )}
        <Link href={productUrl}>
          <ProductImage
            image={product.images?.[0]}
            width={200}
            height={200}
            sizes="200px"
            priority={isPriority}
          />
        </Link>
        <WishlistButton id={product._id} />
      </div>

      <div className={styles.description}>
        <div className={styles.sort}>{product.slug}</div>
        <div className={styles.matches}>
          {isBestMatch && (
            <span className={styles.bestHoneyMatch}>
              {tHoneyGuide('bestMatch')}
            </span>
          )}
          {attributes && product.honeyGuide?.flavorPreference && (
            <span className={styles.honeyFlavor}>
              {tHoneyGuide(`flavors.${product.honeyGuide.flavorPreference}`)}
            </span>
          )}
        </div>

        <div className={styles.seller}>
          {t('seller')} <span>{product.sellerName}</span>
        </div>

        <ul className={styles.variants}>
          {product.variants.map((item) => (
            <li
              key={item.size}
              className={styles.variant}>
              <Link
                href={`${productUrl}?size=${encodeURIComponent(item.size)}`}
                className={styles.size}>
                {`${item.quantity} x ${item.size}`}
              </Link>
              <div className={styles.price}>
                {item.discountPercent > 0 && (
                  <span className={styles.discount}>
                    {t('discount')} {item.discountPercent}%
                  </span>
                )}
                <span>&#8364; </span>
                {item.price}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.review}>
          <ReviewRating averageRating={reviewSummary?.averageRating ?? 0} />
          <Link
            href={`${productUrl}#reviews`}
            className={styles.rating}
            scroll={false}>
            {t('reviews', { count: reviewSummary?.reviewCount ?? 0 })}
          </Link>
        </div>

        {shouldShowHoneyGuideExplanation && explanationText && (
          <HoneyGuideExplanation
            productTitle={tHoneyGuide('explanation.title', {
              product: product.title,
            })}
            explanationText={explanationText}
          />
        )}

        <div className={isInStock ? styles.inStock : styles.outStock}>
          <div className={styles.indicator}></div>
          <div className={styles.units}>
            {isInStock ? `${t('inStock')}` : `${t('outOfStock')}`}
          </div>
        </div>
      </div>

      <div className={styles.btn}>
        <Link
          href={productUrl}
          className={isInStock ? styles.checkOut : styles.outOfOrder}>
          {isInStock ? t('checkout') : t('outOfStock')}
        </Link>
      </div>
    </div>
  );
};
