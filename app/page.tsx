"use client";

import "./globals.css";
import { MainSection } from "./components/MainSection/MainSection";
import { AboutUsSection } from "./components/AboutUsSection/AboutUsSection";
import { CatalogSection } from "./components/CatalogSection/CatalogSection";
import FloatingLines from "@/app/components/FloatingLines";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between dark:bg-black sm:items-start text-6xl font-bold">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[5, 3, 10]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
        <MainSection />
        <AboutUsSection />
        <CatalogSection />
      </main>
    </div>
  );
}
