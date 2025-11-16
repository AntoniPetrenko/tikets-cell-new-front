"use client";

import { Product } from "@/app/types";
import { Card } from "../Card/Card";

interface CatalogSectionProps {
  products: Product[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ products }) => {
  return (
    <section className="bg-gray-900 w-full flex flex-col justify-center items-center text-white">
      <div className="text-2xl md:text-4xl font-bold text-center pt-4">
        Explore Our Featured Cars
      </div>
      <div className="text-lg font-normal text-center pt-4 pb-4">
        Handpicked selection of our top-rated vehicles
      </div>
      <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pb-4">
        {products
          .filter((item) => item.is_active)
          .map((product) => {
            return <Card product={product} key={product.id} />;
          })}
      </div>
    </section>
  );
};
