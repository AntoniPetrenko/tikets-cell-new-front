"use client";

import Image from "next/image";
import { Button } from "../Button/Button";

interface CardProps {
  srcImg: string;
  title: string;
  description: string;
  price: string;
  id: string;
  type: "server" | "client";
}

export const Card = () => {
  return (
    <div
      className="text-white flex flex-col w-[381px] h-[402px] border-2 border-white border-solid 
                 shadow-[inset_0_0_25px_rgba(255,255,255,0.8),0_0_35px_rgba(255,255,255,0.6)] 
                 overflow-hidden p-4 transition-shadow duration-300 "
    >
      <div className="relative w-full h-[180px]">
        <Image
          src="/bmw-m5.jpg"
          alt="BMW M5"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="font-semibold text-2xl mt-4">title</div>
      <div className="font-normal text-xs text-gray-300 mb-4">Description</div>
      <div className="flex justify-between items-center mt-auto gap-4">
        <Button variant="pink" sizeText="small">
          Читати далі
        </Button>
        <div className="font-bold text-4xl">10000$</div>
      </div>
    </div>
  );
};
