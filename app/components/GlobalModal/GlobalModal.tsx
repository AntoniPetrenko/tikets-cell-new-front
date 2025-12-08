"use client";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

export const GlobalModal = () => {
  const router = useRouter();
  const isModalOpen = useProductStore((state) => state.isModalOpen);
  const closeModal = useProductStore((state) => state.closeModal);
  const openSidebar = useProductStore((state) => state.openSidebar);

  const handleOpenSidebar = () => {
    closeModal();
    openSidebar();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Товар вже у кошику"
      // actions={
      //   <>
      //     <Button variant="orange" onClick={() => router.push("/order/")}>
      //       Перейти до кошика
      //     </Button>
      //     <Button variant="orange" onClick={handleOpenSidebar}>
      //       Видалити товар
      //     </Button>
      //   </>
      // }
    >
      <p>
        У кошику вже є товар. Видаліть його або сплатіть, щоб мати можливість
        придбати новий товар.
      </p>
    </Modal>
  );
};
