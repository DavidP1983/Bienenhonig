import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { updateCartItem } from '../lib/updateCartItem';
import { ICartOrder } from './types';

export interface ICart {
  idempotencyKey: string | null;
  cartOrder: ICartOrder[];
  cartCount: number;
  hasHydrated: boolean;
  setIdempotencyKey: (key: string | null) => void;
  getCartOrder: (data: ICartOrder[]) => void;
  removeOrder: (id: string) => void;
  clearCart: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useCartOrder = create<ICart>()(
  persist(
    (set, get) => ({
      idempotencyKey: null,
      cartOrder: [],
      cartCount: 0,
      hasHydrated: false,

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      setIdempotencyKey: (key: string | null) => {
        set({ idempotencyKey: key });
      },

      getCartOrder: (data) => {
        /* Дедубликация элементов в корзине*/
        const cartMap = new Map(
          get().cartOrder.map((item) => [
            `${item.productId}:${item.size}`,
            item,
          ])
        );

        data.forEach((newItem) => {
          const key = `${newItem.productId}:${newItem.size}`;
          const existingItem = cartMap.get(key);

          if (existingItem) {
            cartMap.set(key, updateCartItem(existingItem, newItem));
            return;
          }

          cartMap.set(key, newItem);
        });

        const cartOrder = Array.from(cartMap.values());

        set({
          cartOrder,
          cartCount: cartOrder.length,
        });
      },

      removeOrder: (id: string) => {
        const cartOrder = get().cartOrder.filter((item) => item.id !== id);
        set({
          cartOrder,
          cartCount: cartOrder.length,
        });
      },

      clearCart: () => {
        set({
          cartOrder: [],
          cartCount: 0,
        });
      },
    }),
    {
      name: 'cart-order-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
