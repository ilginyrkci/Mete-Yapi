import React from "react";

export function StatCard({ title, value, icon: Icon, color = "amber" }) {
  return (
    <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
      <div className="p-3 bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{title}</p>
        <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">{value}</h3>
      </div>
    </div>
  );
}
