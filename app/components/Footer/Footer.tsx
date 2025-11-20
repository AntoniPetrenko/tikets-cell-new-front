"use client";

import Link from "next/link";
import { navItems, subNavItems } from "@/app/const";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex flex-col p-4 md:p-8 gap-8 md:gap-4">
      <div className="flex justify-between">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <div className="flex justify-center items-center text-white text-sm gap-8">
          <Link
            href="https://t.me/automerchclub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/telegram.svg"
              alt="telegram"
              width={50}
              height={50}
              className="invert brightness-0"
            />
          </Link>
        </div>
      </div>

      <div className="flex justify-center md:justify-between flex-col md:flex-row gap-8 md:gap-4">
        <div className="flex flex-col items-center md:items-start ">
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
        <div className="flex flex-col items-center font-medium text-sm text-white">
          <div className="font-semibold text-xl md:text-3xl text-white">
            Контакти
          </div>
          <div className="text-white font-medium text-base md:text-xl">
            м. Київ вул. Велика 9
          </div>
        </div>
        <div className="flex flex-col items-center font-medium text-sm text-white">
          <div className="flex flex-col items-center md:items-start">
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
