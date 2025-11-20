"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PaymentInfo {
  [key: string]: string;
}

export default function ResultClient() {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    const entries = Array.from(searchParams.entries()) as [string, string][];
    const paramsObj: PaymentInfo = Object.fromEntries(entries);

    if (Object.keys(paramsObj).length > 0) {
      setInfo(paramsObj);
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [searchParams]);

  return (
    <div className="text-white pt-24 pr-24 pl-24 flex flex-col gap-8 w-full h-full flex justify-center items-center text-center">
      <div className="text-4xl">
        Вітаємо! <br /> Ви придбали клубну карту.
      </div>
    </div>
  );
}
