"use client"

import React from 'react';
import { cn } from "@/lib/utils";

export function RotatingText({ className }) {
  return (
    <div className={cn("relative w-40 h-40 select-none", className)}>
      {/* Outer circle with rotating text */}
      <div className="absolute w-full h-full animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            id="textPath"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
            className="text-gray-900 dark:text-gray-100"
          />
          <text className="text-[8px] uppercase tracking-[0.3em] fill-current">
            <textPath href="#textPath">
              My Projects • My Projects •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Down arrow in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-gray-900 dark:text-gray-100" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}