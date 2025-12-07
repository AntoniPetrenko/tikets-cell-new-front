"use client";

import Link from "next/link";
import Image from "next/image";
import Telegram from "../../public/icons/telegram.svg";
import { Mail, Phone } from "lucide-react";

export default function Contacts() {
  return (
    <div className="text-white pl-10 pr-10 md:pl-24 md:pr-24 pt-24">
      <div className="text-4xl pb-16">Контакти</div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-center">
          <Phone className="w-6 h-6 text-orange-500" />
          <a href="tel:+380738212423" className="text-lg hover:underline">
            +38073 821 24 23
          </a>
        </div>
        <div className="flex gap-6">
          <Mail className="w-6 h-6 text-orange-500" />

          <Link
            href="mailto:yourmail@gmail.com"
            className="text-white underline text-lg"
          >
            eldopolz690@gmail.com
          </Link>
        </div>
        <div className="flex gap-6">
          <Link
            href="https://t.me/Automerch_Support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-5"
          >
            <Image
              src={Telegram}
              alt="telegram"
              width={30}
              height={30}
              className=""
            />
            <div className="text-lg">Підтримка 24/7</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
