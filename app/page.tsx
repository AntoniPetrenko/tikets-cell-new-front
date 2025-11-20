"use client";

import "./globals.css";
import { MainSection } from "./components/MainSection/MainSection";
import { AboutUsSection } from "./components/AboutUsSection/AboutUsSection";
import { CatalogSection } from "./components/CatalogSection/CatalogSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between dark:bg-black sm:items-start text-6xl font-bold">
        <MainSection />
        <AboutUsSection />
        <CatalogSection />
      </main>
    </div>
  );
}
