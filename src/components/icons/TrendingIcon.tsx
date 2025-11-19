"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface TrendingIconProps {
  className?: string;
}

export const TrendingIcon: React.FC<TrendingIconProps> = ({ className }) => {
  return (
    <div
      className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-primary", className)}
    >
      <span className="text-sm text-white">↑</span>
    </div>
  );
};
