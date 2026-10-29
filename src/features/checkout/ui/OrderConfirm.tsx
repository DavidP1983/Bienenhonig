"use client";
import { useCartOrder } from "@/entities/cart";
import type { ICartOrder } from "@/entities/cart/model/types";
import { useDelivery } from "@/entities/delivery/model/useDelivery";
import { useRouter } from "@/i18n/navigation";
import { sadBee } from "@/shared/assets/img";
import { calculateOrderSummary } from "@/shared/lib";
import { OrderSummary, PurchaseItem, ReusableDrawer } from "@/shared/ui";
import { Button } from "@/shared/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";

import styles from "./OrderConfirm.module.scss";

interface OrderConfirmProps {
  open: boolean;
  onClose: () => void;
}

export const OrderConfirm = ({ open, onClose }: OrderConfirmProps) => {
  const t = useTranslations("OrderConfirmation");

  const router = useRouter();
  const { data, isPending, isError, refetch } = useDelivery();

  const { cartOrder, removeOrder } = useCartOrder(
    useShallow((state) => ({
      cartOrder: state.cartOrder,
      removeOrder: state.removeOrder,
    })),
  );

  /* Расчет итоговой цены, доставки */
  const deliveryPrice = data?.deliveryPrice;
  const { productsTotal, deliveryTotal, grandTotal } = calculateOrderSummary({
    cartOrder,
    deliveryPrice,
  });

  /* Этапы загрузки цены доставки */
  const isDeliveryLoading = isPending;
  const isDeliveryError = isError || deliveryPrice === undefined;
  const disabledBtn = !cartOrder.length || isDeliveryLoading || isDeliveryError;

  /* Список заказа */
  const renderOrder = (cartOrder: ICartOrder[]) => {
    if (cartOrder.length === 0) {
      return (
        <div className={styles.noData}>
          {t("emptyOrders")}
          <Image src={sadBee} alt="sadBee" width={200} height={200} />
        </div>
      );
    }
    return (
      <>
        <ul className={styles.order}>
          {cartOrder &&
            cartOrder.map((item) => (
              <PurchaseItem
                key={item.size}
                item={item}
                onRemove={() => removeOrder(item.id)}
                image={item.image}
                title={item.title}
                seller={item.seller}
                confirmRemove
              />
            ))}
        </ul>
      </>
    );
  };

  const order = renderOrder(cartOrder);

  return (
    <ReusableDrawer
      title={
        <p>
          {t("title")}
          <br />
          {cartOrder.length
            ? t("cartCount", { count: cartOrder.length })
            : t("cartEmpty")}
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
      width={500}
    >
      {order}
      {cartOrder.length > 0 && (
        <OrderSummary
          isPending={isPending}
          isError={isError}
          onRetry={() => refetch()}
          deliveryPrice={deliveryPrice}
          deliveryTotal={deliveryTotal}
          productsTotal={productsTotal}
          grandTotal={grandTotal}
        />
      )}

      {
        <Button
          props={{
            type: "primary",
            onClick: () => {
              onClose();
              router.push("/checkout");
            },
            disabled: disabledBtn,
          }}
          className={styles.btnConfirmOrder}
        >
          {t("checkout")}
        </Button>
      }
    </ReusableDrawer>
  );
};
