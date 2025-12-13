import { create } from "zustand";

type UIState = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isModalOpen: false,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
