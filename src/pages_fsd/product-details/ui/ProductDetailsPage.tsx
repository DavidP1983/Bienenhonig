import { ProductDetails } from '@/widgets/ProductDetails/ui';

import styles from './ProductDetailsPage.module.scss';

export type ProductDetailsProps = {
  id: string;
  size?: string;
};

export const ProductDetailsPage = ({ id, size }: ProductDetailsProps) => {
  return (
    <>
      <section
        className={styles.details}
        aria-labelledby="product-details">
        <div className="container">
          <ProductDetails
            id={id}
            size={size}
          />
        </div>
      </section>
    </>
  );
};
