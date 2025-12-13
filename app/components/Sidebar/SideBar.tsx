"use client";

import { useEffect, useRef, useState } from "react";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import { useCartStore } from "@/app/store/cardStore";

export const Sidebar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const item = useCartStore((s) => s.item);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const isOpen = useUIStore((s) => s.isSidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeSidebar]);

  if (!mounted) return null;

  const total = item ? item.price * item.qty : 0;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-full w-80 bg-black text-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
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
                  disabled
                  onClick={decreaseQty}
                  className="p-1 rounded bg-gray-800 text-gray-400 transition-colors cursor-not-allowed hover:bg-gray-800 "
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-6 text-center">{item.qty}</span>

                <button
                  disabled
                  onClick={increaseQty}
                  className="p-1 rounded bg-gray-800 text-gray-400 transition-colors cursor-not-allowed hover:bg-gray-800 "
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
            disabled={!item}
            onClick={() => {
              if (!item) return;
              closeSidebar();
              router.push("/order");
            }}
          >
            Оформити замовлення
          </Button>
        </div>
      </aside>
    </>
  );
};
