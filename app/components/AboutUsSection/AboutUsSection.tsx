"use client";

import AboutUs from "../../../public/about_us_img.png";
import Image from "next/image";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";

export function AboutUsSection() {
  const router = useRouter();
  return (
    <section className="w-full bg-[#121212] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={AboutUs}
            alt="Auto Hub Car"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold  mt-7 leading-snug">
            Клубні карти <span className="text-orange-500 uppercase">Auto</span>
            <span className="uppercase">MerchClub</span>
            <p className="font-medium text-lg mt-3">
              Розширений сервіс для покупців нашого магазину автозапчастин.
            </p>
          </h2>
          <p className="font-medium text-2xl md:text-3xl  mt-20">
            Додаткові переваги для клієнтів:
          </p>
          <p className="font-medium text-lg mt-3">— пріоритетний підбір;</p>
          <p className="font-medium text-lg mt-3">
            — бонуси та спеціальні ціни;
          </p>
          <p className="font-medium text-lg mt-3">— персональна підтримка.</p>

          <Button variant="orange" onClick={() => router.push(`/club-cards/`)}>
            Дізнатись більше
          </Button>
        </div>
      </div>
    </section>
  );
}
