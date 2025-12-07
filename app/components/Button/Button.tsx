"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/app/libs/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "transparent";
  href?: string;
  loading?: boolean;
  sizeText?: "small" | "normal";
}

export function Button({
  variant = "orange",
  href,
  loading = false,
  disabled,
  className,
  children,
  sizeText = "normal",
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center px-4 py-2 font-semibold transition-all duration-200 focus:outline-none";

  const variants = {
    orange:
      "bg-orange-500 text-white border-0 shadow-[0_8px_28px_rgba(255,145,0,0.55)] hover:shadow-[0_10px_38px_rgba(255,145,0,0.75)] focus:ring-0 disabled:opacity-70 disabled:shadow-[0_6px_22px_rgba(255,145,0,0.35)]",
    transparent:
      "bg-transparent border border-white text-white shadow-[0_6px_22px_rgba(255,255,255,0.45)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.65)] focus:ring-white disabled:opacity-70 disabled:shadow-[0_5px_18px_rgba(255,255,255,0.3)]",
  };

  const sizeTexts = {
    small: "text-lg",
    normal: "text-2xl",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizeTexts[sizeText],
    (disabled || loading) && "cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
