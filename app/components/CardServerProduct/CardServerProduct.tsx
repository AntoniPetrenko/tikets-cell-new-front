"use client";

import Image from "next/image";
import { Button } from "../Button/Button";
import { ProductServer } from "@/app/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CardProps {
  product: ProductServer;
}

export const CardServerProduct: React.FC<CardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <Link href={`/club-cards/${product.id}`}>
      <div
        className="text-white flex flex-col w-[381px] h-[480px] border-2 border-white border-solid 
                 shadow-[inset_0_0_25px_rgba(255,255,255,0.8),0_0_35px_rgba(255,255,255,0.6)] 
                 overflow-hidden p-4 transition-shadow duration-300 "
      >
        <div className="relative w-full h-[280px] flex justify-center items-center">
          <Image
            src={product.photo[0]}
            alt="photo"
            width={345}
            height={294}
            className="object-cover object-center"
          />
        </div>

        <div className="font-semibold text-2xl">{product.title}</div>
        <div className="font-normal text-xs text-gray-300 mb-4 mt-5">
          {product.description}
        </div>
        <div className="flex justify-between items-center mt-auto gap-4">
          <Button
            variant="pink"
            sizeText="small"
            onClick={() => router.push(`/club-cards/${product.id}`)}
          >
            Читати далі
          </Button>
          {product.rebate != 0 ? (
            <div>
              {" "}
              <div>
                <span className="line-through decoration-2 decoration-red-500">
                  {product.price}
                </span>{" "}
                <span>₴</span>
              </div>
              <div className="font-bold text-4xl text-red-500">
                {product.rebate} ₴
              </div>
            </div>
          ) : (
            <div className="font-bold text-4xl">{product.price} ₴</div>
          )}
        </div>
      </div>
    </Link>
  );
};
