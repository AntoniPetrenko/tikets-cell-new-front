"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-950 text-white rounded-2xl shadow-xl max-w-md w-full p-6 relative transition-transform transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

        <div className="space-y-4 text-neutral-300">{children}</div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        <div className="mt-6 flex justify-end gap-2">
          {actions ? (
            actions
          ) : (
            <button
              onClick={onClose}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Ок
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
