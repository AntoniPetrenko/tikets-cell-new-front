import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductsType } from "../types";

export type CartItem = {
  id: number;
  title: string | undefined;
  price: number;
  qty: number;
  image?: string;
  customId: ProductsType;
};

type CartState = {
  item: CartItem | null;

  addToCart: (item: CartItem) => boolean;
  removeFromCart: () => void;
  clearCart: () => void;
  increaseQty: () => void;
  decreaseQty: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      item: null,

      addToCart: (newItem) => {
        if (get().item) return false;
        set({ item: newItem });
        return true;
      },

      removeFromCart: () => set({ item: null }),

      clearCart: () => set({ item: null }), 

      increaseQty: () =>
        set((state) => {
          if (!state.item) return state;
          return {
            item: {
              ...state.item,
              qty: state.item.qty + 1,
            },
          };
        }),

      decreaseQty: () =>
        set((state) => {
          if (!state.item) return state;
          if (state.item.qty <= 1) return { item: null };
          return {
            item: {
              ...state.item,
              qty: state.item.qty - 1,
            },
          };
        }),
    }),
    {
      name: "cart-storage",
      partialize: (s) => ({ item: s.item }),
    }
  )
);
