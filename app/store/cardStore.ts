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
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const items = get().items;
        const existing = items.find((i) => i.id === newItem.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeFromCart: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      clearCart: () => set({ items: [] }),

      increaseQty: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        }),

      decreaseQty: (id) =>
        set({
          items: get().items
            .map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        }),
    }),
    {
      name: "cart-storage",
      partialize: (s) => ({ items: s.items }),
    }
  )
);
