"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { navItems } from "@/app/const";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center md:justify-between">
          <div
            className={`flex items-center justify-between w-full md:w-auto transition-all duration-300 flex-row`}
          >
            <Link
              href="/"
              className="text-2xl font-semibold text-white md:mr-6"
              onClick={() => setIsOpen(false)}
            >
              <Logo />
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-pink-500 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-pink-600 font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-white hover:text-pink-600 font-medium text-base"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
