"use client";

import { Card } from "../Card/Card";

export const CatalogSection = () => {
  return (
    <section className="bg-gray-900 w-full flex flex-col justify-center items-center text-white">
      <div className="text-2xl md:text-4xl font-bold text-center">
        Explore Our Featured Cars
      </div>
      <div className="text-lg font-normal text-center">
        Handpicked selection of our top-rated vehicles
      </div>
      <div className="flex flex-col md:flex-row gap-8 flex-wrap justify-center items-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};
