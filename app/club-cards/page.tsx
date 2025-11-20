"use client";

import { CardServerProduct } from "../components/CardServerProduct/CardServerProduct";
import { ProductsServer } from "@/app/const/products";

export default function Catalog() {
  return (
    <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pt-24">
      {ProductsServer.map((product) => {
        return <CardServerProduct product={product} key={product.id} />;
      })}
    </div>
  );
}
