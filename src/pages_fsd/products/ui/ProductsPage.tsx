import { Products } from '@/widgets/Products/ui';
import { useTranslations } from 'next-intl';

import styles from './ProductsPage.module.scss';

export const ProductsPage = () => {
  const t = useTranslations('ProductsPage');

  return (
    <>
      <section
        className={styles.products}
        aria-labelledby="products">
        <div className="container">
          <h1
            id="products"
            className="title">
            {t('title')}
          </h1>
          <Products />
        </div>
      </section>
    </>
  );
};
