"use client";

import Link from "next/link";
import { navItems, subNavItems } from "@/app/const";
import Image from "next/image";
import Telegram from "../../../public/icons/telegram.svg";
import logo from "../../../public/logo.png";

export const Footer = () => {
  return (
    <div className="relative flex flex-col p-4 md:p-8 gap-8 md:gap-4">
      <div className="flex justify-between">
        <Image src={logo} alt="logo" width={100} height={100} />
        <div className="flex justify-center items-center  gap-8">
          <Link
            href="https://t.me/Club_Suport"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Telegram} alt="telegram" width={50} height={50} />
          </Link>
        </div>
      </div>

      <div className="flex justify-center md:justify-between flex-col md:flex-row gap-8 md:gap-4">
        <div className="flex flex-col items-center md:items-start ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col text-white hover:text-orange-500 font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start font-medium text-sm text-white">
          <div className="text-white font-medium text-sm">+380936018962</div>
          <div className="text-white font-medium text-sm">
            <Link
              href="mailto:yourmail@gmail.com"
              className="text-white underline"
            >
              eldopolz690@gmail.com
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center font-medium text-sm text-white">
          <div className="flex flex-col items-center md:items-start">
            {subNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col text-white hover:text-orange-500 font-medium text-sm"
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
