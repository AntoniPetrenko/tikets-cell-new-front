"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button/Button";
import { Slider } from "@/app/components/Slider/Slider";
import { useProduct } from "@/app/hooks/useProduct";
import { useParams } from "next/navigation";
import { Modal } from "@/app/components/Modal/Modal";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import Loader from "@/app/components/Loader/Loader";

export default function Product() {
  const { id } = useParams();
  const { product, isLoading } = useProduct(id);

  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <div className="pt-24 flex flex-col justify-center items-center text-white">
      <div className="flex flex-col md:flex-row gap-12 p-3">
        <Slider images={product?.photo || []} />

        <div className="w-full md:w-1/3 flex flex-col gap-6 p-3">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <p className="text-xl font-medium">{product?.description}</p>
          <p className="text-6xl font-bold">{product?.price} ₴</p>
        </div>
      </div>

      <div className="pt-12">
        <Button variant="pink" onClick={() => setOpen(true)}>
          Замовити товар
        </Button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ContactForm onSuccess={() => setOpen(false)} />
      </Modal>
      <script src="//static.liqpay.ua/libjs/checkout.js" async></script>
    </div>
  );
}
