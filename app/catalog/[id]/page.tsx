"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/Button/Button";
import { Slider } from "@/app/components/Slider/Slider";
import { useProducts } from "@/app/hooks/useProducts";
import { FullScreenLoader } from "@/app/components/FullScreenLoader/FullScreenLoader";

import { useUIStore } from "@/app/store/uiStore";
import { useCartStore } from "@/app/store/cardStore";

export default function Product() {
  const { id } = useParams();
  const { products, isLoading } = useProducts();
  const product = products.find((item) => String(item.id) === id);
  const [mounted, setMounted] = useState(false);

  const cartItem = useCartStore((state) => state.item);
  const addToCart = useCartStore((state) => state.addToCart);

  const openSidebar = useUIStore((state) => state.openSidebar);
  const openModal = useUIStore((state) => state.openModal);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isLoading) return <FullScreenLoader />;
  if (!product)
    return <div className="pt-24 text-white">Товар не знайдено</div>;

  const handleAddToCart = () => {
    if (!cartItem) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.photo?.[0] || "",
        customId: product.customID,
      });
      openSidebar();
    } else {
      openModal();
    }
  };

  return (
    <div className="pt-24 flex flex-col justify-center items-center text-white">
      <div className="flex flex-col md:flex-row gap-12 p-3">
        <Slider images={product.photo || []} />

        <div className="w-full md:w-1/3 flex flex-col gap-6 p-3">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-medium">{product.description}</p>
          <p className="text-2xl font-medium">
            {product.price} <span className="text-lg">₴</span>
          </p>
        </div>
      </div>

      <div className="pt-12">
        <Button variant="orange" onClick={handleAddToCart}>
          {cartItem ? "Товар уже в кошику" : "Додати в кошик"}
        </Button>
      </div>
    </div>
  );
}
