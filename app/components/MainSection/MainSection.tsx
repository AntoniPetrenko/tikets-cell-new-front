"use client";

import { useProducts } from "@/app/hooks/useProducts";

export const MainSection = () => {
  useProducts();
  return (
    <section className=" w-full min-h-screen flex items-center justify-center">
      <div
        className="relative z-10 text-white text-center p-8"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-snug">
          Професійний підбір та продаж автозапчастин.
        </h1>
        <p className="font-medium text-lg">
          Підбираємо якісні запчастини та кузовні елементи під будь-який
          автомобіль — у наявності та під замовлення.
        </p>
        <h2 className="text-4xl md:text-5xl font-bold  mt-7 leading-snug">
          Клубні карти <span className="text-orange-500 uppercase">Auto</span>
          <span className="uppercase">MerchClub</span>
        </h2>
        <p className="font-medium text-4xl mt-3">
          дають нашим клієнтам додаткові переваги:
        </p>
        <p className="font-medium text-lg mt-3">— пріоритетний підбір;</p>
        <p className="font-medium text-lg mt-3">— бонуси та спеціальні ціни;</p>
        <p className="font-medium text-lg mt-3">— персональну підтримку.</p>
        <p className="font-medium text-lg mt-3">
          {" "}
          Клубна карта — це розширений сервіс для покупців нашого магазину
          автозапчастин.
        </p>
      </div>
    </section>
  );
};
