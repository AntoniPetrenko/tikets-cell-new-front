import React from "react";

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 50 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-orange-500 border-transparent"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
