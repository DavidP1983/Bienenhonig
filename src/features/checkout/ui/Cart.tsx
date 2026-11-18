'use client';
import { useCartOrder } from '@/entities/cart';
import { TbShoppingBag } from '@/shared/assets/icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from './Cart.module.scss';

const OrderConfirm = dynamic(() =>
  import('./OrderConfirm').then((mod) => mod.OrderConfirm)
);

export const Cart = () => {
  const cartCount = useCartOrder((state) => state.cartCount);
  const [open, setOpen] = useState(false);
  // const [hasOpen, setHasOpen] = useState(false);

  const handleOpen = () => {
    // setHasOpen(true);
    setOpen(true);
  };

  return (
    <>
      <button
        title="shopping cart"
        className={styles.btn}
        onClick={handleOpen}
        aria-label={`Cart, ${cartCount} Article`}
        aria-haspopup="dialog"
        aria-expanded={open}>
        <TbShoppingBag className={styles.shopping} />
        <span
          className={styles.count}
          aria-hidden="true">
          {cartCount}
        </span>
      </button>
      {/* {hasOpen && <OrderConfirm open={open} setOpen={setOpen} />} */}
      <OrderConfirm
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
