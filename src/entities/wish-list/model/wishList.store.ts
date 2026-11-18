import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface WishlistStore {
  productsIds: string[];
  hasHydrated: boolean;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  setHasHydrated: (state: boolean) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productsIds: [],
      hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },

      toggleWishlist: (id: string) => {
        const { productsIds } = get();

        set({
          productsIds: productsIds.includes(id)
            ? productsIds.filter((productId) => productId !== id)
            : [...productsIds, id],
        });
      },

      isInWishlist: (id) => get().productsIds.includes(id),
      clearWishlist: () => set({ productsIds: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// hasHydrated поможет избежать неправильного отображения состояния сердечек до восстановления данных из localStorage.
