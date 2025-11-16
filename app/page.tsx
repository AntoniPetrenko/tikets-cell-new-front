"use client";

import "./globals.css";
import { MainSection } from "./components/MainSection/MainSection";
import { AboutUsSection } from "./components/AboutUsSection/AboutUsSection";
import { CatalogSection } from "./components/CatalogSection/CatalogSection";
import { useProducts } from "./hooks/useProducts";
import Loader from "./components/Loader/Loader";

export default function Home() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between dark:bg-black sm:items-start text-6xl font-bold">
        <MainSection />
        <AboutUsSection />
        <CatalogSection products={products} />
      </main>
    </div>
  );
}
