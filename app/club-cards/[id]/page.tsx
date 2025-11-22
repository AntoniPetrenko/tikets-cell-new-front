"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button/Button";
import { useParams } from "next/navigation";
import { Modal } from "@/app/components/Modal/Modal";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import Script from "next/script";
import Image from "next/image";
import { ClubCards } from "@/app/const/products";

export default function ClubCard() {
  const { id } = useParams();
  const product = ClubCards.find((item) => String(item.id) === id);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Script
        src="//static.liqpay.ua/libjs/checkout.js"
        strategy="afterInteractive"
      />
      <div className="pt-24 flex flex-col  justify-center items-center text-white">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-3">
          <Image
            width={300}
            height={300}
            src={product?.photo[0] || ""}
            alt=""
          />

          <div className="w-full flex flex-col gap-6 p-3">
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <p className="text-xl font-medium">{product?.description}</p>
            {product?.texts.map((item) => (
              <p key={item} className="text-xl font-medium">
                {item}
              </p>
            ))}
            {product?.rebate != 0 ? (
              <div>
                {" "}
                <div>
                  <span className="line-through decoration-2 decoration-red-500">
                    {product?.price}
                  </span>{" "}
                  <span>₴</span>
                </div>
                <div className="font-bold text-4xl text-red-500">
                  {product?.rebate} ₴
                </div>
              </div>
            ) : (
              <div className="font-bold text-4xl">{product.price} ₴</div>
            )}
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
      </div>
    </>
  );
}
