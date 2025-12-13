"use client";

import "./globals.css";
import { MainSection } from "./components/MainSection/MainSection";
import { AboutUsSection } from "./components/AboutUsSection/AboutUsSection";
import { CatalogSection } from "./components/CatalogSection/CatalogSection";
import { useProducts } from "./hooks/useProducts";
import { FullScreenLoader } from "./components/FullScreenLoader/FullScreenLoader";
import { WhyChooseAutoHub } from "./components/WhyChooseAutoHub/WhyChooseAutoHub";
import { useRef } from "react";

export default function Home() {
  const { products, isLoading } = useProducts();
  const whyRef = useRef<HTMLDivElement | null>(null);

  if (isLoading) return <FullScreenLoader />;
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between dark:bg-black sm:items-start text-6xl font-bold">
        <MainSection whyRef={whyRef as React.RefObject<HTMLDivElement>} />
        <AboutUsSection />
        <CatalogSection products={products} />
        <WhyChooseAutoHub ref={whyRef} />
      </main>
    </div>
  );
}
