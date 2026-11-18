'use client';
import { useWishlistStore } from '@/entities/wish-list';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';

import styles from './WishList.module.scss';

const WishlistDrawer = dynamic(() =>
  import('@/widgets/WishlistDrawer/ui').then((mod) => mod.WishlistDrawer)
);

export const Wishlist = () => {
  const productsIds = useWishlistStore((state) => state.productsIds);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        title="wish list"
        className={styles.btn}
        onClick={handleOpen}
        aria-label={`Wishlist, ${productsIds.length} products`}
        aria-haspopup="dialog"
        aria-expanded={open}>
        <FaRegHeart className={styles.wishlistIcon} />

        <span
          className={styles.count}
          aria-hidden="true">
          {productsIds.length}
        </span>
      </button>
      <WishlistDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
