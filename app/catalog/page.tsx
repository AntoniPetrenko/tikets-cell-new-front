"use client";

import { useState, useEffect } from "react";
import { CardClientProduct } from "../components/CardClientProduct/CardClientProduct";
import { FullScreenLoader } from "../components/FullScreenLoader/FullScreenLoader";
import { useProducts } from "../hooks/useProducts";
import { Button } from "../components/Button/Button";

export default function Catalog() {
  const { products, isLoading } = useProducts();

  const [visibleCount, setVisibleCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setVisibleCount(isMobile ? 3 : 6);
  }, [isMobile]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (isLoading) return <FullScreenLoader />;

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center pt-24">
      <div className="flex flex-wrap justify-center gap-8">
        {visibleProducts.map((product) => (
          <CardClientProduct product={product} key={product.id} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="mt-6">
          <Button variant="transparent" onClick={handleLoadMore}>
            Переглянути більше
          </Button>
        </div>
      )}
    </div>
  );
}
