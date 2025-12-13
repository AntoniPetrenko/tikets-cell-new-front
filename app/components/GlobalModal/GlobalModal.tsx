"use client";

import { Modal } from "../Modal/Modal";
import { useUIStore } from "@/app/store/uiStore";

export const GlobalModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const closeModal = useUIStore((state) => state.closeModal);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Товар вже у кошику">
      <p>
        У кошику вже є товар. Видаліть його або сплатіть, щоб мати можливість
        придбати новий товар.
      </p>
    </Modal>
  );
};
