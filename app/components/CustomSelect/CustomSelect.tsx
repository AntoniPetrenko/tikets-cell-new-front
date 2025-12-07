"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Region, ukraineRegions } from "@/app/const/ukraineRegions";

type CustomSelectProps = {
  value?: Region | null;
  onChange: (region: Region) => void;
  placeholder?: string;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  placeholder = "Оберіть область",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (region: Region) => {
    onChange(region);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 flex justify-between items-center text-white hover:bg-neutral-800"
      >
        <span>{value ? value.name : placeholder}</span>
        <ChevronDown className="w-5 h-5 text-neutral-400" />
      </button>
      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-neutral-900 border border-neutral-700 rounded-lg max-h-60 overflow-y-auto shadow-lg">
          {ukraineRegions.map((region) => (
            <li
              key={region.id}
              onClick={() => handleSelect(region)}
              className="px-3 py-2 hover:bg-neutral-800 flex justify-between items-center cursor-pointer text-white"
            >
              <span>{region.name}</span>
              {value?.id === region.id && (
                <Check className="w-4 h-4 text-yellow-400" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
