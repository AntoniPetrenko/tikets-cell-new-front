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
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;

  addToCart: (item: CartItem) => boolean;
  removeFromCart: () => void;
  clearCart: () => void;
  increaseQty: () => void;
  decreaseQty: () => void;
  getTotal: () => number;
};

export const useProductStore = create<CartState>()(
  persist(
    (set, get) => ({
      item: null,
      isSidebarOpen: false,
      isModalOpen: false,

      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      addToCart: (newItem) => {
        if (get().item) {
          get().openModal();
          return false;
        }
        set({ item: newItem });
        return true;
      },

      removeFromCart: () => set({ item: null }),
      clearCart: () => set({ item: null }),
      increaseQty: () =>
        set((state) => state.item ? { item: { ...state.item, qty: state.item.qty + 1 } } : state),
      decreaseQty: () =>
        set((state) =>
          state.item && state.item.qty > 1
            ? { item: { ...state.item, qty: state.item.qty - 1 } }
            : { item: null }
        ),

      getTotal: () => {
        const item = get().item;
        return item ? item.price * item.qty : 0;
      },
    }),
    { name: "cart-storage" }
  )
);
