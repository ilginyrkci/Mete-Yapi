import React from "react";

export function Select({ options, className = "", label, error, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">{label}</label>}
      <select
        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-stone-900 text-stone-900 dark:text-white border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 focus:outline-none ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
