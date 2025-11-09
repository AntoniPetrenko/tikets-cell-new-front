"use client";

import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <NavBar />
    </header>
  );
};
