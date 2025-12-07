"use client";

import BmwDarkSrc from "../../../public/why_img.jpg";
import Image from "next/image";
import {
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Cog,
  Handshake,
} from "lucide-react";
import { forwardRef } from "react";

const features = [
  {
    title: "Переваги AutoMerchClub",
    text: "Швидка відповідь у той самий день, професійність, що підтверджена понад 10-річним досвідом, і чесний підхід, де рішення приймаються виключно в інтересах клієнта. Усі послуги доступні онлайн для максимальної зручності, а клубні карти дозволяють заощаджувати до 80% на сервісі.",
    icon: Handshake,
  },
  {
    title: "Професійний підбір авто",
    text: "Ми знаходимо найкращі варіанти під будь-який бюджет — від практичних щоденних авто до преміальних моделей. Формуємо добірку пропозицій, перевіряємо історію, проводимо повну діагностику технічного стану — ти отримуєш лише надійні машини без неприємних сюрпризів.",
    icon: Wrench,
  },
  {
    title: "Перевірка та діагностика",
    text: "Кожне авто проходить комплексну перевірку: кузов, електроніка, двигун, ходова, пробіг, VIN-історія. Ми даємо зрозумілу оцінку стану та реальної вартості, щоб ти приймав зважене рішення.",
    icon: CheckCircle2,
  },
  {
    title: "Підбір запчастин",
    text: "Підбираємо якісні деталі під будь-який автомобіль — точно, коректно і без переплат. Оригінали або перевірені аналоги, під твій бюджет і стиль експлуатації. Формуємо повний список, пояснюємо, що краще поставити саме у твоєму випадку.",
    icon: Cog,
  },
  {
    title: "Точність та чесність",
    text: "Ти отримуєш запчастини, які дійсно підходять твоєму авто — без нав’язаних позицій і зайвих витрат.",
    icon: ShieldCheck,
  },
];

export const WhyChooseAutoHub = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="relative w-full bg-black text-white py-20 overflow-hidden px-4"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="relative w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[600px] hidden sm:block">
            <Image
              src={BmwDarkSrc}
              alt="Car"
              fill
              className="object-contain lg:object-left object-center"
            />
          </div>
          <div className="flex flex-col h-full justify-center text-center lg:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Чому обирають{" "}
              <span className="text-orange-500 uppercase">Auto</span>
              <span className="uppercase">MerchClub</span>
            </h2>

            <p className="text-gray-300 max-w-xl mx-auto lg:mx-0 text-lg">
              Отримуйте якісний сервіс та експертизу, які роблять шлях до
              ідеального авто простим, прозорим і вигідним.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3"
                  >
                    <div className="w-14 h-14 border border-gray-700 rounded-full flex items-center justify-center">
                      <Icon
                        className="w-7 h-7 text-orange-500"
                        strokeWidth={1.4}
                      />
                    </div>

                    <h3 className="text-lg font-semibold">{f.title}</h3>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">
                      {f.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseAutoHub.displayName = "WhyChooseAutoHub";
