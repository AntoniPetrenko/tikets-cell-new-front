"use client";

import { CardServerProduct } from "../components/CardServerProduct/CardServerProduct";
import { ClubCards } from "@/app/const/products";

export default function Catalog() {
  return (
    <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pt-24">
      <div className=" text-white text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
          Клубні карти AutoMerchClub — START, SILVER, GOLD та PLATINUM — це
          розширений сервіс для покупців нашого магазину автозапчастин.
        </h1>
        <p className="font-medium text-lg" style={{ marginTop: "2rem" }}>
          Кожна клубна карта надає клієнтам додаткові можливості у межах нашого
          магазину:
        </p>
      </div>
      {ClubCards.map((product) => {
        return <CardServerProduct product={product} key={product.id} />;
      })}
    </div>
  );
}
