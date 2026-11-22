import { useWishlistStore } from '@/entities/wish-list';
import { IoIosHeartEmpty, IoMdHeart } from '@/shared/assets/icons';
import { Button } from '@/shared/ui';
import { message } from 'antd';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';

import styles from './WishlistButton.module.scss';

export const WishlistButton = ({ id }: { id: string }) => {
  const t = useTranslations('Wishlist');

  const { toggleWishlist, isInWishlist, hasHydrated } = useWishlistStore(
    useShallow((state) => ({
      toggleWishlist: state.toggleWishlist,
      isInWishlist: state.isInWishlist(id),
      hasHydrated: state.hasHydrated,
    }))
  );

  const isInWishlistAttr =
    isInWishlist && hasHydrated ? t('removeFromWishlist') : t('addToWishlist');

  const MessageStorage = {
    add: () => message.info(t('messageAdd')),
    remove: () => message.info(t('messageRemove')),
  };

  const handleToggleWishList = (id: string) => {
    toggleWishlist(id);
    const key = isInWishlist && hasHydrated ? 'remove' : 'add';
    MessageStorage[key]();
  };

  return (
    <Button
      type="default"
      htmlType="button"
      onClick={() => handleToggleWishList(id)}
      aria-label={isInWishlistAttr}
      aria-pressed={hasHydrated ? isInWishlist : undefined}
      title={isInWishlistAttr}
      icon={
        isInWishlist && hasHydrated ? (
          <IoMdHeart className={styles.wishlistIcon} />
        ) : (
          <IoIosHeartEmpty className={styles.wishlistIcon} />
        )
      }
      className={styles.whishList}>
      {''}
    </Button>
  );
};
