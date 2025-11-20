"use client";

import { CardClientProduct } from "../components/CardClientProduct/CardClientProduct";
import { ProductsClient } from "@/app/const/products";

export default function Catalog() {
  return (
    <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pt-24">
      {ProductsClient.map((product) => {
        return <CardClientProduct product={product} key={product.id} />;
      })}
    </div>
  );
}
