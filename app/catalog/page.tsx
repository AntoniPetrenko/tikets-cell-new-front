"use client";

import { Loader } from "lucide-react";
import { Card } from "../components/Card/Card";
import { useProducts } from "../hooks/useProducts";

export default function Catalog() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center pt-24">
      {products
        .filter((item) => item.is_active)
        .map((product) => {
          return <Card product={product} key={product.id} />;
        })}
    </div>
  );
}
