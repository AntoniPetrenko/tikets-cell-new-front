"use client";

import { Button } from "@/app/components/Button/Button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FullScreenLoader } from "@/app/components/FullScreenLoader/FullScreenLoader";
import { useProducts } from "@/app/hooks/useProducts";
import { useProductStore } from "@/app/store/productStore";

export default function ClubCard() {
  const { id } = useParams();
  const { clubCards, isLoading } = useProducts();

  const product = clubCards.find((item) => String(item.id) === id);

  const addToCartStore = useProductStore((state) => state.addToCart);
  const openSidebar = useProductStore((state) => state.openSidebar);

  if (isLoading) return <FullScreenLoader />;

  const addToCart = () => {
    if (!product) return;

    if (useProductStore.getState().item) {
      useProductStore.getState().openModal();
      return;
    }
    addToCartStore({
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
    <>
      <div className="pt-24 flex flex-col justify-center items-center text-white">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-3">
          <Image
            width={300}
            height={300}
            src={product?.photo[0] || ""}
            alt=""
          />

          <div className="w-full flex flex-col gap-6 p-3">
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <p className="text-xl font-medium">{product?.description}</p>

            {product?.texts?.map((item) => (
              <p key={item} className="text-xl font-medium">
                {item}
              </p>
            ))}

            {product?.rebate && product.rebate !== 0 ? (
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
                {product?.price} <span className="text-lg">₴</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-12">
          <Button variant="orange" onClick={addToCart}>
            Додати в кошик
          </Button>
        </div>
      </div>
    </>
  );
}
