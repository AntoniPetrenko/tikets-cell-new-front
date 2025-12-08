"use client";

import { CardServerProduct } from "../components/CardServerProduct/CardServerProduct";
import { FullScreenLoader } from "../components/FullScreenLoader/FullScreenLoader";
import { useProducts } from "../hooks/useProducts";

export default function Catalog() {
  const { clubCards, isLoading } = useProducts();

  if (isLoading) return <FullScreenLoader />;
  return (
    <div className="flex flex-col  gap-8 flex-wrap justify-center items-center pt-24">
      <div className=" text-white text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
          Клубні карти <span className="text-orange-500 uppercase">Auto</span>
          <span className="uppercase">MerchClub</span>
        </h1>
        <p className="font-medium text-lg">
          <span className="text-orange-500">START, SILVER, GOLD</span> та{" "}
          <span className="text-orange-500">PLATINUM</span> — це ключ до
          додаткових привілеїв та вигідних пропозицій у нашому магазині
          автозапчастин.
        </p>
        <p className="font-medium text-lg mt-4">
          Кожна клубна карта надає клієнтам додаткові можливості у межах нашого
          магазину:
        </p>
      </div>
      <div className="flex gap-8 flex-wrap justify-center items-center">
        {clubCards.map((product) => {
          return <CardServerProduct product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
