"use client";

import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useProductStore } from "@/app/store/productStore";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";

export const Sidebar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const item = useProductStore((state) => state.item);
  const increaseQty = useProductStore((state) => state.increaseQty);
  const decreaseQty = useProductStore((state) => state.decreaseQty);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const getTotal = useProductStore((state) => state.getTotal);

  const isOpen = useProductStore((state) => state.isSidebarOpen);
  const closeSidebar = useProductStore((state) => state.closeSidebar);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  if (!mounted) return null;

  const total = getTotal();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-full w-80 bg-[#000000] text-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Ваше замовлення</h2>
          <button onClick={closeSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {!item ? (
            <p className="text-gray-400">У кошику немає товарів.</p>
          ) : (
            <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-400">
                  {(item.price * item.qty).toFixed(2)} ₴
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQty}
                  className="p-1 rounded bg-gray-800 text-gray-400 cursor-not-allowed hover:bg-gray-800 transition-colors"
                  disabled
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={increaseQty}
                  className="p-1 rounded bg-gray-800 text-gray-400 cursor-not-allowed hover:bg-gray-800 transition-colors"
                  disabled
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={removeFromCart}
                className="text-red-500 hover:text-red-400"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Усього:</span>
            <span>{total.toFixed(2)} ₴</span>
          </div>

          <Button
            className={`w-full ${!item ? "opacity-50 cursor-not-allowed" : ""}`}
            variant="orange"
            sizeText="small"
            onClick={() => {
              if (!item) return;
              closeSidebar();
              router.push("/order");
            }}
            disabled={!item}
          >
            Оформити замовлення
          </Button>
        </div>
      </aside>
    </>
  );
};
