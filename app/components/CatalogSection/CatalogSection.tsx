"use client";

import { useState, useEffect } from "react";
import { CardClientProduct } from "../CardClientProduct/CardClientProduct";
import { Button } from "../Button/Button";
import { Product } from "@/app/types";

interface CatalogSectionProps {
  products: Product[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ products }) => {
  const MOBILE_COUNT = 3;
  const DESKTOP_COUNT = 6;

  const [visibleCount, setVisibleCount] = useState(DESKTOP_COUNT);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? MOBILE_COUNT : DESKTOP_COUNT);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? MOBILE_COUNT : DESKTOP_COUNT));
  };

  const isAllVisible = visibleCount >= products.length;

  return (
    <section className="relative w-full flex flex-col justify-center items-center text-white">
      <h2 className="text-3xl md:text-4xl font-bold  mt-7 leading-snug">
        Каталог товарів
      </h2>
      <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pb-4 pt-4">
        {products.slice(0, visibleCount).map((product) => (
          <CardClientProduct product={product} key={product.id} />
        ))}
      </div>
      {!isAllVisible && (
        <Button
          variant="transparent"
          onClick={handleShowMore}
          sizeText="small"
          className="mb-[15px]"
        >
          Переглянути більше
        </Button>
      )}
    </section>
  );
};
