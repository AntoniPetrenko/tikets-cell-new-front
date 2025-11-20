"use client";

import { CardClientProduct } from "../CardClientProduct/CardClientProduct";
import { ProductsClient } from "@/app/const/products";

export const CatalogSection: React.FC = () => {
  return (
    <section className="bg-gray-900 w-full flex flex-col justify-center items-center text-white">
      {/* <div className="text-2xl md:text-4xl font-bold text-center pt-4">
        Кат
      </div>
      <div className="text-lg font-normal text-center pt-4 pb-4">
        Handpicked selection of our top-rated vehicles
      </div> */}
      <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pb-4 pt-4">
        {ProductsClient.map((product) => {
          return <CardClientProduct product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
};
