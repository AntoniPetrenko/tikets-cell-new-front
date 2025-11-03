"use client";

import Link from "next/link";
import { Logo } from "../Logo/Logo";
import { navItems, subNavItems } from "@/app/const";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-col p-4 md:p-8 gap-8 md:gap-4">
      <div className="flex justify-between">
        <Logo />
        <div className="flex text-white text-sm gap-8">
          <Instagram />
          <Facebook />
        </div>
      </div>

      <div className="flex justify-center md:justify-between flex-col md:flex-row gap-8 md:gap-4">
        <div className="flex flex-col">
          <div className="font-semibold text-xl md:text-3xl text-white">
            Меню
          </div>
          <div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col text-white hover:text-pink-600 font-medium text-base md:text-xl"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col font-medium text-sm text-white">
          <div className="font-semibold text-xl md:text-3xl text-white">
            Контакти
          </div>
          <div className="text-white font-medium text-base md:text-xl">
            м. Київ вул. Велика 9
          </div>
        </div>
        <div className="flex flex-col font-medium text-sm text-white">
          <div className="font-semibold text-xl md:text-3xl text-white">
            Корисна інформація
          </div>
          <div>
            {subNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col text-white hover:text-pink-600 font-medium text-base md:text-xl"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
