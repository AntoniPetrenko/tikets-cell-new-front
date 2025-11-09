"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/app/libs/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pink" | "transparent";
  href?: string;
  loading?: boolean;
  sizeText?: "small" | "normal";
}

export function Button({
  variant = "pink",
  href,
  loading = false,
  disabled,
  className,
  children,
  sizeText = "normal",
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center px-4 py-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    pink: "bg-[#F9449B] text-white hover:shadow-[0_4px_15px_rgba(249,68,155,0.4)] disabled:opacity-70 border-0 focus:ring-0",
    transparent:
      "bg-transparent border border-white text-white hover:shadow-[0_4px_15px_rgba(255,255,255,0.4)] focus:ring-white disabled:opacity-70",
  };

  const sizeTexts = {
    small: "text-lg",
    normal: "text-2xl",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizeTexts[sizeText],
    (disabled || loading) && "cursor-not-allowed opacity-50",
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
