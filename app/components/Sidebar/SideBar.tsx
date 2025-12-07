"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useProductStore } from "@/app/store/productStore";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";

export const Sidebar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const items = useProductStore((state) => state.items);
  const increaseQty = useProductStore((state) => state.increaseQty);
  const decreaseQty = useProductStore((state) => state.decreaseQty);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const getTotal = useProductStore((state) => state.getTotal);

  const isOpen = useProductStore((state) => state.isSidebarOpen);
  const closeSidebar = useProductStore((state) => state.closeSidebar);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const total = getTotal();

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      <aside
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
          {items.length === 0 ? (
            <p className="text-gray-400">У кошику немає товарів.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    {(item.price * item.qty).toFixed(2)} ₴
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Усього:</span>
            <span>{total.toFixed(2)} ₴</span>
          </div>

          <Button
            className="w-full"
            variant="orange"
            sizeText="small"
            onClick={() => {
              closeSidebar();
              router.push("/order");
            }}
          >
            Оформити замовлення
          </Button>
          <Button
            variant="transparent"
            sizeText="small"
            onClick={closeSidebar}
            className="w-full"
          >
            Продовжити покупки
          </Button>
        </div>
      </aside>
    </>
  );
};
