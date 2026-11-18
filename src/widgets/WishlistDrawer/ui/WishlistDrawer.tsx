import { useWishlistProducts, useWishlistStore } from '@/entities/wish-list';
import { WishlistItems } from '@/entities/wish-list/ui/WishlistItems';
import { WishlistButton } from '@/features/toggle-wishlist/ui';
import { getApiErrorCode } from '@/shared/errors';
import { Button, ErrorState, ReusableDrawer, SkeletonJSX } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';

import styles from './WishlistDrawer.module.scss';

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const WishlistDrawer = ({ open, onClose }: WishlistDrawerProps) => {
  const t = useTranslations('Wishlist');

  const { productsIds, hasHydrated, clearWishlist } = useWishlistStore(
    useShallow((state) => ({
      productsIds: state.productsIds,
      hasHydrated: state.hasHydrated,
      clearWishlist: state.clearWishlist,
    }))
  );

  const {
    data: products = [],
    isPending,
    isError,
    error,
    refetch,
  } = useWishlistProducts(productsIds);

  const renderWishlistContent = () => {
    if (!hasHydrated) {
      return (
        <SkeletonJSX
          length={3}
          title="60%"
          rows={1}
          width="90%"
        />
      );
    }

    if (productsIds.length === 0) {
      return <p className={styles.notfound}>{t('wishlistEmpty')}</p>;
    }

    if (isPending) {
      return (
        <SkeletonJSX
          length={3}
          title="60%"
          rows={1}
          width="90%"
        />
      );
    }

    if (isError) {
      return (
        <ErrorState
          onRetry={refetch}
          variant="compact"
          error={error}
          errorCode={getApiErrorCode(error)}
          showAction
        />
      );
    }

    if (!products.length) {
      return <p className={styles.notfound}>{t('wishlistEmpty')}</p>;
    }

    return (
      <WishlistItems
        products={products}
        onClose={onClose}
        renderWishlistButton={(productId) => <WishlistButton id={productId} />}
      />
    );
  };

  return (
    <ReusableDrawer
      title={
        <p>
          {t('title')}
          <br />
          {products.length
            ? t('wishlistCount', { count: products.length })
            : t('wishlistEmpty')}
        </p>
      }
      open={open}
      onClose={onClose}
      placement="right"
      styles={{
        wrapper: `${styles.drawerContent}`,
        mask: `${styles.drawerMask}`,
        header: `${styles.drawerTitle}`,
        content: `${styles.drawerClose}`,
      }}
      width={500}>
      <div className={styles.wrapper}>
        {renderWishlistContent()}
        <Button
          props={{
            type: 'primary',
            htmlType: 'button',
            onClick: clearWishlist,
            disabled: !products.length,
          }}
          className={styles.btn}>
          {t('clear')}
        </Button>
      </div>
    </ReusableDrawer>
  );
};
