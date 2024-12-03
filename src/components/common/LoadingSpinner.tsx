import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-pulse">
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-400 animate-spin-slow"></div>
        </div>
      </div>
    </div>
  );
}