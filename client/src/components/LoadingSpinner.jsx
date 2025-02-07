import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-slate-300 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-slate-600 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
