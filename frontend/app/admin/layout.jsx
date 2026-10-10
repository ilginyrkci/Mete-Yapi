"use client";

import { ProtectedAdmin } from "@/components/ProtectedAdmin";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <ProtectedAdmin>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-stone-50 dark:bg-stone-950 p-8">{children}</main>
      </div>
    </ProtectedAdmin>
  );
}
