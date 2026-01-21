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

    const product = allProducts.find(
      (item) => Number(item.id) === paymentId
    );

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

  return (
    <div className="text-white pt-24 pr-24 pl-24 flex flex-col gap-8 w-full h-full flex justify-center items-center text-center">
      <div className="text-4xl">
        Вітаємо! <br />
        {getProduct()}.
      </div>
    </div>
  );
}
