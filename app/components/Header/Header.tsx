"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { navItems } from "@/app/const";
import { Sidebar } from "../Sidebar/SideBar";
import { useUIStore } from "@/app/store/uiStore";
import { useCartStore } from "@/app/store/cardStore";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.item?.qty ?? 0);

  const openSidebar = useUIStore((s) => s.openSidebar);
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden text-white order-1"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="order-2 md:order-1"
          >
            <Image src={logo} alt="logo" width={90} height={90} />
          </Link>

          <nav className="hidden md:flex gap-6 order-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-orange-500 font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button onClick={openSidebar} className="relative order-3 md:order-3">
            <ShoppingBag className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div
          className={`md:hidden bg-black/95 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-56 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white hover:text-orange-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {isSidebarOpen && <Sidebar />}
    </>
  );
};
