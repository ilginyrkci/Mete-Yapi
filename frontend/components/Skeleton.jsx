import React from "react";

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-stone-200 dark:bg-stone-800 rounded ${className}`} />;
}
