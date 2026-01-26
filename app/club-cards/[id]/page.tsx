"use client";

import { Button } from "@/app/components/Button/Button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FullScreenLoader } from "@/app/components/FullScreenLoader/FullScreenLoader";
import { useProducts } from "@/app/hooks/useProducts";
import { useUIStore } from "@/app/store/uiStore";
import { useCartStore } from "@/app/store/cardStore";

export default function ClubCard() {
  const { id } = useParams();
  const { clubCards, isLoading } = useProducts();
  const product = clubCards.find((item) => String(item.id) === id);

  const addToCart = useCartStore((s) => s.addToCart);
  const openSidebar = useUIStore((s) => s.openSidebar);

  if (isLoading) return <FullScreenLoader />;
  if (!product)
    return <div className="pt-24 text-white">Товар не знайдено</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.rebate || product.price,
      qty: 1,
      image: product.photo?.[0] || "",
      customId: product.customID,
    });
    openSidebar();
  };

  return (
    <div className="pt-24 flex flex-col justify-center items-center text-white">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-3">
        <Image
          width={300}
          height={300}
          src={product.photo?.[0] || ""}
          alt={product.title || ""}
        />

        <div className="w-full flex flex-col gap-6 p-3">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-medium">{product.description}</p>

          {product.texts?.map((item) => (
            <p key={item} className="text-xl font-medium">
              {item}
            </p>
          ))}

          <div className="flex flex-col items-end">
            {product.rebate && product.rebate !== 0 ? (
              <div>
                <div className="line-through decoration-2 decoration-red-500">
                  {product.price} <span className="text-lg">₴</span>
                </div>
                <div className="font-bold text-2xl text-red-500">
                  {product.rebate} <span className="text-lg">₴</span>
                </div>
              </div>
            ) : (
              <div className="font-bold text-2xl">
                {product.price} <span className="text-lg">₴</span>
              </div>
            )}
            <div>Немає в наявності</div>
          </div>
        </div>
      </div>

      {/* <div className="pt-12">
        <Button variant="orange" onClick={handleAddToCart}>
          Додати в кошик
        </Button>
      </div> */}
    </div>
  );
}
