"use client";
import { useCartOrder } from "@/entities/cart";
import { TbShoppingBag } from "@/shared/assets/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "./Cart.module.scss";

const OrderConfirm = dynamic(() =>
  import("./OrderConfirm").then((mod) => mod.OrderConfirm),
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
      <div className={styles.cart}>
        <button
          className={styles.cart__btn}
          suppressHydrationWarning={true}
          onClick={handleOpen}
        >
          <TbShoppingBag className={styles.cart__shopping} />
          <div className={styles.cart__count}>
            <span>{cartCount}</span>
          </div>
        </button>
      </div>
      {/* {hasOpen && <OrderConfirm open={open} setOpen={setOpen} />} */}
      <OrderConfirm open={open} onClose={() => setOpen(false)} />
    </>
  );
};
