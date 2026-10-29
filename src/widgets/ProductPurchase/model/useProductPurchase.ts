import type { Variants } from "@/entities/product/model/types";
import { useState } from "react";

/* Ленивая загрузка */
const getInitialVariant = (
  variants: Variants[],
  size?: string,
): Variants | undefined => {
  return variants.find((variant) => variant.size === size) ?? variants[0];
};

export const useProductPurchase = (
  filteredVariants: Variants[],
  size?: string,
) => {
  const [selectedVariant, setSelectedVariant] = useState<Variants>(
    () => getInitialVariant(filteredVariants, size)!,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState<
    { size: string; quantity: number }[]
  >([]);

  /* Ф-ия по добавления выбранного варианта в список*/
  const handleVariantChange = (size: string) => {
    /* Выбираем из всех полученных вариантов, тот который совпал с выбранным размером*/
    const variant = filteredVariants.find((item) => item.size === size);

    if (!variant || variant.quantity <= 0) {
      return;
    }

    const existingItem = selectedItems.find(
      (item) => item.size === variant.size,
    );

    /* Не даем счетчику выбрать больше quantity чем в DB*/
    const nextQuantity = Math.min(
      existingItem?.quantity ?? 1,
      variant.quantity,
    );

    setSelectedVariant(variant);
    setQuantity(nextQuantity);

    /* Если у нас еще нет в нашем состоянии элемента  то добавляем его с начальным значением счетчика 1*/
    if (!existingItem) {
      setSelectedItems((prev) => [
        ...prev,
        { size: variant.size, quantity: nextQuantity },
      ]);
      /* Во избежания добавления лишних значением счетчика другому элементу в нашем состоянии */
    } else if (existingItem.quantity !== nextQuantity) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.size === variant.size
            ? { ...item, quantity: nextQuantity }
            : item,
        ),
      );
    }
  };

  /* Обновляем кол-во определенного size*/
  const updateSelectedQuantity = (size: string, nextQuantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.size === size ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const decrement = () => {
    if (!selectedVariant) return;

    const nextQuantity = Math.max(1, quantity - 1);

    setQuantity(nextQuantity);
    updateSelectedQuantity(selectedVariant.size, nextQuantity);
  };

  const increment = () => {
    if (!selectedVariant || selectedVariant.quantity <= 0) {
      return;
    }

    const nextQuantity = Math.min(selectedVariant.quantity, quantity + 1);

    setQuantity(nextQuantity);
    updateSelectedQuantity(selectedVariant.size, nextQuantity);
  };

  /*Удаление товаров из списка*/
  const removeItemFromTheList = (itemSize: string) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter(
        (selected) => selected.size !== itemSize,
      );

      if (updatedItems.length === 0) {
        setQuantity(1);

        setSelectedVariant(getInitialVariant(filteredVariants, size)!);
      }
      return updatedItems;
    });
  };

  /* Очистка листа от выбранных товаров после их добавления в корзину */
  const removeAllItemsAfterAddToCart = () => {
    setSelectedItems([]);
    setQuantity(1);
    setSelectedVariant(getInitialVariant(filteredVariants, size)!);
  };

  return {
    selectedVariant,
    quantity,
    handleVariantChange,
    selectedItems,
    decrement,
    increment,
    removeItemFromTheList,
    removeAllItemsAfterAddToCart,
  };
};
