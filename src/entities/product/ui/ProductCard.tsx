import type { ReviewSummery } from '@/entities/review/model/type';
import { Link } from '@/i18n/navigation';
import { ReviewRating } from '@/shared/ui';
import type { ViewMode } from '@/widgets/Products/ui/Products';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Product } from '../model/types';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  reviewSummary: ReviewSummery | undefined;
  viewMode: ViewMode;
};

export const ProductCard = ({ product, reviewSummary, viewMode }: Props) => {
  const t = useTranslations('ProductCard');

  const productUrl = `/products/${product._id}`;

  const isInStock = product.variants.some((variant) => variant.quantity > 0);

  const viewCardMode = viewMode === 'list' ? styles.horizontal : '';

  return (
    <div className={`${styles.card} ${viewCardMode}`}>
      <div className={styles.image}>
        <Link href={productUrl}>
          <Image
            src={product.images[0]}
            width={200}
            height={200}
            sizes="200px"
            alt={product.title}
          />
        </Link>
      </div>

      <div className={styles.description}>
        <div className={styles.sort}>{product.slug}</div>

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
