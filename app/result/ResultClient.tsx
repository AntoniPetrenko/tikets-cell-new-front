"use client";
import { useSearchParams } from "next/navigation";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const info = Object.fromEntries(searchParams.entries());

  console.log("Payment info:", info);

  return <div>Результат платежу: {JSON.stringify(info)}</div>;
}
