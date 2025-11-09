"use client";

import { Button } from "@/app/components/Button/Button";
import { Slider } from "@/app/components/Slider/Slider";
import Image from "next/image";

interface ProductProps {
  id: string;
}

export default function Product({ id }: ProductProps) {
  return (
    <div className="pt-24 flex flex-col justify-center items-center text-white">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="">
          <Slider
            images={[
              "/bmw.jpeg",
              "/bmw.jpeg",
              "/bmw-m5.jpg",
              "/bmw.jpeg",
              "/bmw.jpeg",
            ]}
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">
            Спойлер для BMW F10 M Performance
          </h1>
          <p className="text-xl font-medium">
            Спойлер для BMW F10 M Performance додає автомобілю спортивного
            вигляду та покращує аеродинаміку на високих швидкостях. Виготовлений
            із якісного матеріалу, він ідеально повторює лінії кузова та легко
            встановлюється. Це стильне доповнення підкреслить індивідуальність
            вашого BMW і забезпечить впевнену стабільність на дорозі.
          </p>
        </div>
      </div>
      <div className="pt-12">
        <Button variant="pink" onClick={() => console.log("Click")}>
          Замовити товар
        </Button>
      </div>
    </div>
  );
}
