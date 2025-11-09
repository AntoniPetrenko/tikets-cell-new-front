"use client";

import Image from "next/image";

export const AboutUsSection = () => {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-12 text-white gap-8">
        <h2 className="text-4xl font-bold mb-4">Заголовок</h2>
        <p className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto odio
          excepturi impedit culpa laudantium fuga ratione possimus veritatis
          maxime omnis nemo voluptates exercitationem libero natus voluptatum,
          obcaecati consectetur voluptatibus? Neque.
        </p>
        <p className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto odio
          excepturi impedit culpa laudantium fuga ratione possimus veritatis
          maxime omnis nemo voluptates exercitationem libero natus voluptatum,
          obcaecati consectetur voluptatibus? Neque.
        </p>
      </div>
      <div className="w-full md:w-1/2 h-[300px] md:h-auto relative rounded-lg overflow-hidden  md:m-10">
        <Image
          src="/bmw.jpeg"
          alt="Car background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  );
};
