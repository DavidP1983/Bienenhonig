import type { Product } from '@/entities/product/model/types';
import { ProductDetailsContent } from '@/entities/product/ui';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { ErrorState, Spinner } from '@/shared/ui';
import { ProductPurchase } from '@/widgets/ProductPurchase/ui';
import { RelatedProducts } from '@/widgets/RelatedProducts/ui';
import { memo } from 'react';

import styles from './ProductDetails.module.scss';

type Props = {
  data: Product | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  onRetry: () => void;
  size?: string;
};

const ProductDetailsViewComponent = ({
  data,
  isPending,
  isError,
  error,
  onRetry,
  size,
}: Props) => {
  let content;

  if (isPending) {
    content = (
      <div className={styles.failure}>
        <Spinner />
      </div>
    );
  } else if (isError || !data) {
    content = (
      <div className={styles.failure}>
        <ErrorState
          onRetry={onRetry}
          error={error}
          errorCode={getApiErrorCode(error)}
          showAction
        />
      </div>
    );
  } else {
    content = (
      <>
        <ProductDetailsContent data={data} />

        <div className={styles.detailsSidebar}>
          <ProductPurchase
            data={data}
            size={size}
          />
          <RelatedProducts currentProductId={data._id} />
        </div>
      </>
    );
  }

  return <div className={styles.detailsContainer}>{content}</div>;
};

export const ProductDetailsView = memo(ProductDetailsViewComponent);
