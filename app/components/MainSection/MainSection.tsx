"use client";

import Image from "next/image";

export const MainSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <Image
        src="/bmw-m5.jpg"
        alt="Background"
        fill
        priority
        className="object-cover object-center z-10"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-10 text-white text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Підбір авто та запчастин для будь-яких потреб
        </h1>
        <p className="font-medium text-lg">
          Ми допоможемо вам обрати автомобіль, який ідеально відповідає вашому
          стилю життя та бюджету. Наша команда підбирає перевірені машини по
          всій Україні та забезпечує якісні комплектуючі для будь-якої моделі.
          Ми дбаємо про кожну деталь, щоб ви отримали надійний транспорт і
          комфорт на кожному кілометрі шляху.
        </p>
      </div>
    </section>
  );
};
