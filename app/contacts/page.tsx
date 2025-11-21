"use client";

import Link from "next/link";
import Image from "next/image";
import Telegram from "../../public/icons/telegram.svg";
import PhoneCall from "../../public/icons/phone-call.svg";
import Gmail from "../../public/icons/gmail.svg";

export default function Contacts() {
  return (
    <div className="text-white pl-10 pr-10 md:pl-24 md:pr-24 pt-24">
      <div className="text-4xl pb-16">Контакти</div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <Image
            src={PhoneCall}
            alt="telegram"
            width={30}
            height={30}
            className=""
          />
          <div className="text-lg">+38073 821 24 23</div>
        </div>
        <div className="flex gap-6">
          <Image
            src={Gmail}
            alt="telegram"
            width={30}
            height={30}
            className=""
          />

          <Link
            href="mailto:yourmail@gmail.com"
            className="text-white underline text-lg"
          >
            eldopolz690@gmail.com
          </Link>
        </div>
      </div>
      <div className="flex flex-col pt-16 gap-6">
        <div className="text-2xl">Підтримка 24/7</div>

        <Link
          href="https://t.me/Club_Suport"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Telegram}
            alt="telegram"
            width={50}
            height={50}
            className=""
          />
        </Link>
      </div>
    </div>
  );
}
