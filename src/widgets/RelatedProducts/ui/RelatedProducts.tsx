import { useRelatedProducts } from '@/entities/product/model/useRelatedProducts';
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from '@/shared/assets/icons';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { ErrorState, SkeletonJSX } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from './RelatedProducts.module.scss';

type Props = {
  currentProductId: string;
};

const LIMIT = 3;

export const RelatedProducts = ({ currentProductId }: Props) => {
  const t = useTranslations('ProductPurchase');

  const { data, isPending, isError, error, refetch } = useRelatedProducts(
    currentProductId,
    LIMIT
  );

  let content;

  if (isPending) {
    content = (
      <SkeletonJSX
        length={3}
        title="60%"
        rows={1}
        width={['100%', '70%']}
      />
    );
  } else if (isError || !data) {
    content = (
      <ErrorState
        errorCode={getApiErrorCode(error)}
        onRetry={() => refetch()}
        variant="compact"
        showAction
      />
    );
  } else {
    content = (
      <ul className={styles.related__list}>
        {data?.map((product) => (
          <li
            key={product._id}
            className={styles.related__item}>
            <Link
              href={`/products/${product._id}`}
              className={styles.related__link}>
              <div className={styles.related__image}>
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={80}
                    height={80}
                    sizes="80px"
                  />
                )}
              </div>

              <div className={styles.related__content}>
                <h3 className={styles.related__name}>{product.title}</h3>

                <p className={styles.related__price}>
                  {t('relatedProductPrice')} €
                  {Math.min(
                    ...product.variants.map((variant) => variant.price)
                  ).toFixed(2)}
                </p>
              </div>

              <span
                className={styles.related__arrow}
                aria-hidden="true">
                <IoIosArrowForward />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.related}>
      <h2 className={`title ${styles.related__title}`}>
        {t('relatedProductTitle')}
      </h2>
      {content}
    </div>
  );
};
