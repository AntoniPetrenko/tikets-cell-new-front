"use client";

import React from "react";

interface FullScreenLoaderProps {
  size?: number;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  size = 60,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        style={{ width: size, height: size }}
        className="border-8 border-orange-400 border-t-transparent border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};
