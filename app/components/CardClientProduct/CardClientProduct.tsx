"use client";

import Image from "next/image";
import { Button } from "../Button/Button";
import { Product, ProductServer } from "@/app/types";
import { useRouter } from "next/navigation";

interface CardProps {
  product: Product;
}

export const CardClientProduct: React.FC<CardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="text-white flex flex-col w-[381px] h-[402px] border-2 border-white border-solid 
                 shadow-[inset_0_0_25px_rgba(255,255,255,0.8),0_0_35px_rgba(255,255,255,0.6)] 
                 overflow-hidden p-4 transition-shadow duration-300 "
    >
      <div className="relative w-full h-[180px]">
        <Image
          src={product.photo[0]}
          alt="photo"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="font-semibold text-2xl mt-4">{product.title}</div>
      <div className="font-normal text-xs text-gray-300 mb-4">
        {product.description}
      </div>
      <div className="flex justify-between items-center mt-auto gap-4">
        <Button
          variant="pink"
          sizeText="small"
          onClick={() => router.push(`/catalog/${product.id}`)}
        >
          Читати далі
        </Button>
        <div className="font-bold text-4xl">{product.price} ₴</div>
      </div>
    </div>
  );
};
