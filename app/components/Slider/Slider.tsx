"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface SliderProps {
  images: string[];
}

export const Slider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation={isDesktop}
        pagination={
          !isDesktop ? { clickable: true, dynamicBullets: true } : false
        }
        thumbs={isDesktop ? { swiper: thumbsSwiper } : undefined}
        spaceBetween={10}
        className="mb-4"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isDesktop && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          slideToClickedSlide
          className="cursor-pointer"
        >
          {images.map((src, index) => (
            <SwiperSlide key={`thumb-${index}`}>
              <div className="relative w-full h-[100px]">
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md border border-gray-500 hover:border-white transition"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
