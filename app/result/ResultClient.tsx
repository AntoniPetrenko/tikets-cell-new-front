"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClubCards, ProductsClient } from "../const/products";

interface PaymentInfo {
  [key: string]: string;
}

export default function ResultClient() {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    const entries = Array.from(searchParams.entries()) as [string, string][];
    const paramsObj: PaymentInfo = Object.fromEntries(entries);

    console.log(paramsObj);

    if (Object.keys(paramsObj).length > 0) {
      setInfo(paramsObj);
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [searchParams]);

  const getProduct = (): string => {
    const products = [...ProductsClient, ...ClubCards];
    const product = products.find(
      (item) => Number(item.id) === Number(info?.id)
    );
    const getLevel = (text?: string): string => {
      if (!text) return "";
      const match = text.match(/\p{L}+/u);
      return match ? match[0].toUpperCase() : "";
    };
    if (Number(product?.id) >= 0 && Number(product?.id) <= 6) {
      return `Ви придбали клубну карту ${getLevel(product?.title)}`;
    } else {
      return `Ви придбали ${product?.title}`;
    }
  };

  return (
    <div className="text-white pt-24 pr-24 pl-24 flex flex-col gap-8 w-full h-full flex justify-center items-center text-center">
      <div className="text-4xl">
        Вітаємо! <br />
        {getProduct()}.
      </div>
    </div>
  );
}
