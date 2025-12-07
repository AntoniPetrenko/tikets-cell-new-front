"use client";

import Image from "next/image";
import LambaSrc from "../../../public/lamba_bg.png";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";

export const MainSection = ({
  whyRef,
}: {
  whyRef: React.RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const scrollToWhy = () => {
    if (whyRef?.current) {
      whyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className=" w-full min-h-screen flex items-start justify-center">
      <Image
        src={LambaSrc}
        alt="Car background"
        fill
        className="object-cover object-center z-10"
        priority
      />
      <div
        className="relative z-10 text-white text-center p-8 mt-12"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mt-3 md:leading-snug text-center">
          Професійний підбір та продаж автозапчастин.
        </h1>
        <p className="mt-4 md:mt-0 font-medium text-sm md:text-lg">
          Підбираємо якісні запчастини та кузовні елементи під будь-який
          автомобіль — у наявності та під замовлення.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-6 w-1/2 mx-auto justify-center pt-[200px]">
          <Button
            variant="orange"
            sizeText="small"
            onClick={() => router.push("/catalog/")}
          >
            Каталог
          </Button>
          <Button variant="transparent" sizeText="small" onClick={scrollToWhy}>
            Хто ми
          </Button>
        </div>
      </div>
    </section>
  );
};
