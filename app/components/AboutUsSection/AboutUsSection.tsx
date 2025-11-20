"use client";

import Image from "next/image";

export const AboutUsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <Image
        src="/bmw.jpeg"
        alt="Car background"
        fill
        className="object-cover object-center z-10"
        priority
      />

      <div className="w-full md:h-auto relative rounded-lg overflow-hidden  md:m-10">
        <div className="relative z-10 text-white text-left p-8 flex flex-col gap-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Ми професійно підбираємо авто під будь-який бюджет: від доступних
            варіантів до преміальних моделей.
          </h1>
          <div>
            <p className="font-medium text-lg text-left">Що ми робимо:</p>
            <p className="font-medium text-lg text-left">
              • Пошук та формування списку найкращих пропозицій
            </p>
            <p className="font-medium text-lg text-left">
              • Перевірка авто по VIN та історії
            </p>
            <p className="font-medium text-lg text-left">
              • Повна діагностика: кузов, електроніка, технічний стан
            </p>
          </div>

          <div>
            <p className="font-medium text-lg text-left">
              Підбираємо якісні запчастини для будь-якого автомобіля.
            </p>
            <p className="font-medium text-lg text-left">
              • Оригінал або надійні аналоги
            </p>
            <p className="font-medium text-lg text-left">
              • Ураховуємо бюджет, пробіг та стиль використання авто
            </p>
            <p className="font-medium text-lg text-left">
              • Пояснюємо, що краще поставити саме у твоєму випадку
            </p>
            <p className="font-medium text-lg text-left">
              • Формуємо повний перелік деталей
            </p>
          </div>

          <div className="font-medium text-lg text-left">
            Ти отримуєш лише ті запчастини, які підходять точно та без переплат.
          </div>

          <div className="font-medium text-lg text-left">
            <p className="font-medium text-lg text-left font-bold">ЧОМУ МИ</p>
            <p className="font-medium text-lg text-left">
              ✔ Швидко — відповідаємо того ж дня
            </p>
            <p className="font-medium text-lg text-left">
              ✔ Професійно — понад 10 років у авто-сфері
            </p>
            <p className="font-medium text-lg text-left">
              ✔ Чесно — працюємо тільки в інтересах клієнта
            </p>
            <p className="font-medium text-lg text-left">
              ✔ Зручно — усі послуги онлайн
            </p>
            <p className="font-medium text-lg text-left">
              ✔ Вигідно — клубні карти економлять до 80% витрат на послуги
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
