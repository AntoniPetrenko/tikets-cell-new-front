"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "../hooks/useProducts";
// import { ClubCards, ProductsClient } from "../const/products";

interface PaymentInfo {
  [key: string]: string;
}

export default function ResultClient() {
  const { clubCards, products, isLoading } = useProducts();
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    const entries = Array.from(searchParams.entries()) as [string, string][];
    const paramsObj: PaymentInfo = Object.fromEntries(entries);

    console.log(paramsObj);

    if (Object.keys(paramsObj).length > 0) {
      setInfo(paramsObj);
    }
  }, [searchParams]);

  const getProduct = (): string => {
    if (!info || !info.paymentId) {
      return "Завантаження...";
    }

    const allProducts = [...clubCards, ...products];
    const paymentId = Number(info.paymentId);

    if (isNaN(paymentId)) {
      return "Невірний ідентифікатор платежу";
    }

    const product = allProducts.find((item) => Number(item.id) === paymentId);

    if (!product) {
      return "Продукт не знайдено";
    }

    const getLevel = (text?: string): string => {
      if (!text) return "";
      const match = text.match(/\p{L}+/u);
      return match ? match[0].toUpperCase() : "";
    };

    const productId = Number(product.id);
    if (!isNaN(productId) && productId >= 0 && productId <= 6) {
      return `Ви придбали клубну карту ${getLevel(product.title)}`;
    } else {
      return `Ви придбали ${product.title}`;
    }
  };

  if (isLoading) {
    return (
      <div className="text-white pt-24 pr-24 pl-24 flex flex-col gap-8 w-full h-full flex justify-center items-center text-center">
        <div className="text-4xl">Завантаження...</div>
      </div>
    );
  }

  // return (
  //   <div className="text-white pt-24 pr-24 pl-24 flex flex-col gap-8 w-full h-full flex justify-center items-center text-center">
  //     <div className="text-4xl">
  //       {/* Вітаємо! <br />
  //       {getProduct()}. */}
  //       {`Дякуємо за ваше замовлення. З вами зв’яжеться менеджер протягом 24
  //       годин. Номер вашого замовлення № ${info?.orderId}.`}
  //     </div>
  //   </div>
  // );

  return (
    <div className="text-white pt-32 px-6 flex w-full min-h-screen justify-center items-center text-center">
      <div className="max-w-3xl flex flex-col gap-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Дякуємо за ваше замовлення
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
          З вами зв’яжеться менеджер протягом{" "}
          <span className="text-orange-400 font-medium">24 годин</span>, щоб
          підтвердити деталі замовлення.
        </p>

        <div className="mt-4 inline-block border border-orange-400/40 rounded-2xl px-8 py-6 bg-orange-400/5 shadow-[0_0_30px_rgba(251,146,60,0.25)]">
          <div className="text-sm uppercase tracking-widest text-neutral-400 mb-2">
            Номер замовлення
          </div>
          <div className="text-3xl font-bold text-orange-400">
            № {info?.orderId}
          </div>
        </div>

        <p className="text-sm text-neutral-500 mt-6">
          Будь ласка, збережіть номер замовлення для подальшого звʼязку з нами
        </p>
      </div>
    </div>
  );
}
